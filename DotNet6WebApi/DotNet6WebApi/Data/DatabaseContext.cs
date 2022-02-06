﻿using DotNet6WebApi.Helper;
using DotNet6WebApi.Seed;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DotNet6WebApi.Data
{

    public class DatabaseContext : IdentityDbContext<AppUser>
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Publisher> Publisher { get; set; }

        public DbSet<Review> Reviews { get; set; }
        public DbSet<Promotion> Promotion { get; set; }
        public DbSet<PromotionInfo> PromotionInfo { get; set;}
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail>  OrderDetails { get; set; }
        public DbSet<DiscountCode> DiscountCodes { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Bỏ tiền tố AspNet của các bảng: mặc định các bảng trong IdentityDbContext có
            // tên với tiền tố AspNet như: AspNetUserRoles, AspNetUser ...
            // Đoạn mã sau chạy khi khởi tạo DbContext, tạo database sẽ loại bỏ tiền tố đó
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName();
                if (tableName.StartsWith("AspNet"))
                {
                    entityType.SetTableName(tableName.Substring(6));
                }
            }

            builder.ApplyConfiguration(new RoleConfig());
            //builder.ApplyConfiguration(new AuthorSeed());
            //builder.ApplyConfiguration(new PublisherSeed());
            //builder.ApplyConfiguration(new BookSeed());
            //builder.ApplyConfiguration(new GenreSeed());

        }

    }

}
