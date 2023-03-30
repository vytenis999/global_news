using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ArticleUrlResolver : IValueResolver<Article, ArticleToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ArticleUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Article source, ArticleToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}