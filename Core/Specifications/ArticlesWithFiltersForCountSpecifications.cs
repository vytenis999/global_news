using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ArticlesWithFiltersForCountSpecifications : BaseSpecification<Article>
    {
        public ArticlesWithFiltersForCountSpecifications(ArticleSpecParams articleParams)
            : base(x => 
                (string.IsNullOrEmpty(articleParams.Search) || x.Title.ToLower().Contains(articleParams.Search)) &&
                (!articleParams.CategoryId.HasValue || x.ArticleCategoryId == articleParams.CategoryId)
            )
        {
        }
    }
}