import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqData = [
  {
    question: "What is Crypto-X?",
    answer: "Crypto-X is a unified, secure platform that connects a growing ecosystem of specialized blockchains (parachains). It allows users to trade, store, and manage their digital assets efficiently."
  },
  {
    question: "How do I start trading?",
    answer: "To start trading, you first need to create an account, complete the KYC verification, deposit funds into your wallet, and then navigate to the 'Markets' or 'Trading' section to place your orders."
  },
  {
    question: "Is my crypto safe on this platform?",
    answer: "Yes, we implement enterprise-grade security protocols, including cold storage for the majority of funds, two-factor authentication (2FA), and regular security audits to ensure your assets are protected."
  },
  {
    question: "What are the fees for trading?",
    answer: "Our fee structure is tiered based on your 30-day trading volume. Standard maker/taker fees start at 0.1% and can go as low as 0.02% for high-volume traders."
  },
  {
    question: "How long do withdrawals take?",
    answer: "Most cryptocurrency withdrawals are processed automatically and take only a few minutes depending on network congestion. Fiat withdrawals typically take 1-3 business days."
  }
];

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#121620] text-white relative font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <nav className="max-w-7xl mx-auto px-6 py-8 relative z-20 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          <span className="font-bold tracking-wide">Back to Home</span>
        </div>
        <div className="font-bold text-xl tracking-wide uppercase">
          CRYPTO-X FAQ
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="hidden sm:inline-flex text-white/70 font-bold rounded-xl px-4 py-2.5 text-sm hover:text-white hover:bg-white/5 transition-colors">
            Log In
          </button>
          <button onClick={() => navigate('/register')} className="bg-primary text-black font-bold rounded-xl px-5 py-2.5 text-sm hover:bg-primary/90 transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-white/50 text-sm">
            Everything you need to know about the Crypto-X platform and ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className={`border border-white/10 rounded-xl overflow-hidden transition-colors ${openIndex === index ? 'bg-[#1a1f2e] border-primary/50' : 'bg-[#090b14] hover:bg-[#1a1f2e]'}`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-lg">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-white/50 flex-shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`px-6 pb-6 text-white/60 text-sm leading-relaxed ${openIndex === index ? 'block' : 'hidden'}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-white/50 text-sm">
          Still have questions? <a href="#" className="text-primary hover:underline">Contact our support team</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
