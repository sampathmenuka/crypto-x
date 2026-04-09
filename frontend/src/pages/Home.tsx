import React from 'react';
import Hero from '../components/landing/Hero';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#121620] text-white relative font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Top Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-8 relative z-20 flex justify-between items-center">
        <div className="flex items-center gap-1 font-bold text-2xl tracking-wide uppercase">
          CRYPTO-X
        </div>
        <div className="hidden md:flex gap-10 text-sm text-white/60 font-medium">
          <a href="#" className="hover:text-primary transition-colors text-white">Home</a>
          <a href="#" className="hover:text-primary transition-colors">Services</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">What's new?</a>
        </div>
        <button onClick={() => navigate('/markets')} className="bg-primary text-black font-bold rounded-xl px-6 py-2.5 text-sm hover:bg-primary/90 transition-colors">
          Explore now
        </button>
      </nav>

      <Hero />
      
      {/* Services Section Hexagon Layout */}
      <section className="relative z-10 py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ecosystem <span className="text-primary">Overview</span>
            </h2>
            <p className="text-white/50 text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore our full suite of products and services designed to support your cryptocurrency journey from end to end.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
            {/* Top Row */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 z-10">
              {/* Card 1: PRODUCTS */}
              <div className="relative w-[240px] md:w-[280px] h-[277px] md:h-[323px] group overflow-hidden bg-[#090b14]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&q=80")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-[#090b14]/50"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center justify-end h-full pb-12">
                  <h3 className="text-lg md:text-xl font-bold tracking-widest text-white transition-all duration-300 group-hover:-translate-y-4">PRODUCTS</h3>
                  <p className="text-sm md:text-xs text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-16 px-4">Advanced trading tools and multi-asset wallet solutions.</p>
                  <button onClick={() => navigate('/markets')} className="border border-white/30 text-white text-xs font-bold px-5 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-wider backdrop-blur-sm absolute bottom-6 opacity-0 group-hover:opacity-100">
                    Learn More
                  </button>
                  {/* Default static button (fades out on hover) */}
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 uppercase tracking-wider absolute bottom-6 group-hover:opacity-0 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Card 2: SERVICES */}
              <div className="relative w-[240px] md:w-[280px] h-[277px] md:h-[323px] group overflow-hidden bg-[#090b14]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-[#090b14]/50"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center justify-end h-full pb-12">
                  <h3 className="text-lg md:text-xl font-bold tracking-widest text-white transition-all duration-300 group-hover:-translate-y-4">SERVICES</h3>
                  <p className="text-sm md:text-xs text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-16 px-4">Staking, OTC desk, and 24/7 dedicated support.</p>
                  <button onClick={() => navigate('/register')} className="border border-white/30 text-white text-xs font-bold px-5 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-wider backdrop-blur-sm absolute bottom-6 opacity-0 group-hover:opacity-100">
                    Learn More
                  </button>
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 uppercase tracking-wider absolute bottom-6 group-hover:opacity-0 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Card 3: MARKETS */}
              <div className="relative w-[240px] md:w-[280px] h-[277px] md:h-[323px] group overflow-hidden bg-[#090b14]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-[#090b14]/50"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center justify-end h-full pb-12">
                  <h3 className="text-lg md:text-xl font-bold tracking-widest text-white transition-all duration-300 group-hover:-translate-y-4">MARKETS</h3>
                  <p className="text-sm md:text-xs text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-16 px-4">Real-time market data and deep liquidity pools.</p>
                  <button onClick={() => navigate('/markets')} className="border border-white/30 text-white text-xs font-bold px-5 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-wider backdrop-blur-sm absolute bottom-6 opacity-0 group-hover:opacity-100">
                    Learn More
                  </button>
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 uppercase tracking-wider absolute bottom-6 group-hover:opacity-0 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 -mt-[4rem] md:-mt-[5rem] relative z-0">
              {/* Card 4: CASE STUDIES */}
              <div className="relative w-[240px] md:w-[280px] h-[277px] md:h-[323px] group overflow-hidden bg-[#090b14]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-[#090b14]/50"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center justify-end h-full pb-12">
                  <h3 className="text-lg md:text-xl font-bold tracking-widest text-white transition-all duration-300 group-hover:-translate-y-4">CASE STUDIES</h3>
                  <p className="text-sm md:text-xs text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-16 px-4">Success stories from leading institutional partners.</p>
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-wider backdrop-blur-sm absolute bottom-6 opacity-0 group-hover:opacity-100">
                    Learn More
                  </button>
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 uppercase tracking-wider absolute bottom-6 group-hover:opacity-0 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Card 5: NEWS & EVENTS */}
              <div className="relative w-[240px] md:w-[280px] h-[277px] md:h-[323px] group overflow-hidden bg-[#090b14]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-[#090b14]/50"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center justify-end h-full pb-12">
                  <h3 className="text-lg md:text-xl font-bold tracking-widest text-white transition-all duration-300 group-hover:-translate-y-4">NEWS & EVENTS</h3>
                  <p className="text-sm md:text-xs text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-16 px-4">Keep up with the latest blockchain announcements.</p>
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-wider backdrop-blur-sm absolute bottom-6 opacity-0 group-hover:opacity-100">
                    Learn More
                  </button>
                  <button className="border border-white/30 text-white text-xs font-bold px-5 py-2 uppercase tracking-wider absolute bottom-6 group-hover:opacity-0 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart & CTA Section */}
      <section className="py-24 relative overflow-hidden z-10 border-t border-white/5 mt-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-col items-center justify-center text-center gap-16">
          
          {/* Top Text Content */}
          <div className="relative space-y-6 flex flex-col items-center max-w-2xl">
            <h2 className="text-[40px] leading-[1.2] font-semibold text-white/40">
              <span className="text-white">Trusted</span> <span className="text-primary">platform</span> <br/>
              anytime & anywhere.
            </h2>
            
            <div className="flex justify-center gap-2 text-white">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>

            <p className="text-white/40 text-sm leading-relaxed">
              This is a unites and secures a <strong className="text-white font-normal">growing ecosystem</strong> of specialized blockchains called parachains. Apps and services on Crypto-X can ecosystem of specialized called.
            </p>
            <p className="text-white/40 text-sm leading-relaxed pb-4">
              Crypto-X unites and secures a growing ecosystem of specialized blockchains called parachains. Apps and services.
            </p>

            <div className="flex justify-center gap-6 items-center">
              <button onClick={() => navigate('/markets')} className="bg-primary text-black font-bold rounded-full px-6 py-3 text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                Learn More <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/faq')} className="text-white/60 text-sm font-medium hover:text-white transition-colors">
                Ask question ?
              </button>
            </div>
          </div>

          {/* Bottom Chart Visuals */}
          <div className="relative h-[400px] w-full max-w-3xl">
             {/* Chart Line Path */}
             <svg className="absolute w-full h-[60%] top-20 text-primary opacity-60 pointer-events-none" viewBox="0 0 400 200" fill="none" preserveAspectRatio="none">
               <path d="M0 150 L60 180 L160 50 L200 80 L350 20 C 370 10, 400 40, 400 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             
             {/* Points / Floating Bubbles */}
             <div className="absolute top-[35%] left-[40%] bg-primary w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(var(--primary),0.5)] z-10">Ł</div>
             <div className="absolute top-[80%] left-[10%] bg-[#1a1f2e] w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary font-bold text-sm shadow-[0_0_20px_rgba(var(--primary),0.2)] z-10">₿</div>
             
             {/* Value Tooltips */}
             <div className="absolute top-10 left-0 bg-transparent border-l-2 border-primary pl-4">
                <div className="text-primary font-bold mb-1">| $4,528 USD</div>
                <div className="text-xs text-white/40 max-w-[150px]">Crypto-X unites and secures a grow ecosystem of specialized blockchains.</div>
             </div>

             <div className="absolute top-[50%] right-[10%] bg-[#1a1f2e] border border-white/5 rounded-xl p-4 w-[200px] z-20 shadow-2xl">
                <div className="text-primary font-bold mb-1">| 1,44,528 BTC</div>
                <div className="text-xs text-white/40 mb-2">Crypto-X unites secures a growing ecosystem of specialized blocks.</div>
             </div>

             <div className="absolute bottom-0 left-0 bg-[#1a1f2e] rounded-xl p-4 w-[160px] border border-white/5 z-20">
                <div className="text-xs text-white/40 mb-1">Average Rate</div>
                <div className="text-primary font-bold text-lg mb-1">$4,528 USD</div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-primary">+45.66%</span>
                  <span className="bg-primary text-black px-2 py-0.5 rounded-full font-bold">02 May</span>
                </div>
                <svg className="w-full h-10 mt-2 text-primary opacity-50" viewBox="0 0 100 30" preserveAspectRatio="none" fill="none">
                   <path d="M0 25 L20 15 L40 20 L60 5 L80 15 L100 10" stroke="currentColor" strokeWidth="2"/>
                </svg>
             </div>
          </div>
        </div>
      </section>

      {/* Footer (Minimal) */}
      <footer className="py-12 mt-10 relative z-10 text-white/30 text-center border-t border-white/5">
        <div className="text-sm">
          © 2026 Crypto-X Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
