window.addEventListener("load", function () {
  var loadingOverlay = document.getElementById("loading-overlay");
  var content = document.getElementById("content");
  // Loại bỏ phần overlay và hiển thị nội dung sau khi tải hoàn thành
  setTimeout(() => {
    loadingOverlay.style.display = "none";
    content.style.opacity = 1;
    content.style.display = "block";
  }, 1000);
  loadHtml("product");
  startProduct();
});

function openSidebar() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.classList.add("open");
}
function closeSidebar() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("open");
}
function productManager(e, nameFileHtml) {
  if (nameFileHtml == "product") {
    startProduct();
  } else {
    startCategory();
  }
  let currItem = document.querySelector(".sidebar-item.active");
  currItem.classList.remove("active");
  e.target.classList.add("active");
  loadHtml(nameFileHtml);
  closeSidebar();
}

// function loadHtml(filename) {
//   let xhttp;
//   let element = document.querySelector(".container");
//   let file = filename;
//   if (file) {
//     xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//       if (this.readyState == 4) {
//         if (this.status == 200) {
//           element.innerHTML = this.responseText;
//         }
//         if (this.status == 404) {
//           element.innerHTML = "<h1>Page not found.</h1>";
//         }
//       }
//     };
//     // window.location.href = `/${file}`;
//     xhttp.open("GET", `./${file}.html`, true);
//     xhttp.send();
//     return;
//   }
// }

const targetEl = document.querySelector(".container");
const loadHtml = (nameFileHtml) => {
  fetch(`./${nameFileHtml}.html`)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
    .then((htmlSnippet) => {
      targetEl.innerHTML = htmlSnippet;
    });
};
function logout() {
  if (confirm("Are you sure you want to sign out")) {
    window.location.href = "../Goodfood/index.html";
  }
}
