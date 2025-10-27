interface PricingCardProps {
  planName: string;
  price: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  billingPeriod?: string;
}

export default function PricingCard({ 
  planName, 
  price, 
  features, 
  ctaText, 
  isPopular = false,
  billingPeriod = "month"
}: PricingCardProps) {
  return (
    <div className={`relative rounded-2xl p-8 ${
      isPopular 
        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-500 shadow-xl' 
        : 'bg-white border border-gray-200 shadow-lg'
    } hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-2 ${
          isPopular ? 'text-blue-900' : 'text-gray-900'
        }`}>
          {planName}
        </h3>
        
        <div className="mb-6">
          <span className={`text-5xl font-bold ${
            isPopular ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {price}
          </span>
          <span className="text-gray-500 ml-1">
            /{billingPeriod}
          </span>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                  isPopular ? 'text-blue-500' : 'text-green-500'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span className="text-gray-700 text-left">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
          isPopular
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}>
          {ctaText}
        </button>
      </div>
    </div>
  );
}
