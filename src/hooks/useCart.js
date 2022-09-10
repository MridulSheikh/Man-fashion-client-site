import { useState } from "react"

function useCart() {

   

    const addtodatabase = (id, quantity, price, size, img, name) => {
        const geitem = localStorage.getItem("cart")
        if (geitem) {
            const item = JSON.parse(geitem);
            const query = item.find(i => i.id == id)
            if (!query) {
                item.push({ id: id, quantity: quantity, price: price, size: size, img: img, name: name })
                localStorage.setItem("cart", JSON.stringify(item))
            }
            else {
                const newquantity = query.quantity + quantity
                const newprice = query.price + price
                const newitem = item.filter(i => i.id != id);
                newitem.push({ id: id, quantity: newquantity, price: newprice, size: size, img: img, name: name})
                localStorage.setItem("cart", JSON.stringify(newitem))
            }
        } else {
            const items = [];
            items.push({ id: id, quantity: quantity, price: price, size: size, img: img, name: name })
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }

    return {
        addtodatabase,

    }
}

export default useCart