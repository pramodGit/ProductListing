import loadProducts, { url } from "./product.js";

const categoriesCheckboxes = document.querySelectorAll(
  'input[name="categories"]'
);
let clearAllFilter = document.getElementById("clearAllFilter");
clearAllFilter.addEventListener("click", (event) => {
  event.stopPropagation();
  categoriesCheckboxes.forEach((el) => {
    el.checked = false;
  });

  const productData = [...JSON.parse(localStorage.getItem("apiData"))];
  filterCallback(productData);
});
const selectedCategory = [];
categoriesCheckboxes.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    //console.log(e.target.value);
    e.stopPropagation();
    const productData = [...JSON.parse(localStorage.getItem("apiData"))];

    if (e.target.checked === true) {
      selectedCategory.push(e.target.value);
    } else {
      selectedCategory.splice(selectedCategory.indexOf(e.target.value), 1);
    }
    let result = [];
    //console.log(selectedCategory);
    if (selectedCategory.length === 0) {
      result = [...productData];
    } else {
      for (const item of productData) {
        if (
          selectedCategory.includes(item.category.replace(/[^a-zA-Z0-9]/g, ""))
        ) {
          result.push(item);
        }
      }
    }

    //console.log(result);
    filterCallback(result);
  });
});
function filterCallback(productData) {
  let main = document.getElementById("productList");
  const allItems = main.querySelectorAll(".item");
  for (var i = 0; i < allItems.length; i++) {
    main.removeChild(allItems[i]);
  }
  loadProducts(productData, null);
  localStorage.setItem("filteredData", JSON.stringify(productData));
  let productCount = document.getElementById("productCount");
  productCount.textContent = productData.length;
  let filterPopupResultMsg = document.getElementById("filterPopupResultMsg");
  filterPopupResultMsg.textContent = productData.length;
}
/**Sorting on Select Box */
let productSort = document.getElementById("productSort");
productSort.addEventListener("change", (event) => {
  const productData = [...JSON.parse(localStorage.getItem("filteredData"))];
  //console.log(productData);
  if (event.target.value === "lowest") {
    productData.sort((a, b) => (a.price < b.price ? 1 : -1));
  } else if (event.target.value === "highest") {
    productData.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
  //console.log(productData.length);
  loadProducts(productData, null);
  let productCount = document.getElementById("productCount");
  productCount.textContent = productData.length;
});
/**Menu Drawer */
let menuDrawerCloseIcon = document.getElementById("menuDrawerCloseIcon");
menuDrawerCloseIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  const mainNav = document.getElementById("mainNav");
  mainNav.classList.add("hidden", "visiblity");
  const maskLayer = document.getElementById("maskLayer");
  maskLayer.classList.add("hidden");
});
let menuDrawerIcon = document.getElementById("menuDrawerIcon");
menuDrawerIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  const maskLayer = document.getElementById("maskLayer");
  maskLayer.classList.remove("hidden");
  const mainNav = document.getElementById("mainNav");
  mainNav.classList.remove("hidden", "visiblity");
});
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", (event) => {
  event.stopPropagation();
  const sideBar = document.getElementById("sideBar");
  sideBar.classList.add("visiblity");
  const maskLayer = document.getElementById("maskLayer");
  maskLayer.classList.remove("hidden");
});
const maskLayer = document.getElementById("maskLayer");
maskLayer.addEventListener("click", (event) => {
  event.stopPropagation();
  event.target.classList.add("hidden");
  const sideBar = document.getElementById("sideBar");
  sideBar.classList.remove("visiblity");
  const mainNav = document.getElementById("mainNav");
  mainNav.classList.add("hidden", "visiblity");
});
const sideBarCloseIcon = document.getElementById("sideBarCloseIcon");
const filterPopupBtn = document.getElementById("filterPopupBtn");
sideBarCloseIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  closeSideBar();
});
filterPopupBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  closeSideBar();
});
function closeSideBar() {
  const sideBar = document.getElementById("sideBar");
  sideBar.classList.remove("visiblity");
  const maskLayer = document.getElementById("maskLayer");
  maskLayer.classList.add("hidden");
}
/** */
// products.filter((product) => {
//     const matchesName = product.name
//         .toLowerCase()
//         .includes(nameFilter.toLowerCase());
//     const matchesPrice =
//         priceRange === "" ||
//         (priceRange === "0-50" && product.price <= 50) ||
//         (priceRange === "50-100" && product.price > 50 && product.price <= 100) ||
//         (priceRange === "100+" && product.price > 100);
//     return matchesName && matchesPrice;
// });

/* default limit on page load */
// const limit = {
//     start: 0,
//     end: 10
//   };
//   let moreButton = document.getElementById("loadMoreData");
//   const loadMoreData = (e) => {
//     e.preventDefault();
//     let limit = {
//       start: 10,
//       end: 20
//     };
//     getProducts(url, loadProducts, limit);
//     e.target.style.visibility = "hidden";
//   };
//   moreButton.addEventListener("click", loadMoreData);
