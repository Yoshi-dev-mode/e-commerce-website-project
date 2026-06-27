'use client'
import { useContext} from "react";
import { useDeleteOrder } from "../hooks/useFetch";
import { CartContext } from '../components/providers/CartProvider';

function FoodSelection({ data, setData }:any) {

  const [addCart, setAddCart]:any = useContext(CartContext);

  if (!data || data.length === 0) { // Add a null check for data
    return <div>No items available</div>;
  }

  const deleteOrder = async(id:number) => {
    const response = await useDeleteOrder(id)
    setData(data.filter((item: any) => item.user_id !== id));
    setAddCart(data.filter((item: any) => item.user_id !== id))
    return response
  }


  return (
    <>
      {data.map((items: any, index: any) => (
         <div key={index} className='flex flex-col shadow-xl rounded-b-xl food-receipt mr-5 mb-5 image-size'>
          <img src={items.food_image} alt="Fried" className='rounded-t-xl w-full image' />
          <div className='p-4 '>
            <span className='flex justify-between'>
              <p>{items.user_food}</p>
              <p>${items.price_total}</p>
            </span>
            <div className="block">
            <div className='flex justify-between mt-7 items-center'>
              <button className='bg-primary px-3 py-2 rounded-3xl text-sm font-normal border  border-black hover-buttons hover:bg-white'>Edit</button>
              <button className='bg-primary px-3 py-2 rounded-3xl text-sm font-normal border  border-black hover-buttons hover:bg-white' onClick={()=> deleteOrder(items.user_id)}>Remove</button>
            </div>
            </div> 
          </div>
        </div>
      ))}
    </>
  )
}

export default FoodSelection;
