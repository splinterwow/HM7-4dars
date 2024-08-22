import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Miqdor uchun holat
  const [selectedColor, setSelectedColor] = useState(''); // Rang uchun holat

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://strapi-store-server.onrender.com/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToBag = () => {
    const productWithDetails = { 
      ...product, 
      quantity, 
      selectedColor 
    }; // Mahsulot, miqdor va tanlangan rang bilan obyekt yaratish
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(productWithDetails);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart'); // Cart sahifasiga o'tish
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <PuffLoader />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  const price = parseFloat(product.attributes.price);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.attributes.image}
          alt={product.attributes.title}
          className="rounded-lg h-96 object-cover"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{product.attributes.title}</h1>
          <h2 className="text-xl text-neutral-content font-bold mt-2">{product.attributes.category}</h2>
          <p className="mt-3 text-xl">${price.toFixed(2)}</p>
          <p className="mt-6 leading-8">{product.attributes.description}</p>
          <div className="mt-6">
            <label className="text-md font-medium tracking-wider capitalize">Colors</label>
            <div className="flex mt-2">
              {['red', 'blue', 'green'].map((color) => ( // Misol ranglar
                <span 
                  key={color} 
                  className={`inline-block w-4 h-4 rounded-full mr-2 cursor-pointer ${color}-500`} 
                  onClick={() => setSelectedColor(color)} 
                ></span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-lg">Amount</label>
            <select
              className="select select-secondary select-bordered select-md w-full max-w-xs mt-4"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)} // Miqdorni yangilash
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>
          <button className="mt-6 bg-blue-500 text-white rounded-md px-4 py-2" onClick={handleAddToBag}>
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;