// app/api/add-to-wishlist/route.ts
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client'
import { Description } from '@radix-ui/react-dialog';
// app/api/add-to-wishlist/route.ts

export async function POST(req: NextRequest) {
    try {
        const { userId, productId, price, title, description, image, discountPercentage, rating } = await req.json();
console.log(image,"image")
        // Validation
        if (!userId || !productId || !price) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const existingWishlist = await sanityClient.fetch(
            `*[_type == "wishlist" && userId == $userId][0]`,
            { userId }
        );
        console.log(existingWishlist)
        console.log(productId)
        if (existingWishlist) {
            const isAlreadyInWishlist = existingWishlist.products.some(
                (item: any) => item.productId == productId
            );
            console.log(isAlreadyInWishlist)

            if (!isAlreadyInWishlist) {
                existingWishlist.products.push({ productId, price, title, description, image, discountPercentage, rating });
                await sanityClient.patch(existingWishlist._id)
                    .set({ products: existingWishlist.products })
                    .commit();
            }
        } else {
            await sanityClient.create({
                _type: 'wishlist',
                userId,
                products: [{ productId, price, title, description, image, discountPercentage, rating }],
            });
        }

        return NextResponse.json({ success: true, message: 'Item added to wishlist' });
    } catch (error) {
        console.error('Error in add-to-wishlist API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
