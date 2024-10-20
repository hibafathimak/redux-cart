import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'

const Home = () => {
 
 const {allProducts,loading,error} = useSelector(state=>state.productReducer)
//  console.log(allProducts,loading,error);
const [currentPage,setCurrentPage]=useState(1)
const productPerPage=8
const TotalPage=Math.ceil(allProducts?.length/productPerPage)
const currentPageLastProductIndex=productPerPage*currentPage
const currentPageFirstProductIndex=currentPageLastProductIndex-productPerPage
const visibleProductsCards=allProducts?.slice(currentPageFirstProductIndex,currentPageLastProductIndex)

const navigateToNextPage=()=>{
if(currentPage!=TotalPage){
  setCurrentPage(currentPage+1)
}
}
const navigateToPreviousPage=()=>{
  if(currentPage!=1){
    setCurrentPage(currentPage-1)
  }
  }

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(fetchAllProducts())
},[])
  return (
    <>
    <Header insideHome={true}/>
    <div style={{paddingTop:'100px'}} className='p-4 mx-auto container '>
        { loading ?
        <div className="flex justify-center items-center my-5 text-xl">
          <img width={'100px'} src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="loading" />
          Loading ...
        </div>
        : 
        <>
        <div className="grid grid-cols-4 gap-4">
          {
            allProducts?.length>0 ?
            visibleProductsCards?.map(product=>(
              <div key={product?.id} className="rounded border p-2 shadow">
            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
            <div className="text-center">
              <h3 className="text-3xl font-bold">{product?.title}</h3>
              <Link className='bg-cyan-700 p-1 mt-3 text-white rounded inline-block' to={`${product?.id}/view`}>View More</Link>
            </div>
          </div>
            ))
            :
            <div className="flex justify-center items-center text-red-500">
              No Products are available!!
            </div>
          }
        </div>
        <div className="text-center my-5">
          <span onClick={navigateToPreviousPage} className='cursor-pointer'><i className="fa-solid fa-backward me-5"></i></span>
          <span className='text-2xl font-bold'>{currentPage} of {TotalPage}</span>
          <span onClick={navigateToNextPage} className='cursor-pointer'><i className="fa-solid fa-forward ms-5"></i></span>

        </div>
        </>}
    </div>
    </>
  )
}

export default Home