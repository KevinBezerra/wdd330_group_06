import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart");

        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }

        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    async renderProductDetails() {
        const brandName = document.querySelector(".product-detail__brand_name");
        const nameWithoutBrand = document.querySelector(".product-detail__without_brand_name");
        const price = document.querySelector(".product-card__price");
        const discount = document.querySelector(".product-card__price_discount");
        const color = document.querySelector(".product__color");
        const description = document.querySelector(".product__description");
        const img = document.querySelector(".product-detail__img");

        brandName.innerHTML = this.product.Brand.Name;
        nameWithoutBrand.innerHTML = this.product.NameWithoutBrand;
        price.innerHTML = "$" + this.product.FinalPrice;
        color.innerHTML = this.product.Colors[0].ColorName;
        description.innerHTML = this.product.DescriptionHtmlSimple;
        img.src = this.product.Image;

        // Get the discount
        const initialDiscount = Math.fround(this.product.SuggestedRetailPrice - this.product.FinalPrice).toString()
        const formattedDiscount = `${initialDiscount}`.substring(0, initialDiscount.indexOf(".") + 3)
        discount.innerHTML = `Discount: ${formattedDiscount}`
    }
}