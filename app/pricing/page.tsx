import PricingCard from "../ui/components/PricingCard";

export default function PricingPage() {
  const basicFeatures = [
    "Up to 5 team members",
    "10GB storage",
    "Basic analytics",
    "Email support",
    "Core integrations",
    "Mobile app access"
  ];

  const proFeatures = [
    "Up to 25 team members",
    "100GB storage",
    "Advanced analytics & reporting",
    "Priority support",
    "All integrations",
    "Custom workflows",
    "API access",
    "Advanced security features"
  ];

  const enterpriseFeatures = [
    "Unlimited team members",
    "1TB storage",
    "Custom analytics dashboard",
    "24/7 dedicated support",
    "Custom integrations",
    "Advanced automation",
    "Full API access",
    "Enterprise security & compliance",
    "Single sign-on (SSO)",
    "Custom onboarding"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your team. Start free and scale as you grow. 
            No hidden fees, no surprises.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-gray-600">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-0.5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-gray-600">
              Annual 
              <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            planName="Basic"
            price="$29"
            features={basicFeatures}
            ctaText="Start Free Trial"
            billingPeriod="month"
          />
          
          <PricingCard
            planName="Pro"
            price="$89"
            features={proFeatures}
            ctaText="Start Free Trial"
            isPopular={true}
            billingPeriod="month"
          />
          
          <PricingCard
            planName="Enterprise"
            price="$199"
            features={enterpriseFeatures}
            ctaText="Contact Sales"
            billingPeriod="month"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we&apos;ll prorate any charges.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Absolutely! All plans come with a 14-day free trial. No credit card required to get started.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. Your plan will remain active until the end 
                of your billing period.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a custom solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Our Enterprise plan can be customized to fit your specific needs. 
              Get in touch with our sales team to discuss your requirements.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
