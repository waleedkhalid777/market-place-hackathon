'use client';

import { Trash2, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  productCount: number;
}

export default function ListView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    setIsLoading(true);
    try {
      await fetch('/api/categories', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/Admin/Categories?id=${id}`);
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-white shadow-lg rounded-xl w-full border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-700">Categories</h1>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-500" size={30} />
        </div>
      ) : (
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th className="px-4 py-2 text-left">SN</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-center">Products</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id} className="bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-4 py-3 text-left">{index + 1}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.slug.current}</td>
                <td className="px-4 py-3 text-center">{item.productCount}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleUpdate(item._id)} className="text-blue-600 hover:text-blue-800">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
