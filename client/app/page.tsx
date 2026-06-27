"use client"

import {Discover} from "./components/index";
import {Hero, FoodList, FDrinkList, Form} from "./container/index"
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

export default function Home() {

  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(()=> {
    useFetch('foods').then((items:any) => {
      setData(items)
    }).catch(()=>{
      setError(true)
      setMessage(prevMessage => prevMessage = 'There is an Error in food section');
    })
  },[]);

  return (
    <>
      <section className="hero flex xl:justify-between xl:px-52 border-b border-black md:px-12 md:justify-center">
        <Hero />
      </section>
      <section className="flex flex-col xl:px-52 border-b border-black mt-10 md:px-12" id='shop-now'>
        <h1 className='mb-5 header' >Most selling products</h1>
        <div className='grid grid-cols-4 gap-4'>
          <FoodList data={data} />
        </div>
        {error && <div className="text-red-500">{message}</div>}
        <div className="relative my-10">
          <Discover />
        </div>
      </section>
      <section className="px-52 border-b border-black mt-10 md:px-12" id='popular'>
        <FDrinkList />
      </section>
      <section className="px-52 border-b border-black mt-10 md:px-12 " id='contact'>
        <Form />
      </section>
    </>
  );
}
