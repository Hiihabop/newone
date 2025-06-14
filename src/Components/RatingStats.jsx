import React, { useEffect, useState } from "react";

const generateRandomRatings = () => {
  // Generate random total between 20k - 40k
  const total = Math.floor(Math.random() * 20000) + 20000;

  // Create a base distribution (more 5-star, less 1-star)
  const weights = [0.4, 0.25, 0.15, 0.1, 0.1];
  const counts = weights.map((w) => Math.floor(w * total));

  // Random slight variations
  const adjusted = counts.map((c) => c + Math.floor(Math.random() * 500) - 250);

  const stars = [5, 4, 3, 2, 1];
  const colors = [
    "bg-[#398d3e]",
    "bg-[#398d3e]",
    "bg-[#398d3e]",
    "bg-[#ff9f00]",
    "bg-[#ff615f]",
  ];

  return stars.map((star, i) => ({
    star,
    count: Math.max(adjusted[i], 0),
    color: colors[i],
  }));
};

const getAverageRating = (ratings) => {
  const totalRatings = ratings.reduce((sum, r) => sum + r.count, 0);
  const totalScore = ratings.reduce((sum, r) => sum + r.star * r.count, 0);
  return (totalScore / totalRatings).toFixed(1);
};

const RatingStats = ({ratingCount}) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    setRatings(generateRandomRatings());
  }, []);

  const totalRatings = ratings.reduce((acc, r) => acc + r.count, 0);
  const averageRating = getAverageRating(ratings);

  return (
    <div className="w-full max-w-md p-4 bg-white">
      <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
      <div className="flex justify-center ">
        <div className="mt-2 flex items-center space-x-2 w-[30%]">
          <div className="">
            <span className="text-4xl font-bold">{averageRating}</span>
            <span className="text-4xl ml-1">★</span>
            <div className="text-sm text-gray-500 mb-4">
              {ratingCount} Ratings &{" "}
              {Math.floor(ratingCount * 0.50).toLocaleString()} Reviews
            </div>
          </div>
        </div>
        <div className=" ml-2 w-[69%]">
          {ratings.map((r) => (
            <div key={r.star} className="flex items-center space-x-2 mb-1">
              <span className="w-5 text-sm text-gray-700 flex items-center">
                <span>{r.star}</span> <span>★</span>
              </span>
              <div className="relative w-full h-1.5 bg-gray-200 rounded">
                <div
                  className={`absolute h-1.5 rounded ${r.color}`}
                  style={{
                    width: `${(r.count / totalRatings) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingStats;
