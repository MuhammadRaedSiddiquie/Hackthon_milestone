import React from 'react'
import Card from '../Card/Card'

function Products() {
    return (
        <section className='w-full flex items-center justify-center'>
            <div className='w-[73%] flex gap-[80px] py-[80px] items-center flex-col'>
                <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                    <p className='montserrat-regular text-secondaryCol text-[20px]'>Featured Products</p>
                    <h1 className='montserrat-bold text-primaryCol text-[24px]'>BEST SELLER PRODUCTS</h1>
                    <p className='montserrat-regular text-secondaryCol text-sm'>Problems trying to resolve the conflict between </p>
                </div>
                <div className='w-full grid grid-cols-4 grid-flow-row max-md:place-items-center max-md:grid-cols-1'>
                    <Card
                        image={'/images/product-1.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-2.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-3.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-4.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-5.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-6.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-7.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>
                    <Card
                        image={'/images/product-8.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card>


                </div>

            </div>

        </section>
    )
}

export default Products
