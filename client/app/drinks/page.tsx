'use client'

import Sweets from "./Sweets"
import WinesAlcohols from "./WinesAlcohols"
import CannedDrinks from "./CannedDrinks"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function DrinksPage() {

  const {data: cannedData, isError: cannedIsError, isLoading: cannedIsLoading} = useQuery({
    queryKey: ['canned'],
    queryFn: async()=> {
      const data = await axios.get('http://localhost:5000/canned')
      return data
    }
  })

  const {data: sweetsData, isError: sweetsIsError, isLoading: sweetsIsLoading} = useQuery({
    queryKey: ['sweets'],
    queryFn: async()=> {
      const data = await axios.get('http://localhost:5000/sweets')
      return data
    }
  })

  if (cannedIsLoading || sweetsIsLoading) return <div>Loading...</div>

  return (
    <div className="px-52 border-b border-black mt-10 ">
      <section className="flex justify-center flex-col">
        <h1 className="text-center text-2xl font-bold mb-3">Choose your drink</h1>
        <span className='border-b-2 border-primary w-32 m-auto'></span>
      </section>
      <div>
        <h2 className="text-xl font-semibold mb-3">Sweets</h2>
        <span className='block border-b-2 border-primary w-14 '></span>
        <section className = "flex justify-between mt-5">
          <Sweets data={sweetsData} />
        </section>
      </div>
      <section className="my-10">
        <WinesAlcohols />
      </section>
      <section className="my-10">
        <h2 className="text-xl font-semibold mb-3">Canned Drinks</h2>
        <span className='block border-b-2 border-primary w-14 '></span>
        <section className = "flex justify-between mt-5">
          <CannedDrinks data={cannedData}/>
        </section>
      </section>
    </div>
  )
}

export default DrinksPage
