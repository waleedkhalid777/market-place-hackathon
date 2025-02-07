'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
}

export default function CategoryForm() {
  const [data, setData] = useState<Category>({ name: '', slug: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('id');
    setId(categoryId);
  }, []);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/categories/${id}`);
          const category = await response.json();
          setData(category || { name: '', slug: '' });
        } catch (error) {
          console.error('Failed to fetch category:', error);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleChange = (key: string, value: string) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = id ? 'PUT' : 'POST';
      await fetch('/api/categories', {
        method,
        body: JSON.stringify({ id, ...data }),
        headers: { 'Content-Type': 'application/json' },
      });
      router.push('/Admin/Categories');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 bg-white shadow-lg rounded-2xl p-6 w-full md:w-[450px] border border-gray-200">
      <h1 className="text-xl font-semibold text-gray-700">{id ? 'Update' : 'Create'} Category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium">Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Enter category name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-600 text-sm font-medium">Slug <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Enter category slug"
            value={data.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
            isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
          {isLoading ? 'Processing...' : id ? 'Update Category' : 'Create Category'}
        </button>
      </form>
    </div>
  );
}
