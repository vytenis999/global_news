using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ArticlesWithCategoriesSpecification : BaseSpecification<Article>
    {
        public ArticlesWithCategoriesSpecification(ArticleSpecParams articleParams)
            : base(x => 
                (string.IsNullOrEmpty(articleParams.Search) || x.Title.ToLower().Contains(articleParams.Search)) && 
                (!articleParams.CategoryId.HasValue || x.ArticleCategoryId == articleParams.CategoryId)   
            )
        {
            AddInclude(x => x.ArticleCategory);
            AddOrderBy(x => x.Title);
            ApplyPaging(articleParams.PageSize * (articleParams.PageIndex -1), articleParams.PageSize);

            if (!string.IsNullOrEmpty(articleParams.Sort))
            {
                switch (articleParams.Sort)
                {
                    case "dateAsc":
                        AddOrderBy(p => p.Date);
                        break;
                    default:
                        AddOrderByDescending(p => p.Date);
                        break;
                }
            }
        }

        public ArticlesWithCategoriesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ArticleCategory);
        }
    }
}