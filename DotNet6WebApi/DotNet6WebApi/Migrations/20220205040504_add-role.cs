using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class addrole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "14412b66-bdfd-47dd-87a6-90216bf489ff", "c88708bd-ca04-4b2b-a94e-2d767e9ced87", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "acaaf5e3-0401-4df7-bea6-37cd9718f515", "0bed8b17-2e36-4325-ab46-3f62982e0f91", "User", "USER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "eef307f9-e224-4ef9-af10-2e5c3c89ef09", "a6e78427-faa2-4b89-a225-324b09408bee", "Shipper", "SHIPPER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "14412b66-bdfd-47dd-87a6-90216bf489ff");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "acaaf5e3-0401-4df7-bea6-37cd9718f515");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "eef307f9-e224-4ef9-af10-2e5c3c89ef09");
        }
    }
}
