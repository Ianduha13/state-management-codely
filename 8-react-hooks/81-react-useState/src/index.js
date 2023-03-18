import React, { useState, useEffect, useReducer, useDebugValue } from "react";
import { render } from "react-dom";

import Products from "./products";
import ShoppingCart from "./shoppingcart";

import { retrieveProducts } from "./products/repositories/ProductsRepository";

const App = () => {
  const [products, setProducts] = useState({});
  const shoppingcart = {};

  useEffect(() => {
    retrieveProducts().then((products) => {
      setProducts(
        products.reduce((result, product) => {
          result[product.id] = product;
          return result;
        }, {})
      );
    });
  }, []);

  const addToCart = () => { };

  const checkout = () => { };

  const productsOnCart = () => {
    return Object.entries(shoppingcart).map(([key, value]) => {
      const product = products[key];
      product.quantity = value;

      return product;
    });
  }

  return (
    <>
      <Products products={Object.values(products)} onAddToCartClicked={addToCart} />
      <ShoppingCart products={productsOnCart()} onCheckoutClicked={checkout} />
    </>
  );
};

render(<App />, document.getElementById("root"));
