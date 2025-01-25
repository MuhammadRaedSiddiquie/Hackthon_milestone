import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { sanityClient } from '@/lib/sanity.client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId, quantity, price, image } = body;

    // Validate inputs
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing userId. Expected a string.' }, { status: 400 });
    }
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing productId. Expected a string.' }, { status: 400 });
    }
    if (!quantity || typeof quantity !== 'number') {
      return NextResponse.json({ error: 'Invalid or missing quantity. Expected a number.' }, { status: 400 });
    }

    // Validate product exists in Sanity
    const product = await sanityClient.fetch(
      `*[_type == "product" && id == $id][0]`,
      { id: productId }
    );
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    //Check if cart already exists
    const existingCart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0]`,
      {userId}
    );

    if (existingCart) {
      // Update existing cart
      const updatedCart = await sanityClient
        .patch(existingCart._id)
        .setIfMissing({ items: [] })
        .append('items', [
          {
            _key: nanoid(),
            _type: 'cartItem',
            product: { _type: 'reference', _ref: product._id },
            quantity,
            price,
            image,
          },
        ])
        .commit();

      return NextResponse.json(updatedCart, { status: 200 });
    }
     else {
      // Create new cart
      const newCart = {
        _type: 'cart',
        userId,
        items: [
          {
            _key: nanoid(),
            _type: 'cartItem',
            product: { _type: 'reference', _ref: product._id},
            quantity,
            price,
            image,
          },
        ],
      };

      const result = await sanityClient.create(newCart);
      return NextResponse.json(result, { status: 201 });
    }
  } catch (error) {
    console.error('Error in add-to-cart API:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
