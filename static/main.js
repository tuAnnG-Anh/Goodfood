// back tot top
let backToTopBtn = document.querySelector("#back-to-top");
window.onscroll = () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
};
let menuItems = document.getElementsByClassName("menu-nav-item");

Array.from(menuItems).forEach((item, index) => {
  item.onclick = (e) => {
    let currMenu = document.querySelector(".menu-nav-item.active");
    currMenu.classList.remove("active");
    item.classList.add("active");
  };
});
//category

let foodMenuList = document.querySelector(".food-item-all");
let foodCategory = document.querySelector(".food-category");

let categories = foodCategory.querySelectorAll("button");

Array.from(categories).forEach((item, index) => {
  item.onclick = (e) => {
    let currCat = foodCategory.querySelector("button.active");
    currCat.classList.remove("active");
    e.target.classList.add("active");
    foodMenuList.classList =
      "food-item-all row " + e.target.getAttribute("data-food-type");
  };
});

//scroll
let scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
let elToShow = document.querySelectorAll(".play-on-scroll");

isElInViewPort = (el) => {
  let rect = el.getBoundingClientRect();

  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
};

loop = () => {
  elToShow.forEach((item, index) => {
    if (isElInViewPort(item)) {
      item.classList.add("start");
    } else {
      item.classList.remove("start");
    }
  });

  scroll(loop);
};

loop();
//mobile
let bottomNavItems = document.querySelectorAll(".mb-nav-item");

let bottomMove = document.querySelector(".mb-move-item");

bottomNavItems.forEach((item, index) => {
  item.onclick = (e) => {
    let crrItem = document.querySelector(".mb-nav-item.active");
    crrItem.classList.remove("active");
    item.classList.add("active");
    bottomMove.style.left = index * 25 + "%";
  };
});
// //cart
// var cartList = document.querySelector(".cart-list-item");
// var addToCart = document.querySelectorAll(".shopping-bag .bx-cart-alt");
// var cartnotice = document.querySelector(".cart-notice");
// addToCart.forEach((item, index) => {
//   item.onclick = (e) => {
//     cartList.innerHTML += `
//         <li class="cart-item">
//         <div class="cart-item-img">
//             <img src="./assets/sina-piryae-bBzjWthTqb8-unsplash.jpg" alt="">
//         </div>
//         <div class="cart-item-info">
//             <div class="row row-cart-item">
//                 <div class="cart-item-name">
//                     <h5>
//                         Lorem
//                     </h5>
//                 </div>
//                 <div class="cart-item-price">
//                     <span class="">120$</span>
//                     <div class="cart-item-quantity">
//                         <span>
//                             x
//                         </span>
//                         <button class="change-quantity-button sub-button">-</button>
//                         <span class="js-quantity">1</span>
//                         <button class="change-quantity-button add-button">+</button>
//                     </div>
//                 </div>
//             </div>
//             <div class="row row-cart-item">
//                 <span>Salad</span>
//                 <span class="del-cart-item">Xoá</span>
//             </div>
//         </div>
//     </li>
//         `;
//     cartnotice.innerHTML = `${Number(cartnotice.innerHTML) + 1}`;
//     shoppingList.classList.remove("no-cart");
//   };
// });

// let shoppingList = document.querySelector(".shopping-list");
// //change quantity cart
// function changeCart() {
//   let cartItems = document.querySelectorAll(".cart-item");

//   let cartItemsLength = cartItems.length;
//   cartItems.forEach((item, index) => {
//     let delItem = item.querySelector(".del-cart-item");
//     delItem.onclick = (e) => {
//       item.remove();
//       cartItemsLength--;
//       if (cartItemsLength === 0) {
//         shoppingList.classList.add("no-cart");
//       }
//     };
//   });
// }

// cartItems.forEach((item, index) => {
//   let quantityCart = item.querySelector(".js-quantity");
//   let addItem = item.querySelector(".add-button");
//   let subItem = item.querySelector(".sub-button");
//   addItem.onclick = (e) => {
//     quantityCart.innerText = `${Number(quantityCart.innerText) + 1}`;
//     cartnotice.innerHTML = `${Number(cartnotice.innerHTML) + 1}`;
//   };
//   subItem.onclick = (e) => {
//     if (
//       Number(quantityCart.innerText) > 1 &&
//       Number(cartnotice.innerHTML) > 0
//     ) {
//       quantityCart.innerText = `${Number(quantityCart.innerText) - 1}`;
//       cartnotice.innerHTML = `${Number(cartnotice.innerHTML) - 1}`;
//     } else {
//       item.remove();
//       cartItemsLength--;
//       if (cartItemsLength === 0) {
//         shoppingList.classList.add("no-cart");
//       }
//     }
//   };
// });
//login
const loginBtn = document.querySelector(".login");
// console.log(loginBtn);
const loginForm = document.querySelector(".js-login");
// const modalStop = document.querySelector(".js-modal-container");
const loginClose = document.querySelector(".js-login-close");
// var header = document.getElementById("header");
// var moblieMenu = document.getElementById("js-menu-btn");

function showLoginForm() {
  loginForm.classList.add("open");
}

function hideLoginForm() {
  loginForm.classList.remove("open");
}
loginBtn.addEventListener("click", showLoginForm);

loginClose.addEventListener("click", hideLoginForm);
// modal.addEventListener("click", hideLoginForm);
// modalStop.addEventListener("click", function (e) {
//   e.stopPropagation();
// });
