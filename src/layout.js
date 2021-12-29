import { Data, Screens, service } from "./service";
import { showIf } from "./utilities";


function Layout() {
  console.log('App refresh')
  window.onclick = function (event) {
    if (event.target.id == 'cartModal') {
      document.getElementById('cartModal').style.display = "none";
    }
  }
  return `
  <nav-details></nav-details>
    <div class="container">
    ${showIf(service.current[Data.SCREEN] === Screens.Home, '<home-details></home-details>')}
    ${showIf(service.current[Data.SCREEN] === Screens.Products, '<products-details></products-details>')}
    
    </div>
    <footer>
    Copyright 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd
    </footer>
  `

}

export default Layout;