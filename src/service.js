import axios from 'axios';

class Service {

    currentScreen = 'home';
    catogories = [];
    products = [];
    offers = [];
    items = [];
    cart = {};
    AppRefresh = () => { console.log(this.a) };
    constructor() {

    }
    changeScreen(name) {
        this.currentScreen = name;
    }
    getCart() {
        return this.cart;
    }
    addToCart(id) {
        if (!this.cart[id]) {
            this.cart[id] = 1;
        } else {
            this.cart[id]++;
        }
    }
    removeFromCart(id) {
        if (this.cart[id]) {
            this.cart[id]--;
        }
        if (this.cart[id] === 0) {
            delete this.cart[id];
        }
    }
    async getCatogories() {
        if (this.catogories.length === 0) {
            this.catogories = (await axios.get('/api/categories')).data.filter(e => e.enabled).sort((a, b) => a.order - b.order);
        }
        return this.catogories;
    }
    async getProducts() {
        if (this.products.length === 0) {
            this.products = (await axios.get('/api/products')).data;
        }
        return this.products;
    }
    async getOffers() {
        if (this.offers.length === 0) {
            this.offers = (await axios.get('/api/offers')).data.filter(e => e.isActive).sort((a, b) => a.order - b.order);
        }
        return this.offers;
    }
}

const service = new Service();
export default service;