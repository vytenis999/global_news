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
    }
}