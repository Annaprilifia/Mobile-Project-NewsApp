export interface NewsDataType {
  title: string;
  summary: string;
  text: string;
  url: string;
  image: string;
  publishedAt: string;
  source_icon: string;
  article_id: string;
  source: {
    name: string;
    url: string;
  };
  sentiment: number;  // Menambahkan properti sentiment
  authors: string[];  // Menambahkan array authors
  category: string;  // Menambahkan properti category
  language: string;  // Menambahkan properti language
  source_country: string;  // Menambahkan properti source_country
  id: number;
}


interface Sentimentstats {
positive: number;
neutral: number;
negative: number;
}
