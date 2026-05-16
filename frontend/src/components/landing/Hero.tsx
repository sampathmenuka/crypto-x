import React from 'react';
import { ArrowUpRight, Shield, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap size={14} />
              The Future of Digital Assets
            </span>
            <h1 className="hero-title mb-8 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
              Trade Crypto with <br />
              <span className="text-primary animate-glow">Next-Gen</span> Intelligence
            </h1>
            <p className="body-text text-text-secondary max-w-2xl mx-auto mb-10">
              Experience the world's most advanced cryptocurrency trading platform. 
              Secure, lightning-fast, and designed for the modern Web3 era.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/register')} className="btn-primary flex items-center gap-2 group w-full sm:w-auto">
                Get Started Now
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button onClick={() => navigate('/markets')} className="btn-ghost w-full sm:w-auto">
                View Markets
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 p-8 glass-card animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            {[
              { label: 'Total Volume', value: '$2.4B+' },
              { label: 'Active Users', value: '1.2M+' },
              { label: 'Secured Assets', value: '$850M+' },
              { label: 'Countries', value: '150+' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="small-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
