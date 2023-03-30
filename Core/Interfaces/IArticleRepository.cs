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
    }
}