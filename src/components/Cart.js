import service from "../service";
import { loop } from "../utilities";

const Cart = async () => {
    let cartItems = service.getCart();
    const products = await service.getProducts();
    const cartItemIds = Object.keys(cartItems);
    const cartProducts = products.filter(e => cartItemIds.includes(e.id));
    const itemInCart = (item) => {
        return `
        <div class="cart-card">
    <img src="${item.imageURL}" alt="${item.name}" />
    <div>
        <span>${item.name}</span>
        <div>
            <span class="icon minus" data-id="${item.id}" >-</span> 
            <span id="item-${item.id}">${cartItems[item.id]}</span> 
            <span class="icon plus" data-id="${item.id}" >+</span> x Rs.${item.price}
        </div>
        <div>
            <span>Rs.${cartItems[item.id] * item.price}</span>
        </div>
    </div>
</div>
        `
    }

    return `
    <div>My Cart(${cartItemIds.length}item(s))<span class="close">&times;</span></div>
    ${loop(cartProducts, itemInCart)}
    <div>
    <img src="/images/lowest-price.png" alt="lowest-price" />
    <span> You won't find it cheaper anywhere else.</span>
    </div>
    `;
}
const CartInit = (that) => {

    const updateCart = () => {
        that.requestUpdate();
        // const cartItems = service.getCart();
        // document.getElementById(`item-${id}`).innerText = cartItems[id];
    }

    document.querySelectorAll('.plus').forEach(e => {
        e.onclick = (event) => {
            const itId = event.target.dataset.id;
            service.addToCart(itId);
            updateCart()
        }
    });
    document.querySelectorAll('.minus').forEach(e => {
        e.onclick = (event) => {
            const itId = event.target.dataset.id;
            service.removeFromCart(itId);
            updateCart();
        }
    });
}

export { Cart, CartInit };
