using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private readonly IGenericRepository<Article> _articlesRepo;
        private readonly IGenericRepository<ArticleCategory> _articleCategoryRepo;
        private readonly IMapper _mapper;

        public ArticlesController(IGenericRepository<Article> articlesRepo, IGenericRepository<ArticleCategory> articleCategoryRepo, IMapper mapper)
        {
            _mapper = mapper;
            _articleCategoryRepo = articleCategoryRepo;
            _articlesRepo = articlesRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ArticleToReturnDto>>> GetArticles([FromQuery]ArticleSpecParams articleParams)
        {
            var spec = new ArticlesWithCategoriesSpecification(articleParams); 

            var countSpec = new ArticlesWithFiltersForCountSpecifications(articleParams);

            var totalItems = await _articlesRepo.CountAsync(countSpec);

            var articles = await _articlesRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Article>, IReadOnlyList<ArticleToReturnDto>>(articles);

            return Ok(new Pagination<ArticleToReturnDto>(articleParams.PageIndex, articleParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ArticleToReturnDto>> GetArticle(int id)
        {
            var spec = new ArticlesWithCategoriesSpecification(id);

            var article = await _articlesRepo.GetEntityWithSpec(spec);

            if(article == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Article, ArticleToReturnDto>(article);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<ArticleCategory>>> GetProductBrands()
        {
            return Ok(await _articleCategoryRepo.ListAllAsync());
        }

    }
}