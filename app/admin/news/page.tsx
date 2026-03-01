'use client';

import { useState, useEffect } from 'react';
import { getAllData, addNewsArticle, updateNewsArticle, deleteNewsArticle, type NewsArticle } from '@/lib/admin-data';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    publishedAt: new Date().toISOString().split('T')[0],
    status: 'draft' as const,
  });

  useEffect(() => {
    const data = getAllData();
    setArticles(data.newsArticles);
  }, []);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateNewsArticle(editingId, formData);
    } else {
      addNewsArticle(formData);
    }

    const data = getAllData();
    setArticles(data.newsArticles);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: '',
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'draft',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author,
      publishedAt: article.publishedAt.split('T')[0],
      status: article.status,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteNewsArticle(id);
      const data = getAllData();
      setArticles(data.newsArticles);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">News Articles</h1>
          <p className="text-muted-foreground mt-2">Manage news and updates</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: '',
              slug: '',
              content: '',
              excerpt: '',
              author: '',
              publishedAt: new Date().toISOString().split('T')[0],
              status: 'draft',
            });
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Add Article
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Article' : 'Add New Article'}
          </h2>
          <form onSubmit={handleAddOrUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Article Title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="article-slug"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Brief excerpt"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Full article content"
                rows={8}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Author Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Published Date</label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingId ? 'Update' : 'Add'} Article
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    slug: '',
                    content: '',
                    excerpt: '',
                    author: '',
                    publishedAt: new Date().toISOString().split('T')[0],
                    status: 'draft',
                  });
                }}
                className="bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No articles yet. Create one to get started.</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">By {article.author} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    article.status === 'published'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {article.status}
                </span>
              </div>

              <p className="text-muted-foreground mb-4">{article.excerpt}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="flex items-center gap-2 px-3 py-1 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
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
