export async function useFetch(url:string) {
    try {
        const response = await fetch(`http://localhost:5000/${url}`, {
        method: 'GET'
    });

    const data = await response.json();
    return data
    }
    catch(error){
        console.log(error)
    }
}

export async function useFetchId(url:string, id:number){
    const response = await fetch(`http://localhost:5000/${url}/${id}`);
    const data = await response.json();
    return data
}

export async function useDeleteOrder(id:number){
    try {
        const res = await fetch(`http://localhost:5000/foodVariants/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
}

export async function useAddToCart(item:any, quantity:number, name:any, image:any){
    try {
        
        const total = item.price * quantity;

        const body = {
            user_food: name,
            food_image: image,
            price_total: total,
            quantity: quantity
        };
        
        const response = await fetch("http://localhost:5000/foodVariants", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            console.log("Item added to cart successfully");
            // Perform any additional actions upon successful addition to cart
        } else {
            console.error("Failed to add item to cart");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

export async function useSoloAddToCart(food:any, image:any, total:any, quantity:any){
    const body = {
        user_food: food,
        food_image: image,
        price_total: total,
        quantity: quantity
    }
    
    const response = await fetch('http://localhost:5000/foodVariants', {
      headers: {'Content-type':'application/json'},
      method: 'POST',
      body: JSON.stringify(body)
    })

    if(response.ok){
      console.log('Successfully added');
    } else {
      console.log('There is an error in burst section');
    };
}
  

