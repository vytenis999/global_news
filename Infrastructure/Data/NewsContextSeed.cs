using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class NewsContextSeed
    {
        public static async Task SeedAsync(NewsContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ArticleCategories.Any())
                {
                    var brandsData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/categories.json");

                    var brands = JsonSerializer.Deserialize<List<ArticleCategory>>(brandsData);

                    foreach (var item in brands)
                    {
                        context.ArticleCategories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Articles.Any())
                {
                    var articlesData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/articles.json");

                    var products = JsonSerializer.Deserialize<List<Article>>(articlesData);

                    foreach (var item in products)
                    {
                        context.Articles.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<NewsContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}