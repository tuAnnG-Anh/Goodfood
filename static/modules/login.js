let apiUser = "http://localhost:3000/users";

//login
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const bntLogin = document.querySelector("#login-submit");

// get user
const getUser = async () => {
  const response = await fetch(apiUser);
  const data = await response.json();
  return data;
};

// login
bntLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value == "" || password.value == "") {
    alert("Please enter your username and password");
  } else {
    getUser().then((data) => {
      const user = data.find(
        (user) =>
          user.username == username.value && user.password == password.value
      );
      if (user) {
        alert("Login success");
        window.location.href = "/admin.html";
      } else {
        alert("Login failed");
      }
    });
  }
});
