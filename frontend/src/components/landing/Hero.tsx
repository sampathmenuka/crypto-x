import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-20 pb-16 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700 relative">
            <div className="text-primary text-sm font-bold tracking-widest uppercase mb-4">
              KEEP YOUR MONEY SAFE !
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-[1.1] text-white">
              Best crypto <br />
              <span className="text-primary">investing platform</span> <br />
              <span className="text-white/80">for your future.</span>
            </h1>
            
            <div className="flex items-center gap-6 mb-12">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#121620] bg-zinc-800 z-50" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)', backgroundSize: 'cover' }}></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#121620] bg-zinc-800 z-40" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=2)', backgroundSize: 'cover' }}></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#121620] bg-zinc-800 z-30" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=3)', backgroundSize: 'cover' }}></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#121620] bg-zinc-800 z-20" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=4)', backgroundSize: 'cover' }}></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#121620] bg-zinc-800 z-10" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=5)', backgroundSize: 'cover' }}></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#121620] bg-primary group-hover:bg-primary/90 flex items-center justify-center text-black font-bold text-xs z-0 cursor-pointer" onClick={() => navigate('/register')}>
                  +
                </div>
              </div>
              <div>
                <div className="text-white font-bold text-lg">168K +</div>
                <div className="text-[13px] text-white/50">Realtime Users</div>
              </div>
            </div>

            <div className="flex items-start gap-6 max-w-lg border-t border-white/10 pt-8">
              <div className="w-14 h-14 rounded-full border border-primary text-primary flex items-center justify-center shrink-0">
                <ArrowUpRight size={24} />
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Crypto-X unites and secures a growing ecosystem of specialized blockchains called parachains. Apps and services on Crypto-X can.
              </p>
            </div>
          </div>

          {/* Right Visual Content (Floating Phones) */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 h-[600px] w-full hidden md:block">
            {/* Background glowing line */}
            <svg className="absolute -left-10 top-0 w-[120%] h-full text-primary opacity-30 z-0 pointer-events-none" viewBox="0 0 400 400" fill="none">
              <path d="M50 350 C 150 150, 250 300, 350 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5,5"/>
            </svg>
            
            {/* Phone 1 (Back/Bottom, Tilted Right) */}
            <div className="absolute right-0 top-40 rotate-[15deg] w-[260px] h-[520px] rounded-[3rem] bg-[#1a1f2e] border-8 border-[#0B0F19] shadow-2xl flex flex-col overflow-hidden z-10 shadow-primary/10">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#0B0F19] rounded-b-3xl w-1/2 mx-auto z-20"></div>
              
              <div className="p-6 pt-10 flex-1 flex flex-col">
                <div className="flex justify-between items-center text-white/50 mb-6 text-xs">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span className="w-4 h-3 bg-white/50 rounded-sm"></span>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[#2a3040] rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg">₿</div>
                  <div className="text-xl font-bold text-white">0.4012 BTC</div>
                  <div className="text-primary text-sm">+1.25%</div>
                </div>
                
                <svg className="w-full h-32 text-primary opacity-50" viewBox="0 0 100 50" preserveAspectRatio="none" fill="none">
                   <path d="M0 40 L20 30 L40 45 L60 20 L80 25 L100 10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                
                <div className="mt-auto space-y-4">
                  <div className="h-16 rounded-2xl bg-[#2a3040] p-4"></div>
                  <div className="h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">Buy</div>
                </div>
              </div>
            </div>

            {/* Phone 2 (Front, Tilted Left) */}
            <div className="absolute left-10 top-0 -rotate-[15deg] w-[260px] h-[520px] rounded-[3rem] bg-[#1a1f2e] border-8 border-[#0B0F19] shadow-2xl flex flex-col overflow-hidden z-20 shadow-primary/20">
               {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#0B0F19] rounded-b-3xl w-1/2 mx-auto z-20"></div>
              <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-primary animate-pulse"></div>

              <div className="p-6 pt-10 flex-1 flex flex-col">
                <div className="text-center mb-8 mt-4">
                  <div className="w-16 h-16 bg-[#2a3040] rounded-full mx-auto mb-4 border-2 border-white/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-white/50"></div>
                  </div>
                  <div className="text-white/50 text-sm mb-1">Total Balance</div>
                  <div className="text-3xl font-bold text-white">9.872098 ETH</div>
                </div>

                <div className="flex gap-2 mb-8">
                  <div className="flex-1 bg-[#2a3040] h-10 rounded-lg flex items-center justify-center text-white/70 text-sm">Send</div>
                  <div className="flex-1 bg-[#2a3040] h-10 rounded-lg flex items-center justify-center text-white/70 text-sm">Receive</div>
                </div>

                <div className="flex-1 relative">
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
                  <svg className="w-full h-full text-primary" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                     <path d="M0 80 L10 60 L20 70 L30 40 L40 50 L50 20 L60 30 L70 10 L80 30 L90 20 L100 0" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                
                <div className="bg-[#2a3040] rounded-2xl p-4 mt-4 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-white/40">Earnings</div>
                    <div className="text-white font-bold">$1,123.45</div>
                  </div>
                  <div className="text-primary text-sm">+8.4%</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
