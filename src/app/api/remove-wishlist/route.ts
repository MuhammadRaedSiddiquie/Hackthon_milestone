import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    // Validate inputs
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing userId. Expected a string.' },
        { status: 400 }
      );
    }
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing productId. Expected a string.' },
        { status: 400 }
      );
    }

    // Fetch the user's wishlist
    const wishlist = await sanityClient.fetch(
      `*[_type == "wishlist" && userId == $userId][0]`,
      { userId }
    );

    if (!wishlist) {
      return NextResponse.json(
        { error: 'Wishlist or user not found.' },
        { status: 404 }
      );
    }

    // Check if the product exists in the wishlist
    const wishlistExists = wishlist.products?.some((item: any) => item.id === productId);
    if (!wishlistExists) {
      return NextResponse.json(
        { error: 'Product not found in the wishlist.' },
        { status: 400 }
      );
    }

    // Update the wishlist to remove the product
    const updatedWishlist = await sanityClient
      .patch(wishlist._id)
      .unset([`products[id=="${productId}"]`]) // Remove the product by its `id`
      .commit();

    return NextResponse.json(
      { message: 'Item removed from wishlist successfully.', updatedWishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in remove-wishlist API:', (error as Error).message);
    return NextResponse.json(
      { error: 'Server error occurred.' },
      { status: 500 }
    );
  }
}