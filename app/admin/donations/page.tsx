'use client';

import { useState, useEffect } from 'react';
import { getAllData, addDonation, type Donation } from '@/lib/admin-data';
import { Plus, Trash2 } from 'lucide-react';

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    donor: '',
    email: '',
    amount: '',
    currency: 'USD',
    type: 'one-time' as const,
  });

  useEffect(() => {
    const data = getAllData();
    setDonations(data.donations);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addDonation({
      donor: formData.donor,
      email: formData.email,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      type: formData.type,
      date: new Date().toISOString(),
      status: 'completed',
    });

    const data = getAllData();
    setDonations(data.donations);
    setFormData({ donor: '', email: '', amount: '', currency: 'USD', type: 'one-time' });
    setShowForm(false);
  };

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Donations</h1>
          <p className="text-muted-foreground mt-2">Track donations and financial support</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Record Donation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Donations</p>
          <p className="text-3xl font-bold text-foreground">{donations.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Amount</p>
          <p className="text-3xl font-bold text-primary">${totalDonated.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Monthly Donors</p>
          <p className="text-3xl font-bold text-secondary">{donations.filter(d => d.type === 'monthly').length}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Record New Donation</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Donor Name</label>
                <input
                  type="text"
                  value={formData.donor}
                  onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="1000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="SSP">SSP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'one-time' | 'monthly' })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="one-time">One-time</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                Record Donation
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Donations Table */}
      <div className="space-y-4">
        {donations.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No donations recorded yet.</p>
          </div>
        ) : (
          donations.map((donation) => (
            <div key={donation.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{donation.donor}</h3>
                  <p className="text-sm text-muted-foreground">{donation.email}</p>
                  <p className="text-sm text-primary font-semibold mt-2">
                    {donation.amount} {donation.currency} ({donation.type})
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(donation.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                  {donation.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
