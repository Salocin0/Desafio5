import express from "express";
import { cartService } from '../services/carts.service.js';
export const routerCarts = express.Router();

routerCarts.get('/', async (req, res) => {
  try{
    const carts = await  cartService.getAllCarts()
    const limit = req.query.limit || -1;
    if(limit==-1 && carts.length>0){
      return res.status(200).json({
        status: "sucess",
        msg: "Found all carts",
        data: carts,
      })
    }else if(limit!=-1 && carts.length>0){
      return res.status(200).json({
        status: "sucess",
        msg: "Found "+ limit+ " carts",
        data: carts.slice(0, limit),
      })
    }else{
      return res.status(404).json({
        status: "Error",
        msg: "Carts not found",
        data: carts.slice(0, limit),
      })
    }
  }catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
  });

  routerCarts.get('/:id', async(req, res) => {
    try {
      const cart = await cartService.getCart(req.params.id)
      if (typeof cart !== {}) {
        return res.status(200).json({
          status: "sucess",
          msg: "Cart found",
          data: cart,
        })
      } else {
        return res.status(404).json({
          status: "Error",
          msg: "Cart with id " + req.params.id + " not found",
          data: {},
        })
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  });

  routerCarts.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await cartService.deleteCart(id);
      return res.status(200).json({
        status: 'success',
        msg: 'cart deleted',
        data: {},
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  });

  routerCarts.post("/", async (req, res) => {
    try {
      const cartCreated = await cartService.createCart();
      return res.status(201).json({
        status: 'success',
        msg: 'cart created',
        data: cartCreated,
      });
    } catch (e) {
      console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
    }
  });

  routerCarts.post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid,pid } = req.params;
      const cartUptaded = await cartService.addProductToCart(cid,pid);
      if (typeof cart !== {}) {
        return res.status(200).json({
          status: "sucess",
          msg: "Product added",
          data: cartUptaded,
        })
      } else {
        return res.status(404).json({
          status: "Error",
          msg: "error to add product: " + productId + " to cart: "+ cartId,
          data: {cart},
        })
      }
    } catch (e) {
      console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  } 
});