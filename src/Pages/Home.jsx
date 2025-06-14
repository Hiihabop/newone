import { useEffect, useState } from "react";
import { getAll } from "../Axios/axios";
import { ProductCard } from "../Components/ProductCard";
import Cardhome from "../Components/Card_home";
import Card1 from "../Components/Card_1";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
  const [Alldried_fruit, setAlldried_fruit] = useState([]);
  
  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    getAll(setAlldried_fruit);
  };

  return (
    <div className="">
      <Header />
      <div className="p-[16px]">
        <div className="">
          <Cardhome />
        </div>
        <div className="mt-5">
          <Card1 />
        </div>
        <div className="mt-5 grid grid-cols-2 max-[350px]:grid-cols-1 gap-1">
          {Alldried_fruit.map((e, index) => {
            return (
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
            );
          })}
        </div>
      </div>
        <Footer/>
    </div>
  );
};

export default Home;
