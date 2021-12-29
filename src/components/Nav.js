import { Data, Screens, service } from "../service";

const navigate = (name) => service.set(Data.SCREEN, name);
const Nav = async () => {
    let cartItems = service.getCart();
    const cartItemIds = Object.keys(cartItems);

    return `
    <nav>
    <ul class="navigations">
        <li id="logo">
            <img src="/static/images/logo.png" alt="logo">
        </li>
        <li class="hide-on-mobile">
            <a href="#" id="home-nav" >Home</a>
        </li>
        <li class="hide-on-mobile">
            <a href="#" id="products-nav">Products</a>
        </li>

    </ul>
    <ul class="actions">
        <li>
            <ul class="user-auth">
            <li><a href="#" id="sign-in-nav" >SignIn</a></li>
            <li><a href="#" id="register-nav" >Register</a></li>
            </ul>

        </li>
        <li>
            <div class="cursor-pointer" id="cart">
               <img  src="/static/images/cart.svg" alt="cart">
               <span>${cartItemIds.length} Items</span>
            </div>
        </li>
    </ul>
</nav>
<div id="cartModal" class="modal">
<section class="modal-content">
   <cart-details></cart-details>
</section>
</div>



    `;
};

function NavInit() {
    const clickFuntions = {
        '#home-nav': () => {
            navigate(Screens.Home);
            service.AppRefresh();
        },
        '#cart': (event) => {
            const openCart = () => {
                document.getElementById('cartModal').style.display = "block";
                event.stopPropagation();
            }

            openCart();

        },
        '#products-nav': () => {
            navigate(Screens.Products);
            service.AppRefresh();
        },

    }
    Object.keys(clickFuntions).forEach((id) => {
        document.querySelector(id).onclick = clickFuntions[id];
    })

}

export { Nav, NavInit };
