using DotNet6WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNet6WebAPI.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Book> Books { get; }
        IGenericRepository<Genre> Genres { get; }
        IGenericRepository<Author> Authors { get; }
        IGenericRepository<Publisher> Publishers { get; }

        IGenericRepository<Review> Reviews { get; }
        IGenericRepository<PromotionInfo> PromotionInfos { get; }
        IGenericRepository<Promotion> Promotions { get; }
        IGenericRepository<Order> Orders { get; }
        IGenericRepository<OrderDetail> OrderDetails { get; }

        IGenericRepository<DiscountCode> DiscountCodes { get; }
        Task Save();
    }
}
