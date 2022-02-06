using DotNet6WebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace DotNet6WebApi.Seed
{
    public class GenreSeed : IEntityTypeConfiguration<Genre>
    {
        void IEntityTypeConfiguration<Genre>.Configure(EntityTypeBuilder<Genre> builder)
        {
            builder.HasData(
             new Genre() { Name = "Thiếu Nhi", Id = 1 },
             new Genre() { Name = "Kỹ Năng Sống", Id = 2 },
             new Genre() { Name = "Manga", Id = 3 },
             new Genre() { Name = "Kinh Tế", Id = 4 },
             new Genre() { Name = "Khoa Học Kỹ Thuật", Id = 5 },
             new Genre() { Name = "Triết Học", Id = 6 },
             new Genre() { Name = "Âm Nhạc & Mỹ Thuật", Id = 7 },
             new Genre() { Name = "Giải trí", Id = 8 },
             new Genre() { Name = "Văn Học", Id = 9 }
         );
        }
    }
}
