"use client"

import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useAddToCart } from '../hooks/useFetch';
import { CartContext } from '../components/providers/CartProvider';

function Sweets({data}:any) {
  
    // Define a state array to hold the quantity for each item
    const [quantities, setQuantities] = useState(data.data.map(() => 0));
    const [add, setAdd] = useState(false);
    const [addCart, setAddCart]:any = useContext(CartContext)

    // Increment the quantity for the specified item index
    const increment = (index: number) => {
        setQuantities((prevQuantities:any) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index]++;
            console.log(newQuantities)
            return newQuantities;
        });
    }

    // Decrement the quantity for the specified item index
    const decrement = (index: number) => {
        if (quantities[index] > 0) {
            setQuantities((prevQuantities:any) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index]--;
                return newQuantities;
            });
        }
    }

    const addToCart = async (item: any, quantity: number) => {
        if (quantity === 0) {
            setAdd(true);
            return;
        }
        setAdd(false);
        await useAddToCart(item, quantity, item.sweets_name, item.sweets_image)     
        await setAddCart([...addCart, item])
    };
    
    return (
    <>
      {data.data.map((items: any, index: number) => (
                <div key={index} className='shadow-xl mb-5 rounded-b-xl '>
                    <Link href={`/drinks/sweets/${index + 1}`}><img src={items.sweets_image} alt={items.sweets_image} className='rounded-t-xl cursor-pointer'/></Link>
                    <div className='p-4 '>
                        <span className='flex justify-between'>
                            <p className='w-32'>{items.sweets_name}</p>
                            <p>${items.price}</p>
                        </span>
                        <figure className='mt-1'>
                            <span>
                                <StarBorderOutlinedIcon />
                            </span>
                            <span>
                                <StarBorderOutlinedIcon />
                            </span>
                            <span>
                                <StarBorderOutlinedIcon />
                            </span>
                            <span>
                                <StarBorderOutlinedIcon />
                            </span>
                            <span>
                                <StarBorderOutlinedIcon />
                            </span>
                        </figure>
                        
                        <div className='flex justify-between mt-7 items-center '>
                            <button className='bg-primary px-3 py-2 rounded-3xl text-sm font-normal border border-black hover-buttons hover:bg-white' onClick={() => addToCart(items, quantities[index])}>Add to cart</button>
                            <span className='flex'>
                                <span onClick={() => decrement(index)} className='cursor-pointer'>
                                    <KeyboardArrowLeftOutlinedIcon />
                                </span>
                                <p className='mx-1'>{quantities[index]}</p>
                                <span onClick={() => increment(index)} className='cursor-pointer'>
                                    <KeyboardArrowRightOutlinedIcon />
                                </span>
                            </span>
                        </div>
                        {add && <div className='text-sm mt-3 text-red-500'>Please add some quantity!</div>}
                    </div>
                </div> 
            ))}
    </>
  )
}

export default Sweets
