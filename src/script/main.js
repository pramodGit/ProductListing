import '../css/base.css';
import '../css/style.css';
import '../css/header.css';
import '../css/banner.css';
import '../css/middle.css';
import '../css/sidebar.css';

import './events.js';
import loadProducts, { url } from './product.js';


/** calling getProducts with required parameters */
getProducts(url, loadProducts, null);

async function getProducts(url, callBack, limit) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    localStorage.setItem('apiData', JSON.stringify(json));
    localStorage.setItem('filteredData', JSON.stringify(json));

    callBack(json, limit);

  } catch (error) {
    console.error(error.message);
  }
}

