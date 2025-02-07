import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "6spgz8iy", // Replace with your actual Sanity project ID
  dataset: "production",        // Replace with your dataset name (default: "production")
  apiVersion: "2025-01-13",     // Use the latest API version or specify a compatible one
  useCdn: true,                 // `true` for faster reads via CDN; `false` for real-time data
  token: "skbk9Jfk7bzdAUdF4sXaxeaH7vylOipGFWNLHJaMeFYNkViLJamamgs4kCycpfuPftIWV2w6rNYvaCi4Fcr5cVTAbpm6kLkOnTslK7oQyRZ61gC6ykdEtobSMncA9zq0HaNvTZDoN2o1kEApZNdly7j6YhvmJwcS3u3eDpvkASSgITrAB344",   // Optional: Add this if you need to access private data
});

export default client;
