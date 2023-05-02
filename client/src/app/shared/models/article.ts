export interface IArticle {
  id: number;
  date: Date;
  title: string;
  description: string;
  text: string;
  pictureUrl: string;
  galleryUrls: string[];
  articleCategory: string;
}

export interface IArticleAdd {
  date: Date;
  title: string;
  description: string;
  text: string;
  pictureUrl: string;
  galleryUrls: string[];
  articleCategoryId: number;
}


