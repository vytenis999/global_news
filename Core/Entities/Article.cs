using System;

namespace Core.Entities
{
    public class Article : BaseEntity
    {
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string PictureUrl { get; set; }
        public string GalleryUrls { get; set; }
        public ArticleCategory ArticleCategory { get; set; }
        public int ArticleCategoryId { get; set; }
    }
}