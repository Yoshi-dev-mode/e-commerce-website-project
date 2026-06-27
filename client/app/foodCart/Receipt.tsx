"use client"

function Receipt({data}:any) {
    const total = data.map((costs:any) => {
        return Number(costs.price_total)
    })

    const totalSum = total.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
    const fixedTotalSum = totalSum.toFixed(2)
    const cost = {
        tax : 1.17,
        subTax: 1.17
    }

    const result = Number((totalSum + cost.tax + cost.subTax).toFixed(2));

    return (
    <>
      <div className="border border-black p-10 mb-5">
        <main>
            <h1 className="text-center header">Order-501</h1>
            <p className="text-center text-sm">FAST food corporation <br />
            2413, New Cleverland<br/>
            888-88888888
            </p>  
        </main>
        <div>
            <section className="flex border-b border-black py-3">
                <p className="mr-10">Item</p>
                <p className="flex-1">Qty.</p>
                <p className="flex-1 text-right">Price</p> 
            </section>
            <section className="my-3 border-b border-black py-3">
            {data.map((item:any, index:any) => (
                <div key={index} className="flex justify-between mb-3">
                    <p>{item.user_food} x <span>{item.quantity}</span></p>
                    <p>${item.price_total}</p>
                </div>
            ))}
            </section>

            <section>
                <div className="flex justify-between mb-3">
                    <p>Subtotal</p>
                    <p>${fixedTotalSum}</p>
                </div>
                <div className="flex justify-between mb-3">
                    <p>Tax</p>
                    <p>${cost.tax}</p>
                </div>
                <div className="flex justify-between mb-3">
                    <p>Salestax</p>
                    <p>${cost.tax}</p>
                </div>
                <div className="flex justify-between mb-3">
                    <p>Total</p>
                    <p>${result}</p>
                </div>
            </section>

            <section className="mt-10">
                <div className="flex justify-between mb-3">
                    <p>Authorization</p>
                    <p>891723891273</p>
                </div>
                <div className="flex justify-between mb-3">
                    <p>Payment code</p>
                    <p>89237128937</p>
                </div>
            </section>
        </div>

        <main>
             <p className="text-center text-sm text-gray">Customer's copy <br/>
             Thanks for ordering <br />
             FAST food
             </p>
        </main>
      </div>
    </>
  )
}

export default Receipt
