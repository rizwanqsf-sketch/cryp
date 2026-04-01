import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const handlePromoSubmit = () => {
    if (promoCode.toUpperCase() === 'AWAKERFREE') {
      setPromoMessage('Success! Free Pro access granted.');
      setTimeout(() => window.location.href = '/dashboard?success=true', 2000);
    } else {
      setPromoMessage('Invalid promo code.');
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '0',
      features: ['Basic Market Dashboard', 'Up to 3 Active Alerts', 'Standard Charting', 'Community Support'],
      highlight: false,
    },
    {
      name: 'Pro',
      price: billing === 'monthly' ? '49' : '39',
      features: ['Advanced Real-Time Feed', 'Unlimited Smart Alerts', 'DeepSeek AI Analysis (100/mo)', 'Priority Support', 'Webhook Integrations'],
      highlight: true,
    },
    {
      name: 'Premium',
      price: billing === 'monthly' ? '129' : '99',
      features: ['Institutional Liquidity Data', 'Unlimited AI Analysis', 'API Access', '1-on-1 Trading Consultant', 'Custom Strategy Builder'],
      highlight: false,
    }
  ];

  const handlePayment = (plan) => {
    if (plan.name === 'Free') return;
    alert(`To subscribe to the ${plan.name} plan, please contact us at rizwan.qsf@gmail.com or apply a promo code below.`);
  };

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col items-center gap-12 py-10">
      
      <div className="text-center">
        <h1 className="text-5xl font-bold font-heading text-white mb-4">Subscription Plans</h1>
        <p className="text-textMuted text-lg max-w-2xl mb-8">Upgrade to Awaker Pro to unlock institutional-level AI pattern analysis and unlimited high-frequency smart alerts.</p>
        
        {/* Toggle */}
        <div className="bg-surface/50 p-1 rounded-full inline-flex border border-white/10">
          <button 
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition ${billing === 'monthly' ? 'bg-primary text-background' : 'text-textMuted hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition ${billing === 'yearly' ? 'bg-primary text-background' : 'text-textMuted hover:text-white'}`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, i) => (
          <div key={i} className={`glass-card p-8 flex flex-col ${plan.highlight ? 'border-primary/50 shadow-[0_0_30px_rgba(0,209,255,0.15)] relative scale-105 z-10' : 'border-white/10'}`}>
            {plan.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-blue-500 text-white font-bold text-xs uppercase tracking-widest py-1 px-4 rounded-full">Most Popular</div>}
            
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="mb-6 flex items-end">
              <span className="text-5xl font-heading font-bold text-white">${plan.price}</span>
              <span className="text-textMuted mb-2 ml-1">/mo</span>
            </div>
            
            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex flex-start gap-3">
                  <Check size={18} className={plan.highlight ? 'text-primary' : 'text-white/40'} />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handlePayment(plan)}
              className={`w-full py-4 rounded-full font-bold transition ${plan.highlight ? 'bg-primary text-background hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Promo Code Section */}
      <div className="flex flex-col items-center mt-[-10px] w-full sm:w-1/3">
        <h4 className="text-white font-bold mb-2">Have a Promo Code?</h4>
        <div className="flex w-full">
          <input 
            type="text" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-surface border border-white/10 rounded-l-lg p-3 text-white focus:outline-none" 
            placeholder="Enter code" 
          />
          <button onClick={handlePromoSubmit} className="bg-primary text-background font-bold px-6 rounded-r-lg hover:bg-primary/90 transition">
            Apply
          </button>
        </div>
        {promoMessage && <p className={`mt-2 text-sm font-bold ${promoMessage.includes('Success') ? 'text-secondary' : 'text-error'}`}>{promoMessage}</p>}
      </div>

      <div className="text-center mt-6 p-8 glass-panel w-full sm:w-2/3">
        <h3 className="font-heading text-xl font-bold text-white mb-3">Need Help Subscribing?</h3>
        <p className="text-textMuted text-sm mb-4">Contact us and we'll set up your account manually or via promo code.</p>
        <a
          href="mailto:rizwan.qsf@gmail.com"
          className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition"
        >
          <Mail size={18} /> Contact to Subscribe
        </a>
      </div>

    </div>
  );
}

export default Pricing;
