'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '../components/Card/Card';
import { client } from '@/sanity/lib/client';

interface Image {
    _key: string;
    asset: { url: string };
}

interface IProducts {
    id: string;
    title: string;
    description: string;
    images: Image[];
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    tags: string[];
    stock: number;
    brand: string;
    availabilityStatus: 'available' | 'out-of-stock';
}

function SearchContent() {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [isLoading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    let filteredData: any[] = [];

    const productQuery = `*[_type == "product"]{
        id,
        title,
        description,
        images[]{
          _key,
          asset->{url}
        },
        category,
        price,
        discountPercentage,
        rating,
        tags[],
        stock,
        brand,
        availabilityStatus
    }`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.fetch<IProducts[]>(productQuery);
                setProducts(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams, productQuery]);

    if (searchParams && products) {
        filteredData = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    return (
        <main className='w-full flex flex-col items-center justify-start'>
            {isLoading ? (
                <div className='w-full h-screen bg-[#f5f5f5] bg-[url("/images/loader.gif")] bg-[length:500px_300px] bg-no-repeat bg-center absolute z-10'></div>
            ) : (
                <div className='w-full px-8 flex gap-[60px] py-[60px] mt-[40px] items-center flex-col bg-[#f3f3f3]'>
                    <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                        <h1 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>
                            Showing results for: &quot;{query}&quot;
                        </h1>
                    </div>
                    {filteredData.length > 0 ? (
                        <div className='w-full grid gap-[30px] place-items-center grid-flow-row max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xx:grid-cols-4 xl:grid-col-4'>
                            {filteredData.map((product) => (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    image={product.images?.[0]?.asset?.url}
                                    title={product.title}
                                    info={product.description}
                                    price={product.price}
                                    discount={product.discountPercentage}
                                    rating={product.rating}
                                    display=''
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-screen flex col-span-4 items-start justify-center">
                            <p className="montserrat-regular text-primaryCol text-2xl">No Results</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
