'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function TeamPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-2">Manage leadership and staff</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Add Team Member</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" rows={3} />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
                Add Member
              </button>
              <button onClick={() => setShowForm(false)} className="bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/80">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Team members are managed on the About page.</p>
      </div>
    </div>
  );
}
