export interface ObjectID { $oid: String }

export interface innerSupermarket {
  _id: ObjectID,
  price: Number
}

export interface innerProduct {
  _id: ObjectID,
  price: Number
}

export const notFound = {
  product: {
    data: { error: 'product not found!' }
  },
  supermarket: {
    data: { error: 'supermarket not found!' }
  }
}

export const badRequest = {
  required: {
    data: { error: 'all fields are required!' }
  },
  error: {
    data: { error: 'bad request!' }
  },
  mainActivity: {
    data: { error: 'main activity is not valid!'}
  }
}

export const alreadyExist = {
  product: {
    data: { error: 'product already exist!' }
  },
  supermarket: {
    data: { error: 'supermarket already exist!' }
  }
}
