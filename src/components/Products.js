import { loop } from "../utilities";
import { service, Data } from "../service";

let selectedCategory;
const Products = async () => {
    const catogories = await service.getCatogories();
    selectedCategory = service.current[Data.CATEGORY];
    if (!selectedCategory) {
        selectedCategory = catogories[0].id;
    }
    const allProducts = await service.getProducts();
    const products = allProducts.filter(e => e.category === selectedCategory);
    const menuItem = (item) => `<a id="${item.id}" href="#">${item.name}</a>`;
    const dropDownOption = (item) => `<option value="${item.id}" ${item.id === selectedCategory ? 'selected=true' : ''}" >${item.name}</option>`;

    const itemCard = (item) => {
        return `
        <div class="card">
            <div class="title">
                <span>${item.name}</span>
            </div>
            <div class="card-body">
                <img src="${item.imageURL}" alt="${item.name}">
                <div>
                    <p>${item.description}</p>
                    <button data-id="${item.id}"  class="show-on-mobile action-btn buy-mobile">Buy Now @MRP Rs.${item.price}</button>
                </div>
                <div class="hide-on-mobile action">
                    <span>MRP Rs.${item.price}</span>
                    <button data-id="${item.id}" class="action-btn buy">Buy Now</button>
                </div>
            </div>
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
    const selectCategory = () => {
        service.set(Data.CATEGORY, selectedCategory);
        document.getElementById(selectedCategory).classList.add('active');
        that.requestUpdate();
    }
    document.getElementById(`${selectedCategory}`).classList.add('active');
    document.getElementById('side-menu').onclick = (event) => {
        selectedCategory = event.target.id;
        selectCategory();
    }
    document.getElementById('select-catogory').onchange = (event) => {
        selectedCategory = event.target.value;
        selectCategory();
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