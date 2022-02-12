using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class wishlist_shipper : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0752ae09-4387-4872-9363-e17edfa855ef");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a81e9b01-0fac-4e3c-892f-21c79ed7bc05");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f1df313b-eefc-488b-a336-e8a39831ab01");

            migrationBuilder.AddColumn<string>(
                name: "ShipperID",
                table: "Order",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppUserBook",
                columns: table => new
                {
                    WishlistId = table.Column<int>(type: "int", nullable: false),
                    WishlistUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserBook", x => new { x.WishlistId, x.WishlistUsersId });
                    table.ForeignKey(
                        name: "FK_AppUserBook_Books_WishlistId",
                        column: x => x.WishlistId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserBook_Users_WishlistUsersId",
                        column: x => x.WishlistUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0e334b50-e047-4f01-8701-0b5a0527a15c", "cb895a82-e153-4ac7-9f05-967420aa69ca", "Shipper", "SHIPPER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1c2d32c0-eeae-402d-afe1-b3bd712229fe", "5f128ccf-0fc9-4e84-98e5-521470cda4be", "User", "USER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c82ce99b-2c10-43aa-824e-e38681e53e7f", "f37bcc91-35a1-4c34-b136-e2525ffec2c7", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.CreateIndex(
                name: "IX_Order_ShipperID",
                table: "Order",
                column: "ShipperID");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserBook_WishlistUsersId",
                table: "AppUserBook",
                column: "WishlistUsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Users_ShipperID",
                table: "Order",
                column: "ShipperID",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Users_ShipperID",
                table: "Order");

            migrationBuilder.DropTable(
                name: "AppUserBook");

            migrationBuilder.DropIndex(
                name: "IX_Order_ShipperID",
                table: "Order");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0e334b50-e047-4f01-8701-0b5a0527a15c");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "1c2d32c0-eeae-402d-afe1-b3bd712229fe");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c82ce99b-2c10-43aa-824e-e38681e53e7f");

            migrationBuilder.DropColumn(
                name: "ShipperID",
                table: "Order");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0752ae09-4387-4872-9363-e17edfa855ef", "e0c4f2b8-665c-402d-9ead-0fc971699732", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a81e9b01-0fac-4e3c-892f-21c79ed7bc05", "a6afc1c2-7e97-42c3-86ab-2559cd769b85", "User", "USER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f1df313b-eefc-488b-a336-e8a39831ab01", "a6468f1f-02f8-488b-a579-1f3c95321a02", "Shipper", "SHIPPER" });
        }
    }
}
