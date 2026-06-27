import Link from 'next/link'

function FDrinkList() {
  return (
    <>
      <h1 className="header text-center">Most selling drinks</h1>
      <p className="text-sm text-center">Indulge in a variety of delicious and nutritious drink <br />products carefully curated for your satisfaction.</p>
      <main className="flex justify-between items-center mt-10">
        <div>
          <Link href={'/drinks/burstDrinks/1'}>
            <div className='relative'>
              <img src="/assets/orangeDrink.jpg" className="w-full mb-5 rounded-xl" alt="orangeDrink" />
              <div className="overlay">
                <p className='text'>Citrus Burst</p>
              </div>
            </div>
          </Link>
          <Link href={'/drinks/burstDrinks/2'}>
          <div className='relative'>
            <img src="/assets/yellowDrink.jpg" className="w-full mb-5 rounded-xl" alt="yellowDrink" />
            <div className="overlay">
              <p className='text'>Yellow Citrus</p>
            </div>
          </div>
          </Link>
          <Link href={'/drinks/burstDrinks/3'}>
          <div className="relative">
            <img src="/assets/clearDrink.jpg"  className="rounded-xl mb-10" alt="clearDrink" />
            <div className="overlay">
              <p className='text'>Clear Spartan</p>
            </div>
          </div>
          </Link>
            <Link href={'/drinks'}><button className='bg-primary px-3 py-2 rounded-3xl text-sm font-normal border border-black'>Find more</button></Link>
        </div>
        <div>
            <img src="/assets/mainDrink.jpg" alt="mainDrink" />
        </div>
      </main>
    </>
  )
}

export default FDrinkList
