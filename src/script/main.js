import '../css/style.css';
import '../css/style-media-query.css';

import loadProducts, { url } from './product.js';

/* default limit on page load */
const limit = {
  start: 0,
  end: 10
};
let moreButton = document.getElementById("loadMoreData");
const loadMoreData = (e) => {
  e.preventDefault();
  let limit = {
    start: 10,
    end: 20
  };
  getProducts(url, loadProducts, limit);
  e.target.style.visibility = "hidden";
};
moreButton.addEventListener("click", loadMoreData);


/** calling getProducts with required parameters */
getProducts(url, loadProducts, limit);

async function getProducts(url, callBack, limit) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    localStorage.setItem('apiData', JSON.stringify(json));

    callBack(json, limit);

  } catch (error) {
    console.error(error.message);
  }
}
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
  });
});
/**SOrting on Select Box */
let productSort = document.getElementById("productSort");
productSort.addEventListener("change", (event) => {
  const productData = [...(JSON.parse(localStorage.getItem('apiData')))];
  productData.sort((a, b) => (a.price < b.price ? 1 : -1));
  loadProducts(productData, null);
});

