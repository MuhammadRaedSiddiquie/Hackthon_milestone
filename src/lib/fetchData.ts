import { createClient } from '@sanity/client';
import { sanityClient } from './sanity.client';

const client = createClient({
  projectId: 'dbeyokym',
  dataset: 'production',
  apiVersion: 'v2025-01-18',
  useCdn: true, // Use CDN for faster read operations
});

// Utility function for querying Sanity
export async function fetchData(query: string, params: Record<string, any> = {}) {
  
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
