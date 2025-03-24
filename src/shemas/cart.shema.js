import { Schema, model } from 'mongoose'

const CartShema = Schema({
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Referencia al modelo de productos
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }]
})

export default model('Cart', CartShema)
