import React from 'react';
import Hero from '../components/landing/Hero';
import { Shield, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Why Choose Crypto-X?</h2>
            <p className="body-text text-text-secondary max-w-2xl mx-auto">
              Our platform combines institutional-grade security with a seamless user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-primary" />,
                title: 'Military-Grade Security',
                desc: 'Your assets are protected by multi-signature wallets and cold storage.'
              },
              {
                icon: <Zap className="text-primary" />,
                title: 'Ultra-Fast Execution',
                desc: 'Proprietary matching engine capable of handling 100k+ transactions per second.'
              },
              {
                icon: <Globe className="text-primary" />,
                title: 'Global Connectivity',
                desc: 'Access global liquidity pools and trade with users from around the world.'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 glass-card hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="card-title mb-4">{feature.title}</h3>
                <p className="small-text">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-right" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto border-primary/20 bg-primary/5">
            <h2 className="section-title mb-6">Ready to start your journey?</h2>
            <p className="body-text text-text-secondary mb-10">
              Join over 1 million traders and start building your portfolio today.
            </p>
            <button className="btn-primary group">
              Create Account 
              <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-background">X</div>
            <span className="font-display font-bold text-xl tracking-tight">CRYPTO-X</span>
          </div>
          <div className="flex gap-8 text-text-secondary text-sm">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          </div>
          <div className="text-text-secondary text-sm">
            © 2026 Crypto-X Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
