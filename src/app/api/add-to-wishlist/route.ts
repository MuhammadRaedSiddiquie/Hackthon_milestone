
import { sanityClient } from '@/lib/sanity.client';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const { userId, id, price, title, description, image, discountPercentage, rating } = await req.json();
console.log(image,"image")
        // Validation
        if (!userId || !id || !price) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const existingWishlist = await sanityClient.fetch(
            `*[_type == "wishlist" && userId == $userId][0]`,
            { userId }
        );
        console.log(existingWishlist)
        console.log(id)
        if (existingWishlist) {
            const isAlreadyInWishlist = existingWishlist.products.some(
                (item: any) => item.id == id
            );
            console.log(isAlreadyInWishlist)

            if (!isAlreadyInWishlist) {
                existingWishlist.products.push({ id, price, title, description, image, discountPercentage, rating });
                await sanityClient.patch(existingWishlist._id)
                    .set({ products: existingWishlist.products })
                    .commit();
            }
        } else {
            await sanityClient.create({
                _type: 'wishlist',
                userId,
                products: [{ id, price, title, description, image, discountPercentage, rating }],
            });
        }

        return NextResponse.json({ success: true, message: 'Item added to wishlist' });
    } catch (error) {
        console.error('Error in add-to-wishlist API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
