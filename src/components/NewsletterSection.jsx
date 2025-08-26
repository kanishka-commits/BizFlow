import { useState, useEffect } from 'react'
import { ArrowRight, Mail, CheckCircle, AlertCircle, Sparkles, Zap } from 'lucide-react'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')
  const [registeredEmails, setRegisteredEmails] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState([])

  // Generate floating particles for background animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2,
        size: 2 + Math.random() * 4
      }))
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address (e.g. user@gmail.com).')
      return
    }

    if (registeredEmails.includes(email.toLowerCase())) {
      setError('⚠ This email is already registered.')
      return
    }

    setRegisteredEmails([...registeredEmails, email.toLowerCase()])
    setError('')
    console.log('Email submitted:', email)

    setShowPopup(true)
    setEmail('')

    setTimeout(() => setShowPopup(false), 4000)
  }

  return (
    <section id="newsletter" className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rotate-45 rounded-lg"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 border border-white/20 rotate-12 rounded-full"></div>
          <div className="absolute top-1/2 right-32 w-16 h-16 border-2 border-white/20 rotate-45"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="text-white max-w-2xl text-center lg:text-left">
              {/* Icon and badge */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl sm:rounded-2xl shadow-lg">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                    <span className="text-xs sm:text-sm font-medium text-purple-200">Newsletter</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                Stay in the loop
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Get exclusive updates, premium recipes, and be the first to know about our 
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> delicious offerings</span>
              </p>

              {/* Features list */}
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
                {['🍕 Exclusive recipes', '⚡ Fast delivery', '🎯 Personalized offers'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Email Form */}
            <div className="w-full lg:w-auto lg:min-w-[400px]">
              <div className="relative">
                <div className="relative group">
                  {/* Glowing border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative flex flex-col sm:flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        aria-label="Email address"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
                      />
                      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-30">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="relative group/btn mt-3 sm:mt-0 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3 text-lg overflow-hidden"
                    >
                      {/* Button background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      
                      <span className="relative z-10 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Subscribe
                      </span>
                      
                      <ArrowRight 
                        className={`relative z-10 w-5 h-5 transition-all duration-300 ${
                          isHovered ? 'translate-x-1 scale-110' : ''
                        }`} 
                      />
                      
                      {/* Ripple effect */}
                      <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover/btn:scale-100 transition-transform duration-500 ease-out"></div>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="relative mt-4 min-h-[2rem]">
                  {error && (
                    <div className="absolute inset-x-0 flex items-center justify-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg border border-red-400/50 animate-in slide-in-from-top-2 duration-300">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{error}</span>
                    </div>
                  )}

                  {showPopup && !error && (
                    <div className="absolute inset-x-0 flex items-center justify-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg border border-emerald-400/50 animate-in slide-in-from-top-2 duration-300">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">🎉 Welcome to our community!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>No spam, ever</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection