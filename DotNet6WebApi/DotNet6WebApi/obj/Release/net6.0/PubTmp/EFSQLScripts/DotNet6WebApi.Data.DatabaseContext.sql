IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [Books] (
        [Id] int NOT NULL IDENTITY,
        [Title] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Books] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [Genres] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Genres] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [Roles] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [Users] (
        [Id] nvarchar(450) NOT NULL,
        [imgUrl] nvarchar(max) NOT NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [BookGenre] (
        [BooksId] int NOT NULL,
        [GenresId] int NOT NULL,
        CONSTRAINT [PK_BookGenre] PRIMARY KEY ([BooksId], [GenresId]),
        CONSTRAINT [FK_BookGenre_Books_BooksId] FOREIGN KEY ([BooksId]) REFERENCES [Books] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_BookGenre_Genres_GenresId] FOREIGN KEY ([GenresId]) REFERENCES [Genres] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [RoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_RoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RoleClaims_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [UserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserClaims_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [UserLogins] (
        [LoginProvider] nvarchar(450) NOT NULL,
        [ProviderKey] nvarchar(450) NOT NULL,
        [ProviderDisplayName] nvarchar(max) NULL,
        [UserId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_UserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_UserLogins_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [UserRoles] (
        [UserId] nvarchar(450) NOT NULL,
        [RoleId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE TABLE [UserTokens] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(450) NOT NULL,
        [Name] nvarchar(450) NOT NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_UserTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE INDEX [IX_BookGenre_GenresId] ON [BookGenre] ([GenresId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE INDEX [IX_RoleClaims_RoleId] ON [RoleClaims] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [RoleNameIndex] ON [Roles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE INDEX [IX_UserClaims_UserId] ON [UserClaims] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE INDEX [IX_UserLogins_UserId] ON [UserLogins] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE INDEX [IX_UserRoles_RoleId] ON [UserRoles] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    CREATE INDEX [EmailIndex] ON [Users] ([NormalizedEmail]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [UserNameIndex] ON [Users] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125030845_DBInit')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220125030845_DBInit', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125041819_addRole')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''0b9112fb-bc3b-46c3-a623-a833bb004473'', N''791d1685-01ad-41fc-a663-7f1f4a8949e2'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125041819_addRole')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''37d6d792-4668-44a5-82d5-2c5d6ceaaa57'', N''4ad8b567-15f3-451d-bb80-dd597748b8f5'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125041819_addRole')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''a1dfa62a-1b3b-49cf-8577-e8b7413ff563'', N''63cb68d6-c471-4abc-8482-4f40bf49af32'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220125041819_addRole')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220125041819_addRole', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''0b9112fb-bc3b-46c3-a623-a833bb004473'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''37d6d792-4668-44a5-82d5-2c5d6ceaaa57'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''a1dfa62a-1b3b-49cf-8577-e8b7413ff563'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'imgUrl');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Users] ALTER COLUMN [imgUrl] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    ALTER TABLE [Books] ADD [NumberOfPage] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    ALTER TABLE [Books] ADD [PublishYear] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    ALTER TABLE [Books] ADD [PublisherId] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    CREATE TABLE [Author] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Author] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    CREATE TABLE [Publisher] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Publisher] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    CREATE TABLE [AuthorBook] (
        [AuthorsId] int NOT NULL,
        [BooksId] int NOT NULL,
        CONSTRAINT [PK_AuthorBook] PRIMARY KEY ([AuthorsId], [BooksId]),
        CONSTRAINT [FK_AuthorBook_Author_AuthorsId] FOREIGN KEY ([AuthorsId]) REFERENCES [Author] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AuthorBook_Books_BooksId] FOREIGN KEY ([BooksId]) REFERENCES [Books] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Author]'))
        SET IDENTITY_INSERT [Author] ON;
    EXEC(N'INSERT INTO [Author] ([Id], [Name])
    VALUES (1, N''Antoine De Saint-Exupéry''),
    (2, N''Hae Min''),
    (3, N''Nguyễn Nhật Ánh''),
    (4, N''Luis Sepúlveda''),
    (5, N''Mai Luân''),
    (6, N''Chu Bảo Vị''),
    (7, N''Jean Arestein''),
    (8, N''Song Minh''),
    (9, N''Anthony Storr''),
    (10, N''Phạm Công Luận''),
    (11, N''Joy Woodward''),
    (12, N''Masanobu Fukuoka''),
    (13, N''T Harv Eker''),
    (14, N''Robin Sharma''),
    (15, N''Akira Toriyama''),
    (16, N''Gosho Aoyama''),
    (17, N''Yutaka Abe''),
    (18, N''Dale Carnegie''),
    (19, N''Trác Nhã'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Author]'))
        SET IDENTITY_INSERT [Author] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Genres]'))
        SET IDENTITY_INSERT [Genres] ON;
    EXEC(N'INSERT INTO [Genres] ([Id], [Name])
    VALUES (1, N''Thiếu Nhi''),
    (2, N''Kỹ Năng Sống''),
    (3, N''Manga''),
    (4, N''Kinh Tế''),
    (5, N''Khoa Học Kỹ Thuật''),
    (6, N''Triết Học''),
    (7, N''Âm Nhạc & Mỹ Thuật''),
    (8, N''Giải trí''),
    (9, N''Văn Học'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Genres]'))
        SET IDENTITY_INSERT [Genres] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Publisher]'))
        SET IDENTITY_INSERT [Publisher] ON;
    EXEC(N'INSERT INTO [Publisher] ([Id], [Name])
    VALUES (1, N''NXB Hội Nhà Văn''),
    (2, N''NXB Tổng Hợp TPHCM''),
    (3, N''NXB Kim Đồng''),
    (4, N''NXB Trẻ''),
    (5, N''NXB Thanh Niên''),
    (6, N''NXB Đà Nẵng''),
    (7, N''NXB Hồng Đức''),
    (8, N''NXB Dân trí''),
    (9, N''NXB Thể Dục Thể Thao''),
    (10, N''NXB Thanh Hóa''),
    (11, N''NXB Văn Học'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Publisher]'))
        SET IDENTITY_INSERT [Publisher] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'NumberOfPage', N'PublishYear', N'PublisherId', N'Title') AND [object_id] = OBJECT_ID(N'[Books]'))
        SET IDENTITY_INSERT [Books] ON;
    EXEC(N'INSERT INTO [Books] ([Id], [Description], [NumberOfPage], [PublishYear], [PublisherId], [Title])
    VALUES (1, N''Hoàng tử bé được viết ở New York trong những ngày tác giả sống lưu vong và được xuất bản lần đầu tiên tại New York vào năm 1943, rồi đến năm 1946 mới được xuất bản tại Pháp. Không nghi ngờ gì, đây là tác phẩm nổi tiếng nhất, được đọc nhiều nhất và cũng được yêu mến nhất của Saint-Exupéry. Cuốn sách được bình chọn là tác phẩm hay nhất thế kỉ 20 ở Pháp, đồng thời cũng là cuốn sách Pháp được dịch và được đọc nhiều nhất trên thế giới. Với 250 ngôn ngữ dịch khác nhau kể cả phương ngữ cùng hơn 200 triệu bản in trên toàn thế giới, Hoàng tử bé được coi là một trong những tác phẩm bán chạy nhất của nhân loại.'', 100, 2019, 1, N''Hoàng Tử Bé''),
    (2, N''Để tự hỏi, là do thế gian này vội vàng hay do chính tâm trí bạn đang quá bận rộn? Để cầm cuốn sách nhỏ dung dị mà lắng đọng này lên, chậm rãi lật giở từng trang, thong thả khám phá những điều mà chỉ khi bước chậm lại mới có thể thấu rõ: về các mối quan hệ, về chính bản thân mình, về những trăn trở trước cuộc đời và nhân thế, về bao điều lý trí rất hiểu nhưng trái tim chưa cách nào nghe theo… Ra mắt lần đầu năm 2012, Bước chậm lại giữa thế gian vội vã của Đại đức Hae Min đã liên tục đứng đầu danh sách best-seller của nhiều trang sách trực tuyến uy tín của Hàn Quốc, trở thành cuốn sách chữa lành cho hàng triệu người trẻ luôn tất bật với nhịp sống hiện đại hối hả. Mã hàng	8935235217737 Tên Nhà Cung Cấp	Nhã Nam Tác giả	Hae Min Người Dịch	Nguyễn Việt Tú Anh NXB	NXB Hội Nhà Văn Năm XB	2018 Trọng lượng (gr)	280 Kích Thước Bao Bì	14 x 20.5 Số trang	254 Hình thức	Bìa Mềm Sản phẩm hiển thị trong Ví VNPAY hoàn 50K Sản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng Bước Chậm Lại Giữa Thế Gian Vội Vã (Tái Bản 2018) Chen vai thích cánh để có một chỗ bám trên xe buýt giờ đi làm, nhích từng xentimét bánh xe trên đường lúc tan sở, quay cuồng với thi cử và tiến độ công việc, lu bù vướng mắc trong những mối quan hệ cả thân lẫn sơ… bạn có luôn cảm thấy thế gian xung quanh mình đang xoay chuyển quá vội vàng? Nếu có thể, hãy tạm dừng một bước. Để tự hỏi, là do thế gian này vội vàng hay do chính tâm trí bạn đang quá bận rộn? Để cầm cuốn sách nhỏ dung dị mà lắng đọng này lên, chậm rãi lật giở từng trang, thong thả khám phá những điều mà chỉ khi bước chậm lại mới có thể thấu rõ: về các mối quan hệ, về chính bản thân mình, về những trăn trở trước cuộc đời và nhân thế, về bao điều lý trí rất hiểu nhưng trái tim chưa cách nào nghe theo…'', 254, 2018, 1, N''Bước Chậm Lại Giữa Thế Gian Vội Vã''),
    (3, N''Ra bờ suối ngắm hoa kèn hồng là tác phẩm trong trẻo, tràn đầy tình yêu thương mát lành, trải ra trước mắt người đọc khu vườn trại rực rỡ cỏ hoa của vùng quê thanh bình, kèm theo đó là những “nhân vật” đáng yêu, làm nên một “thế giới giàu có, rộng lớn và vô cùng hấp dẫn” mà dường như người lớn đã bỏ quên đâu đó từ lâu. Sau Tôi là Bê Tô, Có hai con mèo ngồi bên cửa sổ, Con chó nhỏ mang giỏ hoa hồng, đây là một cuốn sách nữa của nhà văn Nguyễn Nhật Ánh mà nhân vật chính là những bé động vật ngộ nghĩnh, được mô tả sống động dưới ngòi bút tài hoa và giàu tình thương. Câu chuyện chạy qua 8 phần với 64 chương sách nhỏ đầy ắp lòng thương yêu, tính lương thiện, tình thân bạn bè, lòng dũng cảm và bao dung, đánh bạt sự ác độc và cả mọi thói xấu. Khép cuốn sách lại, tự nhiên thấy lòng mình dịu lắng, bình yên đến lạ lùng… Vài đoạn trích trong tác phẩm Ra bờ suối ngắm hoa kèn hồng “Tắm mình trong suối âm thanh, vẫn là những điệu buồn quen thuộc, nhưng đêm nay Mắt Tròn thấy tâm hồn mình như bay lên. Âm nhạc như một bàn tay vô hình đã nâng đỡ nó, lên cao, lên cao mãi. Cao hơn nỗi buồn, cao hơn những phiền muộn vẫn dày vò nó trong những ngày qua. Nỗi buồn, ờ thì nó vẫn ở đó, trong trái tim Mắt Tròn, nhưng nó không làm trái tim con gà xây xát nữa. Mắt Tròn ngạc nhiên nhận ra nỗi buồn có thể phát sáng, trở nên đẹp đẽ dưới sự vỗ về của âm nhạc. Tiếng đàn của chàng nhạc sĩ giang hồ đã sưởi ấm con gà, đã an ủi nó thật nhiều trong đêm hôm đó. Mắt Tròn neo mình trên cỏ, bất động, lặng thinh, đầy xao xuyến. Nó lắng nghe tiếng đàn, cảm tưởng đang lắng nghe chính bản thân nó, bắt gặp mình đang xúc động. Có lẽ bạn cũng thế thôi, khi nỗi buồn trong lòng bạn được âm nhạc chắp cánh, nó sẽ thăng hoa. Thay vì nhấn chìm bạn, nỗi buồn sẽ giúp bạn giàu có hơn về cảm xúc. Nó trở thành một giá trị và bạn chợt nhận ra nó là một phần thanh xuân của bạn. ............................................. Có gì đâu! Đâu có gì đâu! Thời gian như nước chảy qua cầu Bờ cỏ không còn in dấu cũ Vườn địa đàng kia táo đã sâu. Có gì không? Không có gì đâu! Tem chưa đóng dấu đã phai màu Đường đi không tới đành quay lại Cuộc sống chưa xong lại bắt đầu ............................................ Mắt Tròn đưa mắt nhìn quanh. Ở đằng xa kia, chỗ nhà giam, cây lộc vừng đang buông lững lờ những chuỗi hoa màu gạch cua, chốc chốc lại chao đi trong gió hệt như một tấm rèm ai treo trên nhánh lá. Trên bãi cỏ xanh bên dưới, thiên nhiên đã đính rải rác những chùm hoa ích mẫu, những cụm hoa mắc cỡ đan cài với cơ man là hoa xuyến chi và hoa sao nhái dệt nên một tấm thảm chi chít các hoa văn ngũ sắc. Cánh Cam nói đúng, “trong vườn thiếu gì hoa”. Và Mắt Tròn công nhận tất cả loài hoa trong vườn đều đẹp. Nhưng nó cũng thấy một điều khác đáng công nhận không kém: Chỉ có hoa kèn hồng kia bên dòng suối kia ngoài cánh đồng kia mới có thể đánh thức giấc mơ của nó, khiến trái tim nó tưng bừng reo ca như có chim về hót.” Mã hàng	8934974175995 Tên Nhà Cung Cấp	NXB Trẻ Tác giả	Nguyễn Nhật Ánh NXB	NXB Trẻ Năm XB	2022 Ngôn Ngữ	Tiếng Việt Trọng lượng (gr)	350 Kích Thước Bao Bì	20 x 13 cm Số trang	336 Hình thức	Bìa Mềm Sản phẩm hiển thị trong Nguyễn Nhật Ánh NXB Trẻ BACK TO SCHOOL Các Tác Giả Trẻ Được Yêu Thích Ví VNPAY hoàn 50K ZaloPay Sản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng Ra Bờ Suối Ngắm Hoa Kèn Hồng Ra bờ suối ngắm hoa kèn hồng là tác phẩm trong trẻo, tràn đầy tình yêu thương mát lành, trải ra trước mắt người đọc khu vườn trại rực rỡ cỏ hoa của vùng quê thanh bình, kèm theo đó là những “nhân vật” đáng yêu, làm nên một “thế giới giàu có, rộng lớn và vô cùng hấp dẫn” mà dường như người lớn đã bỏ quên đâu đó từ lâu.'', 336, 2022, 4, N''Ra Bờ Suối Ngắm Hoa Kèn Hồng''),
    (4, N''Cô hải âu Kengah bị nhấn chìm trong váng dầu – thứ chất thải nguy hiểm mà những con người xấu xa bí mật đổ ra đại dương. Với nỗ lực đầy tuyệt vọng, cô bay vào bến cảng Hamburg và rơi xuống ban công của con mèo mun, to đùng, mập ú Zorba. Trong phút cuối cuộc đời, cô sinh ra một quả trứng và con mèo mun hứa với cô sẽ thực hiện ba lời hứa chừng như không tưởng với loài mèo: Không ăn quả trứng. Chăm sóc cho tới khi nó nở. Dạy cho con hải âu bay.'', 144, 2019, 1, N''Chuyện Con Mèo Dạy Hải Âu Bay''),
    (5, N''Cờ Vua là môn thể thao trí tuệ, các nước đi luôn thay đổi thiên biến vạn hoá và chiến thuật thi đấu lại rất phong phú đa dạng tùy thuộc vào trình độ của người cầm quân. Những năm gần đây có rất nhiều cuốn sách viết về cờ Vua đã và đang được sự quan tâm của đông đảo quần chúng không chỉ vì nó là môn chơi trí tuệ mà còn là những nhu cầu muốn tìm hiểu, nghiên cứu về giá trị của cờ Vua đối với sự phát triển tư duy logíc và sức khoẻ cho người chơi.'', 100, 2019, 9, N''Tự Học Chơi Cờ Vua''),
    (6, N''Cờ tướng là môn thể thể thao đối kháng trí tuệ, có tác dụng rèn luyện trí óc, “dưỡng tâm ích trí”, nâng cao năng lực tư duy. Cờ tướng nhập môn giới thiệu chiến lược cơ bản nhất của bộ môn này nhằm cung cấp nền tảng kiến thức vững chắc cho những người mới học cũng như các kỳ thủ nghiệp dư. Những chiến thuật cơ bản của cờ tướng gồm bốn phương diện: cờ tướng thực dụng, sát pháp cơ bản, phương pháp khai cuộc, chiến thuật trung cuộc,… với các trình bày chi tiết khoa học mạch lạc dễ hiểu kèm theo bài tập thực hành phong phú; chắc chắn đây sẽ là cuốn cẩm nang hữu dụng giúp người yêu cờ nâng cao năng lực cờ tướng một cách nhanh chóng và vững vàng.'', 180, 2018, 8, N''Cờ Tướng Nhập Môn''),
    (7, N''Môn nghệ thuật tạo hình giàu sức biểu cảm và sáng tạo, đó là sự kết hợp giữa những đường nét, màu sắc, hình thể, để có bố cục hoàn hảo… với các chất liệu như chì, màu nước, sơn dầu…, nhưng trên hết là ý tưởng của người nghệ sĩ.'', 50, 2017, 10, N''Bách Khoa Toàn Thư Thực Hành Hội Họa''),
    (8, N''Gồm 45 bài học được biên soạn theo trình độ từ dễ đến khó với phương pháp diễn giải tỉ mỉ và khoa học.'', 70, 2019, 8, N''45 Ngày Biết Đệm Đàn Guitar''),
    (9, N''Sách Dẫn luận về Freud là một chuyên luận sâu sắc về học thuyết Freud bởi một người đồng cảm. Cuốn sách càng ấn tượng hơn nữa với văn phong đơn giản nhưng hết sức quyến rũ'', 260, 2019, 7, N''Dẫn Luận Về Freud''),
    (10, N''Sài gòn ngoảnh lại trăm năm là tác phẩm được viết ra bởi từ chính vốn sống, trải nghiệm của tác giả Phạm Công Luận về một Sài Gòn trăm năm. Trên từng trang viết, Sài Gòn hiện lên tự tại, ung dung và chậm rãi, một Sài Gòn biết tiết chế và tự cân bằng trên những câu chuyện tưởng đã thuộc về quá vãng.'', 400, 2018, 6, N''Sài Gòn Ngoảnh Lại Trăm Năm''),
    (11, N''Tất cả những thắc mắc, băn khoăn của bạn sẽ được giải đáp trong cuốn “Thần số học ứng dụng”. Cuốn sách sẽ cung cấp mọi thứ bạn cần để mài giũa trực giác của mình, hiểu rõ hơn những người xung quanh và thậm chí có thêm tự tin khi đưa ra các quyết định lớn.'', 220, 2020, 5, N''Thần Số Học Ứng Dụng''),
    (12, N''“Cuộc Cách Mạng Một - Cọng - Rơm” là cuốn sách nổi tiếng của Mansanobu Fukuoka, người khai sinh nông nghiệp tự nhiên của Nhật Bản và thế giới. Cuốn sách (đã được dịch ra 25 thứ tiếng) không chỉ là sự trải nghiệm về cách thức nuôi trồng các sản phẩm nông nghiệp trong sự tương tác hài hòa với môi trường tự nhiên mà còn đem đến cho người đọc những suy tưởng thú vị về triết học, về ăn uống, về y học và cuộc sống.'', 170, 2019, 2, N''Cuộc Cách Mạng Một - Cọng - Rơm''),
    (13, N''rong cuốn sách này T. Harv Eker sẽ tiết lộ những bí mật tại sao một số người lại đạt được những thành công vượt bậc, được số phận ban cho cuộc sống sung túc, giàu có, trong khi một số người khác phải chật vật, vất vả mới có một cuộc sống qua ngày. Bạn sẽ hiểu được nguồn gốc sự thật và những yếu tố quyết định thành công, thất bại để rồi áp dụng, thay đổi cách suy nghĩ, lên kế hoạch rồi tìm ra cách làm việc, đầu tư, sử dụng nguồn tài chính của bạn theo hướng hiệu quả nhất.'', 190, 2019, 2, N''Bí Mật Tư Duy Triệu Phú ''),
    (14, N'''', 210, 2018, 4, N''Nhà Lãnh Đạo Không Chức Danh''),
    (15, N''Xin mời các bạn tiếp tục theo dõi phần truyện màu đầy kịch tính tiếp theo của 7 Viên Ngọc Rồng: Dragon Ball Full Color: Cuộc đổ bộ của người Saiya.'', 80, 2019, 3, N''Dragon Ball Full Color - Phần Bốn''),
    (16, N'''', 90, 2020, 3, N''Thám Tử Lừng Danh Conan - Tập 99''),
    (17, N''Đắc nhân tâm của Dale Carnegie là quyển sách của mọi thời đại và một hiện tượng đáng kinh ngạc trong ngành xuất bản Hoa Kỳ. Trong suốt nhiều thập kỷ tiếp theo và cho đến tận bây giờ, tác phẩm này vẫn chiếm vị trí số một trong danh mục sách bán chạy nhất và trở thành một sự kiện có một không hai trong lịch sử ngành xuất bản thế giới và được đánh giá là một quyển sách có tầm ảnh hưởng nhất mọi thời đại.'', 100, 2019, 2, N''Đắc Nhân Tâm''),
    (18, N''Trong cuộc sống thường ngày, chúng ta thấy rằng: Biết cách nói chuyện không nhất định là phải nói nhiều, quan trọng là phải nói đúng trọng tâm, đúng nội dung. Và điều quan trọng là phải nắm được vấn đề mình đang nói đến. Chắc chắn rất nhiều người đã gặp phải tình huống như thế này: Có những nhân viên tiếp thị khi gặp khách hàng thì giống như một cái máy, nói không ngừng nghỉ, không để ý tới phản ứng và cảm nhận của khách hàng, không cần biết vị khách đó có đang nghe lời giới thiệu về sản phẩm hay không. Nếu làm việc như vậy thì người đó nắm chắc phần thất bại. Trong cuộc sống và trong công việc, chúng ta cũng rất hay gặp phải hiện tượng như sau: Nhiều người khi nói chuyện với người quen thì nói rất hay, không bị mất bình tĩnh hay ấp úng.'', 100, 2019, 11, N''Khéo Ăn Nói Sẽ Có Được Thiên Hạ'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'NumberOfPage', N'PublishYear', N'PublisherId', N'Title') AND [object_id] = OBJECT_ID(N'[Books]'))
        SET IDENTITY_INSERT [Books] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    CREATE INDEX [IX_Books_PublisherId] ON [Books] ([PublisherId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    CREATE INDEX [IX_AuthorBook_BooksId] ON [AuthorBook] ([BooksId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    ALTER TABLE [Books] ADD CONSTRAINT [FK_Books_Publisher_PublisherId] FOREIGN KEY ([PublisherId]) REFERENCES [Publisher] ([Id]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127083636_seed_database')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220127083636_seed_database', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 1;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 2;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 3;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 4;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 5;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 6;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 7;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 8;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 9;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 10;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 11;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 12;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 13;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 14;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 15;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 16;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 17;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 18;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Author]
    WHERE [Id] = 19;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 1;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 2;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 3;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 4;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 5;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 6;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 7;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 8;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 9;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 10;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 11;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 12;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 13;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 14;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 15;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 16;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 17;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Books]
    WHERE [Id] = 18;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 1;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 2;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 3;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 4;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 5;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 6;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 7;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 8;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Genres]
    WHERE [Id] = 9;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 1;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 2;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 3;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 4;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 5;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 6;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 7;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 8;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 9;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 10;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    EXEC(N'DELETE FROM [Publisher]
    WHERE [Id] = 11;
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220127095006_seed_database2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220127095006_seed_database2', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220128081448_update_book')
BEGIN
    ALTER TABLE [Books] ADD [imgUrl] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220128081448_update_book')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220128081448_update_book', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220128091854_udate_book_price')
BEGIN
    ALTER TABLE [Books] ADD [Price] float NOT NULL DEFAULT 0.0E0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220128091854_udate_book_price')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220128091854_udate_book_price', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Books]') AND [c].[name] = N'NumberOfPage');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Books] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Books] ALTER COLUMN [NumberOfPage] int NOT NULL;
    ALTER TABLE [Books] ADD DEFAULT 0 FOR [NumberOfPage];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    ALTER TABLE [Books] ADD [PromotionInfoID] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    CREATE TABLE [Promotion] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        [imgUrl] nvarchar(max) NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [Status] int NOT NULL,
        [Visible] int NOT NULL,
        CONSTRAINT [PK_Promotion] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    CREATE TABLE [Review] (
        [Id] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        [BookId] int NOT NULL,
        [Star] int NOT NULL,
        [Content] nvarchar(max) NOT NULL,
        [Recomended] bit NOT NULL,
        [Date] datetime2 NOT NULL,
        [UserID] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Review] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Review_Books_BookId] FOREIGN KEY ([BookId]) REFERENCES [Books] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Review_Users_UserID] FOREIGN KEY ([UserID]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    CREATE TABLE [PromotionInfo] (
        [Id] int NOT NULL IDENTITY,
        [PromotionId] int NOT NULL,
        [PromotionPercent] nvarchar(max) NULL,
        [PromotionAmount] nvarchar(max) NULL,
        CONSTRAINT [PK_PromotionInfo] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PromotionInfo_Promotion_PromotionId] FOREIGN KEY ([PromotionId]) REFERENCES [Promotion] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_Books_PromotionInfoID] ON [Books] ([PromotionInfoID]) WHERE [PromotionInfoID] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    CREATE INDEX [IX_PromotionInfo_PromotionId] ON [PromotionInfo] ([PromotionId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    CREATE INDEX [IX_Review_BookId] ON [Review] ([BookId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    CREATE INDEX [IX_Review_UserID] ON [Review] ([UserID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    ALTER TABLE [Books] ADD CONSTRAINT [FK_Books_PromotionInfo_PromotionInfoID] FOREIGN KEY ([PromotionInfoID]) REFERENCES [PromotionInfo] ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129024557_full_model_update')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220129024557_full_model_update', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129031648_full_model_update_smallfix1')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Review]') AND [c].[name] = N'ProductId');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Review] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [Review] DROP COLUMN [ProductId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129031648_full_model_update_smallfix1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220129031648_full_model_update_smallfix1', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    ALTER TABLE [Review] DROP CONSTRAINT [FK_Review_Books_BookId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    ALTER TABLE [Review] DROP CONSTRAINT [FK_Review_Users_UserID];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    ALTER TABLE [Review] DROP CONSTRAINT [PK_Review];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    EXEC sp_rename N'[Review]', N'Reviews';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    EXEC sp_rename N'[Reviews].[IX_Review_UserID]', N'IX_Reviews_UserID', N'INDEX';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    EXEC sp_rename N'[Reviews].[IX_Review_BookId]', N'IX_Reviews_BookId', N'INDEX';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    ALTER TABLE [Reviews] ADD CONSTRAINT [PK_Reviews] PRIMARY KEY ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    CREATE TABLE [DiscountCodes] (
        [Id] int NOT NULL IDENTITY,
        [Code] nvarchar(max) NOT NULL,
        [DiscountPercent] nvarchar(max) NULL,
        [DiscountAmount] nvarchar(max) NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [Status] int NOT NULL,
        CONSTRAINT [PK_DiscountCodes] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    CREATE TABLE [Order] (
        [Id] int NOT NULL IDENTITY,
        [UserID] nvarchar(450) NOT NULL,
        [ContactName] nvarchar(max) NOT NULL,
        [Address] nvarchar(max) NOT NULL,
        [Phone] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [PaymentMethod] nvarchar(max) NOT NULL,
        [OrderDate] datetime2 NOT NULL,
        [ShippedDate] datetime2 NOT NULL,
        [TotalItem] int NOT NULL,
        [TotalPrice] float NOT NULL,
        [Status] int NOT NULL,
        [Note] nvarchar(max) NOT NULL,
        [DiscountCodeID] int NULL,
        CONSTRAINT [PK_Order] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Order_DiscountCodes_DiscountCodeID] FOREIGN KEY ([DiscountCodeID]) REFERENCES [DiscountCodes] ([Id]),
        CONSTRAINT [FK_Order_Users_UserID] FOREIGN KEY ([UserID]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    CREATE TABLE [OrderDetails] (
        [Id] int NOT NULL IDENTITY,
        [OrderId] int NOT NULL,
        [BookId] int NOT NULL,
        [Quantity] int NOT NULL,
        [PromotionPercent] nvarchar(max) NULL,
        [PromotionAmount] nvarchar(max) NULL,
        CONSTRAINT [PK_OrderDetails] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_OrderDetails_Books_BookId] FOREIGN KEY ([BookId]) REFERENCES [Books] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_OrderDetails_Order_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Order] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_Order_DiscountCodeID] ON [Order] ([DiscountCodeID]) WHERE [DiscountCodeID] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    CREATE INDEX [IX_Order_UserID] ON [Order] ([UserID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    CREATE INDEX [IX_OrderDetails_BookId] ON [OrderDetails] ([BookId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    CREATE INDEX [IX_OrderDetails_OrderId] ON [OrderDetails] ([OrderId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    ALTER TABLE [Reviews] ADD CONSTRAINT [FK_Reviews_Books_BookId] FOREIGN KEY ([BookId]) REFERENCES [Books] ([Id]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    ALTER TABLE [Reviews] ADD CONSTRAINT [FK_Reviews_Users_UserID] FOREIGN KEY ([UserID]) REFERENCES [Users] ([Id]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220129033548_full_model_update_smallfix2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220129033548_full_model_update_smallfix2', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220205040504_add-role')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''14412b66-bdfd-47dd-87a6-90216bf489ff'', N''c88708bd-ca04-4b2b-a94e-2d767e9ced87'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220205040504_add-role')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''acaaf5e3-0401-4df7-bea6-37cd9718f515'', N''0bed8b17-2e36-4325-ab46-3f62982e0f91'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220205040504_add-role')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''eef307f9-e224-4ef9-af10-2e5c3c89ef09'', N''a6e78427-faa2-4b89-a225-324b09408bee'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220205040504_add-role')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220205040504_add-role', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''14412b66-bdfd-47dd-87a6-90216bf489ff'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''acaaf5e3-0401-4df7-bea6-37cd9718f515'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''eef307f9-e224-4ef9-af10-2e5c3c89ef09'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    CREATE TABLE [Employees] (
        [Id] int NOT NULL IDENTITY,
        [ShipperId] nvarchar(450) NULL,
        [Address] nvarchar(max) NOT NULL,
        [Sex] nvarchar(max) NOT NULL,
        [Salary] int NOT NULL,
        [CMND] nvarchar(max) NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [Status] int NOT NULL,
        CONSTRAINT [PK_Employees] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Employees_Users_ShipperId] FOREIGN KEY ([ShipperId]) REFERENCES [Users] ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''23c55944-4431-4c9b-9412-d10e2e1fde9d'', N''7003b0e7-7424-481d-a783-84fe76086bfe'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''632dacc2-9545-4794-9f5d-074da2667c9b'', N''af51b534-a99a-42cd-950e-3c15085a4921'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''aa27d77f-fe59-497b-a269-c8210b1376a5'', N''200ab521-7d8b-45d6-928d-5baa11de242e'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    CREATE INDEX [IX_Employees_ShipperId] ON [Employees] ([ShipperId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211080136_add_employee')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220211080136_add_employee', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''23c55944-4431-4c9b-9412-d10e2e1fde9d'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''632dacc2-9545-4794-9f5d-074da2667c9b'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''aa27d77f-fe59-497b-a269-c8210b1376a5'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    ALTER TABLE [Employees] ADD [DoB] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    ALTER TABLE [Employees] ADD [Name] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''790bd51e-77d8-4e2c-939d-62e33e3245cc'', N''3c9c4451-675f-47ff-860c-40302039cea4'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''c1623422-ea4f-4ce4-8dbf-5b28a391b6a7'', N''63399b99-c0c7-4bec-9c42-d28065d38322'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''d69e090c-9eb1-42fb-b8e0-f878402e5be0'', N''867a0cd7-c9c0-42a5-949a-1997fe3c15b7'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211083804_add_employee_fix_1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220211083804_add_employee_fix_1', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''790bd51e-77d8-4e2c-939d-62e33e3245cc'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''c1623422-ea4f-4ce4-8dbf-5b28a391b6a7'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''d69e090c-9eb1-42fb-b8e0-f878402e5be0'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    ALTER TABLE [Employees] ADD [Email] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''26c604a4-02ae-48f3-9fd9-51b992c8b787'', N''53902c77-e4bb-4ded-a01d-94ca26d6d8a0'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''6d1cf5b6-399d-47d3-83d8-e3989602005b'', N''3c1d182f-8783-4924-82a8-ecb4bd951606'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''89493dc5-eb50-44dd-bc41-62780b9c5d14'', N''2bdfeb65-8bbc-41e4-80a7-3952ad236874'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103359_add_employee_fix_2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220211103359_add_employee_fix_2', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''26c604a4-02ae-48f3-9fd9-51b992c8b787'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''6d1cf5b6-399d-47d3-83d8-e3989602005b'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''89493dc5-eb50-44dd-bc41-62780b9c5d14'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    ALTER TABLE [Employees] ADD [imgUrl] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''0752ae09-4387-4872-9363-e17edfa855ef'', N''e0c4f2b8-665c-402d-9ead-0fc971699732'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''a81e9b01-0fac-4e3c-892f-21c79ed7bc05'', N''a6afc1c2-7e97-42c3-86ab-2559cd769b85'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''f1df313b-eefc-488b-a336-e8a39831ab01'', N''a6468f1f-02f8-488b-a579-1f3c95321a02'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220211103731_add_employee_fix_3')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220211103731_add_employee_fix_3', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''0752ae09-4387-4872-9363-e17edfa855ef'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''a81e9b01-0fac-4e3c-892f-21c79ed7bc05'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''f1df313b-eefc-488b-a336-e8a39831ab01'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    ALTER TABLE [Order] ADD [ShipperID] nvarchar(450) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    CREATE TABLE [AppUserBook] (
        [WishlistId] int NOT NULL,
        [WishlistUsersId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AppUserBook] PRIMARY KEY ([WishlistId], [WishlistUsersId]),
        CONSTRAINT [FK_AppUserBook_Books_WishlistId] FOREIGN KEY ([WishlistId]) REFERENCES [Books] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AppUserBook_Users_WishlistUsersId] FOREIGN KEY ([WishlistUsersId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''0e334b50-e047-4f01-8701-0b5a0527a15c'', N''cb895a82-e153-4ac7-9f05-967420aa69ca'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''1c2d32c0-eeae-402d-afe1-b3bd712229fe'', N''5f128ccf-0fc9-4e84-98e5-521470cda4be'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''c82ce99b-2c10-43aa-824e-e38681e53e7f'', N''f37bcc91-35a1-4c34-b136-e2525ffec2c7'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    CREATE INDEX [IX_Order_ShipperID] ON [Order] ([ShipperID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    CREATE INDEX [IX_AppUserBook_WishlistUsersId] ON [AppUserBook] ([WishlistUsersId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    ALTER TABLE [Order] ADD CONSTRAINT [FK_Order_Users_ShipperID] FOREIGN KEY ([ShipperID]) REFERENCES [Users] ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220212064053_wishlist_shipper')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220212064053_wishlist_shipper', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''0e334b50-e047-4f01-8701-0b5a0527a15c'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''1c2d32c0-eeae-402d-afe1-b3bd712229fe'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''c82ce99b-2c10-43aa-824e-e38681e53e7f'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    ALTER TABLE [Users] ADD [Coins] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''0f33dd63-efa8-46e8-b9be-c560f29dc118'', N''8317fda0-6318-4f67-9e25-e2203b32b1d1'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''e931a0ff-0f93-42e8-ab52-7eaae93243ed'', N''6c791541-1a97-49e4-b828-8dae81ed59e9'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''eb6bb0e9-c2a4-4bd8-8568-620dfed633a1'', N''ad16434b-5087-4734-9722-9f64fea23f7b'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220213003815_user_add_coins')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220213003815_user_add_coins', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''0f33dd63-efa8-46e8-b9be-c560f29dc118'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''e931a0ff-0f93-42e8-ab52-7eaae93243ed'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''eb6bb0e9-c2a4-4bd8-8568-620dfed633a1'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    ALTER TABLE [Genres] ADD [Description] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    ALTER TABLE [Books] ADD [CreateDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    ALTER TABLE [Books] ADD [UpdateDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''6d97722e-7636-4703-9abd-047c5cd9a079'', N''532baa8a-7309-460b-8780-f1141a92b83b'', N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''ad245d9b-ec05-48c7-9575-3aaed7d01ae7'', N''a4ba57e8-95a8-4058-a2c6-70f17e273bf4'', N''Shipper'', N''SHIPPER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''cc83b110-133b-4876-96f6-35a68766afeb'', N''00b59122-1024-4978-8ed3-20e25fb6157f'', N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220317023937_AddGenreDes_AddBookCreateUpdateDate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220317023937_AddGenreDes_AddBookCreateUpdateDate', N'6.0.1');
END;
GO

COMMIT;
GO

