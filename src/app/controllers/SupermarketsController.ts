import { Context } from '../../deps.ts';

import Supermarket from '../models/Supermarket.ts';
import addProductsToSupermarket from '../../services/addProductsToSupermarket.ts';
import isValidCnpj from '../../services/isValidCnpj.ts';
import { badRequest, notFound, ObjectID } from '../models/Base.ts';

const baseURL = 'https://www.receitaws.com.br/v1/cnpj/';

export default {
  async list(ctx: Context | any): Promise<any> {
    const { request: { url: { searchParams } } } = ctx;
    const searchParam: String = (searchParams.get('search') || '');
    const search = searchParam.toUpperCase();

    try {
      const supermarkets = await Supermarket.find({
        $or: [
          { bairro: { $regex: `.*${search}.*` } },
          { fantasia: { $regex: `.*${search}.*` } },
          { municipio: { $regex: `.*${search}.*` } },
          { logradouro: { $regex: `.*${search}.*` } }
        ]
      });

      const supermarketsPromisses = supermarkets.map(addProductsToSupermarket);

      const data = await Promise.all(supermarketsPromisses);

      return ctx.response.body = { data };
    } catch (err) {
      console.log(err);
    }    
  },

  async show(ctx: Context | any): Promise<any> {
    const _id: ObjectID = { $oid: ctx.params.id };

    try {
      ctx.response.status = 404;
      const supermarketFound = await Supermarket.findOne({ _id });
      if(!supermarketFound) return ctx.response.body = notFound.supermarket;

      const data = await addProductsToSupermarket(supermarketFound);
  
      ctx.response.status = 200;
      return ctx.response.body = { data };
    } catch (err) {
      console.log(err);
    }
  },

  async store(ctx: Context | any): Promise<any> {
    try {
      const { value: { cnpj: cnpjRequest } } = await ctx.request.body();
      const cnpj = cnpjRequest.replace(/[^\d]+/g,'')

      ctx.response.status = 400;
      if(!cnpj) return ctx.response.body = badRequest.required;
      if(!isValidCnpj(cnpj)) return ctx.response.body = badRequest.error;

      const supermarketFound = await Supermarket.findOne({ cnpj })
      ctx.response.status = 200;
      if(supermarketFound) return ctx.response.body = { data: supermarketFound };

      const response = await fetch(`${baseURL}${cnpj}`);
      const data = await response.json();

      const {
        fantasia,
        municipio,
        uf,
        bairro,
        logradouro,
        numero,
        cep,
        telefone,
        atividade_principal: [{ text: atividade_principal }]
      } = data;

      ctx.response.status = 406;
      if(!atividade_principal.includes('mercado')) return ctx.response.body = badRequest.mainActivity;

      const _id = await Supermarket.insertOne({
        fantasia,
        cnpj,
        municipio,
        uf,
        bairro,
        logradouro,
        numero,
        cep,
        telefone,
        products: []
      });
      
      const supermarket = await Supermarket.findOne({ _id });

      ctx.response.status = 201;
      return ctx.response.body = { data: supermarket };
    } catch (err) {
      console.log(err);
    }
  }  
};
