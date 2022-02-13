using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class user_add_coins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "Coins",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0f33dd63-efa8-46e8-b9be-c560f29dc118", "8317fda0-6318-4f67-9e25-e2203b32b1d1", "User", "USER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e931a0ff-0f93-42e8-ab52-7eaae93243ed", "6c791541-1a97-49e4-b828-8dae81ed59e9", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "eb6bb0e9-c2a4-4bd8-8568-620dfed633a1", "ad16434b-5087-4734-9722-9f64fea23f7b", "Shipper", "SHIPPER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0f33dd63-efa8-46e8-b9be-c560f29dc118");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e931a0ff-0f93-42e8-ab52-7eaae93243ed");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "eb6bb0e9-c2a4-4bd8-8568-620dfed633a1");

            migrationBuilder.DropColumn(
                name: "Coins",
                table: "Users");

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
        }
    }
}
