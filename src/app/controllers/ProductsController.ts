import { Context } from '../../deps.ts';

import Product from '../models/Product.ts';
import addSupermarketsToProducts from '../../services/addSupermarketsToProducts.ts';

const notFoundObject = { data: { error: 'Product not found!' } };
const alreadyExistObject = { data: { error: 'Product already exist!' } };
const badRequestObject = { data: { error: 'Bad Request' } };

export default {
  async list(ctx: Context | any): Promise<any> {
    const $name = ctx.request.url.searchParams.get('name') || '';
    
    try {
      const products = await Product.find({
        name: { $ne: null , $regex: `.*${$name}.*` }
      });

      const productsPromisses = products.map(addSupermarketsToProducts);

      const data = await Promise.all(productsPromisses);
      
      return ctx.response.body = { data };
    } catch (err) {
      console.error(err);
    }    
  },

  async show(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };

    try {
      const product = await Product.findOne({ _id });

      ctx.response.status = 404;
      if(!product) return ctx.response.body = notFoundObject;

      const data = await addSupermarketsToProducts(product);
      
      ctx.response.status = 200;
      return ctx.response.body = { data };      
    } catch (err) {
      console.error(err);
    }
  },

  async store(ctx: Context | any): Promise<any> {
    const { request, response } = ctx;

    try {
      let { value: { name, brand, type, unity, obs } } = await request.body();

      response.status = 400
      if(!(name && brand && type && unity && obs)) return response.body = badRequestObject

      name = String(name).toLowerCase().trim();
      brand = String(brand).toLowerCase().trim();
      type = String(type).toLowerCase().trim();
      unity = String(unity).toLowerCase().trim();
      obs = String(obs).toLowerCase().trim();

      const productFound = await Product.findOne({
        $and: [{ name }, { brand }, { type }, { unity }]
      });
      response.status = 409
      if(productFound) return response.body = alreadyExistObject
      
      const _id = await Product.insertOne({ name, brand, type, unity, obs });
      
      const product = await Product.findOne({ _id });
      
      response.status = 404;
      if(!product) return response.body = notFoundObject;

      response.status = 201;
      return response.body = { data: product };
    } catch (err) {
      console.error(err);
    }
  },

  async update(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };

    try {
      const { value: { name, price, supermarkets_id } } = await ctx.request.body();

      const $set = {
        name: String(name).toLowerCase().trim(),
        price: Number(price) >= 0 ? Number(price): 0,
        supermarkets_id
      };

      const { matchedCount } = await Product.updateOne({ _id }, { $set });
      
      ctx.response.status = 404;
      if(!matchedCount) return ctx.response.body = notFoundObject;

      const product = await Product.findOne({ _id });

      const data = await addSupermarketsToProducts(product);

      ctx.response.status = 200;
      return ctx.response.body = { data };
    } catch (err) {
      console.error(err);
    }    
  },

  async delete(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };

    try {
      const deleteCount = await Product.deleteOne({ _id });
      
      ctx.response.status = 404;
      if(!deleteCount) return ctx.response.body = notFoundObject;

      return ctx.response.status = 204;
    } catch (err) {
      console.error(err);
    }
  },

};
