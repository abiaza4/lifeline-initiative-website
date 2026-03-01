'use client';

import { useState, useEffect } from 'react';
import { getAllData } from '@/lib/admin-data';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Users,
  Heart,
  MessageSquare,
  TrendingUp,
  Plus,
} from 'lucide-react';

interface DashboardStats {
  programs: number;
  articles: number;
  teamMembers: number;
  donations: number;
  submissions: number;
  totalDonated: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    programs: 0,
    articles: 0,
    teamMembers: 0,
    donations: 0,
    submissions: 0,
    totalDonated: 0,
  });

  useEffect(() => {
    const data = getAllData();
    const totalDonated = data.donations.reduce((sum, d) => sum + d.amount, 0);

    setStats({
      programs: data.programs.length,
      articles: data.newsArticles.length,
      teamMembers: data.teamMembers.length,
      donations: data.donations.length,
      submissions: data.formSubmissions.filter((s) => s.status === 'new').length,
      totalDonated,
    });
  }, []);

  const statCards = [
    {
      label: 'Programs',
      value: stats.programs,
      icon: BookOpen,
      href: '/admin/programs',
      color: 'bg-primary/10',
    },
    {
      label: 'News Articles',
      value: stats.articles,
      icon: FileText,
      href: '/admin/news',
      color: 'bg-secondary/10',
    },
    {
      label: 'Team Members',
      value: stats.teamMembers,
      icon: Users,
      href: '/admin/team',
      color: 'bg-accent/10',
    },
    {
      label: 'Donations',
      value: stats.donations,
      icon: Heart,
      href: '/admin/donations',
      color: 'bg-primary/10',
    },
    {
      label: 'New Submissions',
      value: stats.submissions,
      icon: MessageSquare,
      href: '/admin/submissions',
      color: 'bg-secondary/10',
    },
    {
      label: 'Total Donated',
      value: `$${stats.totalDonated.toLocaleString()}`,
      icon: TrendingUp,
      href: '/admin/donations',
      color: 'bg-accent/10',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to LISS Admin Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{card.label}</p>
              <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/programs?action=add"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Plus className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Add Program</span>
          </Link>
          <Link
            href="/admin/news?action=add"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Plus className="w-5 h-5 text-secondary" />
            <span className="text-foreground font-medium">Add Article</span>
          </Link>
          <Link
            href="/admin/team?action=add"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Plus className="w-5 h-5 text-accent" />
            <span className="text-foreground font-medium">Add Team Member</span>
          </Link>
          <Link
            href="/admin/submissions"
            className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">View Submissions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
