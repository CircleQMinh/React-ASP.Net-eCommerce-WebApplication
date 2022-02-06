using DotNet6WebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNet6WebApi.Seed
{
    public class PublisherSeed : IEntityTypeConfiguration<Publisher>
    {
        void IEntityTypeConfiguration<Publisher>.Configure(EntityTypeBuilder<Publisher> builder)
        {
            builder.HasData(
                new Publisher() { Name = "NXB Hội Nhà Văn", Id = 1 },
                new Publisher() { Name = "NXB Tổng Hợp TPHCM", Id = 2 },
                new Publisher() { Name = "NXB Kim Đồng", Id = 3 },
                new Publisher() { Name = "NXB Trẻ", Id = 4 },
                new Publisher() { Name = "NXB Thanh Niên", Id = 5 },
                new Publisher() { Name = "NXB Đà Nẵng", Id = 6 },
                new Publisher() { Name = "NXB Hồng Đức", Id = 7 },
                new Publisher() { Name = "NXB Dân trí", Id = 8 },
                new Publisher() { Name = "NXB Thể Dục Thể Thao", Id = 9 },
                new Publisher() { Name = "NXB Thanh Hóa", Id = 10 },
                new Publisher() { Name = "NXB Văn Học", Id = 11 }
            );
        }
    }
}
