import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductsItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Check if createdAt exists, otherwise sort by _id
    const sortedProducts = [...products].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by date (newest first)
      } else {
        return b._id.localeCompare(a._id); // Sort by _id (assuming MongoDB ObjectID)
      }
    });

    setLatestProducts(sortedProducts.slice(0, 10)); // Keep top 10 latest
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md-text-base text-gray-600">
          Discover the newest arrivals at Forever, where fashion meets elegance! 
          Our latest collection brings you a perfect blend of trendsetting designs, 
          premium quality, and unmatched comfort.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductsItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
