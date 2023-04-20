using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace API.Helpers
{
    public class ArticleGalleryUrlsResolver : IValueResolver<Article, ArticleToReturnDto, string[]>
    {
        private readonly IConfiguration _config;
        public ArticleGalleryUrlsResolver(IConfiguration config)
        {
            _config = config;
        }

        public string[] Resolve(Article source, ArticleToReturnDto destination, string[] destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.GalleryUrls))
            {
                var apiUrl = _config["ApiUrl"];
                var urls = source.GalleryUrls.Split(' ');
                return urls.Select(url => apiUrl + url.Trim()).ToArray();
            }

            return null;
        }
    }
}
