import { sanityClient } from '@/lib/sanity.client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, productId, delta } = body;  // Renamed "number" to "delta"

        console.log(userId, productId, delta);

        if (!userId || !productId || typeof delta !== 'number') {
            return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
        }

        // Fetch current cart data for the user
        const cartQuery = `*[_type == "cart" && userId == $userId][0] {
            _id,
            items[] {
                _key,
                quantity,
                price,
                product-> {
                    id,
                    _id,
                    title,
                    images[0] {
                        asset->{url}
                    }
                }
            }
        }`;
        
        const cart = await sanityClient.fetch(cartQuery, { userId });

        if (!cart) {
            return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
        }

        if (!cart.items || cart.items.length === 0) {
            return NextResponse.json({ message: 'No items in cart' }, { status: 400 });
        }

        // Find the item in the cart and update quantity
        const updatedItems = cart.items.map((item) => {
            if (item.product._id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) }; // Ensure quantity doesn't go below 1
            }
            return item;
        });

        // Update the cart in Sanity
        await sanityClient
            .patch(cart._id)
            .set({ items: updatedItems })
            .commit();

        return NextResponse.json({ message: 'Cart updated successfully', updatedItems }, { status: 200 });

    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
