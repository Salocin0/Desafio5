import { ProductsModel } from '../DAO/models/products.model.js';

class ProductService {
  validatePostProduct(title, description, code, price, status, stock, category, thumbnails) {
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw 'VALDIATION ERROR';
    }
  }

  validatePutProduct(id, title, description, code, price, status, stock, category, thumbnails) {
    if (!id || !title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw 'VALDIATION ERROR';
    }
  }

  validateId(id) {
    if (!id) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw 'VALDIATION ERROR';
    }
  }
  async getAllProducts() {
    const products = await ProductsModel.find({});
    return products;
  }

  async getProduct(id) {
    this.validateId(id);
    const product = await ProductsModel.findById({ _id: id });
    return product;
  }

  async createProduct(title, description, code, price, status, stock, category, thumbnails) {
    this.validatePostProduct(title, description, code, price, status, stock, category, thumbnails);
    const userCreated = await ProductsModel.create({ title, description, code, price, status, stock, category, thumbnails });
    return userCreated;
  }
  
  async updateProduct(id, title, description, code, price, status, stock, category, thumbnails) {
    this.validatePostProduct(id, title, description, code, price, status, stock, category, thumbnails);
    const userUptaded = await ProductsModel.updateOne({ _id: id }, { title, description, code, price, status, stock, category, thumbnails});
    return userUptaded;
  }

  async deleteProduct(id) {
    this.validateId(id);
    const deleted = await ProductsModel.deleteOne({ _id: id });
    return deleted;
  }
}

export const productService = new ProductService();
