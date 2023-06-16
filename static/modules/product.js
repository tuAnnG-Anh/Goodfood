var productApi = 'http://localhost:3000/product';
var categoryApi = 'http://localhost:3000/categorys';

function start() {
    getProduct(renderProduct);
    getCategory(renderNameCategorys);
    handleCreateProduct();
}
start();

function getProduct(callback) {
    fetch(productApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}
function getCategory(callback) {
    fetch(categoryApi)
        .then(response => {
            return response.json();
        })
        .then(callback)
}
function renderNameCategorys(categorys) {
    var listCategory = document.querySelector('.list-categorys');
    var htmls = categorys.map((category) => {
        return `
            <option value="${category.id}">${category.name_category}</option>
        `
    });
    listCategory.innerHTML += htmls.join('');
}
function renderProduct(products) {
    var listProduct = document.getElementById('list-products');
    products.map(function (product) {
        getCategory((categorys) => {
            var result = categorys.find((category) => {
                return category.id === product.id_category
            })
            listProduct.innerHTML += `
            <tr class = "product-item-${product.id}" >
                <td>${product.id}</td>
                <td>${product.name_product}</td>
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
        });
    });
}
function clearInput() {
    var inputsForm = document.querySelectorAll('form input');
    inputsForm.forEach((input) => {
        input.value = ""
    })
    document.querySelector('form select').selectedIndex = 0;
}
function handleCreateProduct() {
    var createBtn = document.querySelector('.btn-add');
    createBtn.onclick = function () {
        var product_name = document.querySelector('input[name="product_name"]').value
        var product_price = document.querySelector('input[name="product_price"]').value
        var product_quantity = document.querySelector('input[name="product_quantity"]').value
        var category_id = document.querySelector('select').options[document.querySelector('select').selectedIndex].value
        var newProduct = {
            "id_category": Number(category_id),
            "name_product": product_name,
            "price": Number(product_price),
            "quantity": Number(product_quantity)
        }
        createProduct(newProduct);
        clearInput()
    };
}

function createProduct(data) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(productApi, option)
        .then(function (response) {
            return response.json();
        })
}

//delete course
function handleDeleteProduct(id) {
    var option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(productApi + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
    // .then(function () {
    //     var deleteCourse = document.querySelector('.course-item-' + id);
    //     if (deleteCourse) {
    //         deleteCourse.remove();
    //     }
    // })
}

// update course
function handleUpdateProduct(id, idCatetegory) {
    var product_change = document.querySelectorAll('.product-item-' + id + " *")
    var product_name = document.querySelector('input[name="product_name"]')
    var product_price = document.querySelector('input[name="product_price"]')
    var product_quantity = document.querySelector('input[name="product_quantity"]')
    document.querySelector('select').options[document.querySelector('select').selectedIndex = idCatetegory]

    product_name.value = product_change[1].innerText
    product_price.value = product_change[3].innerText
    product_quantity.value = product_change[4].innerText
    var createBtn = document.querySelector('.btn-add');

    createBtn.innerText = 'Save';
    createBtn.onclick = function () {
        updateProduct(id);
        createBtn.innerText = 'Add';
    }
}

function updateProduct(id) {
    var updateProduct = {
        "id_category": document.querySelector('select').options.selectedIndex,
        "name_product": document.querySelector('input[name="product_name"]').value,
        "price": document.querySelector('input[name="product_price"]').value,
        "quantity": document.querySelector('input[name="product_quantity"]').value
    }
    var option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct)
    }
    fetch(productApi + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            // document.querySelector('.course-item-' + id + ' h3').innerText = updateCourse.name;
            // document.querySelector('.course-item-' + id + ' p').innerText = updateCourse.description;
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="description"]').value = '';
        })
}