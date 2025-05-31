"use client";

import { Post } from "@/app/post/Post";
import { useEffect, useState } from "react";

interface PostType {
  slug: string;
  id?: string;
  title?: string;
  date?: string;
  content?: string;
  featuredImage?: string;
  categories?: { slug: string }[];
  seo?: {
    fullHead: string;
    title: string;
    focusKeywords: string;
  };
}

export default function PostFetcher({ slug }: { slug: string }) {
  const [postData, setPostData] = useState<PostType | null>(null);
  const [jsonLd, setJsonLd] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch post data from API
        const response = await fetch(`/api/post?slug=${slug}`);
        const data = await response.json();
        
        if (data.post) {
          setPostData(data.post);
          
          // Process SEO data
          if (data.post.seo?.fullHead) {
            const processedHead = data.post.seo.fullHead.replace(/\\/g, ''); 
            const jsonLdContent = extractJsonLd(processedHead);
            setJsonLd(jsonLdContent);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    
    fetchData();
  }, [slug]);

  // Helper function to extract JSON-LD
  function extractJsonLd(html: string): string {
    const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
    return match ? match[1] : "";
  }
  
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <Post post={postData} />
    </>
  );
} 