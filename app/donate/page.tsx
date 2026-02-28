import { Metadata } from 'next';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donate - LISS',
  description: 'Support LISS and help us continue our mission to improve lives.',
};

export default function DonatePage() {
  const donationOptions = [
    {
      amount: '$10',
      description: 'Provides a meal for a child for a week',
      icon: '🍽️',
    },
    {
      amount: '$25',
      description: 'Supplies educational materials for a student',
      icon: '📚',
    },
    {
      amount: '$50',
      description: 'Provides medical supplies for a health clinic',
      icon: '⚕️',
    },
    {
      amount: '$100',
      description: 'Trains a community health worker',
      icon: '👩‍⚕️',
    },
    {
      amount: '$250',
      description: 'Supports a farm family with seeds and tools',
      icon: '🌾',
    },
    {
      amount: '$500',
      description: 'Provides vocational training for a youth',
      icon: '🎓',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Difference</h1>
          <p className="text-xl text-gray-600">
            Your donation helps us continue our mission to save lives and build futures.
          </p>
        </div>

        {/* Why Donate */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Why Support LISS?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct Impact</h3>
              <p className="text-gray-600">
                Your donations directly reach communities where they are needed most.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">
                We are committed to transparent reporting of how funds are used.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Our programs have helped thousands of lives across South Sudan.
              </p>
            </div>
          </div>
        </div>

        {/* Donation Options */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Your Impact</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {donationOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <div className="text-3xl font-bold text-primary mb-3">{option.amount}</div>
              <p className="text-gray-600 mb-6">{option.description}</p>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded transition-colors">
                Donate
              </button>
            </div>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Amount</h3>
          <p className="text-gray-600 mb-6">
            Give any amount that works for your situation. Every contribution makes a difference.
          </p>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="flex-1 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded transition-colors">
              Donate
            </button>
          </div>
        </div>

        {/* Monthly Giving */}
        <div className="bg-green-50 border-2 border-primary rounded-lg p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💚 Become a Monthly Donor</h3>
          <p className="text-gray-700 mb-6">
            Monthly donations provide stable, predictable support that helps us plan and execute our programs more effectively. Even small monthly gifts create tremendous impact over time.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded transition-colors">
            Set Up Monthly Giving
          </button>
        </div>

        {/* Tax Information */}
        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💼 Tax Information</h3>
          <p className="text-gray-700 mb-4">
            LISS is a registered non-profit organization. Your donation is tax-deductible. Please contact us for receipt and tax documentation.
          </p>
          <Link href="/contact" className="text-primary hover:text-primary/80 font-semibold">
            Contact Us for Tax Information →
          </Link>
        </div>
      </div>
    </div>
  );
}
