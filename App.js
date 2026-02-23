var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});


const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");

cartIcon.addEventListener('click', () =>
  cartTab.classList.add('cart-tab-active')
);

closeBtn.addEventListener('click', () => {
  cartTab.classList.remove('cart-tab-active')
})

let productList = [];
const ShowCards = () => {
  productList.forEach(product => {
    const OrderCard = document.createElement('div');
    OrderCard.classList.add('order-card');

    OrderCard.innerHTML = `
     <div class="card-img">
        <img src="img/burger.png">
     </div>
          <h4>Double Chicken </h4>
          <p class="price">$200</p>
          <a href="#" class="btn">Add to Cart</a>
   `;
   cardList.appendChild(OrderCard);

  })
}


const productApp = () => {
  fetch('products.json').then
    (resolve => resolve.json()).then
    (data => {
      productList = data;
      ShowCards();
    })
}

productApp();