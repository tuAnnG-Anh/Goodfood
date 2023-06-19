var categoryApi = "http://localhost:3000/categorys";

function startCategory() {
  getCategory(renderCategorys);
}

function getCategory(callback) {
  fetch(categoryApi)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}
function renderCategorys(categorys) {
  var listCategory = document.querySelector("#list-categorys");
  var htmls = categorys.map((category) => {
    return `
            <tr class = "category-item-${category.id}" >
                <td>${category.id}</td>
                <td>${category.name_category}</td>
                <td class="w-10">
                    <button class="btn-exit " onclick = "handleUpdatecategory(${category.id})">
                        Exit 
                    </button>
                </td>
                <td class="w-10">
                    <button class=" btn-del" onclick = "handleDeletecategory(event,${category.id})">
                        Delete
                    </button>
                </td>
             </tr>
        `;
  });
  listCategory.innerHTML += htmls.join("");
}

function clearInput() {
  var inputsForm = document.querySelectorAll("form input");
  inputsForm.forEach((input) => {
    input.value = "";
  });
}
function handleCreatecategory(event) {
  event.preventDefault();
  var category_name = document.querySelector(
    'input[name="category_name"]'
  ).value;
  console.log(category_name);
  var newcategory = {
    name_category: category_name,
  };
  createCategory(newcategory);
  clearInput();
}

function createCategory(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(categoryApi, option)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi tạo danh mục.");
      }
      return response.json();
    })
    .then(function (responseData) {
      // Xử lý dữ liệu phản hồi thành công
      console.log(responseData);
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.error(error);
    });
}

//delete course
function handleDeletecategory(e, id) {
  e.preventDefault();
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(categoryApi + "/" + id, option).then(function (response) {
    return response.json();
  });
}

// function delCategory() {}

// update course
function handleUpdatecategory(id, idCatetegory) {
  var category_change = document.querySelectorAll(
    ".category-item-" + id + " *"
  );
  var category_name = document.querySelector('input[name="category_name"]');
  category_name.value = category_change[1].innerText;
  var createBtn = document.querySelector(".btn-add");
  createBtn.innerText = "Save";
  createBtn.onclick = function () {
    updateCategory(id);
    createBtn.innerText = "Add";
  };
}

function updateCategory(id) {
  var updatecategory = {
    name_category: document.querySelector('input[name="category_name"]').value,
  };
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatecategory),
  };
  fetch(categoryApi + "/" + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      document.querySelector('input[name="category_name"]').value = "";
    });
}
