import { motion } from 'motion/react';
import { Check, Crown, Sparkles, Zap, Star, Shield, Download, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function PremiumMembership() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      icon: Star,
      gradient: 'from-slate-500/20 to-gray-500/20',
      borderColor: 'border-slate-400/30',
      iconColor: 'text-slate-400',
      features: [
        'Watch with ads',
        '480p quality',
        'Limited catalog',
        '1 device',
        'Standard support',
      ],
      cta: 'Current Plan',
      recommended: false,
    },
    {
      name: 'Premium',
      price: { monthly: 9.99, yearly: 99.99 },
      icon: Crown,
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/40',
      iconColor: 'text-purple-400',
      features: [
        'Ad-free streaming',
        '1080p HD quality',
        'Full catalog access',
        '3 devices',
        'Download episodes',
        'Priority support',
        'MAL & AniList sync',
      ],
      cta: 'Upgrade to Premium',
      recommended: true,
    },
    {
      name: 'Ultimate',
      price: { monthly: 14.99, yearly: 149.99 },
      icon: Sparkles,
      gradient: 'from-yellow-500/20 via-orange-500/20 to-red-500/20',
      borderColor: 'border-yellow-400/40',
      iconColor: 'text-yellow-400',
      features: [
        'Everything in Premium',
        '4K Ultra HD quality',
        'Early access to new releases',
        'Unlimited devices',
        'Watch Together parties',
        'Real-Debrid integration',
        'Custom wallpapers',
        '24/7 VIP support',
      ],
      cta: 'Go Ultimate',
      recommended: false,
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-yellow-500/15 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-purple-950/85 to-slate-950/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative px-8 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-6">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">Unlock Premium Features</span>
          </div>

          <h1 className="text-5xl font-black text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Experience anime streaming like never before with ad-free viewing, HD quality, and exclusive features
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full transition-colors"
            >
              <motion.div
                layout
                className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white font-semibold' : 'text-white/60'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-semibold">
                Save 17%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative backdrop-blur-xl bg-gradient-to-br ${plan.gradient} border-2 ${plan.borderColor} rounded-[32px] p-8 shadow-2xl ${
                plan.recommended ? 'scale-105 z-10' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-gradient-to-r from-purple-500 to-pink-500 border border-white/20 rounded-full px-6 py-2 shadow-lg">
                  <span className="text-white text-sm font-bold">Most Popular</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 bg-white/10 rounded-3xl border ${plan.borderColor}`}>
                  <plan.icon className={`w-8 h-8 ${plan.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">
                    ${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}
                  </span>
                  <span className="text-white/60 text-lg">/month</span>
                </div>
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <p className="text-white/40 text-sm mt-2">
                    ${plan.price.yearly} billed annually
                  </p>
                )}
              </div>

              <Button
                className={`w-full mb-6 rounded-full py-6 text-lg font-semibold ${
                  plan.recommended
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 border border-white/30 text-white'
                }`}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-1 bg-green-500/20 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/90 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-8"
        >
          <h3 className="text-white text-2xl font-bold mb-6 text-center">
            Premium Features at a Glance
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-500/20 rounded-3xl border border-blue-400/30 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Ad-Free</h4>
              <p className="text-white/60 text-sm">Uninterrupted streaming experience</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-purple-500/20 rounded-3xl border border-purple-400/30 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">HD Quality</h4>
              <p className="text-white/60 text-sm">Crystal clear 1080p & 4K streaming</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-green-500/20 rounded-3xl border border-green-400/30 mb-4">
                <Download className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Downloads</h4>
              <p className="text-white/60 text-sm">Watch offline anytime, anywhere</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-pink-500/20 rounded-3xl border border-pink-400/30 mb-4">
                <Users className="w-8 h-8 text-pink-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Watch Together</h4>
              <p className="text-white/60 text-sm">Enjoy anime with friends</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 text-sm">
            All plans include a 7-day free trial. Cancel anytime. No commitments.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
