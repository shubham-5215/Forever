import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Collection from '../pages/Collection';
import ProductsItem from './ProductItem';



const LatestCollection = () => {
    
    const {products} =useContext(ShopContext);
    const [latestProducts,setLatestProducts]=useState([]);
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
    
    
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'Collection '}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md-text-base text-gray-600'>
            
            Discover the newest arrivals at Forever, where fashion meets elegance! Our latest collection brings you a perfect blend of trendsetting designs, premium quality, and unmatched comfort. Whether you're looking for chic casual wear, sophisticated party outfits, or timeless essentials, we've got something special for everyone.



            
            </p>
        </div>
        {/* rendering products*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>{
          latestProducts.map((item,index)=>(
            <ProductsItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
            }
        </div>
      
    </div>
  )
}

export default LatestCollection
