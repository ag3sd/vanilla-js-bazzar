import User from './components/User'
import { Nav, NavInit } from './components/Nav';
import { Home, HomeInit } from './components/Home';
import Layout from './layout';
import { service } from "./service";
import { Products, ProductsInit } from './components/Products';
import { Cart, CartInit } from './components/Cart';
const AsyncFunction = (async () => { }).constructor;
const AppModule = async () => {
    const components = [
        {
            name: 'Layout',
            tagName: 'app-layout',
            template: Layout
        },
        {
            name: 'Nav',
            tagName: 'nav-details',
            template: Nav,
            init: NavInit
        },
        {
            name: 'Home',
            tagName: 'home-details',
            template: Home,
            init: HomeInit
        },
        {
            name: 'Products',
            tagName: 'products-details',
            template: Products,
            init: ProductsInit
        },
        {
            name: 'Cart',
            tagName: 'cart-details',
            template: Cart,
            init: CartInit
        },
    ];
    // constructor() {
    components.forEach((component) => {
        let cl = class extends HTMLElement {
            a = 1;
            constructor() {
                super();
                this.init();
                if (component.name === 'Layout') {
                    this.a = 2;
                    const refresh = this.init;
                    service.AppRefresh = refresh.bind(this);
                }
            }
            log() {
                console.log(this.a);
            }
            async init() {
                console.log(component.name);
                if (User instanceof AsyncFunction) {
                    this.innerHTML = await component.template();
                } else {
                    this.innerHTML = component.template();
                }
                if (component.init instanceof Function) {
                    component.init(this)
                }
            }
            requestUpdate() {
                this.init();
            }
        };
        Object.defineProperty(cl, 'name', { value: component.name });
        window.customElements.define(component.tagName, cl);
    })
    // }
}
export default AppModule;
