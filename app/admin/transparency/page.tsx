'use client';

import { useState } from 'react';
import { Plus, Download, Upload } from 'lucide-react';

export default function TransparencyPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Transparency & Reports</h1>
          <p className="text-muted-foreground mt-2">Manage financial and impact reports</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Add Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Budget Allocated (2024)</p>
          <p className="text-3xl font-bold text-primary">$500,000</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Amount Spent</p>
          <p className="text-3xl font-bold text-secondary">$325,000</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Remaining Budget</p>
          <p className="text-3xl font-bold text-accent">$175,000</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Add Financial Report</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Report Title</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                <input type="number" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" rows={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Budget Allocated</label>
                <input type="number" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Amount Spent</label>
                <input type="number" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Programs</option>
                  <option>Operations</option>
                  <option>Administration</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
                Add Report
              </button>
              <button onClick={() => setShowForm(false)} className="bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/80">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[2024, 2023, 2022].map((year) => (
          <div key={year} className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Annual Report {year}</h3>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Budget Allocated</p>
                <p className="text-xl font-semibold text-primary">$500,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount Spent</p>
                <p className="text-xl font-semibold text-secondary">$425,000</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg text-sm">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
