import Product from '../app/models/Product.ts';

export default async function addProductsToSupermarkets(supermarket: any): Promise<any> {
    const products: Array<Object> = []
    
    const productsPromisses = supermarket?.products_id?.map(
      async (_id: Object) => await Product.find({ _id })
    )
    
    if(productsPromisses) {
      const productsIterable: Array<Array<Object>> = await Promise.all(productsPromisses)
      for(const [supermarket] of productsIterable) {
        if(supermarket) products.push(supermarket)
      }
    }
    
    supermarket.products = products

    delete supermarket?.products_id

    return supermarket;
  }
