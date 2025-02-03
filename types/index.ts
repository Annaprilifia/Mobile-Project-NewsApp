export interface NewsDataType {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source_icon: string;
  article_id: string;
  source: {
    name: string;
    url: string;
};
}

interface Sentimentstats {
positive: number;
neutral: number;
negative: number;
}
