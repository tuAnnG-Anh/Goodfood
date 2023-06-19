window.addEventListener("load", function () {
  var loadingOverlay = document.getElementById("loading-overlay");
  var content = document.getElementById("content");
  // Loại bỏ phần overlay và hiển thị nội dung sau khi tải hoàn thành
  setTimeout(() => {
    loadingOverlay.style.display = "none";
    content.style.opacity = 1;
    content.style.display = "block";
  }, 1000);
  startProduct();
  load("product");
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
  let currItem = document.querySelector(".sidebar-item.active");
  currItem.classList.remove("active");
  e.target.classList.add("active");
  load(nameFileHtml);
  closeSidebar();
  if (nameFileHtml == "product") {
    startProduct();
  } else {
    startCategory();
  }
}
const targetEl = document.querySelector(".container");
const load = (nameFileHtml) => {
  fetch(`/${nameFileHtml}.html`)
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
    window.location.href = "/index.html";
  }
}
