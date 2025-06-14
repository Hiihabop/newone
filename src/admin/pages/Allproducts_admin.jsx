import { useEffect, useState } from "react";
import { getAll } from "../../Axios/axios";
import ProductCard_admin from "../Components/ProductCard_admin";
import { ref, remove } from "firebase/database";
import { db } from "../../Axios/axios";
import { Link } from "react-router-dom";
import CSVUploader from "./CSVUploader";

const Allproducts_admin = () => {
  const [Alldried_fruit, setAlldried_fruit] = useState([]);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    getAll(setAlldried_fruit);
  };

  const Delete_data = async (id) => {
    console.log("delete",id);
    
    try {
      await remove(ref(db, `profile/${id}`));
      alert("Product deleted successfully.");
      Fdata(); // Refresh the data
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div>
      <CSVUploader />
      <Link to="/Admin_home/home">home</Link>
      <div className="mt-5 grid grid-cols-2 max-[350px]:grid-cols-1 gap-1">
        {Array.isArray(Alldried_fruit) &&
          Alldried_fruit.map((e, index) => (
            <ProductCard_admin
              key={e.id || index}
              imageSrc={e.img1}
              discountPercent={e.discountPercent}
              title={e.name}
              discount={e.description}
              originalPrice={e.mrp}
              offerPrice={e.selling_price}
              rating={e.rating}
              ratingCount={e.ratingCount}
              Delete_d={() => Delete_data(e.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Allproducts_admin;
