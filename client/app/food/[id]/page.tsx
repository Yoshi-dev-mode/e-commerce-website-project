'use client'

import Link from 'next/link';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useEffect, useState } from 'react';
import { useFetchId, useSoloAddToCart } from '@/app/hooks/useFetch';

function Foods({params}:any) {
    const [quantity, setQuantity] = useState(0)
    const [data, setData] = useState(null);
    const [error, setError] = useState(false)
    

    useEffect(()=>{
        useFetchId('foods', params.id).then((item)=> {
            setData(item)
        })
    },[params.id])
    const increment = () => {
    setQuantity(quantity => quantity + 1)
  }

  const decrement = () => {
      if(quantity > 0){
          setQuantity(quantity => quantity - 1);
      }
    }

    if(!data){
        return null
    }

    const { food_image, price, body, food_name } = data[0];

    const total = price * quantity

    const postItems = async() => {
      if(quantity === 0) {
        setError(true);
        return;
      } else {
        setError(false)
      }
      await useSoloAddToCart(food_name, food_image, total, quantity)
    }
  return (
    <>
    <div className="sites px-52 border-b border-black  flex justify-center items-center relative">
      <span className='absolute top-10 left-52 '>
        <Link href={'/drinks'}>
          <KeyboardArrowLeftOutlinedIcon className='text-6xl  hover:text-primary hover-buttons cursor-pointer'/>
        </Link>  
      </span>
      <img src={food_image} alt="citrus burst" />
      <div className='ml-20'>
        <span className='flex items-center justify-between mb-7 relative'>
          <h1 className='text-2xl font-bold'>{food_name}</h1>
          <span className='block border-b-2 border-primary w-32 absolute top-10'></span>
          <p className='text-2xl font-bold'>${price}</p>
        </span>
        <p>{body}</p>
        <span className='flex items-center mt-7'>
          <button className='bg-primary px-3 py-2 text-sm font-normal border border-black hover-buttons hover:bg-white' onClick={postItems}>Add to cart</button>
          <span className='flex ml-5'>
              <span onClick={decrement} className='cursor-pointer'>
                  <KeyboardArrowLeftOutlinedIcon />
              </span>
              <p className='mx-1'>{quantity}</p>
              <span onClick={increment} className='cursor-pointer'>
                  <KeyboardArrowRightOutlinedIcon />
              </span>
          </span>
        </span>
        {error && <div className='mt-5 text-red-500'>Please add some quantity!</div>}
      </div>
    </div>
    </>
  )
}

export default Foods