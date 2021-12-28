import service from "../service";
import { loop } from "../utilities";

let selectedProduct;
const Products = async () => {
    const catogories = await service.getCatogories();
    if (!selectedProduct) {
        selectedProduct = catogories[0].id;
    }
    const allProducts = await service.getProducts();
    const products = allProducts.filter(e => e.category === selectedProduct);
    const menuItem = (item) => `<a id="${item.id}" href="#">${item.name}</a>`;
    const dropDownOption = (item) => `<option value="${item.id}" ${item.id === selectedProduct ? 'selected=true' : ''}" >${item.name}</option>`;

    const itemCard = (item) => {
        return `
        <div class="card">
        <span>${item.name}</span>
        <img src="${item.imageURL}" alt="${item.name}">
        <p>${item.description}</p>
        <div class="hide-on-mobile">
        <span>MRP Rs.${item.price}</span>
        <button data-id="${item.id}" class="action-btn buy">Buy Now</button>
        </div>
        <button data-id="${item.id}"  class="show-on-mobile action-btn buy-mobile">Buy Now @Rs.${item.price}</button>
    </div>
        `
    };
    return `
    <div class="show-on-mobile" id="mobile-catogory">
        <select name="catogories" id="select-catogory" >
        ${loop(catogories, dropDownOption)}
        </select>
    </div>
<section id="product-page">
    <aside id="side-menu" class="hide-on-mobile">
        ${loop(catogories, menuItem)}
    </aside>

    <section id="catogory-content">
        ${loop(products, itemCard)}
    </section>
</section>
`
}

const ProductsInit = (that) => {
    document.getElementById(`${selectedProduct}`).classList.add('active');
    document.getElementById('side-menu').onclick = (event) => {
        selectedProduct = event.target.id;
        document.getElementById(selectedProduct).classList.add('active');
        that.requestUpdate();
    }
    document.getElementById('select-catogory').onchange = (event) => {
        selectedProduct = event.target.value;
        document.getElementById(selectedProduct).classList.add('active');
        that.requestUpdate();
    }
    const buy = (event) => {
        const buyingId = event.target.dataset.id;
        service.addToCart(buyingId);
        service.AppRefresh();
    }
    document.querySelectorAll('.buy-mobile').forEach(element => {
        element.onclick = (event) => {
            buy(event);
        }
    });
    document.querySelectorAll('.buy').forEach(element => {
        element.onclick = (event) => {
            buy(event);
        }
    });
}

export { Products, ProductsInit };