# CoreOracle - Decentralized Prediction Market

A modern, full-featured decentralized prediction market built on Core Blockchain where users can make predictions on various future events and earn CORE tokens for accurate predictions.

![CoreOracle Banner](/placeholder.svg?height=400&width=800&query=CoreOracle%20decentralized%20prediction%20market%20banner)

## 🌟 Features

### Core Functionality
- **📊 Prediction Markets** - Create and participate in prediction markets for crypto, sports, finance, and politics
- **💰 CORE Token Rewards** - Earn CORE tokens for accurate predictions
- **🔒 Secure Smart Contracts** - Built on Core Blockchain for transparency and security
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### User Experience
- **🎯 Intuitive Betting Interface** - Easy-to-use betting system with real-time odds
- **📈 Live Market Data** - Real-time market updates and price movements
- **🏆 Leaderboards** - Compete with other users and track your ranking
- **📊 Personal Dashboard** - Track your bets, earnings, and performance
- **🎖️ Achievement System** - Unlock badges and achievements for milestones

### Market Features
- **🔍 Advanced Filtering** - Search and filter markets by category, volume, and time
- **⏰ Real-time Odds** - Dynamic odds that update based on market activity
- **📋 Market Details** - Comprehensive market information and resolution criteria
- **🔄 Market Categories** - Crypto, Sports, Finance, Politics, and more
- **📅 Time-based Markets** - Markets with clear resolution dates and criteria

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/CoreOracle.git
   cd CoreOracle
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

\`\`\`
CoreOracle/
├── app/                          # Next.js App Router
│   ├── dashboard/               # User dashboard pages
│   ├── leaderboard/            # Leaderboard pages
│   ├── markets/                # Market listing and detail pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # Reusable components
│   └── ui/                     # shadcn/ui components
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       └── tabs.tsx
├── lib/                        # Utility functions
│   └── utils.ts               # Class name utilities
├── public/                     # Static assets
├── README.md                   # Project documentation
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#8B5CF6 to #EC4899)
- **Background**: Dark slate (#0F172A, #1E293B)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Typography
- **Font Family**: Inter (system font fallback)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Code**: Monospace font family

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Badges**: Rounded pills for categories and status
- **Forms**: Clean inputs with focus states

## 📱 Pages Overview

### 🏠 Home Page (`/`)
- Hero section with platform introduction
- Featured markets showcase
- Platform statistics
- Call-to-action buttons

### 📊 Markets Page (`/markets`)
- Browse all available prediction markets
- Search and filter functionality
- Market categories and sorting options
- Quick betting interface

### 🎯 Market Detail Page (`/markets/[id]`)
- Detailed market information
- Interactive betting interface
- Recent activity feed
- Market rules and resolution criteria

### 📈 Dashboard Page (`/dashboard`)
- Personal statistics and performance
- Active bets tracking
- Recent activity history
- Achievement system

### 🏆 Leaderboard Page (`/leaderboard`)
- Top predictors by accuracy
- Top earners by volume
- Monthly rewards information
- User rankings and badges

## 🔧 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Styling
- **Tailwind CSS** - For responsive design and utilities
- **CSS Variables** - For theme customization
- **Dark Mode** - Built-in dark theme support


## 🌐 Blockchain Integration

### Core Blockchain Features
- **Smart Contracts** - Secure bet placement and resolution
- **CORE Token** - Native token for betting and rewards
- **Wallet Integration** - MetaMask and Core wallet support
- **Transaction History** - On-chain transaction tracking

### Smart Contract Functions
- \`placeBet(marketId, outcome, amount)\` - Place a prediction bet
- \`resolveMarket(marketId, outcome)\` - Resolve market outcome
- \`claimRewards(marketId)\` - Claim winnings from resolved markets
- \`createMarket(details)\` - Create new prediction markets

## 🎯 User Roles

### 👤 Regular Users
- Browse and search prediction markets
- Place bets on market outcomes
- Track personal performance
- Earn rewards for accurate predictions
- Participate in leaderboards

### 🏗️ Market Creators
- Create new prediction markets
- Set market parameters and resolution criteria
- Earn fees from market activity
- Manage market lifecycle

### ⚖️ Resolvers
- Resolve market outcomes based on real-world data
- Verify resolution criteria
- Handle dispute resolution
- Maintain platform integrity

## 📊 Market Categories

### 💰 Cryptocurrency
- Bitcoin and altcoin price predictions
- DeFi protocol performance
- NFT market trends
- Blockchain adoption metrics

### ⚽ Sports
- Football, basketball, soccer matches
- Tournament winners and outcomes
- Player performance metrics
- Season-long predictions

### 💼 Finance
- Stock market movements
- Economic indicators
- Interest rate changes
- Company earnings

### 🗳️ Politics
- Election outcomes
- Policy decisions
- Approval ratings
- Legislative votes


### Build Commands
\`\`\`bash
# Build for production
npm run build

# Start production server
npm start

## 🤝 Contributing

We welcome contributions to CoreOracle! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (\`git checkout -b feature/amazing-feature\`)
3. **Commit your changes** (\`git commit -m 'Add amazing feature'\`)
4. **Push to the branch** (\`git push origin feature/amazing-feature\`)
5. **Open a Pull Request**


## 🆘 Support

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Core Blockchain Documentation](https://docs.coredao.org)
