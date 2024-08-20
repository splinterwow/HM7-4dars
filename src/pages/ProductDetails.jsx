import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
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
            <span className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2"></span>
            <span className="inline-block w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
            <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
          </div>
          <div className="mt-3">
            <label className="block text-lg">Amount</label>
            <select className="select select-secondary select-bordered select-md w-full max-w-xs mt-4">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <button className="mt-6 bg-blue-500 text-white rounded-md px-4 py-2">
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;