var productApi = "http://localhost:3000/product";
var categoryApi = "http://localhost:3000/categorys";

function startProduct() {
  getProduct(renderProduct);
  getCategory(renderNameCategorys);
}

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
function renderNameCategorys(categorys) {
  var listCategory = document.querySelector(".list-categorys");
  var htmls = `<option value="default">--Please choose an option--</option>`;
  htmls += categorys.map((category) => {
    return `
            <option value="${category.id}">${category.name_category}</option>
        `;
  });
  if (listCategory !== null) {
    listCategory.innerHTML = htmls;
  }
}
function renderProduct(products) {
  var listProduct = document.getElementById("list-products");
  listProduct.innerHTML = `<tr class="fw-600">
          <th>ID</th>
          <th>Product Name</th>
          <th>Product Image</th>
          <th>Category Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
          <th></th>
        </tr>`;
  products.map((product) => {
    getCategory((categorys) => {
      var result = categorys.find((category) => {
        return category.id === product.id_category;
      });
      if (result !== undefined && listProduct !== null) {
        listProduct.innerHTML += `
            <tr class = "product-item-${product.id}" >
                <td>${product.id}</td>
                <td>${product.name_product}</td>
                <td><img src="${product.product_img}" alt="" class="img-preview" /></td>

                <td>${result.name_category}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td class="w-10">
                    <button class="btn-exit " onclick = "handleUpdateProduct(${product.id}, ${product.id_category})">
                        Exit 
                    </button>
                </td>
                <td class="w-10">
                    <button class=" btn-del" onclick = "handleDeleteProduct(${product.id})">
                        Delete
                    </button>
                </td>
             </tr>
        `;
      }
    });
  });
}
function loadImgPreview() {
  var imgPreview = document.querySelector(".img-preview_1");
  imgPreview.style.display = "block";
  var product_img = document.querySelector('input[name="product_img"]')
    .files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      imgPreview.src = reader.result;
    },
    false
  );
  if (product_img) {
    reader.readAsDataURL(product_img);
  }
}

function handleFileSelection(event) {
  const file = event.target.files[0];
  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png"
    ) {
      loadImgPreview();
      // File có đuôi phù hợp
      console.log("File hợp lệ:", fileName);
    } else {
      // Đuôi file không hợp lệ
      alert("Đuôi file không hợp lệ");
    }
  }
}

function clearInput() {
  var inputsForm = document.querySelectorAll("form input");
  document
    .querySelector(".img-preview_1")
    .setAttribute("style", "display:none");
  inputsForm.forEach((input) => {
    input.value = "";
  });
  document.querySelector("form select").selectedIndex = 0;
}
function handleCreateProduct(event) {
  event.preventDefault();
  var product_name = document.querySelector('input[name="product_name"]').value;
  var product_img = document
    .querySelector(".img-preview_1")
    .getAttribute("src");
  var product_price = document.querySelector(
    'input[name="product_price"]'
  ).value;
  var product_quantity = document.querySelector(
    'input[name="product_quantity"]'
  ).value;
  var category_id =
    document.querySelector("select").options[
      document.querySelector("select").selectedIndex
    ].value;
  var newProduct = {
    id_category: Number(category_id),
    name_product: product_name,
    product_img: product_img,
    price: Number(product_price),
    quantity: Number(product_quantity),
  };
  clearInput();

  createProduct(newProduct);
  getProduct(renderProduct);
}

function createProduct(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi, option).then(function (response) {
    return response.json();
  });
}

//delete course
function handleDeleteProduct(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(productApi + "/" + id, option).then(function (response) {
    return response.json();
  });
  getProduct(renderProduct);

  // .then(function () {
  //     var deleteCourse = document.querySelector('.course-item-' + id);
  //     if (deleteCourse) {
  //         deleteCourse.remove();
  //     }
  // })
}

// update course
function handleUpdateProduct(id, idCatetegory) {
  var product_change = document.querySelectorAll(".product-item-" + id + " *");
  var product_name = document.querySelector('input[name="product_name"]');
  var imgPreview = document.querySelector(".img-preview_1");
  var product_price = document.querySelector('input[name="product_price"]');
  var product_quantity = document.querySelector(
    'input[name="product_quantity"]'
  );
  document.querySelector("select").options[
    (document.querySelector("select").selectedIndex = idCatetegory)
  ];
  product_name.value = product_change[1].innerText;
  imgPreview.src = product_change[3].src;
  imgPreview.style.display = "block";
  product_price.value = product_change[5].innerText;
  product_quantity.value = product_change[6].innerText;
  var createBtn = document.querySelector(".btn-add");
  createBtn.innerText = "Save";
  createBtn.onclick = function () {
    updateProduct(id);
    createBtn.innerText = "Add";
    getProduct(renderProduct);
  };
}

function updateProduct(id) {
  var updateProduct = {
    id_category: document.querySelector("select").options.selectedIndex,
    name_product: document.querySelector('input[name="product_name"]').value,
    product_img: document.querySelector(".img-preview_1").getAttribute("src"),
    price: document.querySelector('input[name="product_price"]').value,
    quantity: document.querySelector('input[name="product_quantity"]').value,
  };
  clearInput();
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateProduct),
  };
  fetch(productApi + "/" + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      // document.querySelector('.course-item-' + id + ' h3').innerText = updateCourse.name;
      // document.querySelector('.course-item-' + id + ' p').innerText = updateCourse.description;
      document.querySelector('input[name="name"]').value = "";
      document.querySelector('input[name="description"]').value = "";
    });
}
