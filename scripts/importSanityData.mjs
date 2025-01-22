// import { createClient } from '@sanity/client';
// import axios from 'axios';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import path from 'path';

// // Load environment variables from .env.local
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// // Create Sanity client
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
//   apiVersion: '2021-08-31',
// });

// // Helper function to validate URLs
// function isValidUrl(url) {
//   try {
//     new URL(url);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

// // Function to upload image to Sanity
// async function uploadImageToSanity(imageUrl) {
//   try {
//     if (!isValidUrl(imageUrl)) {
//       console.error(`Invalid URL: ${imageUrl}`);
//       return null;
//     }
//     console.log(`Uploading image: ${imageUrl}`);
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     const buffer = Buffer.from(response.data);
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop(),
//     });
//     console.log(`Image uploaded successfully: ${asset._id}`);
//     return asset._id;
//   } catch (error) {
//     console.error('Failed to upload image:', imageUrl, error.message);
//     return null;
//   }
// }

// // Main function to import data
// async function importData() {
//   try {
//     console.log('Fetching products from API...');
//     const response = await axios.get('https://fakestoreapi.com/products');
//     const products = response.data;

//     if (!Array.isArray(products) || products.length === 0) {
//       console.error('No products found or API returned invalid data.');
//       return;
//     }

//     console.log(`Fetched ${products.length} products`);

//     for (const product of products) {
//       if (!product.title || !product.description || typeof product.price !== 'number') {
//         console.warn(`Skipping product with incomplete data:`, product);
//         continue;
//       }

//       console.log(`Processing product: ${product.title}`);
//       let imageRef = null;

//       if (product.image) {
//         imageRef = await uploadImageToSanity(product.image);
//       }

//       const sanityProduct = {
//         _type: 'product',
//         name: product.title,
//         description: product.description,
//         price: product.price,
//         discountPercentage: 0,
//         priceWithoutDiscount: product.price,
//         rating: product.rating?.rate || 0,
//         ratingCount: product.rating?.count || 0,
//         tags: product.category ? [product.category] : [],
//         sizes: [],
//         image: imageRef
//           ? {
//               _type: 'image',
//               asset: {
//                 _type: 'reference',
//                 _ref: imageRef,
//               },
//             }
//           : undefined,
//       };

//       console.log('Uploading product to Sanity:', sanityProduct.name);

//       try {
//         const result = await client.create(sanityProduct);
//         console.log(`Product uploaded successfully: ${result._id}`);
//       } catch (error) {
//         console.error(`Failed to upload product: ${sanityProduct.name}`, error.message);
//       }
//     }

//     console.log('Data import completed successfully!');
//   } catch (error) {
//     console.error('Error importing data:', error.message);
//   }
// }

// importData();
