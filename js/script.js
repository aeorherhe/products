// declare variables

const url = "https://course-api.com/javascript-store-products";
const productsSection = document.querySelector(".products-stn");

async function fecthProducts() {
  productsSection.innerHTML = `<div class="loading-state"></div>`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    productsSection.innerHTML = `<div class="section error-stn"><p>There was an error</p></div>`;
  }
}

const displayProduct = (allProducts) => {
  const allProductLists = allProducts
    .map((product) => {
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: img } = product.fields.image[0];

      return ` <a href="./html/product.html?id=${id}"><div class="product-ctn">
              <img
                src="${img}"
                alt="${title}"
                class="product-img"
              />
              <p class="product-name">${title}</p>
              <p class="product-price">$<span class="price">${
                price / 100
              }</span></p>
            </div></a>`;
    })
    .join(" ");
  productsSection.innerHTML = `<div class="all-products">${allProductLists}</div>`;
};

const startProducts = async () => {
  const data = await fecthProducts();
  displayProduct(data);
};

startProducts();
