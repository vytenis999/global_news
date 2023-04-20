using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Article, ArticleToReturnDto>()
                .ForMember(d => d.ArticleCategory, o => o.MapFrom(s => s.ArticleCategory.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ArticleUrlResolver>())
                .ForMember(d => d.GalleryUrls, o => o.MapFrom<ArticleGalleryUrlsResolver>());
        }
    }
}