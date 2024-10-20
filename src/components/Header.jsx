import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const userWishlist=useSelector(state=>state.wishlistReducer)
  const userCart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  return (
    <nav className='flex fixed w-full bg-cyan-700 p-5'>
        <Link className='text-white font-bold text-3xl' to={'/'}><i class="fa-solid fa-truck-fast me-1"></i>E-Cart</Link>
        <ul className='flex-1 text-right'>
           { insideHome && <li className='list-none inline-block px-5'><input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} className='rounded p-1' style={{width:'300px'}} type="text" placeholder='Search Products Here' /></li>}
            <li className='list-none inline-block px-5'><Link className='text-white font-bold' to={'/wishlist'}> <i className="fa-solid fa-heart me-1 text-red-600"></i>WishList <span className='bg-black px-2 rounded-2xl'>{userWishlist?.length}</span></Link></li>
            <li className='list-none inline-block px-5'><Link className='text-white font-bold' to={'/cart'}><i className="fa-solid fa-cart-shopping me-1 text-green-600"></i>Cart <span className='bg-black px-2 rounded-2xl'>{userCart?.length}</span></Link></li>
        </ul>
    </nav>
  )
}

export default Header