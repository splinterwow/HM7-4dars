import React from 'react';

const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Mahsulotlarni localStorage dan olish

  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.attributes.price) * item.quantity, 0);
  const shipping = 5.00;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Savatchangiz bo'sh.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div className=" p-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    <img src={item.attributes.image} alt={item.attributes.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h2 className="text-xl font-semibold">{item.attributes.title}</h2>
                      <p>Color: <span className={`inline-block w-4 h-4 rounded-full`} style={{ backgroundColor: item.selectedColor }}></span></p>
                      <p>Miqdor: 
                        <select value={item.quantity} className="ml-2 border rounded">
                          {[...Array(10).keys()].map(num => (
                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                          ))}
                        </select>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">${(parseFloat(item.attributes.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className=" p-4 -mt-16">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="flex justify-between mt-4">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t mt-4 pt-2 flex justify-between font-bold">
                <span>Order Total:</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white rounded-md py-2">PLEASE LOGIN</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;