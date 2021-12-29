import { Data, Screens, service } from "../service";
import { loop, showIf } from "../utilities";

const Cart = async () => {
    let cartItems = service.getCart();
    const products = await service.getProducts();
    const cartItemIds = Object.keys(cartItems);
    const cartProducts = products.filter(e => cartItemIds.includes(e.id));
    let totalCost = 0;
    if (cartProducts.length > 1) {
        cartProducts.forEach((e) => {
            totalCost += cartItems[e.id] * e.price;
        });
    } else if (cartProducts.length === 1) {
        totalCost = cartItems[cartProducts[0].id] * cartProducts[0].price;
    }
    const itemInCart = (item) => {
        return `
        <div class="cart-card">
    <img src="${item.imageURL}" alt="${item.name}" />
    <div>
        <span class="title">${item.name}</span>
        <div class="pricing">
            <div class="item-count">
                <span class="icon minus" data-id="${item.id}" >-</span> 
                <span id="item-${item.id}">${cartItems[item.id]}</span> 
                <span class="icon plus" data-id="${item.id}" >+</span><span> x Rs.${item.price}</span>
            </div>
            <span>Rs.${cartItems[item.id] * item.price}</span>
        </div>
    </div>
</div>
        `
    }
    const proceedButton = () => {
        if (totalCost) {
            return `
            <div class="proceed">
                <span>Proceed to Checkout</span>
                <span>Rs.${totalCost} <span> > </span></span>
            </div>`;
        } else {
            return `<span>Start Shopping</span>`;
        }
    }
    const noItems = () => {
        return `
        <div class="no-items">
            <h4>No items in your cart</h4>
            <p> Your favourite items are just a click away</p>
        </div>
        `;

    }
    return `
    <div class="cart-header">
        My Cart(${cartItemIds.length} ${cartItemIds.length > 1 ? 'items' : 'item'})
        <span class="close cursor-pointer">&times;</span>
    </div>
    <div class="cart-body">
        ${cartProducts.length ? loop(cartProducts, itemInCart) : noItems()}
    </div>
    <div class="cart-tail">
        <img src="/images/lowest-price.png" alt="lowest-price" />
        <span> You won't find it cheaper anywhere else.</span>
    </div>
    <div class="cart-footer">
        ${showIf(cartProducts.length !== 0, '<span> Promocode can be applied in Payment page</span>')}
        <div class="checkout action-btn">
            ${proceedButton()}
        </div>
    </div>
    `;
}
const CartInit = (that) => {
    const updateCart = () => {
        that.requestUpdate();
        // const cartItems = service.getCart();
        // document.getElementById(`item-${id}`).innerText = cartItems[id];
    }
    document.querySelector('.cart-header .close').onclick = () => {
        document.getElementById('cartModal').style.display = "none";
    }
    document.querySelector('.cart-footer .checkout').onclick = () => {
        service.set(Data.SCREEN, Screens.Products);
        service.AppRefresh();
    }
    document.querySelectorAll('.plus').forEach(e => {
        e.onclick = (event) => {
            const itId = event.target.dataset.id;
            service.addToCart(itId);
            updateCart();
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
