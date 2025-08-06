// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrizePoolPrediction is ReentrancyGuard, Ownable(msg.sender) {
    
    struct Prediction {
        uint256 id;
        string question;
        string[] options; // e.g., ["YES", "NO"] or ["Team A", "Team B", "Draw"]
        uint256 entryFee;
        uint256 prizePool;
        uint256 endTime;
        uint256 resolutionTime;
        bool resolved;
        uint256 winningOption; // Index of winning option
        bool active;
        address creator; // Platform admin who created it
        uint256 totalParticipants;
    }
    
    struct UserPrediction {
        uint256 option; // Index of chosen option
        bool claimed;
        uint256 timestamp;
    }
    
    struct UserStats {
        uint256 totalPredictions;
        uint256 correctPredictions;
        uint256 currentStreak;
        uint256 longestStreak;
        uint256 totalWinnings;
        uint256 lastPredictionTime;
        bool hasStreakSaver; // One-time streak protection
    }
    
    // State variables
    uint256 public predictionCounter;
    uint256 public platformFee = 500; // 5% (basis points)
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public streakSaverPrice = 0.01 ether; // Price to buy streak protection
    
    mapping(uint256 => Prediction) public predictions;
    mapping(uint256 => mapping(address => UserPrediction)) public userPredictions;
    mapping(uint256 => mapping(uint256 => address[])) public optionParticipants; // predictionId => optionIndex => participants
    mapping(uint256 => mapping(uint256 => uint256)) public optionCounts; // predictionId => optionIndex => count
    mapping(address => uint256[]) public userParticipatedPredictions;
    mapping(address => UserStats) public userStats; // User statistics and streaks
    
    // Leaderboard arrays (top 10)
    address[] public streakLeaders;
    address[] public winningsLeaders;
    address[] public accuracyLeaders;
    
    // Events
    event PredictionCreated(
        uint256 indexed predictionId,
        string question,
        string[] options,
        uint256 entryFee,
        uint256 prizePool,
        uint256 endTime
    );
    
    event PredictionSubmitted(
        uint256 indexed predictionId,
        address indexed user,
        uint256 option,
        string optionText
    );
    
    event PredictionResolved(
        uint256 indexed predictionId,
        uint256 winningOption,
        string winningOptionText,
        uint256 winnersCount
    );
    
    event PrizesClaimed(
        uint256 indexed predictionId,
        address indexed user,
        uint256 amount
    );
    
    event PrizePoolIncreased(
        uint256 indexed predictionId,
        uint256 additionalAmount,
        uint256 newTotal
    );
    
    event StreakUpdated(
        address indexed user,
        uint256 newStreak,
        bool isCorrect,
        bool streakSaverUsed
    );
    
    event StreakSaverPurchased(
        address indexed user
    );
    
    event LeaderboardUpdated(
        address indexed user,
        string leaderboardType
    );
    
    constructor() {}
    
    // Create a new prediction (only owner/admin)
    function createPrediction(
        string memory _question,
        string[] memory _options,
        uint256 _entryFee,
        uint256 _endTime,
        uint256 _resolutionTime
    ) external payable onlyOwner returns (uint256) {
        require(_endTime > block.timestamp, "End time must be in future");
        require(_resolutionTime > _endTime, "Resolution time must be after end time");
        require(bytes(_question).length > 0, "Question cannot be empty");
        require(_options.length >= 2, "Must have at least 2 options");
        require(_entryFee > 0, "Entry fee must be greater than 0");
        require(msg.value > 0, "Must provide initial prize pool");
        
        predictionCounter++;
        
        predictions[predictionCounter] = Prediction({
            id: predictionCounter,
            question: _question,
            options: _options,
            entryFee: _entryFee,
            prizePool: msg.value,
            endTime: _endTime,
            resolutionTime: _resolutionTime,
            resolved: false,
            winningOption: 0,
            active: true,
            creator: msg.sender,
            totalParticipants: 0
        });
        
        emit PredictionCreated(
            predictionCounter, 
            _question, 
            _options, 
            _entryFee, 
            msg.value, 
            _endTime
        );
        
        return predictionCounter;
    }
    
    // Submit a prediction
    function submitPrediction(uint256 _predictionId, uint256 _optionIndex) 
        external 
        payable 
        nonReentrant 
    {
        Prediction storage prediction = predictions[_predictionId];
        require(prediction.active, "Prediction not active");
        require(!prediction.resolved, "Prediction already resolved");
        require(block.timestamp < prediction.endTime, "Prediction period ended");
        require(_optionIndex < prediction.options.length, "Invalid option");
        require(msg.value == prediction.entryFee, "Incorrect entry fee");
        require(userPredictions[_predictionId][msg.sender].timestamp == 0, "Already predicted");
        
        // Record user's prediction
        userPredictions[_predictionId][msg.sender] = UserPrediction({
            option: _optionIndex,
            claimed: false,
            timestamp: block.timestamp
        });
        
        // Track participants for this option
        optionParticipants[_predictionId][_optionIndex].push(msg.sender);
        optionCounts[_predictionId][_optionIndex]++;
        
        // Update prediction stats
        prediction.totalParticipants++;
        prediction.prizePool += msg.value;
        
        // Track user participation
        userParticipatedPredictions[msg.sender].push(_predictionId);
        
        // Update user stats
        userStats[msg.sender].totalPredictions++;
        userStats[msg.sender].lastPredictionTime = block.timestamp;
        
        emit PredictionSubmitted(
            _predictionId, 
            msg.sender, 
            _optionIndex, 
            prediction.options[_optionIndex]
        );
    }
    
    // Resolve a prediction (only owner/admin)
    function resolvePrediction(uint256 _predictionId, uint256 _winningOption) 
        external 
        onlyOwner 
    {
        Prediction storage prediction = predictions[_predictionId];
        require(prediction.active, "Prediction not active");
        require(!prediction.resolved, "Already resolved");
        require(block.timestamp >= prediction.endTime, "Prediction period not ended");
        require(block.timestamp <= prediction.resolutionTime, "Resolution period expired");
        require(_winningOption < prediction.options.length, "Invalid winning option");
        
        prediction.resolved = true;
        prediction.winningOption = _winningOption;
        
        uint256 winnersCount = optionCounts[_predictionId][_winningOption];
        
        // Update streaks for all participants
        _updateStreaksAfterResolution(_predictionId, _winningOption);
        
        emit PredictionResolved(
            _predictionId, 
            _winningOption, 
            prediction.options[_winningOption],
            winnersCount
        );
    }
    
    // Claim prize (winners only)
    function claimPrize(uint256 _predictionId) external nonReentrant {
        Prediction memory prediction = predictions[_predictionId];
        require(prediction.resolved, "Prediction not resolved");
        
        UserPrediction storage userPred = userPredictions[_predictionId][msg.sender];
        require(userPred.timestamp > 0, "No prediction found");
        require(!userPred.claimed, "Prize already claimed");
        require(userPred.option == prediction.winningOption, "Not a winner");
        
        userPred.claimed = true;
        
        uint256 winnersCount = optionCounts[_predictionId][prediction.winningOption];
        require(winnersCount > 0, "No winners");
        
        // Calculate streak multiplier bonus
        uint256 streakMultiplier = _calculateStreakMultiplier(msg.sender);
        
        // Calculate prize per winner
        uint256 totalPrize = prediction.prizePool;
        uint256 platformFeeAmount = (totalPrize * platformFee) / BASIS_POINTS;
        uint256 winnersShare = totalPrize - platformFeeAmount;
        uint256 basePrize = winnersShare / winnersCount;
        uint256 finalPrize = (basePrize * streakMultiplier) / BASIS_POINTS;
        
        // Update user winnings stats
        userStats[msg.sender].totalWinnings += finalPrize;
        _updateLeaderboards(msg.sender);
        
        payable(msg.sender).transfer(finalPrize);
        
        emit PrizesClaimed(_predictionId, msg.sender, finalPrize);
    }
    
    // Add more funds to prize pool (optional)
    function increasePrizePool(uint256 _predictionId) external payable {
        Prediction storage prediction = predictions[_predictionId];
        require(prediction.active && !prediction.resolved, "Prediction not active");
        require(msg.value > 0, "Must send some ETH");
        
        prediction.prizePool += msg.value;
        
        emit PrizePoolIncreased(_predictionId, msg.value, prediction.prizePool);
    }
    
    // Buy streak saver protection
    function buyStreakSaver() external payable {
        require(msg.value >= streakSaverPrice, "Insufficient payment");
        require(!userStats[msg.sender].hasStreakSaver, "Already have streak saver");
        
        userStats[msg.sender].hasStreakSaver = true;
        
        // Refund excess payment
        if (msg.value > streakSaverPrice) {
            payable(msg.sender).transfer(msg.value - streakSaverPrice);
        }
        
        emit StreakSaverPurchased(msg.sender);
    }
    
    // Internal function to update streaks after prediction resolution
    function _updateStreaksAfterResolution(uint256 _predictionId, uint256 _winningOption) internal {
        Prediction memory prediction = predictions[_predictionId];
        
        // Update streaks for all participants in this prediction
        for (uint256 i = 0; i < prediction.options.length; i++) {
            address[] memory participants = optionParticipants[_predictionId][i];
            
            for (uint256 j = 0; j < participants.length; j++) {
                address participant = participants[j];
                bool isCorrect = (i == _winningOption);
                
                UserStats storage stats = userStats[participant];
                bool streakSaverUsed = false;
                
                if (isCorrect) {
                    // Correct prediction - increment streak
                    stats.correctPredictions++;
                    stats.currentStreak++;
                    
                    // Update longest streak if current is higher
                    if (stats.currentStreak > stats.longestStreak) {
                        stats.longestStreak = stats.currentStreak;
                    }
                } else {
                    // Wrong prediction - check for streak saver
                    if (stats.hasStreakSaver && stats.currentStreak > 0) {
                        // Use streak saver to maintain streak
                        stats.hasStreakSaver = false;
                        streakSaverUsed = true;
                        // Streak remains the same
                    } else {
                        // Reset streak
                        stats.currentStreak = 0;
                    }
                }
                
                emit StreakUpdated(participant, stats.currentStreak, isCorrect, streakSaverUsed);
                
                // Update leaderboards if necessary
                _updateLeaderboards(participant);
            }
        }
    }
    
    // Calculate streak multiplier for winnings
    function _calculateStreakMultiplier(address _user) internal view returns (uint256) {
        uint256 streak = userStats[_user].currentStreak;
        
        if (streak >= 10) return 20000; // 2x multiplier
        if (streak >= 5) return 15000;  // 1.5x multiplier
        if (streak >= 3) return 12000;  // 1.2x multiplier
        return 10000; // 1x multiplier (no bonus)
    }
    
    // Update leaderboards
    function _updateLeaderboards(address _user) internal {
        _updateStreakLeaderboard(_user);
        _updateWinningsLeaderboard(_user);
        _updateAccuracyLeaderboard(_user);
    }
    
    function _updateStreakLeaderboard(address _user) internal {
        uint256 userStreak = userStats[_user].currentStreak;
        
        // Find if user is already in leaderboard
        for (uint256 i = 0; i < streakLeaders.length; i++) {
            if (streakLeaders[i] == _user) {
                // User already in leaderboard, check if needs reordering
                _reorderStreakLeaderboard(i);
                return;
            }
        }
        
        // User not in leaderboard, check if they qualify
        if (streakLeaders.length < 10) {
            // Leaderboard not full, add user
            streakLeaders.push(_user);
            _reorderStreakLeaderboard(streakLeaders.length - 1);
        } else {
            // Check if user's streak beats the lowest on leaderboard
            uint256 lowestStreak = userStats[streakLeaders[9]].currentStreak;
            if (userStreak > lowestStreak) {
                streakLeaders[9] = _user;
                _reorderStreakLeaderboard(9);
            }
        }
        
        emit LeaderboardUpdated(_user, "streak");
    }
    
    function _reorderStreakLeaderboard(uint256 _startIndex) internal {
        // Bubble up the user to their correct position
        for (uint256 i = _startIndex; i > 0; i--) {
            uint256 currentStreak = userStats[streakLeaders[i]].currentStreak;
            uint256 previousStreak = userStats[streakLeaders[i-1]].currentStreak;
            
            if (currentStreak > previousStreak) {
                // Swap positions
                address temp = streakLeaders[i];
                streakLeaders[i] = streakLeaders[i-1];
                streakLeaders[i-1] = temp;
            } else {
                break;
            }
        }
    }
    
    function _updateWinningsLeaderboard(address _user) internal {
        uint256 userWinnings = userStats[_user].totalWinnings;
        
        // Similar logic to streak leaderboard but for total winnings
        for (uint256 i = 0; i < winningsLeaders.length; i++) {
            if (winningsLeaders[i] == _user) {
                _reorderWinningsLeaderboard(i);
                return;
            }
        }
        
        if (winningsLeaders.length < 10) {
            winningsLeaders.push(_user);
            _reorderWinningsLeaderboard(winningsLeaders.length - 1);
        } else {
            uint256 lowestWinnings = userStats[winningsLeaders[9]].totalWinnings;
            if (userWinnings > lowestWinnings) {
                winningsLeaders[9] = _user;
                _reorderWinningsLeaderboard(9);
            }
        }
        
        emit LeaderboardUpdated(_user, "winnings");
    }
    
    function _reorderWinningsLeaderboard(uint256 _startIndex) internal {
        for (uint256 i = _startIndex; i > 0; i--) {
            uint256 currentWinnings = userStats[winningsLeaders[i]].totalWinnings;
            uint256 previousWinnings = userStats[winningsLeaders[i-1]].totalWinnings;
            
            if (currentWinnings > previousWinnings) {
                address temp = winningsLeaders[i];
                winningsLeaders[i] = winningsLeaders[i-1];
                winningsLeaders[i-1] = temp;
            } else {
                break;
            }
        }
    }
    
    function _updateAccuracyLeaderboard(address _user) internal {
        UserStats memory stats = userStats[_user];
        
        // Only consider users with at least 5 predictions for accuracy leaderboard
        if (stats.totalPredictions < 5) return;
        
        uint256 userAccuracy = (stats.correctPredictions * BASIS_POINTS) / stats.totalPredictions;
        
        for (uint256 i = 0; i < accuracyLeaders.length; i++) {
            if (accuracyLeaders[i] == _user) {
                _reorderAccuracyLeaderboard(i);
                return;
            }
        }
        
        if (accuracyLeaders.length < 10) {
            accuracyLeaders.push(_user);
            _reorderAccuracyLeaderboard(accuracyLeaders.length - 1);
        } else {
            UserStats memory lowestStats = userStats[accuracyLeaders[9]];
            uint256 lowestAccuracy = (lowestStats.correctPredictions * BASIS_POINTS) / lowestStats.totalPredictions;
            
            if (userAccuracy > lowestAccuracy) {
                accuracyLeaders[9] = _user;
                _reorderAccuracyLeaderboard(9);
            }
        }
        
        emit LeaderboardUpdated(_user, "accuracy");
    }
    
    function _reorderAccuracyLeaderboard(uint256 _startIndex) internal {
        for (uint256 i = _startIndex; i > 0; i--) {
            UserStats memory currentStats = userStats[accuracyLeaders[i]];
            UserStats memory previousStats = userStats[accuracyLeaders[i-1]];
            
            uint256 currentAccuracy = (currentStats.correctPredictions * BASIS_POINTS) / currentStats.totalPredictions;
            uint256 previousAccuracy = (previousStats.correctPredictions * BASIS_POINTS) / previousStats.totalPredictions;
            
            if (currentAccuracy > previousAccuracy) {
                address temp = accuracyLeaders[i];
                accuracyLeaders[i] = accuracyLeaders[i-1];
                accuracyLeaders[i-1] = temp;
            } else {
                break;
            }
        }
    }
    
    // View functions
    function getPrediction(uint256 _predictionId) external view returns (
        uint256 id,
        string memory question,
        string[] memory options,
        uint256 entryFee,
        uint256 prizePool,
        uint256 endTime,
        uint256 resolutionTime,
        bool resolved,
        uint256 winningOption,
        bool active,
        uint256 totalParticipants
    ) {
        Prediction memory pred = predictions[_predictionId];
        return (
            pred.id,
            pred.question,
            pred.options,
            pred.entryFee,
            pred.prizePool,
            pred.endTime,
            pred.resolutionTime,
            pred.resolved,
            pred.winningOption,
            pred.active,
            pred.totalParticipants
        );
    }
    
    function getUserPrediction(uint256 _predictionId, address _user) 
        external 
        view 
        returns (uint256 option, bool claimed, uint256 timestamp) 
    {
        UserPrediction memory userPred = userPredictions[_predictionId][_user];
        return (userPred.option, userPred.claimed, userPred.timestamp);
    }
    
    function getOptionStats(uint256 _predictionId, uint256 _optionIndex) 
        external 
        view 
        returns (uint256 participantCount, uint256 percentage) 
    {
        uint256 count = optionCounts[_predictionId][_optionIndex];
        uint256 total = predictions[_predictionId].totalParticipants;
        
        if (total == 0) {
            return (0, 0);
        }
        
        uint256 percent = (count * BASIS_POINTS) / total;
        return (count, percent);
    }
    
    function getAllOptionStats(uint256 _predictionId) 
        external 
        view 
        returns (uint256[] memory counts, uint256[] memory percentages) 
    {
        Prediction memory pred = predictions[_predictionId];
        uint256 optionCount = pred.options.length;
        
        counts = new uint256[](optionCount);
        percentages = new uint256[](optionCount);
        
        for (uint256 i = 0; i < optionCount; i++) {
            counts[i] = optionCounts[_predictionId][i];
            if (pred.totalParticipants > 0) {
                percentages[i] = (counts[i] * BASIS_POINTS) / pred.totalParticipants;
            }
        }
        
        return (counts, percentages);
    }
    
    function getUserParticipatedPredictions(address _user) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return userParticipatedPredictions[_user];
    }
    
    function calculatePotentialWinnings(uint256 _predictionId) 
        external 
        view 
        returns (uint256[] memory potentialWinnings) 
    {
        Prediction memory pred = predictions[_predictionId];
        uint256 optionCount = pred.options.length;
        
        potentialWinnings = new uint256[](optionCount);
        uint256 totalPrize = pred.prizePool;
        uint256 platformFeeAmount = (totalPrize * platformFee) / BASIS_POINTS;
        uint256 winnersShare = totalPrize - platformFeeAmount;
        
        for (uint256 i = 0; i < optionCount; i++) {
            uint256 winnersCount = optionCounts[_predictionId][i];
            if (winnersCount > 0) {
                potentialWinnings[i] = winnersShare / winnersCount;
            }
        }
        
        return potentialWinnings;
    }
    
    // Leaderboard view functions
    function getStreakLeaderboard() external view returns (
        address[] memory users,
        uint256[] memory streaks,
        uint256[] memory longestStreaks
    ) {
        uint256 length = streakLeaders.length;
        users = new address[](length);
        streaks = new uint256[](length);
        longestStreaks = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            users[i] = streakLeaders[i];
            streaks[i] = userStats[streakLeaders[i]].currentStreak;
            longestStreaks[i] = userStats[streakLeaders[i]].longestStreak;
        }
        
        return (users, streaks, longestStreaks);
    }
    
    function getWinningsLeaderboard() external view returns (
        address[] memory users,
        uint256[] memory totalWinnings,
        uint256[] memory currentStreaks
    ) {
        uint256 length = winningsLeaders.length;
        users = new address[](length);
        totalWinnings = new uint256[](length);
        currentStreaks = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            users[i] = winningsLeaders[i];
            totalWinnings[i] = userStats[winningsLeaders[i]].totalWinnings;
            currentStreaks[i] = userStats[winningsLeaders[i]].currentStreak;
        }
        
        return (users, totalWinnings, currentStreaks);
    }
    
    function getAccuracyLeaderboard() external view returns (
        address[] memory users,
        uint256[] memory accuracyPercentages,
        uint256[] memory totalPredictions
    ) {
        uint256 length = accuracyLeaders.length;
        users = new address[](length);
        accuracyPercentages = new uint256[](length);
        totalPredictions = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            users[i] = accuracyLeaders[i];
            UserStats memory stats = userStats[accuracyLeaders[i]];
            accuracyPercentages[i] = (stats.correctPredictions * BASIS_POINTS) / stats.totalPredictions;
            totalPredictions[i] = stats.totalPredictions;
        }
        
        return (users, accuracyPercentages, totalPredictions);
    }
    
    function getUserStats(address _user) external view returns (
        uint256 totalPredictions,
        uint256 correctPredictions,
        uint256 currentStreak,
        uint256 longestStreak,
        uint256 totalWinnings,
        uint256 accuracyPercentage,
        bool hasStreakSaver
    ) {
        UserStats memory stats = userStats[_user];
        uint256 accuracy = stats.totalPredictions > 0 ? 
            (stats.correctPredictions * BASIS_POINTS) / stats.totalPredictions : 0;
            
        return (
            stats.totalPredictions,
            stats.correctPredictions,
            stats.currentStreak,
            stats.longestStreak,
            stats.totalWinnings,
            accuracy,
            stats.hasStreakSaver
        );
    }
    
    function getStreakMultiplier(address _user) external view returns (uint256) {
        return _calculateStreakMultiplier(_user);
    }
    
    function getUserRank(address _user, string memory _leaderboardType) external view returns (uint256) {
        if (keccak256(bytes(_leaderboardType)) == keccak256(bytes("streak"))) {
            for (uint256 i = 0; i < streakLeaders.length; i++) {
                if (streakLeaders[i] == _user) return i + 1;
            }
        } else if (keccak256(bytes(_leaderboardType)) == keccak256(bytes("winnings"))) {
            for (uint256 i = 0; i < winningsLeaders.length; i++) {
                if (winningsLeaders[i] == _user) return i + 1;
            }
        } else if (keccak256(bytes(_leaderboardType)) == keccak256(bytes("accuracy"))) {
            for (uint256 i = 0; i < accuracyLeaders.length; i++) {
                if (accuracyLeaders[i] == _user) return i + 1;
            }
        }
        return 0; // Not ranked
    }
    
    // Admin functions
    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 2000, "Fee too high"); // Max 20%
        platformFee = _fee;
    }
    
    function setStreakSaverPrice(uint256 _price) external onlyOwner {
        streakSaverPrice = _price;
    }
    
    function withdrawPlatformFees() external onlyOwner {
        // Calculate total platform fees earned
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
    
    function pausePrediction(uint256 _predictionId) external onlyOwner {
        predictions[_predictionId].active = false;
    }
    
    function unpausePrediction(uint256 _predictionId) external onlyOwner {
        predictions[_predictionId].active = true;
    }
    
    // Emergency function to resolve stuck predictions
    function emergencyResolve(uint256 _predictionId, uint256 _winningOption) 
        external 
        onlyOwner 
    {
        require(block.timestamp > predictions[_predictionId].resolutionTime + 7 days, 
                "Use regular resolve function");
        
        Prediction storage prediction = predictions[_predictionId];
        require(!prediction.resolved, "Already resolved");
        
        prediction.resolved = true;
        prediction.winningOption = _winningOption;
        
        emit PredictionResolved(
            _predictionId, 
            _winningOption, 
            prediction.options[_winningOption],
            optionCounts[_predictionId][_winningOption]
        );
    }
}