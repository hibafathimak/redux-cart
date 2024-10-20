import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
  const { id } = useParams()
  // console.log(id);
  const userCart=useSelector(state=>state.cartReducer)
 const [product, setProduct] = useState({})
 const userWishlist =useSelector(state=>state.wishlistReducer)
 const dispatch =useDispatch()


  useEffect(() => {
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts?.find(item => item.id == id))
    }
  }, [])
  // console.log(product);

  const handleWishlist=(product)=>{
    const existingProduct=userWishlist?.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product Already in WishList!!")
    }
    else{
      dispatch(addToWishlist(product))
    }

  }

  const handleCart=(product)=>{
    dispatch(addToCart(product))

    const existingProduct=userCart?.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product Quantity is Incrementing !!")
    }
    
  }



  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='flex items-center content-center mx-5'>
        <div className="grid grid-cols-2 items-center p-4">
          <img width={'80%'} src={product?.thumbnail} alt="" />
          <div>
            <h3 className='text-2xl'>PID:{product?.id}</h3>
            <h1 className='text-6xl font-bold text-cyan-600'>{product?.title}</h1>
            <h4 className='text-2xl text-red-600 font-bold'>${product?.price}</h4>
            <p className='text-xl'>
              <span className='font-bold'>Description : </span>
              {product?.description}
            </p>
            <p className='text-xl'>
              <span className='font-bold'>Rating : </span>
              {product?.rating} <i className="fa-solid fa-star text-yellow-500 fa-sm"></i>
            </p>
            <h3 className='font-bold text-xl my-5'>Client Review</h3>
            {
              product?.reviews?.length > 0 &&
              product?.reviews?.map((item, index) => (
                <div key={index} className='border rounded-xl p-3 my-2'>
                  <h5>
                    <span className='font-bold text-lg text-cyan-500 mt-5'>{item?.reviewerName} : <span className='text-black'>{item?.comment}</span></span>
                    <h5 className='text-gray-500'>{item?.date}</h5>
                  </h5>
                </div>
              ))
            }
            <div className="flex justify-between mt-5 pe-5">
              <button onClick={()=>handleWishlist(product)} className='text-white bg-blue-500 p-2 rounded'><i className="fa-solid fa-heart me-1 text-red-600"></i>ADD TO WISHLIST</button>
              <button onClick={()=>handleCart(product)} className='text-white bg-blue-500 p-2 rounded'><i className="fa-solid fa-cart-plus me-1 text-white"></i>ADD TO CART</button>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default View