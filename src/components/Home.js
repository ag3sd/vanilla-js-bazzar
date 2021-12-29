import { loop } from "../utilities";
import { Data, Screens, service } from "../service";


const Home = async () => {
    const catogories = await service.getCatogories();
    const offers = await service.getOffers();
    const Product = (item, index) => {
        return `
    <section class="product-card ${(index % 2 === 0) ? 'flex-d-row' : 'flex-d-row-reverse'}">
        <img src="${item.imageUrl}" alt="${item.name}">
        <section>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <button data-id="${item.id}" class="explore-btn action-btn">Explore ${item.key}</button>
        </section>
    </section>  
`;
    }
    const slider = (item) => {
        return `<div class="mySlides fade">
        <img src="${item.bannerImageUrl}" alt="${item.bannerImageAlt}" style="width:100%">
    </div>`
    }
    const sliderContainer = (arr) => {
        return `
        <div class="slideshow-container">
            ${loop(arr, slider)} 
            <div class="dot-container">
            ${loop(arr, () => '<span class="dot"></span>')}
            </div>
        </div>
        `
    }
    return `
    ${sliderContainer(offers)}
    <article class="products">
    ${loop(catogories, Product)}
    </article>

    `;
}

const HomeInit = () => {
    let slideIndex = 0;
    let timer;
    const startSlideShow = () => {
        let slides = document.getElementsByClassName("mySlides"),
            dots = document.getElementsByClassName("dot");
        console.log('slide', slideIndex);
        if (!slides[slideIndex - 1]?.style && !dots[slideIndex - 1] && slideIndex !== 0) {
            console.log('nslide');
            clearTimeout(timer);
            return;
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";

        timer = setTimeout(startSlideShow, 2000);
    }
    startSlideShow();
    document.querySelectorAll('.explore-btn').forEach(e => {
        e.onclick = (event) => {
            service.set(Data.SCREEN, Screens.Products);
            service.set(Data.CATEGORY, event.target.dataset.id);
            service.AppRefresh();
        }
    })
}
export { Home, HomeInit };
