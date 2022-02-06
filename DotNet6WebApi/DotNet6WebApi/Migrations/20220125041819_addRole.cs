using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class addRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
