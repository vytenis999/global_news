export interface IArticle {
  id: number;
  date: Date;
  title: string;
  description: string;
  text: string;
  pictureUrl: string;
  GalleryUrls: string[];
  articleCategory: string;
}
