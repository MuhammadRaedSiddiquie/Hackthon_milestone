'use client'
import React, { useEffect } from 'react'
import { IoIosArrowForward } from "react-icons/io";


import { AiOutlineBars } from "react-icons/ai";
import { HiSquares2X2 } from "react-icons/hi2";

import { Box, Button, createListCollection } from "@chakra-ui/react"
import {
    SelectContent,
    SelectItem,
   
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"
import { useState } from "react"
import Link from 'next/link';

import { client } from '@/sanity/lib/client';
import { HStack } from "@chakra-ui/react"
import {
 
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/ui/pagination"
import Logos from '../components/Logos/Logos';
import Card from '../components/Card/Card';
interface IProduct {
    id: string;
    title: string;
    description: string;
    images: { _key: string; asset: { url: string } }[];
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    tags: string[];
    stock: number;
    brand: string;
    availabilityStatus: string;
  }

function ProductPage() {
    // const [value, setValue] = useState<string[]>([])
    const [data, setData] = useState<IProduct[]>([]);
    const [sort, setSort] = useState<string[]>(['no'])
    const frameworks = createListCollection({
        items: [
            { label: "No Filter", value: "no" },
            { label: "Low to High", value: "low" },
            { label: "High to Low", value: "high" },
            { label: "Most Discount", value: "discount" },
            { label: "Most Rated", value: "rated" },
        ],
    })
    const query = `*[_type == "product"]{
        id,
        title,
        description,
        images[]{
            _key,
            asset->{url} // This fetches the image URL from the asset reference
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
                const response = await client.fetch(query);
             
                setData(response);
                
                
            } catch (error) {
                console.error("Error fetching data:", error);
                console.log('error in data fetched successfully')
            }
        };
        
        fetchData();
        console.log('fetched data products:', data)
        
    }, [])
    const [sorted, setSorted] = useState<IProduct[]>(data);
    useEffect(()=>{
        setSorted(data)
    },[data])
    const [currentPage, setCurrentPage] = useState(1);
    const [display,setDisplay]=useState('')
    const ProductsPerPage = 24;
    const totalPages = Math.ceil(data.length / ProductsPerPage)
    const paginatedData = sorted.slice((currentPage - 1) * ProductsPerPage, currentPage * ProductsPerPage)
    const productSorting = () => {
        switch (sort[0]) {
            case 'no':
                setSorted(data)
                break;
            case 'low':
                const lowPrice:IProduct[]=[...data]
                for(let i=0;i<=data.length-2;i++){
                    for(let j=0;j<=data.length-2;j++){
                        if(lowPrice[j].price > lowPrice[j+1].price){
                            const temp=lowPrice[j]
                            lowPrice[j]=lowPrice[j+1]
                            lowPrice[j+1]=temp
                        }
                    }
                }
                setSorted(lowPrice)
                break;
            case 'high':
                const highPrice=[...data]
                for(let i=0;i<=data.length-2;i++){
                    for(let j=0;j<=data.length-2;j++){
                        if(highPrice[j].price < highPrice[j+1].price){
                            const temp=highPrice[j]
                            highPrice[j]=highPrice[j+1]
                            highPrice[j+1]=temp
                        }
                    }
                }
                setSorted(highPrice)
                break;
            case 'discount':
                const discounted=[...data]
                for(let i=0;i<=data.length-2;i++){
                    for(let j=0;j<=data.length-2;j++){
                        if(discounted[j].discountPercentage < discounted[j+1].discountPercentage){
                            const temp=discounted[j]
                            discounted[j]=discounted[j+1]
                            discounted[j+1]=temp
                        }
                    }
                }
                setSorted(discounted)
                break;
            case 'rated':
                const rated=[...data]
                for(let i=0;i<=data.length-2;i++){
                    for(let j=0;j<=data.length-2;j++){
                        if(rated[j].rating < rated[j+1].rating){
                            const temp=rated[j]
                            rated[j]=rated[j+1]
                            rated[j+1]=temp
                        }
                    }
                }
                setSorted(rated)
                break;
        }
    }
    // const productSorting = () => {
    //     let sortedData: Product[] = [...data]; // ✅ Create a new array to maintain immutability
      
    //     switch (sort) { // ✅ `sort` is a string, not an array
    //       case "low":
    //         sortedData.sort((a, b) => a.price - b.price);
    //         break;
    //       case "high":
    //         sortedData.sort((a, b) => b.price - a.price);
    //         break;
    //       case "discount":
    //         sortedData.sort((a, b) => b.discountPercentage - a.discountPercentage);
    //         break;
    //       case "rated":
    //         sortedData.sort((a, b) => b.rating - a.rating);
    //         break;
    //       default:
    //         break;
    //     }
      
    //     setSorted(sortedData);
    //   };
      
    
    // const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    //     return (
    //         <div className="flex items-center gap-2">
    //             <button
    //                 onClick={() => onPageChange(currentPage - 1)}
    //                 disabled={currentPage === 1}
    //                 className="p-2 bg-gray-200 rounded"
    //             >
    //                 Previous
    //             </button>
    //             <span>{currentPage} of {totalPages}</span>
    //             <button
    //                 onClick={() => onPageChange(currentPage + 1)}
    //                 disabled={currentPage === totalPages}
    //                 className="p-2 bg-gray-200 rounded"
    //                 >
    //                 Next
    //             </button>
    //         </div>
    //     );
    // };
    return (
        <main className='w-full flex flex-col items-center justify-start'>
            <div className='w-full flex items-center justify-center py-[24px]'>
                <div className='w-[73%] flex items-center justify-between max-md:flex-col max-md:gap-[30px]'>
                    <h2 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>SHOP</h2>
                    <div className='flex items-center gap-[4px]'>
                        <h3 className='montserrat-bold text-primaryCol text-sm xxl:text-xl'>Home</h3>
                        <IoIosArrowForward className='text-secondaryCol' />
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Shop</p>
                    </div>
                </div>
            </div>
            <div className='w-[73%] flex items-center gap-[15px] py-[24px] max-md:flex-col'>
                <Link className='w-[200px]' href='/Category/fashion-accessories'>
                    <div className='h-[223px] bg-center bg-cover bg-[url("/images/cat1.svg")] max-md:w-[90%]'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2 hover:hidden'>
                            <h4 className='montserrat-bold w-[120px] text-center text-white text-base xxl:text-[22px]'>Fashion & Accessories</h4>
                            {/* <h5 className='montserrat-regular text-white text-sm xxl:text-xl'>5 Items</h5> */}
                        </div>
                    </div>
                </Link>
                <Link className='w-[200px]' href='/Category/beauty-personal-care'>
                    <div className='h-[223px] bg-center bg-cover bg-[url("/images/cat2.jpeg")] max-md:w-[90%]'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2 hover:hidden'>
                            <h4 className='montserrat-bold w-[120px] text-center text-white text-base xxl:text-[22px]'>Beauty & Personal Care</h4>
                            {/* <h5 className='montserrat-regular text-white text-sm xxl:text-xl'>5 Items</h5> */}
                        </div>
                    </div>
                </Link>
                <Link className='w-[200px]' href='/Category/electronics-gadgets'>
                    <div className='h-[223px] bg-center bg-cover bg-[url("/images/cat3.jpeg")] max-md:w-[90%]'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2 hover:hidden'>
                            <h4 className='montserrat-bold w-[120px] text-center text-white text-base xxl:text-[22px]'>Electronics & Gadgets</h4>
                            {/* <h5 className='montserrat-regular text-white text-sm xxl:text-xl'>5 Items</h5> */}
                        </div>
                    </div>
                </Link>
                <Link className='w-[200px]' href='/Category/home-living'>
                    <div className='h-[223px] bg-center bg-cover bg-[url("/images/cat4.jfif")] max-md:w-[90%]'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2 hover:hidden'>
                            <h4 className='montserrat-bold w-[120px] text-center text-white text-base xxl:text-[22px]'>Home Living</h4>
                            {/* <h5 className='montserrat-regular text-white text-sm xxl:text-xl'>5 Items</h5> */}
                        </div>
                    </div>
                </Link>
                <Link className='w-[200px]' href='/Category/sports-automotive'>
                    <div className='h-[223px] bg-center bg-cover bg-[url("/images/cat5.jpg")] max-md:w-[90%]'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2 hover:hidden'>
                            <h4 className='montserrat-bold w-[120px] text-center text-white text-base xxl:text-[22px]'>Sports & Automotive</h4>
                            {/* <h5 className='montserrat-regular text-white text-sm xxl:text-xl'>5 Items</h5> */}
                        </div>
                    </div>
                </Link>
            </div>
            <div className='w-[73%] py-[24px] flex items-center justify-between max-md:flex-col max-md:gap-[24px]'>
                <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Show all 12 results</p>
                <div className='flex items-center gap-3'>
                    <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Views:</p>
                    <button onClick={()=>setDisplay('')} className='p-[8px] py-[8px] border-secondaryCol border-[1px] rounded-[5px]'>
                        <HiSquares2X2 className='text-primaryCol text-xl xxl:text-4xl' />
                    </button>
                    <button onClick={()=>setDisplay('inline')} className='px-[8px] py-[8px] border-secondaryCol border-[1px] rounded-[5px]'>
                        <AiOutlineBars className='text-primaryCol text-xl xxl:text-4xl' />
                    </button>

                </div>
                <div className='flex gap-2'>
                    {/* <button className='bg-white flex items-center gap-2 border-secondaryCol border-[1px] text-sm text-secondaryCol rounded-[5px] py-[10px] px-[25px] xxl:text-xl'>
                        Popularity<RiArrowDownWideLine className='text-primaryCol text-xl xxl:text-4xl' />
                    </button> */}
                    <SelectRoot
                        collection={frameworks}
                        width="180px"
                        size={'md'}
                        value={sort}
                        onValueChange={(e) => { setSort(e.value) }}
                        className='bg-white gap-2 border-secondaryCol border-[1px] text-secondaryCol rounded-[5px]'
                    >
                        <SelectTrigger>
                            <SelectValueText placeholder="Sort By:" className='px-4' />
                        </SelectTrigger>
                        <SelectContent >
                            {frameworks.items.map((category) => (
                                <SelectItem item={category} key={category.value} className='bg-white text-secondaryCol rounded-[5px]'>
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>

                    <button onClick={() => productSorting()} className='bg-blueCol text-sm text-white rounded-[5px] py-[10px] px-[20px] hover:bg-[#1e8cca] xxl:text-xl'>Filter</button>
                </div>
            </div>
            <div className='w-[73%] h-fit'>
                <Logos></Logos>
            </div>
            {/* <div className='w-[73%] pt-[40px] grid xx:grid-cols-4 gap-x-[30px] grid-flow-row place-items-center max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                <Card3
                    image={'/images/product9.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product10.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product11.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product12.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-1.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-2.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-3.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-4.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-5.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-6.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-7.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>
                <Card3
                    image={'/images/product-8.svg'}
                    title={'Graphic Designer'}
                    info={'English Department'}
                    price={16.48}
                    discount={6.48}
                ></Card3>


            </div> */}
            <div className={` 'w-[73%] grid gap-x-[30px] place-items-center grid-flow-row max-sm:grid-cols-1 ' ${display==='inline'?'sm:grid-cols-1 lg:grid-cols-1 xx:grid-cols-1':'sm:grid-cols-2 lg:grid-cols-3 xx:grid-cols-4'}`}>
                {paginatedData?.map((product: any) => (
                    <Card
                    key={product.id}
                        id={product.id}
                        image={product.images?.[0]?.asset?.url || product.image}
                        title={product.title}
                        info={product.description}
                        price={product.price}
                        discount={product.discountPercentage}
                        rating={product.rating}
                        display={display}
                    ></Card>
                ))}



            </div>

            <div className='w-[73%] flex items-center justify-center py-[24px]'>
                {/* <div className='rounded-[5px] bg-white border-2 border-[#e3e3e3] flex items-center jusify-center'>
                    <button className='montserrat-bold text-sm text-secondaryCol bg-[#f3f3f3] p-[20px] border-r-2 border-[#e3e3e3] xxl:text-xl'>First</button>
                    <button className='montserrat-bold text-sm text-blueCol bg-white px-[20px] py-[20px] xxl:text-xl'>1</button>
                    <button className='montserrat-bold text-sm text-white bg-blueCol px-[20px] py-[20px] xxl:text-xl'>2</button>
                    <button className='montserrat-bold text-sm text-blueCol bg-white px-[20px] py-[20px] xxl:text-xl'>3</button>
                    <button className='montserrat-bold text-sm text-blueCol bg-white p-[20px] border-l-2 border-[#e3e3e3] xxl:text-xl'>Next</button>
                </div> */}
                {/* <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                /> */}
            </div>
            <div className='w-[73%] flex items-center justify-center py-[5rem]'>
                <PaginationRoot

                    page={currentPage}
                    count={data.length}
                    pageSize={ProductsPerPage}
                    onPageChange={(e) => setCurrentPage(e.page)}

                >
                    <HStack>
                        <PaginationPrevTrigger />
                        <Box display="flex" gap="2">
                            {Array.from({ length: totalPages }, (_, index) => {
                                if (index + 1 === 1 || index + 1 === totalPages || Math.abs(currentPage - (index + 1)) <= 2) {
                                    return (
                                        <Button
                                            key={index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                            bg={currentPage === index + 1 ? 'blue.500' : 'gray.200'}
                                            color={currentPage === index + 1 ? 'white' : 'gray.700'}
                                            _hover={{ bg: currentPage === index + 1 ? 'blue.600' : 'gray.300' }}
                                        >
                                            {index + 1}
                                        </Button>
                                    );
                                } else if (Math.abs(currentPage - (index + 1)) === 3) {
                                    return <Box key={index + 1}>...</Box>;
                                }
                                return null;
                            })}
                        </Box>
                        <PaginationNextTrigger />
                    </HStack>
                </PaginationRoot>
            </div>

        </main>

    )
}

export default ProductPage
