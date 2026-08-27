export interface Property {
  id:         string;
  title:      string;
  location:   string;
  price:      string;
  beds?:      number;
  baths?:     number;
  area:       string;
  type:       string;
  tag?:       string;
  tagColor?:  'gold' | 'red';
  image:      string;
  video_url?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  video_url?: string;
  created_at?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image?: string;
  video_url?: string;
  created_at?: string;
}
