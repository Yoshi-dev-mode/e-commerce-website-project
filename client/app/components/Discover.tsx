function Discover() {
  return (
    <>
      <img src="/assets/discover.jpg" className="w-full brightness-50"/>
      <div className="discover md:left-1/2">
        <h2 className="text-white xl:text-4xl md:text-2xl ">Discover Our Delicious Food <br/>Selection</h2>
        <p className="text-white md:text-sm">Browse through our wide range of fresh and tasty products.</p>
        <div className="mt-5">
            <button className="xl:px-3 xl:py-2 md:px-2 md:py-1 bg-primary border border-white mr-3">Shop</button>
            <button className="xl:px-3 xl:py-2 md:px-2 md:py-1 text-white border border-white">Learn more</button>
        </div>
      </div>
    </>
  )
}

export default Discover
