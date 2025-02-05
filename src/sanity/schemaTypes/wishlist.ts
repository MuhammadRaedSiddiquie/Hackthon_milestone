export default {
  name: 'wishlist',
  type: 'document',
  title: 'Wishlist',
  fields: [
    {
      name: 'userId',
      type: 'string',
      title: 'User ID',
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Product ID' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'price', type: 'number', title: 'Price' }, // Add product price
            {
              name: 'image',
              type: 'url',
              title: 'Product Image', // Add product image
              options: { hotspot: true },
            },
            { name: 'discountPercentage', title: 'Discount Percentage', type: 'number' },
            { name: 'rating', title: 'Rating', type: 'number' },
          ],
        },
      ],
    },
  ],
};
