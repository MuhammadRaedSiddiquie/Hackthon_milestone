import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        // Validate inputs
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json(
                { error: 'Invalid or missing userId. Expected a string.' },
                { status: 400 }
            );
        }


        // Fetch the user's cart
        const cart = await sanityClient.fetch(
            `*[_type == "cart" && userId == $userId][0]`,
            { userId }
        );

        if (!cart) {
            return NextResponse.json(
                { error: 'Cart or user not found.' },
                { status: 404 }
            );
        }

        // Check if the product exists in the cart
        const cartExists = cart.items.length>0;
       
        if (!cartExists) {
            return NextResponse.json(
                { error: 'Cart not found' },
                { status: 400 }
            );
        }

        // Update the cart to remove the product
        const updatedCart = await sanityClient
            .patch(cart._id)
            .unset([`items`]) // Remove the product by its `_ref`
            .commit();

        return NextResponse.json(
            { message: 'Cart cleared successfully.', cart: updatedCart },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in remove-cart API:', error.message);
        return NextResponse.json(
            { error: 'Server error occurred.' },
            { status: 500 }
        );
    }
}
