import Supermarket from '../app/models/Supermarket.ts';

export default async function addSupermarketsToProducts(product: any): Promise<any> {
    const supermarkets: Array<Object> = []
    
    const supermarketsPromisses = product?.supermarkets_id?.map(
      async (_id: Object) => await Supermarket.find({ _id })
    )
    
    if(supermarketsPromisses) {
      const supermarketsIterable: Array<Array<Object>> = await Promise.all(supermarketsPromisses)
      for(const [supermarket] of supermarketsIterable) {
        if(supermarket) supermarkets.push(supermarket)
      }
    }
    
    product.supermarkets = supermarkets

    delete product?.supermarkets_id

    return product;
  }
