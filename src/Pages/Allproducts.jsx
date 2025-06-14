import React, { useEffect, useState } from "react";
import { getAll } from "../Axios/axios";
import Header from "../Components/Header";
import { ProductCard } from "../Components/ProductCard";
import { useParams } from "react-router-dom";

const Allproducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { type } = useParams();
  const filteredType = type ? type.replace(/-/g, " ").toLowerCase() : null;

  useEffect(() => {
    getAll((data) => {
      // Filter only if type is present
      if (filteredType) {
        const filtered = data.filter(
          (item) => item.type && item.type.toLowerCase() === filteredType
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(data);
      }
    });
  }, [filteredType]);

  return (
    <div>
      <Header />
      <div className="mt-5 grid grid-cols-2 max-[350px]:grid-cols-1 gap-1">
        {filteredProducts.map((e, index) => (
          <ProductCard
            key={index}
            index={e.id}
            imageSrc={e.img1}
            discountPercent={e.discountPercent}
            title={e.name}
            discount={Math.round(((e.mrp - e.selling_price) / e.mrp) * 100)}
            originalPrice={e.mrp}
            offerPrice={e.selling_price}
            rating={(Math.random() * 4 + 1).toFixed(1)}
            ratingCount={e.ratingCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Allproducts;
