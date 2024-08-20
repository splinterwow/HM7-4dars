import React from 'react';

const Cart = () => {
  // Dummy data for cart items
  const cartItems = [
    {
      id: 1,
      title: 'Comfy Bed',
      price: 129.99,
      image: 'https://via.placeholder.com/150',
      description: 'Cloud bread VHS hell of banjo bicycle rights jianbing umami.',
      color: 'Red',
      quantity: 1,
    },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex border p-4 rounded-lg shadow-md mb-4">
              <img src={item.image} alt={item.title} className="w-96 h-96 object-cover rounded-lg lg:w-full" />
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-2">
                  <label className="block text-sm">Colors</label>
                  <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                </div>
                <div className="mt-2">
                  <label className="block text-sm">Amount</label>
                  <select className="border rounded-md p-1">
                    <option value={item.quantity}>{item.quantity}</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2">ADD TO BAG</button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;