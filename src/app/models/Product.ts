import db from '../../config/db.ts'

const Product = db.collection('products');
import { ObjectID } from './Base.ts';
import { innerSupermarket } from './Base.ts';

export interface ProductInterface {
  _id: ObjectID,
  name: String,
  brand: String,
  type: String,
  unity: String,
  obs: String,
  supermarkets: innerSupermarket[]
}

export default Product;
