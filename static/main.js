var productApi = "http://localhost:3000/product";
var categoryApi = "http://localhost:3000/categorys";

window.addEventListener("load", function () {
  var loadingOverlay = document.getElementById("loading-overlay");
  var content = document.getElementById("content");
  // Loại bỏ phần overlay và hiển thị nội dung sau khi tải hoàn thành
  setTimeout(() => {
    loadingOverlay.style.display = "none";
    content.style.opacity = 1;
    content.style.display = "block";
  }, 1000);
  // getProduct(renderProductMain);
});
function getProduct(callback) {
  fetch(productApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function getCategory(callback) {
  fetch(categoryApi)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}
function renderProductMain(products) {
  var listProduct = document.querySelector(".food-item-all");
  products.map((product) => {
    getCategory((categorys) => {
      var result = categorys.find((category) => {
        return category.id === product.id_category;
      });
      listProduct.innerHTML += `
            <div class="food-item play-on-scroll ${result.name_category.toLowerCase()}-type">
                <div class="item-wrap">
                  <div class="item-image">
                    <div
                      class="img-food bg-img scale-up-center"
                      style="
                        background-image: url(${product.product_img});
                      "
                    ></div>
                  </div>
                  <div class="item-info align-items-center">
                    <div>
                      <h3>${product.name_product}</h3>
                      <span>${product.price}$</span>
                    </div>
                    <div class="shopping-bag">
                      <i class="bx bx-cart-alt primary-color"></i>
                    </div>
                  </div>
                </div>
              </div>
        `;
    });
  });
}
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
//cart
var addToCart = document.querySelectorAll(".shopping-bag .bx-cart-alt");
addToCart.forEach((item, index) => {
  item.onclick = (e) => {
    var cartnotice = document.querySelector(".cart-notice");
    var cartList = document.querySelector(".cart-list-item");
    var nameProduct = e.target
      .closest(".food-item")
      .querySelector("h3").innerText;
    var imgUrl = e.target.closest(".food-item").querySelector(".img-food");
    var priceProduct = e.target
      .closest(".food-item")
      .querySelector("span").innerText;
    console.log();
    cartList.innerHTML += `
        <li class="cart-item">
        <div class="cart-item-img">
            <img src="${
              imgUrl.style.backgroundImage.match(/url\((['"]?)(.*?)\1\)/)[2]
            }" alt="">
        </div>
        <div class="cart-item-info">
            <div class="row row-cart-item">
                <div class="cart-item-name">
                    <h5>
                        ${nameProduct}
                    </h5>
                </div>
                <div class="cart-item-price">
                    <span class="">${priceProduct}</span>
                    <div class="cart-item-quantity">
                        <span>
                            x
                        </span>
                        <button class="change-quantity-button sub-button" onclick="reduceCartItem(event)">-</button>
                        <span class="js-quantity">1</span>
                        <button class="change-quantity-button add-button" onclick="augementCartItem(event)">+</button>
                    </div>
                </div>
            </div>
            <div class="row row-cart-item">
                <span>Salad</span>
                <span class="del-cart-item" onclick="delCartItem(event)">Xoá</span>
            </div>
        </div>
    </li>
        `;
    cartnotice.innerHTML = `${Number(cartnotice.innerHTML) + 1}`;
    shoppingList.classList.remove("no-cart");
  };
});

//change quantity cart
function delCartItem(e) {
  let shoppingList = document.querySelector(".shopping-list");

  var cartnotice = document.querySelector(".cart-notice");
  let cartItems = document.querySelectorAll(".cart-item");
  let cartItemsLength = cartItems.length;
  e.target.parentNode.closest(".cart-item").remove();
  cartnotice.innerText--;
  cartItemsLength--;
  if (cartItemsLength === 0) {
    shoppingList.classList.add("no-cart");
  }
}
function reduceCartItem(e) {
  var cartnotice = document.querySelector(".cart-notice");
  let quantityCart = e.target.parentNode.querySelector(".js-quantity");
  if (Number(quantityCart.innerText) >= 1 && Number(cartnotice.innerText) > 0) {
    quantityCart.innerText = `${Number(quantityCart.innerText) - 1}`;
    cartnotice.innerText = `${Number(cartnotice.innerText) - 1}`;
  }
  if (Number(quantityCart.innerText) == 0) {
    e.target.parentNode.closest(".cart-item").remove();
  }
  if (Number(cartnotice.innerText) === 0) {
    shoppingList.classList.add("no-cart");
  }
}
function augementCartItem(e) {
  var cartnotice = document.querySelector(".cart-notice");
  let quantityCart = e.target.parentNode.querySelector(".js-quantity");
  quantityCart.innerText = `${Number(quantityCart.innerText) + 1}`;
  cartnotice.innerHTML = `${Number(cartnotice.innerHTML) + 1}`;
}

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
