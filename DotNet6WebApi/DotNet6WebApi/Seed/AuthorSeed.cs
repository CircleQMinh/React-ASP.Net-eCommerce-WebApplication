using DotNet6WebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace DotNet6WebApi.Seed
{
    public class AuthorSeed : IEntityTypeConfiguration<Author>
    {
        void IEntityTypeConfiguration<Author>.Configure(EntityTypeBuilder<Author> builder)
        {
            builder.HasData(
              new Author() { Name = "Antoine De Saint-Exupéry", Id = 1 },
              new Author() { Name = "Hae Min", Id = 2 },
              new Author() { Name = "Nguyễn Nhật Ánh", Id = 3 },
              new Author() { Name = "Luis Sepúlveda", Id = 4 },
              new Author() { Name = "Mai Luân", Id = 5 },
              new Author() { Name = "Chu Bảo Vị", Id = 6 },
              new Author() { Name = "Jean Arestein", Id = 7 },
              new Author() { Name = "Song Minh", Id = 8 },
              new Author() { Name = "Anthony Storr", Id = 9 },
              new Author() { Name = "Phạm Công Luận", Id = 10 },
              new Author() { Name = "Joy Woodward", Id = 11 },
              new Author() { Name = "Masanobu Fukuoka", Id = 12 },
              new Author() { Name = "T Harv Eker", Id = 13 },
              new Author() { Name = "Robin Sharma", Id = 14 },
              new Author() { Name = "Akira Toriyama", Id = 15 },
              new Author() { Name = "Gosho Aoyama", Id = 16 },
              new Author() { Name = "Yutaka Abe", Id = 17 },
              new Author() { Name = "Dale Carnegie", Id = 18 },
              new Author() { Name = "Trác Nhã", Id = 19 }

          );
        }
    }
}
