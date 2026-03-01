'use client';

import { useState, useEffect } from 'react';
import { getAllData, addProgram, updateProgram, deleteProgram, type Program } from '@/lib/admin-data';
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    content: '',
    status: 'active' as const,
  });
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const data = getAllData();
    setPrograms(data.programs);
  }, []);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateProgram(editingId, formData);
    } else {
      addProgram(formData);
    }

    const data = getAllData();
    setPrograms(data.programs);
    setFormData({ slug: '', title: '', description: '', content: '', status: 'active' });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (program: Program) => {
    setEditingId(program.id);
    setFormData({
      slug: program.slug,
      title: program.title,
      description: program.description,
      content: program.content,
      status: program.status,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(id);
      const data = getAllData();
      setPrograms(data.programs);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Programs</h1>
          <p className="text-muted-foreground mt-2">Manage organization programs</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ slug: '', title: '', description: '', content: '', status: 'active' });
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Add Program
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Program' : 'Add New Program'}
          </h2>
          <form onSubmit={handleAddOrUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="food-security"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Program Title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Short description"
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
                placeholder="Program content"
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingId ? 'Update' : 'Add'} Program
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ slug: '', title: '', description: '', content: '', status: 'active' });
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
        {programs.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No programs yet. Create one to get started.</p>
          </div>
        ) : (
          programs.map((program) => (
            <div key={program.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{program.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{program.slug}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      program.status === 'active'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {program.status}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{program.description}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(program)}
                    className="flex items-center gap-2 px-3 py-1 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-lg text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
