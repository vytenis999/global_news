using System;
using System.Collections.Generic;
using System.IO;
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
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private readonly IGenericRepository<Article> _articlesRepo;
        private readonly IGenericRepository<ArticleCategory> _articleCategoryRepo;
        private readonly IMapper _mapper;
        private readonly IArticleRepository _articleRepository;
        private readonly IWebHostEnvironment _env;
        private readonly string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
        private readonly string uploadPath = @"../API/wwwroot/images/articles";

        public ArticlesController(IGenericRepository<Article> articlesRepo, IGenericRepository<ArticleCategory> articleCategoryRepo, IMapper mapper, IArticleRepository articleRepository, IWebHostEnvironment env)
        {
            _mapper = mapper;
            _articleCategoryRepo = articleCategoryRepo;
            _articlesRepo = articlesRepo;
            _articleRepository = articleRepository;
            _env = env;
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

        [HttpPost("uploadimages")]
        public async Task<IActionResult> UploadImages(IFormFileCollection files)
        {
            var result = new List<string>();
            foreach (var file in files)
            {
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                {
                    continue;
                }
                var fileName = file.FileName;
                var filePath = Path.Combine(uploadPath, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                result.Add(fileName);
            }
            return Ok(result);
        }

        [HttpDelete("deletearticle/{id}")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            await _articleRepository.DeleteArticleAsync(id);
            return Ok();
        }
    }
}