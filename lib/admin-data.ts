// Admin Dashboard Data Management

export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
}

export interface Donation {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  type: 'one-time' | 'monthly';
  email: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface FormSubmission {
  id: string;
  type: 'volunteer' | 'partner' | 'contact' | 'gbv';
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'resolved';
}

export interface TransparencyData {
  id: string;
  title: string;
  description: string;
  year: number;
  data: {
    budgetAllocated: number;
    spent: number;
    category: string;
  }[];
  uploadedAt: string;
}

const STORAGE_KEY = 'liss-admin-data';

const defaultData = {
  programs: [] as Program[],
  newsArticles: [] as NewsArticle[],
  teamMembers: [] as TeamMember[],
  donations: [] as Donation[],
  formSubmissions: [] as FormSubmission[],
  transparencyData: [] as TransparencyData[],
};

function initializeData() {
  if (typeof window === 'undefined') return defaultData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultData;
    }
  }
  
  // Initialize with sample data
  const sampleData = {
    programs: [
      {
        id: '1',
        slug: 'food-security',
        title: 'Food Security & Climate Resilience',
        description: 'Supporting agricultural development and climate adaptation',
        content: '<h2>Program Overview</h2><p>This program focuses on building resilient agricultural systems...</p>',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    newsArticles: [] as NewsArticle[],
    teamMembers: [] as TeamMember[],
    donations: [] as Donation[],
    formSubmissions: [] as FormSubmission[],
    transparencyData: [] as TransparencyData[],
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  return sampleData;
}

export function getAllData() {
  if (typeof window === 'undefined') return defaultData;
  return initializeData();
}

export function saveData(data: typeof defaultData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addProgram(program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) {
  const data = getAllData();
  const newProgram: Program = {
    ...program,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.programs.push(newProgram);
  saveData(data);
  return newProgram;
}

export function updateProgram(id: string, program: Partial<Program>) {
  const data = getAllData();
  const index = data.programs.findIndex((p) => p.id === id);
  if (index !== -1) {
    data.programs[index] = {
      ...data.programs[index],
      ...program,
      updatedAt: new Date().toISOString(),
    };
    saveData(data);
  }
}

export function deleteProgram(id: string) {
  const data = getAllData();
  data.programs = data.programs.filter((p) => p.id !== id);
  saveData(data);
}

export function addNewsArticle(article: Omit<NewsArticle, 'id' | 'createdAt'>) {
  const data = getAllData();
  const newArticle: NewsArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.newsArticles.push(newArticle);
  saveData(data);
  return newArticle;
}

export function updateNewsArticle(id: string, article: Partial<NewsArticle>) {
  const data = getAllData();
  const index = data.newsArticles.findIndex((a) => a.id === id);
  if (index !== -1) {
    data.newsArticles[index] = { ...data.newsArticles[index], ...article };
    saveData(data);
  }
}

export function deleteNewsArticle(id: string) {
  const data = getAllData();
  data.newsArticles = data.newsArticles.filter((a) => a.id !== id);
  saveData(data);
}

export function addDonation(donation: Omit<Donation, 'id'>) {
  const data = getAllData();
  const newDonation: Donation = {
    ...donation,
    id: Date.now().toString(),
  };
  data.donations.push(newDonation);
  saveData(data);
  return newDonation;
}

export function updateFormSubmission(id: string, updates: Partial<FormSubmission>) {
  const data = getAllData();
  const index = data.formSubmissions.findIndex((s) => s.id === id);
  if (index !== -1) {
    data.formSubmissions[index] = { ...data.formSubmissions[index], ...updates };
    saveData(data);
  }
}

export function deleteFormSubmission(id: string) {
  const data = getAllData();
  data.formSubmissions = data.formSubmissions.filter((s) => s.id !== id);
  saveData(data);
}

export function exportData() {
  const data = getAllData();
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string) {
  try {
    const data = JSON.parse(jsonString);
    saveData(data);
    return true;
  } catch {
    return false;
  }
}
