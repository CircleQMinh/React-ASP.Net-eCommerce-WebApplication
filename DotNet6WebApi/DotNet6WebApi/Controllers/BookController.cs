using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebApi.Helper;
using DotNet6WebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace DotNet6WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public BookController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            try
            {
                var book = await unitOfWork.Books.Get(q => q.Id == id, new List<string> { "Authors", "Genres", "Publisher", "PromotionInfo", "WishlistUsers" });
                if (book == null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy sản phẩm" });
                }
                if (book.PromotionInfo != null)
                {
                    var promoInfo = await unitOfWork.PromotionInfos.Get(q => q.Id == book.PromotionInfoID, new List<string> { "Promotion" });
                    if (promoInfo.Promotion.Status == (int)PromotionStatus.Hidden)
                    {
                        book.PromotionInfo = null;
                        book.PromotionInfoID = null;
                    }
                }
                var result = mapper.Map<BookDTO>(book);

                var rev = await unitOfWork.Reviews.GetAll(q => q.BookId == id, q => q.OrderBy(r => r.Date), new List<string> { "User" });
                var reviews = mapper.Map<IList<ReviewDTO>>(rev);
                return Ok(new { result = result, success = true, reviews = reviews });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetBooks(int pageNumber, int pageSize, string? keyword = null, string? priceRange = null, string? genreFilter = null)
        {

            Expression<Func<Book, bool>> expression = q => true;

            try
            {


                if (keyword != null)
                {
                    Expression<Func<Book, bool>> expression_keyword = q => q.Title.Contains(keyword);
                    expression = expression.AndAlso(expression_keyword);

                }
                if (priceRange != null)
                {
                    string[] pr = priceRange.Split(',');
                    Expression<Func<Book, bool>> expression_priceRange = q => q.Price > int.Parse(pr[0]) && q.Price < int.Parse(pr[1]);
                    expression = expression.AndAlso(expression_priceRange);
                }
                if (genreFilter != null)
                {
                    string[] listGenre = genreFilter.Split(",");
                    Expression<Func<Book, bool>> expression_genre = q => q.Genres.Any(genre => listGenre.ToList().Contains(genre.Name));
                    expression = expression.AndAlso(expression_genre);
                }
                var books = await unitOfWork.Books.GetAll(expression, q => q.OrderBy(book => book.Id),
                    new List<string> { "PromotionInfo", "WishlistUsers" }, new PaginationFilter(pageNumber, pageSize));

                var count = await unitOfWork.Books.GetCount(expression);
                var result = mapper.Map<IList<BookDTO>>(books);

                //Che giấu thông tin khuyến mãi nếu chương trình chưa diễn ra
                foreach (var book in result)
                {
                    if (book.PromotionInfo != null)
                    {
                        var promoInfo = await unitOfWork.PromotionInfos.Get(q => q.Id == book.PromotionInfoID, new List<string> { "Promotion" });
                        if (promoInfo.Promotion.Status == (int)PromotionStatus.Hidden)
                        {
                            book.PromotionInfo = null;
                            book.PromotionInfoID = null;
                        }
                    }
                }

                return Ok(new { result = result, totalProduct = (int)Math.Ceiling((double)count / pageSize) });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("{id}/related")]
        public async Task<IActionResult> GetRelatedBook(int id,int numberOfBook)
        {
            try
            {
                var book = await unitOfWork.Books.Get(q => q.Id == id, new List<string> { "Authors", "Genres", "Publisher"});
                if (book == null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy sản phẩm" });
                }

                Expression<Func<Book, bool>> expression =
                    q =>
                    (q.Authors.Any(author => book.Authors.Contains(author))
                ||  q.Genres.Any(genre => book.Genres.Contains(genre))
                ||  q.Publisher==book.Publisher)
                &&  q.Id!=id;

                var relatedBook = await unitOfWork.Books.GetAll(expression, q => q.OrderBy(book => Guid.NewGuid()),
                    new List<string>() { "Authors", "Genres", "Publisher"},
                    new PaginationFilter(1, numberOfBook));

                if (relatedBook.Count<numberOfBook)
                {
                    Expression<Func<Book, bool>> expression_revert =
                        q =>
                    !(q.Authors.Any(author => book.Authors.Contains(author))
                    || q.Genres.Any(genre => book.Genres.Contains(genre))
                    || q.Publisher == book.Publisher)
                    && q.Id != id;
                    var randomBooks = await unitOfWork.Books.GetAll(expression_revert, q => q.OrderBy(book => Guid.NewGuid()),
                        new List<string>() { "PromotionInfo", "WishlistUsers" }, 
                        new PaginationFilter(1, numberOfBook-relatedBook.Count));
                    relatedBook = relatedBook.Concat(randomBooks).ToList();
                }
                foreach (var rbook in relatedBook)
                {
                    var promoInfo = await unitOfWork.PromotionInfos.Get(
                        q => q.Book.Id == rbook.Id &&
                        q.Promotion.Status == (int)PromotionStatus.OnGoing
                        );
                    rbook.PromotionInfo = promoInfo;
                }
                var result = mapper.Map<IList<BookDTO>>(relatedBook);


                return Ok(new { result});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpGet("getRandomProduct")]
        public async Task<IActionResult> GetRandomBook( int numberOfBook)
        {
            try
            {
                var randomBooks = await unitOfWork.Books.GetAll(
                    null,
                    q => q.OrderBy(book => Guid.NewGuid()),
                    new List<string>() { "Authors", "Genres", "Publisher", "WishlistUsers" },
                    new PaginationFilter(1, numberOfBook));
                foreach (var rbook in randomBooks)
                {
                    var promoInfo = await unitOfWork.PromotionInfos.Get(
                        q => q.Book.Id == rbook.Id &&
                        q.Promotion.Status == (int)PromotionStatus.OnGoing
                        );
                    rbook.PromotionInfo = promoInfo;
                }
                var result = mapper.Map<IList<BookDTO>>(randomBooks);
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpGet("getPopularProduct")]
        public async Task<IActionResult> GetPopularProduct(int numberOfBook)
        {
            try
            {
                var orderDetails = await unitOfWork.OrderDetails.GetAll(q => q.Order.Status == (int)OrderStatus.Done, null, new List<string> { "Book" });
                Dictionary<int,int> dic = new Dictionary<int,int>();
                foreach (var od in orderDetails)
                {
                    if (!dic.ContainsKey(od.BookId))
                    {
                        dic.Add(od.BookId, od.Quantity);
                    }
                    else
                    {
                        dic[od.BookId] += od.Quantity;
                    }
                }
                List<PopularBookDTO> result = new List<PopularBookDTO>();
                foreach (var item in dic)
                {
                    var od = orderDetails.Where(q=>q.BookId==item.Key).FirstOrDefault();
                    var rs = new PopularBookDTO() { Book = mapper.Map<BookDTO>(od.Book), Sales = item.Value };
                    result.Add(rs);
                }

                result.Sort((a, b) => b.Sales - a.Sales ); //Desc
                result = result.Take(numberOfBook).ToList();

               foreach (var item in result)
                {
                    var temp = await unitOfWork.Books.Get(q => q.Id == item.Book.Id, new List<string> { "Authors", "Genres", "Publisher", "WishlistUsers" });
                    var promoinfo = await unitOfWork.PromotionInfos.Get(q => q.Book.Id == temp.Id &&
                      q.Promotion.Status == (int)PromotionStatus.OnGoing);
                    temp.PromotionInfo= promoinfo;
                    item.Book = mapper.Map<BookDTO>(temp);
                }
                
            
                return Ok(new {result});;
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }

        [HttpGet("getLatestBook")]
        public async Task<IActionResult> GetLatestBook(int number)
        {
            try
            {
                var books = await unitOfWork.Books.GetAll(q => true, q => q.OrderByDescending(p => p.Id), new List<string> { "Authors", "Genres", "Publisher", "WishlistUsers" }, new PaginationFilter(1, number));
                foreach (var book in books)
                {
                    var promoInfo = await unitOfWork.PromotionInfos.Get(
                        q => q.Book.Id == book.Id &&
                        q.Promotion.Status == (int)PromotionStatus.OnGoing
                        );
                    book.PromotionInfo = promoInfo;
                }
                return Ok(new { success = true, result = books });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }


        //-----------------------------------------------------------------------

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetBooksForAdmin(string genre, string orderby, string sort, int pageNumber, int pageSize)
        {

            try
            {
                Expression<Func<Book, bool>> expression = genre == "all" ? q => true : q => q.Genres.Any(g => g.Id == int.Parse(genre));
                Func<IQueryable<Book>, IOrderedQueryable<Book>> orderBy = null;
                switch (orderby)
                {
                    case "Id":
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Id) : q => q.OrderByDescending(p => p.Id);
                        break;
                    case "Title":
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Title) : q => q.OrderByDescending(p => p.Title);
                        break;
                    case "Price":
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Price) : q => q.OrderByDescending(p => p.Price);
                        break;
                    default:
                        orderBy = (sort == "Asc") ? q => q.OrderBy(p => p.Id) : q => q.OrderByDescending(p => p.Id);
                        break;
                }

                var books = await unitOfWork.Books.GetAll(expression, orderBy, new List<string> { "Authors", "Genres", "Publisher" }, new PaginationFilter(pageNumber, pageSize));
                foreach (var book in books)
                {
                    var promoInfo = await unitOfWork.PromotionInfos.Get(
                        q => q.Book.Id == book.Id &&
                        q.Promotion.Status == (int)PromotionStatus.OnGoing
                        );
                    book.PromotionInfo = promoInfo;
                }
                var count = await unitOfWork.Books.GetCount(expression);
                var result = mapper.Map<IList<AdminBookDTO>>(books);

                return Accepted(new { result = result, totalProduct = count });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> PostBook(CreateBookDTO bookDTO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var newBook = new Book();
                newBook.Title = bookDTO.Title;
                newBook.Description = bookDTO.Description;
                newBook.imgUrl = bookDTO.imgUrl;
                newBook.Price = bookDTO.Price;
                newBook.NumberOfPage = bookDTO.NumberOfPage;
                newBook.PublishYear = bookDTO.PublishYear;
                newBook.CreateDate = DateTime.Now;
                newBook.UpdateDate = DateTime.Now;
                newBook.Authors = new List<Author>();
                newBook.Genres = new List<Genre>();

                var publisher = await unitOfWork.Publishers.Get(q => q.Name == bookDTO.PublisherName.Trim());
                if (publisher == null)
                {
                    publisher = new Publisher() { Name = bookDTO.PublisherName };
                    newBook.Publisher = publisher;
                }
                else
                {
                    newBook.PublisherId = publisher.Id;
                }

                await unitOfWork.Books.Insert(newBook);
                await unitOfWork.Save();

                foreach (var authorName in bookDTO.AuthorsString)
                {
                    var author = await unitOfWork.Authors.Get(q => q.Name == authorName.Trim());
                    if (author == null)
                    {
                        author = new Author() { Name = authorName };
                    }
                    newBook.Authors.Add(author);

                }

                foreach (var item in bookDTO.GenresString)
                {
                    var genre = await unitOfWork.Genres.Get(q => q.Name == item.Trim());
                    if (genre == null)
                    {
                        genre = new Genre() { Name = item, Description = "" };
                    }
                    newBook.Genres.Add(genre);
                }


                await unitOfWork.Save();
                return Ok(new { book = newBook, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString(), success = false });
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> PutBook([FromBody] CreateBookDTO bookDTO, int id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var book = await unitOfWork.Books.Get(q => q.Id == id, new List<string> { "Authors", "Genres", "Publisher" });
                if (book == null)
                {
                    return Ok(new { error = "Không tìm thấy sản phẩm", success = false });
                }
                unitOfWork.Books.Update(book);
                book.Title = bookDTO.Title;
                book.Description = bookDTO.Description;
                book.imgUrl = bookDTO.imgUrl;
                book.Price = bookDTO.Price;
                book.NumberOfPage = bookDTO.NumberOfPage;
                book.PublishYear = bookDTO.PublishYear;
                book.UpdateDate=DateTime.Now;
                //loại các author ko còn trong danh sách
                List<Author> authorListToDelete = new List<Author>();
                foreach (var author in book.Authors)
                {
                    bool match = false;
                    foreach (var item in bookDTO.AuthorsString)
                    {
                        if (author.Name == item.Trim())
                        {
                            match = true;
                            break;
                        }
                    }
                    if (!match)
                    {
                        authorListToDelete.Add(author);
                    }
                }
                foreach (var author in book.Authors.ToList())
                {
                    if (authorListToDelete.Contains(author))
                    {
                        Console.WriteLine("Remove : " + author.Name);
                        unitOfWork.Authors.Update(author);
                        book.Authors.Remove(author);
                    }
                }


                //thêm các author mới
                List<Author> authorListToAdd = new List<Author>();
                foreach (var item in bookDTO.AuthorsString)
                {
                    bool match = false;
                    foreach (var author in book.Authors.ToList())
                    {
                        if (item == author.Name)
                        {
                            match = true;
                            break;
                        }
                    }
                    if (!match)
                    {
                        authorListToAdd.Add(new Author() { Name = item });
                    }
                }
                foreach (var author in authorListToAdd)
                {
                    book.Authors.Add(author);
                }


                //update publisher
                if (book.Publisher.Name != bookDTO.PublisherName.Trim())
                {
                    var publisher = await unitOfWork.Publishers.Get(q => q.Name == bookDTO.PublisherName.Trim());
                    if (publisher != null)
                    {
                        unitOfWork.Publishers.Update(publisher);
                        book.Publisher = publisher;
                    }
                    else
                    {
                        var newPublisher = new Publisher() { Name = bookDTO.PublisherName.Trim() };
                        book.Publisher = newPublisher;
                    }
                }

                //loại các genre ko còn trong danh sách
                List<Genre> genreListToDelete = new List<Genre>();
                foreach (var genre in book.Genres)
                {
                    bool match = false;
                    foreach (var item in bookDTO.GenresString)
                    {
                        if (genre.Name.Equals(item))
                        {
                            match = true;
                            break;
                        }
                    }
                    if (!match)
                    {
                        genreListToDelete.Add(genre);
                    }
                }
                foreach (var genre in book.Genres.ToList())
                {
                    if (genreListToDelete.Contains(genre))
                    {
                        unitOfWork.Genres.Update(genre);
                        book.Genres.Remove(genre);
                    }
                }

                //thêm các genre mới
                List<Genre> genreListToAdd = new List<Genre>();
                foreach (var item in bookDTO.GenresString)
                {
                    bool match = false;
                    foreach (var genre in book.Genres.ToList())
                    {
                        if (genre.Name.Equals(item))
                        {
                            match = true;
                            break;
                        }
                    }
                    if (!match)
                    {
                        var genreToAdd = await unitOfWork.Genres.Get(q => q.Name == item.Trim());
                        if (genreToAdd == null)
                        {
                            genreListToAdd.Add(new Genre() { Name = item, Description = "" });
                        }
                        else
                        {
                            genreListToAdd.Add(genreToAdd);
                        }
                    }
                }
                foreach (var genre in genreListToAdd)
                {
                    book.Genres.Add(genre);
                }

                await unitOfWork.Save();
                book = await unitOfWork.Books.Get(q => q.Id == id, new List<string> { "Authors", "Genres", "Publisher" });
                var result = mapper.Map<BookDTO>(book);
                return Ok(new { result = result, success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var book = await unitOfWork.Books.Get(q => q.Id == id, new List<string> { "Authors", "Genres", "Publisher" });
                if (book == null)
                {
                    return Ok(new { success = false, msg = "Không tìm thấy sản phẩm" });
                }
                await unitOfWork.Books.Delete(book.Id);
                await unitOfWork.Save();
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }


        [HttpPost("addToWishlist")]
        [Authorize]
        public async Task<IActionResult> AddBookToWishlist([FromBody] AddBookToWishlist dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                var product = await unitOfWork.Books.Get(q => q.Id == dto.BookId, new List<string> { "WishlistUsers" });
                var user = await unitOfWork.Users.Get(q => q.Id == dto.UserId,new List<string> { "Wishlist"});

                if (product==null||user==null)
                {
                    return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
                }

                foreach (var item in user.Wishlist)
                {
                    if (item.Id==product.Id)
                    {
                        return Ok(new { error = "Sản phẩm đã nằm trong wishlist rồi!", success = false });
                    }
                }
                unitOfWork.Users.Update(user);
                unitOfWork.Books.Update(product);
                product.WishlistUsers.Add(user);
                user.Wishlist.Add(product);

                await unitOfWork.Save();
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("removeFromWishlist")]
        [Authorize]
        public async Task<IActionResult> RemoveBookFromWishlist([FromBody] AddBookToWishlist dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
            }
            try
            {
                Book product = await unitOfWork.Books.Get(q => q.Id == dto.BookId, new List<string> { "WishlistUsers" });
                AppUser user = await unitOfWork.Users.Get(q => q.Id == dto.UserId, new List<string> { "Wishlist" });

                if (product == null || user == null)
                {
                    return Ok(new { error = "Dữ liệu chưa hợp lệ", success = false });
                }

                bool isItemInFav = false;
                foreach (var item in user.Wishlist)
                {
                    if (item.Id == product.Id)
                    {
                        isItemInFav = true;
                        break;
                    }
                }

                if (!isItemInFav)
                {
                    return Ok(new { success = false });
                }
                unitOfWork.Users.Update(user);


                //unitOfWork.Products.Update(pro);

                foreach (var item in user.Wishlist.ToList())
                {
                    if (item.Id == product.Id)
                    {
                        user.Wishlist.Remove(item);
                    }
                }
                foreach (var item in product.WishlistUsers.ToList())
                {
                    if (item.Id == user.Id)
                    {
                        product.WishlistUsers.Remove(item);
                    }
                }


                await unitOfWork.Save();
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
