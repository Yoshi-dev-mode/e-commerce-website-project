'use client'

import FoodSelection from "./FoodSelection"
import Receipt from "./Receipt"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function FoodCart() {
  const [data, setData] = useState(null);

  const { isLoading, isError } = useQuery({
    queryKey: ['deleteItems'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/foodVariants');
      setData(response.data); // Update the data state
      return response;
    }
  });

  
  if (isLoading) return <div>Loading....</div>
  if (isError) return <div>There is something error in the database</div>

  return (
    <section className="px-52 border-b border-black mt-10 flex ">
      <div className='flex-1 flex flex-wrap mr-5'>
        <FoodSelection data={data} setData={setData} /> {/* Pass setData as prop */}
      </div>
      <div className="flex-1">
        {data && <Receipt data={data} />}
      </div>
    </section>
  )
}

export default FoodCart
