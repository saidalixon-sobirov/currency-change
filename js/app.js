"use strict";

const dropdown = document.querySelector(".selected-currency-box");
const ul = document.querySelector(".select-currency");
const activeCurrency = document.getElementById("selected-currency");
const refreshData = document.querySelector(".data");
const tableBody = document.querySelector("tbody");
const inputData = document.querySelector("#enter-num");
const resultData = document.querySelector("#result-currency");

// API
const API = "https://nbu.uz/exchange-rates/json";

// calc currency
    
getActiveCurrency()

async function getActiveCurrency() {
  const req = await fetch(API);
  const result = await req.json();
  result.forEach((item) => {
    if (item.code == activeCurrency.innerHTML) {
      console.log(item.cb_price);
      getActiveCurrency();
      inputData.addEventListener("input", (e) => {
        resultData.value = (e.target.value * item.cb_price).toFixed(2);
      });
    }
  });
}

dropdown.addEventListener("click", () => {
  ul.classList.toggle("active");
});

getResult();

async function getResult() {
  const req = await fetch(API);
  const result = await req.json();

  result.forEach((item) => {
    createMenu(item.code);
  });
}

function createMenu(item) {
  const li = document.createElement("li");
  li.classList.add("items");
  li.innerHTML += `${item}`;
  ul.appendChild(li);
  activeCurrencySelected();
}

function activeCurrencySelected() {
  ul.addEventListener("click", (e) => {

    if (e.target.classList.contains("items")) {
      activeCurrency.innerHTML = e.target.textContent;
      inputData.value = "";
      resultData.value = "";
    }
  });
}

// get currency table

async function getData() {
  const request = await fetch(API);
  const res = await request.json();

  res.map((item) => {
    refreshData.innerHTML = `Ma'lumotlar <span style="color: red"> <i>( ${item.date} )</i></span> xolati bo'yicha nbu.uz saytidan olinmoqda.`;
    createTable(item);
  });
}

getData();

function createTable(data) {
  const tableRow = document.createElement("tr");

  if (!data.nbu_cell_price == "") {
    tableRow.innerHTML += `
    <tr>
      <td>
        <img
          src="https://nbu.uz/local/templates/nbu/images/flags/${data.code}.png"
          alt="${data.code}"
        />
        <span class="currency-name"> &nbsp; 1 ${data.title}, ${data.code}</span>
      </td>
      <td>
        <span class="nbu_buy_price">${data.nbu_buy_price}</span>
      </td>
      <td>
        <span class="nbu_cell_price">${data.nbu_cell_price}</span>
      </td>
    </tr>
`;
  }

  tableBody.append(tableRow);
}
