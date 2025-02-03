import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import wishlist from './wishlist'
import cart from './cart'
import cartItem from './cartItem'
import shipment from './shipment'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,cart,wishlist,cartItem,shipment,order],
}
