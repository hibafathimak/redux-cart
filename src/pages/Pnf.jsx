import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'


const Pnf = () => {
  return (
    <>
    <Header/>
    <div style={{paddingTop:'100px',height:'90vh'}} className='flex justify-center items-center flex-col'>
    <img height={'400px'} src="https://cdn.dribbble.com/users/7813810/screenshots/18154034/media/43ccc055c325428ec8a9b12a5057e516.gif" alt="" />
    <h1 className='text-2xl font-bold'>Page Not Found. Click Home to redirect to Home Page</h1>
    <Link to={'/'} className='bg-cyan-600 font-bold rounded p-2 text-white'>Home</Link>
    </div>
    </>
  )
}

export default Pnf