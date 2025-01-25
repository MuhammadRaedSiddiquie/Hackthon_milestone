import { createClient } from 'next-sanity';

export const sanityClient = createClient({
    projectId: 'dbeyokym', // Replace with your Sanity project ID
    dataset: 'production', // Replace with your Sanity dataset
    token: 'sk5yrx2sy2l4FgAVOFooacRXBcOL8sljpvikOHNyLU73EQgyttmiwxkPJpSNkcDIzwl9tcW2zMIQU6dO2ZAMqP4am2fIPgndtFmovdTz7CAkRloxYRhRvlbXdKoAMOUda1sniwGzeakHTaxrT3RU5POXHGhvanOMZWT6yXPSWo7TNAB0Lqeo', // Replace with your Sanity API token
    useCdn: false, // Set to false for write operations
    apiVersion: 'v2025-01-18', // Use a specific API version
});
