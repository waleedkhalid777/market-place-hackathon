import { useState } from 'react';

interface OrderItem {
  productId: number;
  quantity: number;
}

interface OrderData {
  customerId: number;
  items: OrderItem[];
  paymentMethod: string;
  shippingAddress: string;
}

const PlaceOrderPage = () => {
  const [status, setStatus] = useState<string>('');

  // Sample order data
  const orderData: OrderData = {
    customerId: 123,
    items: [
      { productId: 456, quantity: 2 },
      { productId: 789, quantity: 1 },
    ],
    paymentMethod: 'credit_card',
    shippingAddress: '123 Main St, City, Country',
  };

  const placeOrder = async () => {
    setStatus('Placing order...');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const responseData = await response.json();
      setStatus(`Order placed successfully: ${JSON.stringify(responseData)}`);
    } catch (error) {
      setStatus(`Error placing order: ${error}`);
    }
  };

  return (
    <div>
      <h1>Place Order</h1>
      <button onClick={placeOrder}>Place Order</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default PlaceOrderPage;
