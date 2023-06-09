import { CartsModel } from '../DAO/models/carts.model.js';

class CartService {
  validateId(id) {
    if (!id) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw 'VALDIATION ERROR';
    }
  }
  validateProduct(pid) {
    if (!pid) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw 'VALDIATION ERROR';
    }
  }
  async getAllCarts() {
    const carts = await CartsModel.find({});
    return carts;
  }

  async getCart(id) {
    this.validateId(id);
    const cart = await CartsModel.findById({ _id: id });
    return cart;
  }

  async createCart() {
    let product = new Array();
    const cartCreated = await CartsModel.create({product});
    return cartCreated;
  }

  async updateCart(id,products) {
    const cartCreated = await CartsModel.updateOne({ _id: id }, { products: products });
    return cartCreated;
  }

  async deleteCart(id) {
    this.validateId(id);
    const deleted = await CartsModel.deleteOne({ _id: id });
    return deleted;
  }

  async addProductToCart(cid,pid){
    this.validateId(cid);
    this.validateProduct(pid)
    const cart = await this.getCart(cid)
    let existingProduct = cart.products.find(p => p.id === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }else {
      let newProduct = {
        id: pid.toString(),
        quantity: 1
      };
    cart.products.push(newProduct);
    }
    return await this.updateCart(cid, cart.products);
  }
  
}

export const cartService = new CartService();
