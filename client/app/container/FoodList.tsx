"use client"

import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { useAddToCart } from '../hooks/useFetch';
import { CartContext } from '../components/providers/CartProvider';


function FoodList({data}: any) {
    if (!data) {
        return <div>Loading!</div>
    }
    const [addCart, setAddCart]:any = useContext(CartContext);
    // Define a state array to hold the quantity for each item
    const [quantities, setQuantities] = useState(data.map(() => 0));
    const [errors, setErrors] = useState(data.map(() => false))
    
    // Increment the quantity for the specified item index
    const increment = (index: number) => {
        setQuantities((prevQuantities: any) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index]++;
            console.log(newQuantities);
            return newQuantities;
        });
    }

    // Decrement the quantity for the specified item index
    const decrement = (index: number) => {
        if (quantities[index] > 0) {
            setQuantities((prevQuantities: any) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index]--;
                return newQuantities;
            });
        }
    }

    const addToCart = async (items: any, quantity: any, index: number) => {
        
        if (quantity === 0) {
            setErrors((prevErrors:any) => {
                const newErrors = [...prevErrors];
                newErrors[index] = true;
                return newErrors
            });
            return;
        }
        
        setErrors((prevErrors:any)  => {
            const newErrors = [...prevErrors];
            newErrors[index] = false;
            return newErrors;
        });

        await useAddToCart(items, quantity, items.food_name, items.food_image);
        await setAddCart([...addCart, items])
    };

    return (
        <>
            {data.map((items: any, index: any) => (
                <div key={index} className='shadow-xl mb-5 rounded-b-xl'>
                    <Link href={`/food/${index + 1}`}>
                        <img src={items.food_image} className='rounded-t-xl w-full object-cover' />
                    </Link>
                    <div className='p-4'>
                        <span className='flex justify-between'>
                            <p>{items.food_name}</p>
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
                        <div className='flex justify-between mt-7 items-center'>
                            <button 
                                className='bg-primary xl:px-3 xl:py-2 md:px-2 md:py-1 md:text-xs xl:text-sm rounded-3xl font-normal border border-black hover-buttons hover:bg-white' 
                                onClick={() => addToCart(items, quantities[index], index)}
                            >
                                Add to cart
                            </button>
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
                        {errors[index] && <div className='text-sm mt-3 text-red-500'>Please add some quantity!</div>}
                    </div>
                </div>
            ))}
        </>
    );
}

export default FoodList;
