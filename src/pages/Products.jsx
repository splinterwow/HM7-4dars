import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://strapi-store-server.onrender.com/api/products"
      );
      const data = await response.json();
      setProducts(data.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="mt-[50px] text-2xl">22 products</h1>
        <hr />
        <div className="flex flex-wrap mt-3 gap-3">
          {products.length > 0 &&
            products.map((value, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleClick(value.id)}
                  className="w-96 h-80 shadow-slate-500 border-1 shadow-sm rounded-md cursor-pointer mt-1"
                  style={{boxShadow:'0 20px 25px -5px rgb(0 0 0 / .1)'}}
                >
                  <img
                    className="w-80 h-56 rounded-md flex ml-auto mr-auto mt-5"
                    src={value.attributes.image}
                    alt=""
                  />
                  <h1 className="text-2xl text-center pt-1">
                    {value.attributes.title}
                  </h1>
                  <p className="text-center ">${value.attributes.price}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Products;
