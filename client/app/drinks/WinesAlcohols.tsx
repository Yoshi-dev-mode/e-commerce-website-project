function WinesAlcohols() {
  return (
    <>
      <h1 className="text-xl font-semibold mb-3">Wines & Alcohols</h1>
        <span className='border-b-2 border-primary w-32 block'></span>
        <main className="flex justify-center gap-4 my-10">
          <div className="flex justify-center flex-col gap-4">
            <div className="relative">
              <img src="/assets/wineMain.jpg" alt="Main pic of wine"/>
              <span className="wines text-white">
                <h1 className="text-xl font-bold my-3">Savor the Moment</h1>
                <p className="text-sm font-light ">Embrace the elegance: Uncork a world of indulgence with our exquisite wine, where every sip is a journey to perfection.</p>
              </span>
            </div>
            <figure className="flex justify-between h-full gap-4">
              <div className="relative">
                <img src="/assets/redWine.jpg" alt="red wine" className="h-full" />
                <div className="overlay">
                  <p className='text'>Red Wine</p>
                </div>
              </div>
              <div className="relative">
                <img src="/assets/wineMan.jpg" alt="wine man" className="h-full" />
                <div className="overlay">
                    <p className='text'>Sweet Wine</p>
                  </div>
                </div>
            </figure>
          </div>
          <div className="relative">
            <img src="/assets/cocktail.jpg" alt="cocktail" />
            <div className="overlay">
                <p className='text text-center'>Cherry Cocktail</p>
            </div>
          </div>
        </main>
    </>
  )
}

export default WinesAlcohols
