// Image management utility for admin operations

export interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  category: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ImageCategory {
  id: string;
  name: string;
  description: string;
  maxItems?: number;
}

const STORAGE_KEY = 'liss_uploaded_images';
const CATEGORIES_KEY = 'liss_image_categories';

// Default categories
const DEFAULT_CATEGORIES: ImageCategory[] = [
  { id: 'hero', name: 'Hero Images', description: 'Large banner images for pages' },
  { id: 'programs', name: 'Program Images', description: 'Images for program pages' },
  { id: 'team', name: 'Team Photos', description: 'Leadership team member photos' },
  { id: 'gallery', name: 'Gallery', description: 'Event and project gallery' },
  { id: 'testimonials', name: 'Testimonials', description: 'User testimonial images' },
  { id: 'news', name: 'News', description: 'News article images' },
];

export function getImageCategories(): ImageCategory[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function getAllImages(): UploadedImage[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getImagesByCategory(category: string): UploadedImage[] {
  return getAllImages().filter(img => img.category === category);
}

export function addImage(image: UploadedImage): void {
  if (typeof window === 'undefined') return;
  try {
    const images = getAllImages();
    images.push(image);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Failed to save image metadata:', error);
  }
}

export function deleteImage(imageId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const images = getAllImages().filter(img => img.id !== imageId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Failed to delete image metadata:', error);
  }
}

export function uploadImage(
  file: File,
  category: string,
  userEmail: string
): Promise<UploadedImage> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      const image: UploadedImage = {
        id: `img_${Date.now()}_${Math.random()}`,
        url: data.url,
        filename: data.filename,
        category,
        size: data.size,
        type: data.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: userEmail,
      };

      addImage(image);
      resolve(image);
    } catch (error) {
      reject(error);
    }
  });
}

export function getImageStats() {
  const images = getAllImages();
  const categories = getImageCategories();
  
  return {
    totalImages: images.length,
    totalSize: images.reduce((sum, img) => sum + img.size, 0),
    byCategory: categories.map(cat => ({
      category: cat.name,
      count: getImagesByCategory(cat.id).length,
    })),
  };
}
