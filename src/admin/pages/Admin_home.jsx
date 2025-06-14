import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../Axios/axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaCommentDots, FaCheckCircle, FaTimes } from "react-icons/fa";
import { FaLink, FaPlus, FaStar } from "react-icons/fa6";

const Admin_home = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    originalPrice: "",
    offerPrice: "",
    discountPercent: "",
    link: "",
    type: "dried fruit",
    rating: "",
    ratingCount: "",
    comments: [],
  });

  const [newComment, setNewComment] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const updatedComments = [
        ...product.comments,
        { id: product.comments.length + 1, body: newComment },
      ];
      setProduct({ ...product, comments: updatedComments });
      setNewComment("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      originalPrice: Number(product.originalPrice),
      offerPrice: Number(product.offerPrice),
      discountPercent: Number(product.discountPercent),
      rating: Number(product.rating),
      ratingCount: Number(product.ratingCount),
    };

    try {
      await push(ref(db, "all_product/0/all_dried_fruit"), newProduct);
      alert("Product added successfully!");
      setProduct({
        name: "",
        description: "",
        image: "",
        originalPrice: "",
        offerPrice: "",
        discountPercent: "",
        link: "",
        type: "dried fruit",
        rating: "",
        ratingCount: "",
        comments: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100">
  <Link
    to="/Admin_home/allproducts_admin"
    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm mb-4 transition-colors duration-200"
  >
    <FaArrowLeft className="text-sm" />
    <span className="font-medium">Back to All Products</span>
  </Link>

  <div className="flex items-center gap-3 mb-6">
    <div className="p-3 bg-indigo-100 rounded-full">
      <FaShoppingCart className="text-indigo-600 text-xl" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">
      Add New Product
    </h2>
  </div>

  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter detailed description"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <div className="flex items-center gap-2">
          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          />
          {product.image && (
            <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border border-gray-200">
              <img src={product.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Offer Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              name="offerPrice"
              value={product.offerPrice}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
        <div className="relative">
          <input
            name="discountPercent"
            value={product.discountPercent}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Link</label>
        <div className="flex items-center gap-2">
          <FaLink className="text-gray-400" />
          <input
            name="link"
            value={product.link}
            onChange={handleChange}
            placeholder="https://example.com/product"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex items-center gap-2">
            <input
              name="rating"
              value={product.rating}
              onChange={handleChange}
              placeholder="4.5"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
            />
            <FaStar className="text-yellow-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating Count</label>
          <input
            name="ratingCount"
            value={product.ratingCount}
            onChange={handleChange}
            placeholder="120"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          />
        </div>
      </div>
    </div>

    {/* Comment Section */}
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-full">
          <FaCommentDots className="text-purple-600" />
        </div>
        <h4 className="text-lg font-semibold text-gray-800">Product Comments</h4>
      </div>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment about this product..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={handleAddComment}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FaPlus className="text-xs" />
          <span>Add</span>
        </button>
      </div>

      {product.comments.length > 0 && (
        <div className="space-y-2 mt-4">
          {product.comments.map((comment, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
              <FaComment className="text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{comment.body}</p>
              <button 
                type="button"
                onClick={() => handleRemoveComment(idx)}
                className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    <button
      type="submit"
      className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
    >
      <FaCheckCircle />
      <span>Submit Product</span>
    </button>
  </form>
</div>
  );
};

export default Admin_home;
