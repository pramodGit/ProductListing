import loadProducts, { url } from './product.js';

const categoriesCheckboxes = document.querySelectorAll('input[name="categories"]');
const selectedCategory = [];
categoriesCheckboxes.forEach(checkBox => {
  checkBox.addEventListener('click', (e) => {
    //console.log(e.target.value);
    let main = document.getElementById("productList");
    const allItems = main.querySelectorAll('.item');
    for (var i = 0; i < allItems.length; i++) {
      main.removeChild(allItems[i]);
    }
    
    const productData = [...(JSON.parse(localStorage.getItem('apiData')))];
    
    if(e.target.checked === true) {
      selectedCategory.push(e.target.value);
    } else {
      selectedCategory.splice(selectedCategory.indexOf(e.target.value), 1);
    }
    let result = [];
    //console.log(selectedCategory);
    if(selectedCategory.length === 0) {
      result = [...productData];
    } else {
      for (const item of productData) {
        if (selectedCategory.includes(item.category.replace(/[^a-zA-Z0-9]/g, ''))) {
          result.push(item);
        } else {
          
        }
      }
    }
    
    //console.log(result);
    loadProducts(result, null);
    localStorage.setItem('filteredData', JSON.stringify(result));
    let productCount = document.getElementById("productCount");
    productCount.textContent = result.length;
  });
});

/**Sorting on Select Box */
let productSort = document.getElementById("productSort");
productSort.addEventListener("change", (event) => {
    const productData = [...(JSON.parse(localStorage.getItem('filteredData')))];
    //console.log(productData);
    if(event.target.value === 'lowest') {
        productData.sort((a, b) => (a.price < b.price ? 1 : -1));
    } else if (event.target.value === 'highest') {
        productData.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    //console.log(productData.length);
    loadProducts(productData, null);
    let productCount = document.getElementById("productCount");
    productCount.textContent = producData.length;
});
/**Menu Drawer */
let menuDrawerCloseIcon = document.getElementById("menuDrawerCloseIcon");
//console.log(menuDrawerIcon[0]);
menuDrawerCloseIcon.addEventListener("click", (event) => {
    //console.log(event.currentTarget);
    const mainNav = document.getElementById("mainNav");
    mainNav.classList.add("hidden", "visiblity");
});
let menuDrawerIcon = document.getElementById("menuDrawerIcon");
menuDrawerIcon.addEventListener("click", (event) => {
    //console.log(event.currentTarget);
    const mainNav = document.getElementById("mainNav");
    mainNav.classList.remove("hidden", "visiblity");
});
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