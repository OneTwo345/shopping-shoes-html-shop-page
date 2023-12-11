let categoryContent = $("#categoryContent");
let productContent = $("#productContent");
let companyContent = $("#companyContent");
let colorContent = $("#colorContent");
let priceContent = $("#priceContent");
let searchProduct = $("#inputSearch");

const urlApp = "https://jsonserver-vercel-api.vercel.app";
const urlCategory = urlApp + "/categories";
const urlProduct = urlApp + "/products";
const urlCompany = urlApp + "/companies";
const urlColor = urlApp + "/colors";
const urlPrice = urlApp + "/prices";

async function fetchALlCategories() {
  const response = await fetch(urlCategory);
  const categories = await response.json();
  return categories;
}

async function fetchALlCompanies() {
  const response = await fetch(urlCompany);
  const companies = await response.json();
  return companies;
}

async function fetchALlPrices() {
  const response = await fetch(urlPrice);
  const prices = await response.json();
  return prices;
}

async function fetchALlColors() {
  const response = await fetch(urlColor);
  const colors = await response.json();
  return colors;
}

async function fetchALlProducts() {
  const response = await fetch(urlProduct);
  const products = await response.json();
  return products;
}

getAllCategories = async () => {
  const categories = await fetchALlCategories();
  const renderedCategories = categories.map((item) => {
    return renderCategories(item);
  });
  const str = renderedCategories.join("");
  categoryContent.append(str);
};

getAllCompanies = async () => {
  const companies = await fetchALlCompanies();
  const renderedCompanies = companies.map((item, index) => {
    const idCompany = index + 1;
    return renderCompanies(item, idCompany);
  });
  const str = renderedCompanies.join("");
  companyContent.append(str);
};

getAllPrices = async () => {
  const prices = await fetchALlPrices();
  const renderedPrices = prices.map((item, index) => {
    const idPrices = index + 1;
    return renderPrices(item, idPrices);
  });
  const str = renderedPrices.join("");
  priceContent.append(str);
};

getAllColors = async () => {
  const colors = await fetchALlColors();
  const renderedColors = colors.map((item, index) => {
    const idColor = index + 1;
    return renderColors(item, idColor);
  });
  const str = renderedColors.join("");
  colorContent.append(str);
};

getAllProducts = async () => {
  const products = await fetchALlProducts();
  const renderedProducts = products.map((item) => {
    return renderProducts(item);
  });
  const str = renderedProducts.join("");
  productContent.append(str);
};

const renderCategories = (category) => {
  return `<div class="form-check py-1">
            <input class="form-check-input" type="radio" name="category" id="cat_${category.id}" value="${category.name}">
            <label for="cat_${category.id}" role="button" class="form-check-label ">${category.name}</label>
          </div>
            `;
};

const renderCompanies = (company, idCompany) => {
  return `
        <button class="btn btn-sm btn-outline-secondary me-1 " type="button" id=cpn_${idCompany} value="${company.name}">
            ${company.name}
        </button>
    `;
};

const renderPrices = (price, idPrices) => {
  return `
    <div class="form-check py-1">
      <input class="form-check-input" type="radio" name="price" id="price_${idPrices}" value="${price.value}">
      <label role="button" for="price_${idPrices}" class="form-check-label ">${price.name}</label>
    </div>
    `;
};

const renderColors = (color, idColor) => {
  return `
    <div class="form-check py-1">
      <input class="form-check-input" type="radio" name="color" 
          id="color_${idColor}"value="${color.name}" style="background-color: ${color.name};">
      <label role="button" for="color_${idColor}" class="form-check-label ">${color.name}</label>
    </div>
    `;
};

const renderProducts = (product) => {
  let stars = "";
  for (let i = 0; i < product.star; i++) {
    stars += '<i class="fas fa-star" style="color: #eeff00;"></i>';
  }
  return `
  <div class="col-md-3 mb-4 ">
    <div class="card d-flex align-items-center pt-2">
      <img src="${product.img}" class="card-image-top" alt="${product.title}" style="width: 70%;">
      <div class="card-body">
        <p class="fw-bolder">${product.title}</p>
        <div class="d-flex align-items-center mb-">${stars}
          <div class="me-1">
            <div class="fs-10">
              <h6>(${product.reviews} reviewer ) </h6>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <del class="line-through me-2">${product.prevPrice}</del>
            <span>${product.newPrice}</span>
          </div>
          <button class="icon-button">
            <i class="fa-solid fa-cart-arrow-down fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
`;
};
const getContent = $(async () => {
  await getAllCompanies();
  await getAllCategories();
  await getAllPrices();
  await getAllColors();
  await getAllProducts();
  await getOption();
});

async function getOption() {
  $(document).on("click", "button.btn-sm", function () {
    $("button.btn-sm").removeClass("active");
    $(this).addClass("active");
    filterProduct();
  });
  $(document).on("click", 'input[name="category"]', function () {
    const labels = $('label[for^="cat_"]');
    labels.removeClass("text-decoration-underline fw-bolder");
    const selectedLabel = $(`label[for="${this.id}"]`);
    selectedLabel.addClass("text-decoration-underline fw-bolder");
    filterProduct();
  });

  $(document).on("click", 'input[name="color"]', function () {
    const labels = $('label[for^="color_"]');
    labels.removeClass("text-decoration-underline fw-bolder");
    const selectedLabel = $(`label[for="${this.id}"]`);
    selectedLabel.addClass("text-decoration-underline fw-bolder");
    filterProduct();
  });
  $(document).on("click", 'input[name="price"]', function () {
    const labels = $('label[for^="price_"]');
    labels.removeClass("text-decoration-underline fw-bolder");
    const selectedLabel = $(`label[for="${this.id}"]`);

    selectedLabel.addClass("text-decoration-underline fw-bolder");
    filterProduct();
  });
  $(document).on("input", "input.form-control-sm", function (event) {
    event.preventDefault();
    const inputSearch = $(this).val();
    console.log(inputSearch);
    filterProduct();
  });
}

const filterProduct = async () => {
  const inputSearch = searchProduct.val().trim();
  const inputCompany = $(".btn-sm.active").val();
  const inputColor = $('input[name="color"]:checked').val();
  const inputCategory = $('input[name="category"]:checked').val();
  const inputdPrice = $('input[name="price"]:checked').val();
  const parts = inputdPrice.split(",");

  const beforePrice = parseInt(parts[0]);
  const afterPrice = parseInt(parts[1]);

  // console.log(inputSearch);
  const products = await fetchALlProducts();
  const filteredProducts = products.filter(
    (item) =>
      (inputCompany === "allCompany" ||
        item.company.toLowerCase() === inputCompany.toLowerCase()) &&
      (inputSearch == null ||
        item.title.toLowerCase().includes(inputSearch.toLowerCase())) &&
      ((beforePrice === 0 && afterPrice === 0) ||
        (beforePrice <= item.newPrice && afterPrice >= item.newPrice) ||
        (beforePrice === 150 &&
          afterPrice === 150 &&
          afterPrice < item.newPrice)) &&
      (inputColor === "allColor" ||
        item.color.toLowerCase() === inputColor.toLowerCase()) &&
      (inputCategory === "allCategory" ||
        item.category.toLowerCase() === inputCategory.toLowerCase())
  );
  console.log(filteredProducts);
  productContent.empty();
  filteredProducts.forEach((item) => {
    const str = renderProducts(item);
    productContent.append(str);
  });
};
