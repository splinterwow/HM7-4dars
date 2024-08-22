import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "../App.css";

const Products = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then((resp) => resp.json())
      .then((data) => {
        setCart(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <PuffLoader />
      </div>
    );
  }

  function handleClick(id) {
    navigate(`/products/${id}`);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cart.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter logic
  const filteredItems = cart.filter((item) => {
    const matchesSearchTerm = item.attributes.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.attributes.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart'); // Navigate to the cart page after adding the item
  };

  return (
    <>
      <div>
        <br />
        <br />
        <div className="bg-blue-50 p-4 rounded-lg shadow-md justify-between items-center space-y-4 sm:space-y-0 w-[1400px] max-w-[1200px] mx-auto">
          <div className="flex">
            <div className="w-full sm:w-auto flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Search Product
              </label>
              <input
                type="text"
                placeholder="Search Product"
                className="mt-1 pl-[10px] block w-[260px] h-8 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>

            <div className="w-full sm:w-auto flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                className="mt-1 block w-[260px] border-gray-300 rounded-md h-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
              >
                <option>all</option>
              </select>
            </div>

            <div className="w-full sm:w-auto flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Select Company
              </label>
              <select className="mt-1 block w-[260px] border-gray-300 h-8 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>all</option>
              </select>
            </div>

            <div className="w-full sm:w-auto flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select className="mt-1 block w-[260px] border-gray-300 h-8 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>a-z</option>
              </select>
            </div>
          </div>

          <br />
          <br />
          <div className="">
            <div className="sm:w-auto flex-grow rounded-2xl">
              <div className="flex">
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Price{" "}
                      <span className="ml-2 text-sm text-gray-700 ml-44">
                        $1,000.00
                      </span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        className="w-80 h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        0 <span className="ml-52">Max: $1,000.00</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex">
                    <div className="w-full sm:w-auto items-center ml-[200px]">
                      <input
                        type="checkbox"
                        id="free-shipping"
                        className="ml-[30px] h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />{" "}
                      <br />
                      <label
                        htmlFor="free-shipping"
                        className="text-sm font-medium text-gray-700"
                      >
                        Free Shipping
                      </label>
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-4 ml-[180px] mt-[5px]">
                    <button className="bg-blue-600 w-[270px] h-[30px] hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline">
                      SEARCH
                    </button>
                    <button className="bg-pink-500 hover:bg-pink-600 h-[30px] text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline">
                      RESET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-[1200px] mx-auto">
          <h1 className="mt-[50px] text-2xl">{filteredItems.length} products</h1>
          <hr />
          <div className="flex flex-wrap mt-3 gap-3">
            {filteredItems.length > 0 &&
              filteredItems.map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleClick(value.id)}
                    className="w-96 h-80 border-1 shadow-lg rounded-md cursor-pointer mt-1"
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

          <div className="join flex justify-end -mt-16 mb-8">
            <button
              className="join-item btn btn-lg"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              PREV
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`join-item btn btn-lg ${currentPage === index + 1 ? "btn-active" : ""}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn btn-lg"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;