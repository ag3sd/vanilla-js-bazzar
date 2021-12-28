import service from "./service";
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
    ${showIf(service.currentScreen === 'home', '<home-details></home-details>')}
    ${showIf(service.currentScreen === 'products', '<products-details></products-details>')}
    
    </div>
  `

}

export default Layout;