import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - LISS',
  description: 'Get in touch with LISS. We would love to hear from you.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+211 929 328 421',
      href: 'tel:+211929328421',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@liss.org',
      href: 'mailto:info@liss.org',
    },
    {
      icon: MapPin,
      title: 'Office Location',
      value: 'Torit, Eastern Equatoria State, South Sudan',
      href: '#',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      value: 'Mon - Fri: 8:00 AM - 5:00 PM',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Contact Us</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Have questions? We would love to hear from you. Reach out to us today.
        </p>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-lg shadow p-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{method.title}</h3>
                {method.href === 'tel:+211929328421' || method.href === 'mailto:info@liss.org' ? (
                  <a
                    href={method.href}
                    className="text-primary hover:text-primary/80 font-semibold break-words"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-foreground">{method.value}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Form and Info */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-border rounded px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-border rounded px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full border border-border rounded px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Message subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full border border-border rounded px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg shadow p-6">
                <h3 className="font-bold text-foreground mb-3">Partnership Inquiries</h3>
                <p className="text-muted-foreground mb-3">
                  Interested in partnering with LISS? We welcome collaborations with NGOs, government agencies, and private sector organizations.
                </p>
                <a
                  href="mailto:partnerships@liss.org"
                  className="text-primary hover:text-primary/80 font-semibold"
                >
                  partnerships@liss.org
                </a>
              </div>

              <div className="bg-card border border-border rounded-lg shadow p-6">
                <h3 className="font-bold text-foreground mb-3">Volunteer Opportunities</h3>
                <p className="text-muted-foreground mb-3">
                  Want to volunteer? We are always looking for dedicated individuals to support our mission.
                </p>
                <a
                  href="mailto:volunteers@liss.org"
                  className="text-primary hover:text-primary/80 font-semibold"
                >
                  volunteers@liss.org
                </a>
              </div>

              <div className="bg-primary text-primary-foreground rounded-lg shadow p-6">
                <h3 className="font-bold mb-3">GBV Hotline</h3>
                <p className="mb-3">
                  Need help or want to report gender-based violence? Our hotline is available 24/7.
                </p>
                <a
                  href="tel:+211929328421"
                  className="font-bold text-primary-foreground hover:text-primary-foreground/80"
                >
                  +211 929 328 421
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
