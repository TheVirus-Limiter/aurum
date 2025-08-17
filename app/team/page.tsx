export default function TeamPage() {
  const teamMembers = [
    {
      name: "Rehan Raj",
      role: "Co-Founder & CEO",
      bio: "Junior at Lutheran High School with a passion for innovation and entrepreneurship. Member of varsity robotics team and varsity soccer. Currently fundraising $50,000 for the Leukemia & Lymphoma Society to support blood cancer research.",
      image: "/images/rehan-raj.png",
    },
    {
      name: "Ben Storandt",
      role: "Co-Founder & COO",
      bio: "Senior at Lutheran High School with expertise in technology and product development. Member of varsity robotics team and varsity soccer. Currently fundraising $50,000 for the Leukemia & Lymphoma Society to support blood cancer research.",
      image: "/images/ben-storandt.png",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/">
                <img src="/images/aurum-logo.png" alt="Aurum Sleep" className="h-20 w-auto" />
              </a>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/#products" className="text-slate-300 hover:text-white transition-colors font-light">
                Products
              </a>
              <a href="/#customize" className="text-slate-300 hover:text-white transition-colors font-light">
                Find Your Aurum
              </a>
              <a href="/#faq" className="text-slate-300 hover:text-white transition-colors font-light">
                FAQ
              </a>
              <a
                href="/#waitlist-form"
                className="pill-button bg-transparent border border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-slate-900 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full"
              >
                Join Waitlist
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're passionate high schoolers with a vision to build something that could change the lives of so many.
            Through our shared experiences in robotics, athletics, and community service, we've learned that innovation
            comes from dedication, teamwork, and the drive to make a real difference in the world.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl p-8 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-slate-600/30 group-hover:ring-slate-500/50 transition-all duration-300">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-slate-400 font-medium mb-4">{member.role}</p>
                  <p className="text-slate-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
            Join Our Mission
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Ready to experience the future of sleep? Join thousands on our waitlist and be the first to know when Aurum
            Sleep launches.
          </p>
          <a
            href="/#waitlist-form"
            className="inline-block pill-button bg-slate-400 text-slate-900 hover:bg-slate-300 px-12 py-4 text-lg font-medium transition-all duration-300 rounded-full"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/images/aurum-logo.png" alt="Aurum Sleep" className="h-16 w-auto opacity-80" />
            </div>

            <div className="flex gap-8 text-slate-400">
              <a href="/" className="hover:text-slate-300 transition-colors font-light">
                Home
              </a>
              <a href="/#faq" className="hover:text-slate-300 transition-colors font-light">
                FAQ
              </a>
              <a href="mailto:hello@aurumsleep.co" className="hover:text-slate-300 transition-colors font-light">
                Contact
              </a>
              <a href="/team" className="hover:text-slate-300 transition-colors font-light">
                Our Team
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
