using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebAPI.DTO;

namespace DotNet6WebApi.Helper
{
    public class AutoMapperSetting : Profile
    {
        public AutoMapperSetting()
        {
            //Genre
            CreateMap<Genre, GenreDTO>().ReverseMap();
            CreateMap<Genre, GenreInfoDTO>().ReverseMap();
            CreateMap<Genre, SmallerGenreDTO>().ReverseMap();
            CreateMap<Genre, CreateGenreDTO>().ReverseMap();
            CreateMap<Genre, GenreInfoAdminDTO>().ReverseMap();
            //User
            CreateMap<AppUser, UserRegisterDTO>().ReverseMap();
            CreateMap<AppUser, LoginUserDTO>().ReverseMap();
            CreateMap<AppUser, UpdateUserDTO>().ReverseMap();
            CreateMap<AppUser, SimpleUserDTO>().ReverseMap();
            CreateMap<AppUser, SimpleUserForAdminDTO>().ReverseMap();
            CreateMap<AppUser, UserIdDTO>().ReverseMap();
            //Publisher
            CreateMap<Publisher, PublisherDTO>().ReverseMap();
            CreateMap<Publisher, DetailPublisherDTO>().ReverseMap();
            //Author
            CreateMap<Author, AuthorDTO>().ReverseMap();
            CreateMap<Author, DetailAuthorDTO>().ReverseMap();
            //Book
            CreateMap<Book, BookDTO>().ReverseMap();
            CreateMap<Book, SimpleBookInfoDTO>().ReverseMap();
            CreateMap<Book, CreateBookDTO>().ReverseMap();
            CreateMap<Book, AdminBookDTO>().ReverseMap();
            //PromotionInfo
            CreateMap<PromotionInfo, PromotionInfoDTO>().ReverseMap();
            CreateMap<PromotionInfo, SimplePromotionInfoDTO>().ReverseMap();
            //Promotion
            CreateMap<Promotion, PromotionDTO>().ReverseMap();
            CreateMap<Promotion, FullPromotionDTO>().ReverseMap();
            CreateMap<Promotion, CreatPromotionDTO>().ReverseMap();
            //Review
            CreateMap<Review, ReviewDTO>().ReverseMap();
            CreateMap<Review, CreateReviewDTO>().ReverseMap();
            //Order
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<Order, CreateOrderDTO>().ReverseMap();
            //Order Details
            CreateMap<OrderDetail, OrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetail, CreateOrderDetailDTO>().ReverseMap();
            //Employee
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Employee, CreateEmployeeDTO>().ReverseMap();
            //DiscountCode
            CreateMap<DiscountCode, DiscountCodeDTO>().ReverseMap();
            CreateMap<DiscountCode, CreateDiscountCodeDTO>().ReverseMap();
            CreateMap<DiscountCode, SimpleDiscountStatusDTO>().ReverseMap();
        }
    }
}
