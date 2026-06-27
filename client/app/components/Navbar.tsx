"use client"

import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext} from 'react';
import { CartContext } from './providers/CartProvider';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [addCart, setAddCart]:any = useContext(CartContext)
  
  if(!addCart){
    return <div>Loading..</div>
  }
  // useEffect(() => {
  //   // Fetch data only once when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       const data = await useFetch('foodVariants');
  //       setQuantity(data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   // Fetch data only if quantity is empty
  //   if (quantity.length === 0) {
  //     fetchData();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // Empty dependency array, runs only once on mount

  return (
    <>
        <div className="flex items-center">
        <Link href={"/"}><img src="/assets/logo.png" alt="logo"/></Link>
        </div>
        <div className="xl:flex sm:hidden">
            <Link href={'#shop-now'}><p className="p-4 text-sm cursor-pointer">Shop now</p></Link>
            <Link href={'#popular'}><p className="p-4 text-sm cursor-pointer">Popular</p></Link>
            <Link href={'#contact'}><p className="p-4 text-sm cursor-pointer">Contact now</p></Link>
            <figure className="flex items-center px-4 cursor-pointer relative" onClick={()=> setIsOpen(!isOpen)}>
                <img src="/assets/cartIcon.png" alt="cart" className="w-8" />
                <p className='absolute top-0 right-0 text-red-500'>{addCart.length}</p>
            </figure>
            
        </div>
        <div className='md:block xl:hidden'>
          <MenuIcon/>
        </div>
        {isOpen && <div className="absolute right-0 top-0 bg-gray p-5 w-1/5">
          <div className='border-b border-black px-3 py-2 flex justify-between'>
            <h1>Menu</h1>
            <span onClick={()=> setIsOpen(!isOpen)} >
            <CloseIcon className="cursor-pointer" />
            </span>
          </div>
          <Link href={"/foodCart"}><p className="px-3 py-2 hover:bg-primary cursor-pointer" onClick={()=> setIsOpen(!isOpen)}>Cart</p></Link>
          <p className="px-3 py-2 hover:bg-primary cursor-pointer">Theme</p>
        </div>}
    </>
  )
}

export default Navbar
