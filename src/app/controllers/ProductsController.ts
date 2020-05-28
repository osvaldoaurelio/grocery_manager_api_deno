import { Context } from '../../deps.ts';

import Product from '../models/Product.ts';
import addSupermarketsToProduct from '../../services/addSupermarketsToProduct.ts';
import { alreadyExist, badRequest, notFound } from '../models/Base.ts';

export default {
  async list(ctx: Context | any): Promise<any> {
    const { request: { url: { searchParams } } } = ctx;
    const searchParam: String = (searchParams.get('search') || '');
    const search = searchParam.toUpperCase();
    
    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: `.*${search}.*` } },
          { brand: { $regex: `.*${search}.*` } },
          { type: { $regex: `.*${search}.*` } },
          { unity: { $regex: `.*${search}.*` } }
        ]
      });

      const productsPromisses = products.map(addSupermarketsToProduct);

      const data = await Promise.all(productsPromisses);
      
      return ctx.response.body = { data };
    } catch (err) {
      console.error(err);
    }    
  },

  async show(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };

    try {
      const productFound = await Product.findOne({ _id });

      ctx.response.status = 404;
      if(!productFound) return ctx.response.body = notFound.product;

      const data = await addSupermarketsToProduct(productFound);
      
      ctx.response.status = 200;
      return ctx.response.body = { data };      
    } catch (err) {
      console.error(err);
    }
  },

  async store(ctx: Context | any): Promise<any> {
    try {
      let { value: { name, brand, type, unity, obs } } = await ctx.request.body();

      ctx.response.status = 400;
      if(!(name && brand && type && unity && (obs !== undefined))) return ctx.response.body = badRequest.required;
      
      name = String(name).toUpperCase().trim();
      brand = String(brand).toUpperCase().trim();
      type = String(type).toUpperCase().trim();
      unity = String(unity).toUpperCase().trim();
      obs = String(obs).toUpperCase().trim();

      const productAlreadyExist = await Product.findOne({
        $and: [{ name }, { brand }, { type }, { unity }]
      });
      ctx.response.status = 409;
      if(productAlreadyExist) return ctx.response.body = alreadyExist.product;
      
      const _id = await Product.insertOne({
        name,
        brand,
        type,
        unity,
        obs,
        supermarkets: []
      });

      const product = await Product.findOne({ _id });

      ctx.response.status = 201;
      return ctx.response.body = { data: product };
    } catch (err) {
      console.error(err);
    }    
  },

  async update(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };
    
    try {
      const productFound = await Product.findOne({ _id });
      ctx.response.status = 404;
      if(!productFound) return ctx.response.body = notFound.product;

      let { value: { name, brand, type, unity, obs } } = await ctx.request.body();
      console.log(!(name && brand && type && unity && (obs !== undefined)))
      ctx.response.status = 400;
      if(!(name && brand && type && unity && (obs !== undefined))) return ctx.response.body = badRequest.required;
      
      name = String(name).toUpperCase().trim();
      brand = String(brand).toUpperCase().trim();
      type = String(type).toUpperCase().trim();
      unity = String(unity).toUpperCase().trim();
      obs = String(obs).toUpperCase().trim();

      const productAlreadyExist = await Product.findOne({
        $and: [{ name }, { brand }, { type }, { unity }, { _id: { $ne: _id } }]
      });
      ctx.response.status = 409;
      if(productAlreadyExist) return ctx.response.body = alreadyExist.product;
      
      const $set = { name, brand, type, unity, obs };

      await Product.updateOne({ _id }, { $set });
      
      const product = await Product.findOne({ _id });

      const data = await addSupermarketsToProduct(product);

      ctx.response.status = 200;
      return ctx.response.body = { data };
    } catch (err) {
      console.error(err);
    }    
  }
};
