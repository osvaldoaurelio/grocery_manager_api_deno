import { Context } from 'https://deno.land/x/oak/mod.ts';

import Supermarket from '../models/Supermarket.ts';
import addProductsToSupermarkets from '../../services/addProductsToSupermarkets.ts';

const baseUri = 'https://www.receitaws.com.br/v1/cnpj/';
const notFoundObject = { data: { error: 'Supermarket not found!' } };
const notMainActivity = { data: { error: 'Activity Supermarket not found' } }

export default {
  async list(ctx: Context | any): Promise<any> {
    const $fantasia = ctx.request.url.searchParams.get('fantasia') || '';
    
    try {
      const supermarkets = await Supermarket.find({
        fantasia: { $ne: null , $regex: `.*${$fantasia}.*` }
      });

      const supermarketsPromisses = supermarkets.map(addProductsToSupermarkets);

      const data = await Promise.all(supermarketsPromisses);

      return ctx.response.body = { data };
    } catch (err) {
      throw new Error(err);
    }    
  },

  async show(ctx: Context | any): Promise<any> {
    const _id = { $oid: ctx.params.id };

    try {
      const supermarket = await Supermarket.findOne({ _id });
  
      ctx.response.status = 404;
      if(!supermarket) return ctx.response.body = notFoundObject;

      const data = await addProductsToSupermarkets(supermarket)
  
      ctx.response.status = 200;
      return ctx.response.body = { data };      
    } catch (err) {
      throw new Error(err);
    }
  },

  async store(ctx: Context | any): Promise<any> {    
    try {
      const { value: { cnpj } } = await ctx.request.body();

      const supermarketFound = await Supermarket.findOne({ cnpj })
      if(supermarketFound) return ctx.response.body = { data: supermarketFound }

      const response = await fetch(`${baseUri}${cnpj}`);
      const data = await response.json();

      const { atividade_principal: [{ text: atividade }] } = data;      
      if(!atividade.includes('mercado')) return ctx.response.body = notMainActivity

      const { fantasia, municipio, uf, bairro, logradouro, numero, cep, telefone } = data;
      const _id = await Supermarket.insertOne({
        fantasia,
        cnpj,
        municipio,
        uf,
        bairro,
        logradouro,
        numero,
        cep,
        telefone
      });
      
      const supermarket = await Supermarket.findOne({ _id });

      if(!supermarket) {
        ctx.response.status = 404;
        return ctx.response.body = { data: {
          error: 'Supermarket not found!' }
        };
      }

      // addProductsToSupermarket

      ctx.response.status = 201;
      return ctx.response.body = { data: supermarket };
    } catch (err) {
      // throw new Error(err);
      console.log(err)
    }
  },

  async update(ctx: Context | any): Promise<any> {
    const id = ctx.params.id;
    const _id = { $oid: id };

    try {
      const data = await ctx.request.body();
      const {
        name,
        address,
        cnpj,
        phone,
        obs,
      } = data.value;
      const $set = {
        name: String(name).toLowerCase().trim(),
        address: String(address).toLowerCase().trim(),
        cnpj: String(cnpj).toLowerCase().trim(),
        phone: String(phone).toLowerCase().trim(),
        obs: String(obs).toLowerCase().trim(), 
      };

      const { matchedCount } = await Supermarket.updateOne(
        { _id },
        { $set },
      );
      
      if(!matchedCount) {
        ctx.response.status = 404;
        return ctx.response.body = { data: {
            error: 'Supermarket not found!'
          }
        };
      }

      const supermarket = await Supermarket.findOne({ _id });

      return ctx.response.body = { data: supermarket };
    } catch (err) {
      throw new Error(err);
    }    
  },

  async delete(ctx: Context | any): Promise<any> {
    const id = ctx.params.id;
    const _id = { $oid: id };

    try {
      const deleteCount = await Supermarket.deleteOne({ _id });
      
      if(!deleteCount) {
        ctx.response.status = 404;
        return ctx.response.body = {
          data: {
            error: 'Supermarket not found!'
          }
        };
      }

      ctx.response.status = 204;
      return ctx.response.body = '';
    } catch (err) {
      throw new Error(err);
    }
  },

};
