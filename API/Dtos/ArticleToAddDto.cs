using System;

namespace API.Dtos
{
    public class ArticleToAddDto
    {
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string PictureUrl { get; set; }
        public string[] GalleryUrls { get; set; }
        public string ArticleCategoryId { get; set; }
    }
}
