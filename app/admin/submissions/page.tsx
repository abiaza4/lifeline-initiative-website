'use client';

import { useState, useEffect } from 'react';
import { getAllData, updateFormSubmission, deleteFormSubmission, type FormSubmission } from '@/lib/admin-data';
import { Trash2, Check } from 'lucide-react';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'resolved'>('all');

  useEffect(() => {
    const data = getAllData();
    setSubmissions(data.formSubmissions);
  }, []);

  const filteredSubmissions = submissions.filter((s) => filter === 'all' || s.status === filter);

  const handleMarkAs = (id: string, status: FormSubmission['status']) => {
    updateFormSubmission(id, { status });
    const data = getAllData();
    setSubmissions(data.formSubmissions);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteFormSubmission(id);
      const data = getAllData();
      setSubmissions(data.formSubmissions);
    }
  };

  const typeColors: Record<string, string> = {
    volunteer: 'bg-primary/20 text-primary',
    partner: 'bg-secondary/20 text-secondary',
    contact: 'bg-accent/20 text-accent',
    gbv: 'bg-destructive/20 text-destructive',
  };

  const statusColors: Record<string, string> = {
    new: 'bg-primary/20 text-primary',
    read: 'bg-secondary/20 text-secondary',
    resolved: 'bg-green-500/20 text-green-600',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Form Submissions</h1>
        <p className="text-muted-foreground mt-2">Manage visitor submissions and inquiries</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {(['all', 'new', 'read', 'resolved'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No submissions in this category.</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[submission.type]}`}>
                      {submission.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[submission.status]}`}>
                      {submission.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{submission.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {submission.email} • {submission.phone}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-foreground text-sm whitespace-pre-wrap">{submission.message}</p>
              </div>

              <div className="flex gap-2">
                {submission.status !== 'read' && (
                  <button
                    onClick={() => handleMarkAs(submission.id, 'read')}
                    className="flex items-center gap-2 px-3 py-1 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg text-sm"
                  >
                    <Check className="w-4 h-4" />
                    Mark Read
                  </button>
                )}
                {submission.status !== 'resolved' && (
                  <button
                    onClick={() => handleMarkAs(submission.id, 'resolved')}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-600 hover:bg-green-500/30 rounded-lg text-sm"
                  >
                    <Check className="w-4 h-4" />
                    Mark Resolved
                  </button>
                )}
                <button
                  onClick={() => handleDelete(submission.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-lg text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
