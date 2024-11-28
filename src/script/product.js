//console.log('product js');
export const url = "https://fakestoreapi.com/products";

const createHTMLElement = ( HtmlTag, val, ...attr) => {
    let element = document.createElement(HtmlTag);
    if (val) element.textContent = val;
    for (const [key, value] of Object.entries(...attr)) {
        //console.log(`${key}: ${value}`);
        let attrName = `${key}`;
        let attrValue = `${value}`;
        element.setAttribute(attrName, attrValue);
    }
    return element;
}
export default function loadProducts (dataArray, limit) {
    // console.log(dataArray, limit);
    let finalData = [];
    if(limit) {
        const { start, end } = limit;
        finalData = dataArray.toSpliced(start, end);
    } else {
        finalData = dataArray;
    }
    //console.log(finalData);
    let main = document.getElementById("productList");
    main.innerHTML = '';
    main.classList.remove("shimmer");
    finalData.forEach((d, i) => {
        let div = document.createElement('div');
        div.className = 'item shimmer';
        let img = createHTMLElement('img', null, {'class': 'image', 'alt': d.title, 'src': d.image});
        let figure = document.createElement('figure');
        figure.appendChild(img);
        let figcaption = createHTMLElement('figcaption', d.title, {'class': 'title', 'title': d.title});
        figure.appendChild(figcaption);
        div.appendChild(figure);
        div.classList.remove("shimmer");
        let priceTag = createHTMLElement('div', d.price, {'class': 'price'});
        div.appendChild(priceTag);
        main.prepend(div);
    });
}

