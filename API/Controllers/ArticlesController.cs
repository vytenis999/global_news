using System;
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
        private readonly IArticleRepository _articleRepository;

        public ArticlesController(IGenericRepository<Article> articlesRepo, IGenericRepository<ArticleCategory> articleCategoryRepo, IMapper mapper, IArticleRepository articleRepository)
        {
            _mapper = mapper;
            _articleCategoryRepo = articleCategoryRepo;
            _articlesRepo = articlesRepo;
            _articleRepository = articleRepository;
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

        [HttpPost("addarticle")]
        public async Task<ActionResult> PostArticle([FromBody] ArticleToAddDto articleDto)
        {
            articleDto.GalleryUrls = articleDto.GalleryUrls.Select(url => "images/articles/" + url).ToArray();

            var article = new Article
            {
                Date = articleDto.Date,
                Title = articleDto.Title,
                Description = articleDto.Description,
                Text = articleDto.Text,
                PictureUrl = "images/articles/" + articleDto.PictureUrl,
                GalleryUrls = string.Join(' ', articleDto.GalleryUrls),
                ArticleCategoryId = Int32.Parse(articleDto.ArticleCategoryId)
        };

            var articleCategory = await _articleRepository.GetArticleCategoryByIdAsync(Int32.Parse(articleDto.ArticleCategoryId));
            if (articleCategory == null)
            {
                return BadRequest($"Article category with id {articleDto.ArticleCategoryId} does not exist.");
            }
            article.ArticleCategory = articleCategory;

            await _articleRepository.PostArticleAsync(article);

            return Ok();
        }

        [HttpDelete("deletearticle")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            await _articleRepository.DeleteArticleAsync(id);
            return Ok();
        }
    }
}