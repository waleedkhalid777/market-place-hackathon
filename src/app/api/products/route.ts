import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Helper function to handle unknown errors
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
}

// 📌 GET: Fetch all products with category details
export async function GET() {
  try {
    const products = await client.fetch(`*[_type == "product"]{
      _id,
      name,
      price,
      quantity,
      "image": image.asset->url,
      "category": category->{
        _id,
        name
      }
    }`);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
}

// 📌 POST: Add a new product
export async function POST(request: Request) {
  try {
    const { name, price, quantity, category, image } = await request.json();
    const newProduct = await client.create({
      _type: "product",
      name,
      price,
      quantity,
      category: category ? { _type: "reference", _ref: category } : null,
      image: image ? { asset: { _type: "image", _ref: image } } : null,
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
}

// 📌 PUT: Update a product
export async function PUT(request: Request) {
  try {
    const { id, name, price, quantity, category, image } = await request.json();
    const updatedProduct = await client
      .patch(id)
      .set({
        name,
        price,
        quantity,
        category: category ? { _type: "reference", _ref: category } : null,
        image: image ? { asset: { _type: "image", _ref: image } } : null,
      })
      .commit();

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
}

// 📌 DELETE: Remove a product
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await client.delete(id);
    return NextResponse.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
}
