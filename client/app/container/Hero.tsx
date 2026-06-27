function Hero() {
  return (
    <>
      <div className="flex flex-col justify-center md:text-center xl:text-left">
        <div>
            <h1 className="text-5xl font-light">Discover Delicious <br/> Food Delivered to <br/>Your Doorstep</h1>
        </div>
        <div className="mt-4">
            <button className="mr-4 bg-primary px-5 py-3 rounded-3xl border border-black hover-buttons hover:opacity-70">Order now</button>
            <button className="px-5 py-3 rounded-3xl border border-black hover-buttons hover:opacity-70">Learn more</button>
        </div>
      </div>
      <div className="flex xl:items-end md:hidden xl:flex">
        <img src="/assets/hero.png" alt="hero img" style={{height: "600px"}} className="md:hidden xl:block" />
      </div>
    </>
  )
}

export default Hero
