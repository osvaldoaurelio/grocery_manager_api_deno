import { Router } from './deps.ts'

import ProductsController from './app/controllers/ProductsController.ts';
import SupermarketsController from './app/controllers/SupermarketsController.ts';
import SupermarketProductsController from './app/controllers/SupermarketProductsController.ts';

const router = new Router({ prefix: '/api/v1/' });

router
  .get('products', ProductsController.list)
  .get('products/:id', ProductsController.show)
  .post('products', ProductsController.store)
  .put('products/:id', ProductsController.update)

  .get('supermarkets', SupermarketsController.list)
  .get('supermarkets/:id', SupermarketsController.show)
  .post('supermarkets', SupermarketsController.store)

  .post('supermarkets/:id/products', SupermarketProductsController.addProduct)
  .put('supermarkets/:id/products', SupermarketProductsController.updateProduct)
  .delete('supermarkets/:id/products', SupermarketProductsController.removeProduct)

export default router;
