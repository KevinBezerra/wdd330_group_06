import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"
import { renderCartSuperscript } from "./utils.mjs";

renderCartSuperscript();

const category = "tents"
const listElement = document.querySelector(".product-list")
const dataSource = new ProductData(category)
const productList = new ProductList(category, dataSource, listElement)
productList.init()