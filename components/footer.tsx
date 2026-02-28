'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      {/* Get Involved Section */}
      <div className="bg-secondary py-12 border-b border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-2">Get Involved</h3>
              <p className="text-sm text-blue-100">Community Rooted, Locally Led</p>
            </div>
            <div>
              <Link href="/get-involved#volunteer" className="bg-accent hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded inline-block transition-colors">
                Volunteer
              </Link>
            </div>
            <div>
              <Link href="/get-involved#partner" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded inline-block transition-colors">
                Become a Partner
              </Link>
            </div>
            <div>
              <Link href="/donate" className="bg-accent hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded inline-block transition-colors">
                Donate Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            {/* Contact Section */}
            <div>
              <h3 className="font-bold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>
                  <a href="tel:+211929328421" className="hover:text-white transition-colors">
                    📞 +211 929 328 421
                  </a>
                </li>
                <li>
                  <a href="mailto:life@initiative.com" className="hover:text-white transition-colors">
                    ✉️ life@initiative.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-blue-100 hover:text-white transition-colors">
                    Our Programs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Programs */}
            <div>
              <h3 className="font-bold text-white mb-4">Our Programs</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/programs/food-security" className="text-blue-100 hover:text-white transition-colors">
                    Food Security & Climate
                  </Link>
                </li>
                <li>
                  <Link href="/programs/health" className="text-blue-100 hover:text-white transition-colors">
                    Community Health
                  </Link>
                </li>
                <li>
                  <Link href="/programs/education" className="text-blue-100 hover:text-white transition-colors">
                    Education & Skills
                  </Link>
                </li>
                <li>
                  <Link href="/programs/gbv" className="text-blue-100 hover:text-white transition-colors">
                    GBV Response
                  </Link>
                </li>
              </ul>
            </div>

            {/* Additional Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/projects" className="text-blue-100 hover:text-white transition-colors">
                    Project & Impact
                  </Link>
                </li>
                <li>
                  <Link href="/transparency" className="text-blue-100 hover:text-white transition-colors">
                    Transparency
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-blue-600 pt-8 text-center text-sm text-blue-100">
            <p>© 2024 Lifeline Initiative – South Sudan. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
