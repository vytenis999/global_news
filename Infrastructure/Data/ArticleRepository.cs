using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly NewsContext _context;
        public ArticleRepository(NewsContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<ArticleCategory>> GetArticleCategoriesAsync()
        {
            return await _context.ArticleCategories.ToListAsync();
        }

        public async Task<ArticleCategory> GetArticleCategoryByIdAsync(int id)
        {
            return await _context.ArticleCategories.FindAsync(id);
        }

        public async Task<Article> GetArticleByIdAsync(int id)
        {
            return await _context.Articles
                .Include(p => p.ArticleCategory)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Article>> GetArticlesAsync()
        {
            return await _context.Articles
                .Include(p => p.ArticleCategory)
                .ToListAsync();
        }

        public async Task PostArticleAsync(Article article)
        {
            if (article != null)
            {
                _context.Articles.Add(article);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateArticleAsync(Article article)
        {
            if (article != null)
            {
                var existingArticle = await _context.Articles.FindAsync(article.Id);
                if (existingArticle != null)
                {
                    existingArticle.Date = article.Date;
                    existingArticle.Title = article.Title;
                    existingArticle.Description = article.Description;
                    existingArticle.Text = article.Text;
                    existingArticle.PictureUrl = article.PictureUrl;
                    existingArticle.GalleryUrls = article.GalleryUrls;
                    existingArticle.ArticleCategory = article.ArticleCategory;
                    existingArticle.ArticleCategoryId = article.ArticleCategoryId;
                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task DeleteArticleAsync(int id)
        {
            var itemToRemove = await _context.Articles.FindAsync(id);
            if (itemToRemove != null)
            {
                _context.Articles.Remove(itemToRemove);
                await _context.SaveChangesAsync();
            }
        }
    }
}