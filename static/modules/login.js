let apiUser = "http://localhost:3000/users";

function login() {
  getUser(handleLogin);
}
function getUser(callback) {
  fetch(apiUser)
    .then((respose) => {
      return respose.json();
    })
    .then(callback);
}

function handleLogin(data) {
  let userName = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  data.forEach((item) => {
    if (item.username === userName && item.password === password) {
      window.location.href = "/admin.html";
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác");
    }
  });
}
handleLogin();
