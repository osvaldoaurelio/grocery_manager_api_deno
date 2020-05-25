import { Router } from './deps.ts'

import productController from './app/controllers/ProductsController.ts';
import SupermarketController from './app/controllers/SupermarketsController.ts';

const router = new Router();

router
  .get('/', async (ctx: any): Promise<any> => {
    const response = await fetch('https://www.receitaws.com.br/v1/cnpj/07581644000160');
    const data = await response.json();
    return ctx.response.body = { data };
  })

  .get('/products', productController.list)
  .get('/products/:id', productController.show)
  .post('/products', productController.store)
  .put('/products/:id',  productController.update)
  .delete('/products/:id', productController.delete)

  .get('/supermarkets', SupermarketController.list)
  .get('/supermarkets/:id', SupermarketController.show)
  .post('/supermarkets', SupermarketController.store)
  .put('/supermarkets/:id', SupermarketController.update)
  .delete('/supermarkets/:id', SupermarketController.delete)

export default router;
