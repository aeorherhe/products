const productContainer = document.querySelector(".single-product-wrap");
const url = "https://course-api.com/javascript-store-single-product";

const fecthProducts = async () => {
  productContainer.innerHTML = `<div class="loading-state"></div>`;
  try {
    const idSearch = new URLSearchParams(window.location.search);
    const productID = idSearch.get("id");
    const response = await fetch(`${url}?id=${productID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productContainer.innerHTML = `<div class="section error-stn"><p>There was an error</p></div>`;
  }
};

const displayProduct = (product) => {
  //   color, desc, name, price, img, company
  const {
    name,
    colors,
    company,
    description: desc,
    price,
    image,
  } = product.fields;
  const { url: img } = image[0];
  document.title = name.toUpperCase();

  const colorsArr = colors
    .map((eachColor) => {
      return `<span class="product-color" style="background: ${eachColor}"></span>`;
    })
    .join(" ");
  productContainer.innerHTML = `<section class="single-product-ctn">
            <img
              src="${img}"
              alt=""
              class="product-img"
            />
            <div class="product-info-wrap">
              <h1>${name}</h1>
              <p>${company}</p>
              <p class="product-price">$<span class="price">${
                price / 100
              }</span></p>
              <div class="colors-ctn">
              ${colorsArr}
              </div>
              <p class="product-info">
                ${desc}
              </p>
              <button class="btn add-cart">Add to cart</button>
            </div>
          </section>`;
};

const startProducts = async () => {
  const data = await fecthProducts();
  displayProduct(data);
};

startProducts();
