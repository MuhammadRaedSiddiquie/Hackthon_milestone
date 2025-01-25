import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import wishlist from './wishlist'
import cart from './cart'
import cartItem from './cartItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,cart,wishlist,cartItem],
}
