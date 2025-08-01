'use client'

import React, { useEffect, useState } from 'react'

interface ParticleType {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

export default function BasenusPage(): JSX.Element {
  const [particles, setParticles] = useState<ParticleType[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Initialize particles for background effect
    const newParticles: ParticleType[] = []
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      })
    }
    setParticles(newParticles)

    // Animate particles
    const animateParticles = (): void => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight
      })))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Contract address copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const contractAddress = "0x1234567890abcdef1234567890abcdef12345678"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              animation: `twinkle 3s ease-in-out infinite ${index * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-400">BASENUS</div>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#tokenomics" className="hover:text-blue-400 transition-colors">Tokenomics</a>
          <a href="#roadmap" className="hover:text-blue-400 transition-colors">Roadmap</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Base Planet */}
          <div className="mb-12 relative flex justify-center">
            <div className="relative">
              {/* Planet Core */}
              <div 
                className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-radial from-blue-400 via-blue-500 to-blue-700 shadow-2xl transition-all duration-1000 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{
                  boxShadow: '0 0 100px rgba(59, 130, 246, 0.5), inset 0 0 50px rgba(37, 99, 235, 0.3)',
                  animation: 'planetRotate 20s linear infinite, planetGlow 3s ease-in-out infinite alternate'
                }}
              >
                {/* Planet Rings */}
                <div 
                  className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-30"
                  style={{
                    transform: 'scale(1.2) rotateX(60deg)',
                    animation: 'ringRotate 15s linear infinite'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full border border-blue-200 opacity-20"
                  style={{
                    transform: 'scale(1.4) rotateX(60deg)',
                    animation: 'ringRotate 25s linear infinite reverse'
                  }}
                />
              </div>
              
              {/* Orbital Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-8" />
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            BASENUS
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 text-gray-300 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            The Next Frontier in DeFi Innovation on Base Network
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              Buy BASENUS
            </button>
            <button 
              onClick={() => copyToClipboard(contractAddress)}
              className="px-8 py-4 border border-blue-500 rounded-full font-semibold hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Copy Contract
            </button>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center space-x-6 transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://t.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.58-.896 5.728-1.277 7.583-.161.785-.48 1.048-.789 1.073-.669.061-1.178-.441-1.827-.865-1.013-.66-1.586-1.07-2.569-1.715-1.137-.746-.4-1.156.248-1.825.169-.175 3.126-2.864 3.188-3.105.007-.03.014-.142-.055-.2-.07-.059-.174-.039-.249-.023-.106.023-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.12.098.153.228.169.32.016.092.036.302.02.467z"/>
              </svg>
            </a>
            <a 
              href="https://dexscreener.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.5 14.5c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5-4.5-2.01-4.5-4.5zm4.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            About Basenus
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-900/20 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Base Powered</h3>
              <p className="text-gray-300">Built on Base network for lightning-fast transactions and minimal fees</p>
            </div>

            <div className="bg-blue-900/20 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure</h3>
              <p className="text-gray-300">Audited smart contracts ensuring maximum security for all holders</p>
            </div>

            <div className="bg-blue-900/20 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Driven</h3>
              <p className="text-gray-300">Governed by the community, for the community with transparent governance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative z-10 py-20 px-6 bg-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Tokenomics
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/30">
              <h3 className="text-3xl font-bold mb-4 text-blue-300">Total Supply</h3>
              <p className="text-4xl font-bold text-white">1,000,000,000</p>
              <p className="text-gray-300 mt-2">BASENUS Tokens</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/30">
              <h3 className="text-3xl font-bold mb-4 text-blue-300">Initial Liquidity</h3>
              <p className="text-4xl font-bold text-white">95%</p>
              <p className="text-gray-300 mt-2">Locked Forever</p>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-blue-300">Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-gray-300">Liquidity Pool</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">3%</div>
                <div className="text-gray-300">Development</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">2%</div>
                <div className="text-gray-300">Marketing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Roadmap
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="bg-blue-900/20 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20 flex-1">
                <h3 className="text-xl font-bold mb-2 text-blue-300">Launch Phase</h3>
                <p className="text-gray-300">Token deployment on Base network and initial liquidity provision</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="bg-blue-900/20 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20 flex-1">
                <h3 className="text-xl font-bold mb-2 text-blue-300">Community Building</h3>
                <p className="text-gray-300">Growing our community across social platforms and establishing governance</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="bg-blue-900/20 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20 flex-1">
                <h3 className="text-xl font-bold mb-2 text-blue-300">DeFi Integration</h3>
                <p className="text-gray-300">Integration with major DeFi protocols and yield farming opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl font-bold text-blue-400 mb-4">BASENUS</div>
          <p className="text-gray-400 mb-6">The Future of DeFi on Base</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              Twitter
            </a>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              Telegram
            </a>
            <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              DexScreener
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2024 Basenus. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes planetRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes planetGlow {
          0% { box-shadow: 0 0 100px rgba(59, 130, 246, 0.5), inset 0 0 50px rgba(37, 99, 235, 0.3); }
          100% { box-shadow: 0 0 150px rgba(59, 130, 246, 0.7), inset 0 0 80px rgba(37, 99, 235, 0.5); }
        }
        
        @keyframes ringRotate {
          from { transform: scale(1.2) rotateX(60deg) rotateZ(0deg); }
          to { transform: scale(1.2) rotateX(60deg) rotateZ(360deg); }
        }
