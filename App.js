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
const cartList = document.querySelector(".cart-list")
const total = document.querySelector('.cart-price');

// Cart 
cartIcon.addEventListener('click', () =>
  cartTab.classList.add('cart-tab-active')
);

closeBtn.addEventListener('click', () => {
  cartTab.classList.remove('cart-tab-active')
})
// **

// Products
let productList = [];
let cartProducts = [];

// const UpadetTotals = () => {
//   let totalPrice = 0;
//   document.querySelectorAll('.item').forEach(item => {
//     const price = item.querySelector('.item-price').textContent.replace('$', '');
//     totalPrice = totalPrice + price;
//   })
//   total.textContent = `$${totalPrice}`;
// }


const ShowCards = () => {
  productList.forEach(product => {
    const OrderCard = document.createElement('div');
    OrderCard.classList.add('order-card');

    OrderCard.innerHTML = `
     <div class="card-img">
        <img src="${product.image}">
     </div>
          <h4>${product.name}</h4>
          <p class="price">${product.price}</p>
          <a href="#" class="btn cart-btn">Add to Cart</a>
   `;
    cardList.appendChild(OrderCard);

    //  Add to Cart 
    const cardBtn = OrderCard.querySelector('.cart-btn');
    cardBtn.addEventListener('click', (e) => {
      e.preventDefault()
      addToCart(product)
    })
  });
};

const addToCart = (product) => {
  // Counting Extra item Adding
  const excitingProduct = cartProducts.find(item => item.id == product.id);
  if (excitingProduct) {
    alert('item in Your cart');
    return;
  }

  cartProducts.push(product)
  // **

  let quantitys = 1;
  let price = product.price.replace('$', '')
  const cartItem = document.createElement('div')
  cartItem.classList.add('item')

  cartItem.innerHTML = `
               <div class="item-img-container">
                            <img src="${product.image}" >
                        </div>
                        <div class="detail">
                            <h4>${product.name}</h4>
                            <h4 class="item-price">${product.price}</h4>
                        </div>
                        <div class="flex ">
                            <a href="#" class="quantity-btn minus" >
                                <i class="fa-solid fa-minus"></i>
                            </a>
                            <h4 class="quantity">${quantitys}</h4>
                            <a href="#" class="quantity-btn  plus" >
                                <i class="fa-solid fa-plus"></i>
                            </a>
                        </div>
`

  cartList.appendChild(cartItem)
  // UpadetTotals();
  const plusBtn = cartItem.querySelector('.plus');
  const minusBtn = cartItem.querySelector('.minus');
  const quantityValues = cartItem.querySelector('.quantity');
  const totalPrice = cartItem.querySelector('.item-price');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault()
    quantitys++;
    quantityValues.textContent = quantitys;

    totalPrice.textContent = `$${price * quantitys}`
  })

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (quantitys > 1) {
      quantitys--;
      quantityValues.textContent = quantitys;
      totalPrice.textContent = `$${price * quantitys}`
    } else {
      cartItem.classList.add('slide-out')
      setTimeout(() => {
        cartItem.remove();
        cartProducts = cartProducts.filter(item => item.id !== product.id)
      }, 300)
    }
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

// **