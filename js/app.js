"use strict";

// dropdown

const dropdown = document.querySelector(".selected-currency-box");
const ul = document.querySelector(".select-currency");
const items = document.querySelectorAll(".items");
const activeCurrency = document.getElementById("selected-currency");

dropdown.addEventListener("click", (e) => {
  e.preventDefault();
  ul.classList.toggle("active");

  removeActive();
});

function removeActive() {
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const res = e.target.innerText;

      activeCurrency.innerHTML = res;

      console.log(activeCurrency);
    });
  });
}
