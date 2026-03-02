'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  getAllImages,
  getImagesByCategory,
  getImageCategories,
  deleteImage,
  uploadImage,
  type UploadedImage,
  type ImageCategory,
} from '@/lib/image-management';
import { Trash2, Upload, Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('hero');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [categories, setCategories] = useState<ImageCategory[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.replace('/admin/login');
      return;
    }

    setCategories(getImageCategories());
    const categoryImages = getImagesByCategory(selectedCategory);
    setImages(categoryImages);
  }, [isAuthenticated, router, selectedCategory]);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;

    setIsUploading(true);
    const file = e.target.files[0];

    try {
      await uploadImage(file, selectedCategory, user.email);
      const updatedImages = getImagesByCategory(selectedCategory);
      setImages(updatedImages);
    } catch (error) {
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteImage(imageId);
      setImages(images.filter(img => img.id !== imageId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Image Gallery</h1>
        <p className="text-muted-foreground">Manage and upload images for your website</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Upload Section */}
      <div className="bg-card border-2 border-dashed border-border rounded-lg p-8">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-12 h-12 text-muted-foreground mb-2" />
          <span className="text-lg font-medium text-foreground">
            Click to upload or drag and drop
          </span>
          <span className="text-sm text-muted-foreground">
            PNG, JPG, GIF or WebP (max 5MB)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
        {isUploading && (
          <div className="mt-4 text-center">
            <p className="text-foreground">Uploading...</p>
          </div>
        )}
      </div>

      {/* Images Grid */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Images in {categories.find(c => c.id === selectedCategory)?.name}
          <span className="text-muted-foreground ml-2">({images.length})</span>
        </h2>
        
        {images.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground">No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map(image => (
              <div
                key={image.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-muted">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground truncate">
                    {image.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(image.size / 1024).toFixed(2)} KB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(image.uploadedAt).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(image.url);
                        alert('URL copied to clipboard');
                      }}
                      className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors text-sm"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="px-3 py-2 bg-destructive/20 text-destructive rounded hover:bg-destructive/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
