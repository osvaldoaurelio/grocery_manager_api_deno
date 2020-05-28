import Supermarket from '../app/models/Supermarket.ts';
import { ProductInterface } from '../app/models/Product.ts';
import { innerSupermarket } from '../app/models/Base.ts';

export default async (product: ProductInterface): Promise<any> => {
  try{
    const supermarketsPromiseArray = product.supermarkets.map(
      async(supermarket: innerSupermarket) => {
        const { price } = supermarket;
        const {
          _id,
          fantasia,
          municipio,
          uf,
          logradouro,
          numero
        } = await Supermarket.findOne({ _id: supermarket._id });
        const address = `${logradouro} ${numero}, ${municipio}-${uf}`;

        return { _id, name: fantasia, address, price };
      }
    );

    if(supermarketsPromiseArray) {
      product.supermarkets = await Promise.all(supermarketsPromiseArray);
    }
  
    return product;
  } catch(err) {
    throw new Error(err);
  }
}
