import db from '../../config/db.ts'

const Supermarket = db.collection('supermarkets');
import { ObjectID } from './Base.ts';
import { innerProduct } from './Base.ts';

export interface SupermarketInterface {
  _id: ObjectID,
  fantasia: String,
  cnjp: String,
  municipio: String,
  uf: String,
  bairro: String,
  logradouro: String,
  numero: String,
  cep: String,
  telefone: String,
  products: innerProduct[]
}

export default Supermarket;
