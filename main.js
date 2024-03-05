const categoriesInput = document.querySelector("#categoriesInput");
const pageLimitInput = document.querySelector("#pageLimitInput");

let category = null;
let pageLimit = 5;

// Event Listeners
categoriesInput.addEventListener("change", (e) => {
  category = e.target.value;
  console.log(e);
  getProducts();
});

pageLimitInput.addEventListener("change", (e) => {
  pageLimit = e.target.value;
  getProducts();
});

//Populate select option all Categories
async function getCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");

  const data = await response.json();
  const categories = data.filter((category) => category);
  //console.log(categories);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    categoriesInput.append(option);
  });
}

/*
//const getCategories = () => {
fetch("https://fakestoreapi.com/products/categories")
  .then((response) => response.json())

  .then((categories) => showInfo(categories));

function showInfo(categories) {
  const select = document.querySelector("#categoriesInput");
  for (let category of categories) {
    let name = category;

    const option = generateOption(name);
    categoriesInput.appendChild(option);
  }
  document.body.appendChild(select);
}
function generateOption(text) {
  const option = document.createElement("option");
  option.text = text;
  //option.value = value;
  return option;
}
//};*/

//GetProducts
const getProducts = () => {
  let url = "https://fakestoreapi.com/products";

  //url += "?limit=" + pageLimit;
  if (category) url += "/category/" + category;

  fetch(url)
    .then((res) => {
      return res.json(); // converted to object
    })
    .then((objectData) => {
      // console.log(objectData);
      let tableData = "";
      objectData.map((data) => {
        tableData += `<tr>
      <td>
      <div class="img-card d-flex justify-content-between align-items-center pt-1">
        <h6 class="price">$${data.price}</h6>
   
        <span class= "wish"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
      </svg></span>
      </div>

      <a target="_blank" href="${data.image}">
      <img src="${data.image}" alt="Paris" style="width:50px">
    </a>

 
      <div
      class="d-flex justify-content-between align-items-center pt-1">
        <i class="fa fa-star-o rating-star">${data.rating.rate}</i>

        <span class= "buy btn btn-outline-warning btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
      </svg></span>
      </div></td>
      <td>${data.title}</td>

      <td>${data.category}</td>

    </tr>`;
      });
      document.getElementById("t_body").innerHTML = tableData;
    });
};
getCategories();
getProducts();
