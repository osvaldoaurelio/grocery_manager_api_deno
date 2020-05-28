import { Context } from '../../deps.ts';

import Product, { ProductInterface } from '../models/Product.ts';
import Supermarket, { SupermarketInterface } from '../models/Supermarket.ts';
import addProductsToSupermarket from '../../services/addProductsToSupermarket.ts';
import { alreadyExist, badRequest, notFound, innerProduct, innerSupermarket } from '../models/Base.ts';

export default {
  async addProduct(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };
    
    try {
      let { value: { _id: product_id, price } } = await ctx.request.body();

      ctx.response.status = 400;
      if(!(product_id?.$oid &&  price)) return ctx.response.body = badRequest.required;

      ctx.response.status = 404;
      const supermarketFound: SupermarketInterface = await Supermarket.findOne({ _id });
      if(!supermarketFound) return ctx.response.body = notFound.supermarket;

      const productFound: ProductInterface = await Product.findOne({ _id: product_id});
      if(!productFound) return ctx.response.body = notFound.product;

      const productFoundInSupermarket = supermarketFound.products.find(
        (product: innerProduct) => product._id.$oid === productFound._id.$oid
      );

      ctx.response.status = 409;
      if(productFoundInSupermarket) return ctx.response.body = alreadyExist.product;

      supermarketFound.products.push({ _id: productFound._id, price });
      productFound.supermarkets.push({ _id: supermarketFound._id, price });
    
      await Product.updateOne(
        { _id: productFound._id }, { $set: { supermarkets: productFound.supermarkets } }
      );

      await Supermarket.updateOne(
        { _id }, { $set: { products: supermarketFound.products } }
      );

      const data = await addProductsToSupermarket(supermarketFound);
  
      ctx.response.status = 201;
      return ctx.response.body = { data };
    } catch (err) {
      console.log(err);
    }
  },

  async updateProduct(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };
    
    try {
      let { value: { _id: product_id, price } } = await ctx.request.body();

      ctx.response.status = 400;
      if(!(product_id?.$oid &&  price)) return ctx.response.body = badRequest.required;

      ctx.response.status = 404;
      const supermarketFound: SupermarketInterface = await Supermarket.findOne({ _id });
      if(!supermarketFound) return ctx.response.body = notFound.supermarket;

      const productFound: ProductInterface = await Product.findOne({ _id: product_id});
      if(!productFound) return ctx.response.body = notFound.product;

      const productIndex = supermarketFound.products.findIndex(
        (product: innerProduct) => product._id.$oid === productFound._id.$oid
      );

      const supermarketIndex = productFound.supermarkets.findIndex(
        (supermarket: innerSupermarket) => supermarket._id.$oid === supermarketFound._id.$oid
      );
      
      if(productIndex < 0 || supermarketIndex < 0) return ctx.response.body = '';

      supermarketFound.products[productIndex].price = price;
      productFound.supermarkets[supermarketIndex].price = price;
    
      await Product.updateOne(
        { _id: productFound._id }, { $set: { supermarkets: productFound.supermarkets } }
      );

      await Supermarket.updateOne(
        { _id }, { $set: { products: supermarketFound.products } }
      );

      const data = await addProductsToSupermarket(supermarketFound);
  
      ctx.response.status = 200;
      return ctx.response.body = { data };
    } catch (err) {
      console.log(err);
    }
  },

  async removeProduct(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };
    
    try {
      let { value: { _id: product_id } } = await ctx.request.body();

      ctx.response.status = 400;
      if(!(product_id?.$oid)) return ctx.response.body = badRequest.required;

      ctx.response.status = 404;
      const supermarketFound: SupermarketInterface = await Supermarket.findOne({ _id });
      if(!supermarketFound) return ctx.response.body = notFound.supermarket;

      const productFound: ProductInterface = await Product.findOne({ _id: product_id});
      if(!productFound) return ctx.response.body = notFound.product;

      supermarketFound.products = supermarketFound.products.filter(
        (product: innerProduct) => product._id.$oid !== productFound._id.$oid
      );
      productFound.supermarkets = productFound.supermarkets.filter(
        (supermarket: innerSupermarket) => supermarket._id.$oid !== _id.$oid
      );

      await Product.updateOne(
        { _id: productFound._id }, { $set: { supermarkets: productFound.supermarkets } }
      );
      await Supermarket.updateOne(
        { _id }, { $set: { products: supermarketFound.products } }
      );

      const data = await addProductsToSupermarket(supermarketFound)
  
      ctx.response.status = 200;
      return ctx.response.body = { data };
    } catch (err) {
      console.log(err);
    }
  }
};
