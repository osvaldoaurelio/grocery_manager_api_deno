import Product from '../app/models/Product.ts';
import { SupermarketInterface } from '../app/models/Supermarket.ts';
import { innerProduct } from '../app/models/Base.ts';

export default async (supermarket: SupermarketInterface): Promise<any> => {
  try{
    const productsPromiseArray = supermarket.products.map(
      async(product: innerProduct) => {
        const { price } = product;
        const {
          _id,
          name,
          brand,
          type,
          unity
        } = await Product.findOne({ _id: product._id });
        const description = `${name} ${brand} ${type} ${unity}`;

        return { _id, description, price };
      }
    );
  
    if(productsPromiseArray) {
      supermarket.products = await Promise.all(productsPromiseArray);
    }
  
    return supermarket;
  } catch(err) {
    throw new Error(err);
  }
}
