'use client';

import { Mail, Phone } from 'lucide-react';

const leadershipTeam = [
  {
    id: 1,
    name: 'Dr. John Makuei',
    position: 'Executive Director',
    email: 'john.makuei@liss-southsudan.org',
    phone: '+211 929 328 421',
    bio: 'Healthcare specialist with 15+ years of experience in South Sudan',
  },
  {
    id: 2,
    name: 'Grace Nyabol',
    position: 'Director of Programs',
    email: 'grace.nyabol@liss-southsudan.org',
    phone: '+211 929 328 422',
    bio: 'Development expert focused on community empowerment and education',
  },
  {
    id: 3,
    name: 'Peter Okonkwo',
    position: 'Operations Manager',
    email: 'peter.okonkwo@liss-southsudan.org',
    phone: '+211 929 328 423',
    bio: 'Operations and logistics specialist ensuring program effectiveness',
  },
  {
    id: 4,
    name: 'Sarah Deng',
    position: 'Finance Director',
    email: 'sarah.deng@liss-southsudan.org',
    phone: '+211 929 328 424',
    bio: 'Financial management expert with accountability expertise',
  },
  {
    id: 5,
    name: 'Moses Adut',
    position: 'Health Programs Lead',
    email: 'moses.adut@liss-southsudan.org',
    phone: '+211 929 328 425',
    bio: 'Public health specialist championing maternal and child health',
  },
  {
    id: 6,
    name: 'Amina Hassan',
    position: 'Education Coordinator',
    email: 'amina.hassan@liss-southsudan.org',
    phone: '+211 929 328 426',
    bio: 'Education advocate ensuring quality learning opportunities for all',
  },
  {
    id: 7,
    name: 'David Kur',
    position: 'Community Engagement Officer',
    email: 'david.kur@liss-southsudan.org',
    phone: '+211 929 328 427',
    bio: 'Community mobilizer building grassroots support for LISS initiatives',
  },
  {
    id: 8,
    name: 'Fatima Ali',
    position: 'Advocacy & Communications Manager',
    email: 'fatima.ali@liss-southsudan.org',
    phone: '+211 929 328 428',
    bio: 'Communications strategist amplifying LISS impact and reach',
  },
  {
    id: 9,
    name: 'Samuel Musa',
    position: 'M&E Specialist',
    email: 'samuel.musa@liss-southsudan.org',
    phone: '+211 929 328 429',
    bio: 'Monitoring and evaluation expert ensuring program quality and impact',
  },
  {
    id: 10,
    name: 'Nadia Joseph',
    position: 'GBV Response Coordinator',
    email: 'nadia.joseph@liss-southsudan.org',
    phone: '+211 929 328 430',
    bio: 'Gender-based violence specialist providing survivor support and prevention',
  },
];

export function LeadershipTeam() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to empowering communities and saving lives in South Sudan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipTeam.map((leader) => (
            <div
              key={leader.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground">{leader.name}</h3>
                <p className="text-sm font-semibold text-primary mt-1">{leader.position}</p>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{leader.bio}</p>

              <div className="space-y-2 border-t border-border pt-4">
                <a
                  href={`mailto:${leader.email}`}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{leader.email}</span>
                </a>
                <a
                  href={`tel:${leader.phone}`}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{leader.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
