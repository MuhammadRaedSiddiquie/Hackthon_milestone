const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

// Initialize the Sanity client
const client = createClient({
    projectId: 'dbeyokym', // Replace with your Sanity project ID
    dataset: 'production', // Replace with your Sanity dataset
    token: 'skggNVEMn8pinc5R9dnn5gHVlQUdwCIzfdza5xHYkjNLlpavQOlp9sFx3gbq2gdQ0aelI003e8Wg6uhlmbbsHfyVvMh3co3m0t0Oc91hMOI2pJ55cjWL4zcxNJ0xPohSKaS5QoLBHu3hqAApC6X1r1dDLvGW6ECnTzuJeiv0rkQQ5s8Ma3gO', // Replace with your Sanity API token
    useCdn: false, // Set to false for write operations
    apiVersion: 'v2025-01-18', // Use a specific API version
});

const apiUrl = 'https://dummyjson.com/products?limit=194';

// Helper function to upload an image to Sanity
async function uploadImage(url) {
    try {
        const fetch = (await import('node-fetch')).default;

        // Fetch the image
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch image from ${url}: ${response.statusText}`);
        }

        // Convert the image to a buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload the image to Sanity
        const asset = await client.assets.upload('image', buffer, {
            filename: url.split('/').pop(),
        });

        return asset._id; // Return the Sanity asset ID
    } catch (error) {
        console.error(`Error uploading image: ${url}`, error);
        return null;
    }
}

// Helper function to upload an array of images
// Helper function to upload an array of images
async function uploadImages(urls) {
    const assetRefs = [];
    for (const url of urls) {
        const assetId = await uploadImage(url);
        if (assetId) {
            assetRefs.push({
                _type: 'image',
                asset: { _ref: assetId },
                _key: uuidv4(), // Generate a unique key for each image
            });
        } else {
            console.error(`Failed to upload image: ${url}`);
        }
    }
    return assetRefs; // Return an array of image references with keys
}


// Fetch and migrate product data
// Fetch and migrate product data
async function migrateProducts() {
    try {
        const fetch = (await import('node-fetch')).default;

        // Fetch data from API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid API response format');
        }

        // Process each product
        for (const product of data.products) {
            try {
                // Upload all product images
                const imageRefs = await uploadImages(product.images);

                // Prepare the product document
                const productDoc = {
                    _type: 'product',
                    _id: `product-${product.id}`, // Custom Sanity document ID
                    id: product.id.toString(), // API ID
                    title: product.title,
                    description: product.description,
                    images: imageRefs, // Use uploaded image references with keys
                    category: product.category,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    tags: product.tags || [],
                    stock: product.stock,
                    brand: product.brand,
                    availabilityStatus: product.stock > 0 ? 'available' : 'out-of-stock',
                };

                // Upload the product document
                await client.createOrReplace(productDoc);
                console.log(`Uploaded product: ${product.title}`);
            } catch (error) {
                console.error(`Error processing product: ${product.title}`, error);
            }
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    }
}


// Run the migration
migrateProducts();
