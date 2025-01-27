import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function GET(req: NextRequest) {
    try {
        // Parse query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const productId = searchParams.get('productId');
        console.log("fetched userid & product id", productId, userId)

        // Validate inputs
        if (!userId || !productId) {
            return NextResponse.json(
                { error: 'Missing or invalid userId or productId.' },
                { status: 400 }
            );
        }

        // Fetch the user's wishlist
        const wishlist = await sanityClient.fetch(
            `*[_type == "wishlist" && userId == $userId][0]`,
            { userId }
        );
        console.log('fetched wishlist', wishlist)

        if (!wishlist) {
            return NextResponse.json(
                { isInWishlist: false }, // No wishlist found, product cannot be in it
                { status: 200 }
            );
        }

        // Check if the product exists in the wishlist
        //const isInWishlist = wishlist.products?.some(item => item.productId === productId);
        const isInWishlist = wishlist.products?.some((item) => {
            console.log('Comparing:', item.productId, productId);
            return item.productId === productId;
        });
        console.log('Wishlist Products:', wishlist.products);
        console.log('Product Exists:', wishlist.products.some((item) => item.productId === productId));

        // Respond with the wishlist status
        return NextResponse.json({ isInWishlist }, { status: 200 });
    } catch (error) {
        console.error('Error in check-wishlist API:', error.message);
        return NextResponse.json(
            { error: 'Server error occurred.' },
            { status: 500 }
        );
    }
}
