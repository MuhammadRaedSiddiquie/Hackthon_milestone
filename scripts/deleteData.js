const { createClient } = require('@sanity/client');


// Initialize the Sanity client
const client = createClient({
  projectId: 'dbeyokym', // Replace with your Sanity project ID
  dataset: 'production',     // Replace with your Sanity dataset
  token: 'skggNVEMn8pinc5R9dnn5gHVlQUdwCIzfdza5xHYkjNLlpavQOlp9sFx3gbq2gdQ0aelI003e8Wg6uhlmbbsHfyVvMh3co3m0t0Oc91hMOI2pJ55cjWL4zcxNJ0xPohSKaS5QoLBHu3hqAApC6X1r1dDLvGW6ECnTzuJeiv0rkQQ5s8Ma3gO',         // Replace with your Sanity API token
  useCdn: false,               // Set to false for write operations
  apiVersion: 'v2025-01-18',    // Use a specific API version
});

// Delete all documents of type `product`
async function deleteMigratedData() {
  try {
    // Fetch all documents of the specified type
    const documents = await client.fetch('*[_type == "product"]{_id}');
    
    if (documents.length === 0) {
      console.log('No documents found to delete.');
      return;
    }

    console.log(`Found ${documents.length} documents to delete.`);

    // Delete documents in a loop
    for (const doc of documents) {
      await client.delete(doc._id);
      console.log(`Deleted document: ${doc._id}`);
    }

    console.log('All documents deleted successfully.');
  } catch (error) {
    console.error('Error deleting documents:', error.message);
  }
}

// Run the deletion script
deleteMigratedData();
