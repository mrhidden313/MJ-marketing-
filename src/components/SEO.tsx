import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  image?: string;
  path?: string; // Relative path (e.g. '/properties')
  schemaData?: any; // JSON-LD schema object
}

export default function SEO({ 
  title, 
  description, 
  name = "MJ GROUP OF COMPANIES", 
  type = "website", 
  image = "https://mjmarketingofficial.com/logo.png",
  path = "",
  schemaData
}: SEOProps) {
  
  const baseUrl = "https://mjmarketingofficial.com";
  const canonicalUrl = `${baseUrl}${path}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Facebook / Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional tags for search engines */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Dynamic JSON-LD Schema */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
