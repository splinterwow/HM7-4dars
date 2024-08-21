import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      fetch(
        "https://strapi-store-server.onrender.com/api/products?featured=true"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFeaturedProducts(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
          setLoading(false);
        });
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen -mt-20">
      <PuffLoader />
    </div>
  )
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-20">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              We are changing the way people shop
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <div className="mt-10">
              <Link to="/products" className="btn btn-primary">
                OUR PRODUCTS
              </Link>
            </div>
          </div>
          <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-item">
                <img
                  src={product.attributes.image}
                  className="rounded-box h-full w-80 object-cover"
                  alt={product.attributes.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="border-b border-base-300 pb-5">
          <h2 className="text-3xl font-medium tracking-wider capitalize">
            featured products
          </h2>
        </div>
        <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 3).map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
            >
              <div className="px-4 pt-4">
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </div>
              <div className="card-body items-center text-center">
                <h3 className="card-title capitalize tracking-wider">
                  {product.attributes.title}
                </h3>
                <span className="text-primary">
                  ${product.attributes.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;