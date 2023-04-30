using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IArticleRepository
    {
        Task<Article> GetArticleByIdAsync(int id);
        Task<IReadOnlyList<Article>> GetArticlesAsync();
        Task<IReadOnlyList<ArticleCategory>> GetArticleCategoriesAsync();
        Task<ArticleCategory> GetArticleCategoryByIdAsync(int id);
        Task PostArticleAsync(Article article);
        Task UpdateArticleAsync(Article article);
        Task DeleteArticleAsync(int id);
    }
}