import Link from 'next/link';
import { Leaf, Heart, BookOpen, AlertCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Saving Lives, Building Futures
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Empowering Communities in Eastern Equatoria State
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="bg-accent hover:bg-orange-500 text-white font-bold py-3 px-8 rounded transition-colors"
              >
                Donate Now
              </Link>
              <Link
                href="/get-involved#partner"
                className="bg-primary hover:bg-green-700 text-white font-bold py-3 px-8 rounded transition-colors"
              >
                Partner With Us
              </Link>
              <Link
                href="/get-involved#gbv-report"
                className="bg-secondary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition-colors"
              >
                Report GBV Safely
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">About LISS</h2>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Lifeline Initiative – South Sudan is a non-profit organization dedicated to improving the lives of vulnerable communities through Food Security, Health, Education, and GBV Prevention.
            </p>
            <Link
              href="/about"
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded inline-block transition-colors"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Core Programs</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We work across four strategic areas to create lasting change
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                slug: 'food-security',
                title: 'Food Security & Climate Resilience',
                icon: Leaf,
              },
              {
                slug: 'health',
                title: 'Community Health & Nutrition',
                icon: Heart,
              },
              {
                slug: 'education',
                title: 'Education & Skills Training',
                icon: BookOpen,
              },
              {
                slug: 'gbv',
                title: 'GBV Response & Prevention',
                icon: AlertCircle,
              },
            ].map((program) => {
              const Icon = program.icon;
              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{program.title}</h3>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/programs"
              className="bg-secondary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded transition-colors"
            >
              Explore Our Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '25,000+', label: 'Households Supported', color: 'primary' },
              { number: '15,500', label: 'Children Educated', color: 'secondary' },
              { number: '10,000+', label: 'GBV Survivors Assisted', color: 'accent' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-8 text-white text-center ${
                  stat.color === 'primary'
                    ? 'bg-primary'
                    : stat.color === 'secondary'
                    ? 'bg-secondary'
                    : 'bg-accent'
                }`}
              >
                <div className="text-5xl font-bold mb-3">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded transition-colors"
            >
              See Our Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 md:py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Get Involved</h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Join us in our mission to save lives and build futures. Choose the way that works best for you.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
              <p className="mb-6 text-blue-100">Share your skills and time to help communities in need.</p>
              <Link
                href="/get-involved#volunteer"
                className="bg-accent hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded inline-block transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4">Partner With Us</h3>
              <p className="mb-6 text-blue-100">Work with us on long-term initiatives to create lasting change.</p>
              <Link
                href="/get-involved#partner"
                className="bg-primary hover:bg-green-700 text-white font-semibold py-2 px-6 rounded inline-block transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💖</div>
              <h3 className="text-2xl font-bold mb-4">Donate Today</h3>
              <p className="mb-6 text-blue-100">Your financial support enables us to expand our programs.</p>
              <Link
                href="/donate"
                className="bg-accent hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded inline-block transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Every contribution, no matter how small, helps us continue our mission to save lives and build futures.
          </p>
          <Link
            href="/donate"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded text-lg transition-colors inline-block"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}
