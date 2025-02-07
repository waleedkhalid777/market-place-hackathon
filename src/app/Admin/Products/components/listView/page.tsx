"use client";
import { FiEdit, FiTrash2, FiEye, FiArchive } from "react-icons/fi"; // Added new icons
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Model";

// Define Product Interface
interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  category?: {
    name: string;
  };
}

export default function ListView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        setProducts(
          (Array.isArray(data) ? data : data.products || []).map((product: { category: any; }) => ({
            ...product,
            category: product.category || { name: "Uncategorized" },
          }))
        );
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await fetch(`/api/products`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (err) {
      setError("Failed to delete the product");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/Admin/Products/form?id=${id}`);
  };

  const openDeleteModal = (id: string) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Products</h1>

      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="w-full table-auto text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4">SN</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <Row
                key={item._id}
                index={index + 1}
                item={item}
                onDelete={openDeleteModal}
                onUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <Modal onClose={closeDeleteModal}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              <button
                onClick={() => handleDelete(selectedProductId!)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

function Row({ item, index, onDelete, onUpdate }: { item: Product; index: number; onDelete: (id: string) => void; onUpdate: (id: string) => void; }) {
  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="py-3 px-4 text-center">{index}</td>
      <td className="py-3 px-4 text-center">
        <img
          className="h-12 w-12 object-cover rounded-lg"
          src={item.image || "/placeholder.png"}
          alt={item.name || "No Image"}
        />
      </td>
      <td className="py-3 px-4">{item.name}</td>
      <td className="py-3 px-4">&#163;{item.price}</td>
      <td className="py-3 px-4">{item.category?.name || "Uncategorized"}</td>
      <td className="py-3 px-4 flex gap-2 justify-center">
        <button onClick={() => onUpdate(item._id)} className="text-blue-600 hover:text-blue-800">
          <FiEdit size={18} />
        </button>
        <button onClick={() => onDelete(item._id)} className="text-red-600 hover:text-red-800">
          <FiTrash2 size={18} />
        </button>
        <button className="text-green-600 hover:text-green-800">
          <FiEye size={18} />
        </button>
        <button className="text-yellow-600 hover:text-yellow-800">
          <FiArchive size={18} />
        </button>
      </td>
    </tr>
  );
}
