using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class seed_database : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0b9112fb-bc3b-46c3-a623-a833bb004473");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "37d6d792-4668-44a5-82d5-2c5d6ceaaa57");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a1dfa62a-1b3b-49cf-8577-e8b7413ff563");

            migrationBuilder.AlterColumn<string>(
                name: "imgUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPage",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PublishYear",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PublisherId",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Author",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Author", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Publisher",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Publisher", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuthorBook",
                columns: table => new
                {
                    AuthorsId = table.Column<int>(type: "int", nullable: false),
                    BooksId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthorBook", x => new { x.AuthorsId, x.BooksId });
                    table.ForeignKey(
                        name: "FK_AuthorBook_Author_AuthorsId",
                        column: x => x.AuthorsId,
                        principalTable: "Author",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuthorBook_Books_BooksId",
                        column: x => x.BooksId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Author",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Antoine De Saint-Exupéry" },
                    { 2, "Hae Min" },
                    { 3, "Nguyễn Nhật Ánh" },
                    { 4, "Luis Sepúlveda" },
                    { 5, "Mai Luân" },
                    { 6, "Chu Bảo Vị" },
                    { 7, "Jean Arestein" },
                    { 8, "Song Minh" },
                    { 9, "Anthony Storr" },
                    { 10, "Phạm Công Luận" },
                    { 11, "Joy Woodward" },
                    { 12, "Masanobu Fukuoka" },
                    { 13, "T Harv Eker" },
                    { 14, "Robin Sharma" },
                    { 15, "Akira Toriyama" },
                    { 16, "Gosho Aoyama" },
                    { 17, "Yutaka Abe" },
                    { 18, "Dale Carnegie" },
                    { 19, "Trác Nhã" }
                });

            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Thiếu Nhi" },
                    { 2, "Kỹ Năng Sống" },
                    { 3, "Manga" },
                    { 4, "Kinh Tế" },
                    { 5, "Khoa Học Kỹ Thuật" },
                    { 6, "Triết Học" },
                    { 7, "Âm Nhạc & Mỹ Thuật" },
                    { 8, "Giải trí" },
                    { 9, "Văn Học" }
                });

            migrationBuilder.InsertData(
                table: "Publisher",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "NXB Hội Nhà Văn" },
                    { 2, "NXB Tổng Hợp TPHCM" },
                    { 3, "NXB Kim Đồng" },
                    { 4, "NXB Trẻ" },
                    { 5, "NXB Thanh Niên" },
                    { 6, "NXB Đà Nẵng" },
                    { 7, "NXB Hồng Đức" },
                    { 8, "NXB Dân trí" },
                    { 9, "NXB Thể Dục Thể Thao" },
                    { 10, "NXB Thanh Hóa" },
                    { 11, "NXB Văn Học" }
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Description", "NumberOfPage", "PublishYear", "PublisherId", "Title" },
                values: new object[,]
                {
                    { 1, "Hoàng tử bé được viết ở New York trong những ngày tác giả sống lưu vong và được xuất bản lần đầu tiên tại New York vào năm 1943, rồi đến năm 1946 mới được xuất bản tại Pháp. Không nghi ngờ gì, đây là tác phẩm nổi tiếng nhất, được đọc nhiều nhất và cũng được yêu mến nhất của Saint-Exupéry. Cuốn sách được bình chọn là tác phẩm hay nhất thế kỉ 20 ở Pháp, đồng thời cũng là cuốn sách Pháp được dịch và được đọc nhiều nhất trên thế giới. Với 250 ngôn ngữ dịch khác nhau kể cả phương ngữ cùng hơn 200 triệu bản in trên toàn thế giới, Hoàng tử bé được coi là một trong những tác phẩm bán chạy nhất của nhân loại.", 100, 2019, 1, "Hoàng Tử Bé" },
                    { 2, "Để tự hỏi, là do thế gian này vội vàng hay do chính tâm trí bạn đang quá bận rộn? Để cầm cuốn sách nhỏ dung dị mà lắng đọng này lên, chậm rãi lật giở từng trang, thong thả khám phá những điều mà chỉ khi bước chậm lại mới có thể thấu rõ: về các mối quan hệ, về chính bản thân mình, về những trăn trở trước cuộc đời và nhân thế, về bao điều lý trí rất hiểu nhưng trái tim chưa cách nào nghe theo… Ra mắt lần đầu năm 2012, Bước chậm lại giữa thế gian vội vã của Đại đức Hae Min đã liên tục đứng đầu danh sách best-seller của nhiều trang sách trực tuyến uy tín của Hàn Quốc, trở thành cuốn sách chữa lành cho hàng triệu người trẻ luôn tất bật với nhịp sống hiện đại hối hả. Mã hàng	8935235217737 Tên Nhà Cung Cấp	Nhã Nam Tác giả	Hae Min Người Dịch	Nguyễn Việt Tú Anh NXB	NXB Hội Nhà Văn Năm XB	2018 Trọng lượng (gr)	280 Kích Thước Bao Bì	14 x 20.5 Số trang	254 Hình thức	Bìa Mềm Sản phẩm hiển thị trong Ví VNPAY hoàn 50K Sản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng Bước Chậm Lại Giữa Thế Gian Vội Vã (Tái Bản 2018) Chen vai thích cánh để có một chỗ bám trên xe buýt giờ đi làm, nhích từng xentimét bánh xe trên đường lúc tan sở, quay cuồng với thi cử và tiến độ công việc, lu bù vướng mắc trong những mối quan hệ cả thân lẫn sơ… bạn có luôn cảm thấy thế gian xung quanh mình đang xoay chuyển quá vội vàng? Nếu có thể, hãy tạm dừng một bước. Để tự hỏi, là do thế gian này vội vàng hay do chính tâm trí bạn đang quá bận rộn? Để cầm cuốn sách nhỏ dung dị mà lắng đọng này lên, chậm rãi lật giở từng trang, thong thả khám phá những điều mà chỉ khi bước chậm lại mới có thể thấu rõ: về các mối quan hệ, về chính bản thân mình, về những trăn trở trước cuộc đời và nhân thế, về bao điều lý trí rất hiểu nhưng trái tim chưa cách nào nghe theo…", 254, 2018, 1, "Bước Chậm Lại Giữa Thế Gian Vội Vã" },
                    { 3, "Ra bờ suối ngắm hoa kèn hồng là tác phẩm trong trẻo, tràn đầy tình yêu thương mát lành, trải ra trước mắt người đọc khu vườn trại rực rỡ cỏ hoa của vùng quê thanh bình, kèm theo đó là những “nhân vật” đáng yêu, làm nên một “thế giới giàu có, rộng lớn và vô cùng hấp dẫn” mà dường như người lớn đã bỏ quên đâu đó từ lâu. Sau Tôi là Bê Tô, Có hai con mèo ngồi bên cửa sổ, Con chó nhỏ mang giỏ hoa hồng, đây là một cuốn sách nữa của nhà văn Nguyễn Nhật Ánh mà nhân vật chính là những bé động vật ngộ nghĩnh, được mô tả sống động dưới ngòi bút tài hoa và giàu tình thương. Câu chuyện chạy qua 8 phần với 64 chương sách nhỏ đầy ắp lòng thương yêu, tính lương thiện, tình thân bạn bè, lòng dũng cảm và bao dung, đánh bạt sự ác độc và cả mọi thói xấu. Khép cuốn sách lại, tự nhiên thấy lòng mình dịu lắng, bình yên đến lạ lùng… Vài đoạn trích trong tác phẩm Ra bờ suối ngắm hoa kèn hồng “Tắm mình trong suối âm thanh, vẫn là những điệu buồn quen thuộc, nhưng đêm nay Mắt Tròn thấy tâm hồn mình như bay lên. Âm nhạc như một bàn tay vô hình đã nâng đỡ nó, lên cao, lên cao mãi. Cao hơn nỗi buồn, cao hơn những phiền muộn vẫn dày vò nó trong những ngày qua. Nỗi buồn, ờ thì nó vẫn ở đó, trong trái tim Mắt Tròn, nhưng nó không làm trái tim con gà xây xát nữa. Mắt Tròn ngạc nhiên nhận ra nỗi buồn có thể phát sáng, trở nên đẹp đẽ dưới sự vỗ về của âm nhạc. Tiếng đàn của chàng nhạc sĩ giang hồ đã sưởi ấm con gà, đã an ủi nó thật nhiều trong đêm hôm đó. Mắt Tròn neo mình trên cỏ, bất động, lặng thinh, đầy xao xuyến. Nó lắng nghe tiếng đàn, cảm tưởng đang lắng nghe chính bản thân nó, bắt gặp mình đang xúc động. Có lẽ bạn cũng thế thôi, khi nỗi buồn trong lòng bạn được âm nhạc chắp cánh, nó sẽ thăng hoa. Thay vì nhấn chìm bạn, nỗi buồn sẽ giúp bạn giàu có hơn về cảm xúc. Nó trở thành một giá trị và bạn chợt nhận ra nó là một phần thanh xuân của bạn. ............................................. Có gì đâu! Đâu có gì đâu! Thời gian như nước chảy qua cầu Bờ cỏ không còn in dấu cũ Vườn địa đàng kia táo đã sâu. Có gì không? Không có gì đâu! Tem chưa đóng dấu đã phai màu Đường đi không tới đành quay lại Cuộc sống chưa xong lại bắt đầu ............................................ Mắt Tròn đưa mắt nhìn quanh. Ở đằng xa kia, chỗ nhà giam, cây lộc vừng đang buông lững lờ những chuỗi hoa màu gạch cua, chốc chốc lại chao đi trong gió hệt như một tấm rèm ai treo trên nhánh lá. Trên bãi cỏ xanh bên dưới, thiên nhiên đã đính rải rác những chùm hoa ích mẫu, những cụm hoa mắc cỡ đan cài với cơ man là hoa xuyến chi và hoa sao nhái dệt nên một tấm thảm chi chít các hoa văn ngũ sắc. Cánh Cam nói đúng, “trong vườn thiếu gì hoa”. Và Mắt Tròn công nhận tất cả loài hoa trong vườn đều đẹp. Nhưng nó cũng thấy một điều khác đáng công nhận không kém: Chỉ có hoa kèn hồng kia bên dòng suối kia ngoài cánh đồng kia mới có thể đánh thức giấc mơ của nó, khiến trái tim nó tưng bừng reo ca như có chim về hót.” Mã hàng	8934974175995 Tên Nhà Cung Cấp	NXB Trẻ Tác giả	Nguyễn Nhật Ánh NXB	NXB Trẻ Năm XB	2022 Ngôn Ngữ	Tiếng Việt Trọng lượng (gr)	350 Kích Thước Bao Bì	20 x 13 cm Số trang	336 Hình thức	Bìa Mềm Sản phẩm hiển thị trong Nguyễn Nhật Ánh NXB Trẻ BACK TO SCHOOL Các Tác Giả Trẻ Được Yêu Thích Ví VNPAY hoàn 50K ZaloPay Sản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng Ra Bờ Suối Ngắm Hoa Kèn Hồng Ra bờ suối ngắm hoa kèn hồng là tác phẩm trong trẻo, tràn đầy tình yêu thương mát lành, trải ra trước mắt người đọc khu vườn trại rực rỡ cỏ hoa của vùng quê thanh bình, kèm theo đó là những “nhân vật” đáng yêu, làm nên một “thế giới giàu có, rộng lớn và vô cùng hấp dẫn” mà dường như người lớn đã bỏ quên đâu đó từ lâu.", 336, 2022, 4, "Ra Bờ Suối Ngắm Hoa Kèn Hồng" },
                    { 4, "Cô hải âu Kengah bị nhấn chìm trong váng dầu – thứ chất thải nguy hiểm mà những con người xấu xa bí mật đổ ra đại dương. Với nỗ lực đầy tuyệt vọng, cô bay vào bến cảng Hamburg và rơi xuống ban công của con mèo mun, to đùng, mập ú Zorba. Trong phút cuối cuộc đời, cô sinh ra một quả trứng và con mèo mun hứa với cô sẽ thực hiện ba lời hứa chừng như không tưởng với loài mèo: Không ăn quả trứng. Chăm sóc cho tới khi nó nở. Dạy cho con hải âu bay.", 144, 2019, 1, "Chuyện Con Mèo Dạy Hải Âu Bay" },
                    { 5, "Cờ Vua là môn thể thao trí tuệ, các nước đi luôn thay đổi thiên biến vạn hoá và chiến thuật thi đấu lại rất phong phú đa dạng tùy thuộc vào trình độ của người cầm quân. Những năm gần đây có rất nhiều cuốn sách viết về cờ Vua đã và đang được sự quan tâm của đông đảo quần chúng không chỉ vì nó là môn chơi trí tuệ mà còn là những nhu cầu muốn tìm hiểu, nghiên cứu về giá trị của cờ Vua đối với sự phát triển tư duy logíc và sức khoẻ cho người chơi.", 100, 2019, 9, "Tự Học Chơi Cờ Vua" },
                    { 6, "Cờ tướng là môn thể thể thao đối kháng trí tuệ, có tác dụng rèn luyện trí óc, “dưỡng tâm ích trí”, nâng cao năng lực tư duy. Cờ tướng nhập môn giới thiệu chiến lược cơ bản nhất của bộ môn này nhằm cung cấp nền tảng kiến thức vững chắc cho những người mới học cũng như các kỳ thủ nghiệp dư. Những chiến thuật cơ bản của cờ tướng gồm bốn phương diện: cờ tướng thực dụng, sát pháp cơ bản, phương pháp khai cuộc, chiến thuật trung cuộc,… với các trình bày chi tiết khoa học mạch lạc dễ hiểu kèm theo bài tập thực hành phong phú; chắc chắn đây sẽ là cuốn cẩm nang hữu dụng giúp người yêu cờ nâng cao năng lực cờ tướng một cách nhanh chóng và vững vàng.", 180, 2018, 8, "Cờ Tướng Nhập Môn" },
                    { 7, "Môn nghệ thuật tạo hình giàu sức biểu cảm và sáng tạo, đó là sự kết hợp giữa những đường nét, màu sắc, hình thể, để có bố cục hoàn hảo… với các chất liệu như chì, màu nước, sơn dầu…, nhưng trên hết là ý tưởng của người nghệ sĩ.", 50, 2017, 10, "Bách Khoa Toàn Thư Thực Hành Hội Họa" },
                    { 8, "Gồm 45 bài học được biên soạn theo trình độ từ dễ đến khó với phương pháp diễn giải tỉ mỉ và khoa học.", 70, 2019, 8, "45 Ngày Biết Đệm Đàn Guitar" },
                    { 9, "Sách Dẫn luận về Freud là một chuyên luận sâu sắc về học thuyết Freud bởi một người đồng cảm. Cuốn sách càng ấn tượng hơn nữa với văn phong đơn giản nhưng hết sức quyến rũ", 260, 2019, 7, "Dẫn Luận Về Freud" },
                    { 10, "Sài gòn ngoảnh lại trăm năm là tác phẩm được viết ra bởi từ chính vốn sống, trải nghiệm của tác giả Phạm Công Luận về một Sài Gòn trăm năm. Trên từng trang viết, Sài Gòn hiện lên tự tại, ung dung và chậm rãi, một Sài Gòn biết tiết chế và tự cân bằng trên những câu chuyện tưởng đã thuộc về quá vãng.", 400, 2018, 6, "Sài Gòn Ngoảnh Lại Trăm Năm" },
                    { 11, "Tất cả những thắc mắc, băn khoăn của bạn sẽ được giải đáp trong cuốn “Thần số học ứng dụng”. Cuốn sách sẽ cung cấp mọi thứ bạn cần để mài giũa trực giác của mình, hiểu rõ hơn những người xung quanh và thậm chí có thêm tự tin khi đưa ra các quyết định lớn.", 220, 2020, 5, "Thần Số Học Ứng Dụng" },
                    { 12, "“Cuộc Cách Mạng Một - Cọng - Rơm” là cuốn sách nổi tiếng của Mansanobu Fukuoka, người khai sinh nông nghiệp tự nhiên của Nhật Bản và thế giới. Cuốn sách (đã được dịch ra 25 thứ tiếng) không chỉ là sự trải nghiệm về cách thức nuôi trồng các sản phẩm nông nghiệp trong sự tương tác hài hòa với môi trường tự nhiên mà còn đem đến cho người đọc những suy tưởng thú vị về triết học, về ăn uống, về y học và cuộc sống.", 170, 2019, 2, "Cuộc Cách Mạng Một - Cọng - Rơm" },
                    { 13, "rong cuốn sách này T. Harv Eker sẽ tiết lộ những bí mật tại sao một số người lại đạt được những thành công vượt bậc, được số phận ban cho cuộc sống sung túc, giàu có, trong khi một số người khác phải chật vật, vất vả mới có một cuộc sống qua ngày. Bạn sẽ hiểu được nguồn gốc sự thật và những yếu tố quyết định thành công, thất bại để rồi áp dụng, thay đổi cách suy nghĩ, lên kế hoạch rồi tìm ra cách làm việc, đầu tư, sử dụng nguồn tài chính của bạn theo hướng hiệu quả nhất.", 190, 2019, 2, "Bí Mật Tư Duy Triệu Phú " },
                    { 14, "", 210, 2018, 4, "Nhà Lãnh Đạo Không Chức Danh" },
                    { 15, "Xin mời các bạn tiếp tục theo dõi phần truyện màu đầy kịch tính tiếp theo của 7 Viên Ngọc Rồng: Dragon Ball Full Color: Cuộc đổ bộ của người Saiya.", 80, 2019, 3, "Dragon Ball Full Color - Phần Bốn" },
                    { 16, "", 90, 2020, 3, "Thám Tử Lừng Danh Conan - Tập 99" },
                    { 17, "Đắc nhân tâm của Dale Carnegie là quyển sách của mọi thời đại và một hiện tượng đáng kinh ngạc trong ngành xuất bản Hoa Kỳ. Trong suốt nhiều thập kỷ tiếp theo và cho đến tận bây giờ, tác phẩm này vẫn chiếm vị trí số một trong danh mục sách bán chạy nhất và trở thành một sự kiện có một không hai trong lịch sử ngành xuất bản thế giới và được đánh giá là một quyển sách có tầm ảnh hưởng nhất mọi thời đại.", 100, 2019, 2, "Đắc Nhân Tâm" },
                    { 18, "Trong cuộc sống thường ngày, chúng ta thấy rằng: Biết cách nói chuyện không nhất định là phải nói nhiều, quan trọng là phải nói đúng trọng tâm, đúng nội dung. Và điều quan trọng là phải nắm được vấn đề mình đang nói đến. Chắc chắn rất nhiều người đã gặp phải tình huống như thế này: Có những nhân viên tiếp thị khi gặp khách hàng thì giống như một cái máy, nói không ngừng nghỉ, không để ý tới phản ứng và cảm nhận của khách hàng, không cần biết vị khách đó có đang nghe lời giới thiệu về sản phẩm hay không. Nếu làm việc như vậy thì người đó nắm chắc phần thất bại. Trong cuộc sống và trong công việc, chúng ta cũng rất hay gặp phải hiện tượng như sau: Nhiều người khi nói chuyện với người quen thì nói rất hay, không bị mất bình tĩnh hay ấp úng.", 100, 2019, 11, "Khéo Ăn Nói Sẽ Có Được Thiên Hạ" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_PublisherId",
                table: "Books",
                column: "PublisherId");

            migrationBuilder.CreateIndex(
                name: "IX_AuthorBook_BooksId",
                table: "AuthorBook",
                column: "BooksId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Publisher_PublisherId",
                table: "Books",
                column: "PublisherId",
                principalTable: "Publisher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Publisher_PublisherId",
                table: "Books");

            migrationBuilder.DropTable(
                name: "AuthorBook");

            migrationBuilder.DropTable(
                name: "Publisher");

            migrationBuilder.DropTable(
                name: "Author");

            migrationBuilder.DropIndex(
                name: "IX_Books_PublisherId",
                table: "Books");

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DropColumn(
                name: "NumberOfPage",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "PublishYear",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "PublisherId",
                table: "Books");

            migrationBuilder.AlterColumn<string>(
                name: "imgUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0b9112fb-bc3b-46c3-a623-a833bb004473", "791d1685-01ad-41fc-a663-7f1f4a8949e2", "Shipper", "SHIPPER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "37d6d792-4668-44a5-82d5-2c5d6ceaaa57", "4ad8b567-15f3-451d-bb80-dd597748b8f5", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a1dfa62a-1b3b-49cf-8577-e8b7413ff563", "63cb68d6-c471-4abc-8482-4f40bf49af32", "User", "USER" });
        }
    }
}
