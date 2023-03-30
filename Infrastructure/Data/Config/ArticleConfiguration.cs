using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Title).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(180);
            builder.Property(p => p.Text).IsRequired().HasMaxLength(2000);
            builder.Property(p => p.Date).HasColumnType("date");
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.HasOne(b => b.ArticleCategory).WithMany()
                .HasForeignKey(p => p.ArticleCategoryId);
        }
    }
}