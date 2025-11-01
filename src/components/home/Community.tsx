import { Users, Activity, Globe } from "lucide-react"

export function Community() {
  const socials = [
    { platform: "Discord", members: "12.5K", icon: Users },
    { platform: "Twitter", followers: "25.3K", icon: Activity },
    { platform: "Telegram", members: "8.9K", icon: Users },
    { platform: "Medium", readers: "15.2K", icon: Globe },
  ]

  return (
    <section className="py-20 px-4 bg-background-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-text-primary mb-4">Join Our Community</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Connect with thousands of predictors worldwide
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {socials.map((social, index) => {
            const Icon = social.icon
            return (
              <div key={index} className="glass-card p-6 text-center hover-lift cursor-pointer">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-text-primary font-bold text-xl mb-1">{social.members}</p>
                <p className="text-text-secondary text-sm">{social.platform}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}