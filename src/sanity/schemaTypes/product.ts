export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      { name: 'id', title: 'ID', type: 'number' },
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'category', title: 'Category', type: 'string' },
      { name: 'price', title: 'Price', type: 'number' },
      { name: 'discountPercentage', title: 'Discount Percentage', type: 'number' },
      { name: 'rating', title: 'Rating', type: 'number' },
      { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
      { name: 'stock', title: 'Stock', type: 'number' },
      { name: 'brand', title: 'Brand', type: 'string' },
      { name: 'availabilityStatus', title: 'Availability Status', type: 'string' },
      { name: 'image', title: 'Image', type: 'image' },
    ],
  };
  