const h1 = document.querySelector("h1")

const API = "https://nbu.uz/exchange-rates/json"

async function getResult() {
  const res = await fetch(API);
  const result = await res.json();
  result.map(item=>{
    if(item.nbu_buy_price=="") {
      return
    }
    console.log(item);
  })
}
getResult()
console.log(h1);