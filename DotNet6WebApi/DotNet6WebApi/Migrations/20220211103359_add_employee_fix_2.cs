using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class add_employee_fix_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "790bd51e-77d8-4e2c-939d-62e33e3245cc");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c1623422-ea4f-4ce4-8dbf-5b28a391b6a7");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d69e090c-9eb1-42fb-b8e0-f878402e5be0");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "26c604a4-02ae-48f3-9fd9-51b992c8b787", "53902c77-e4bb-4ded-a01d-94ca26d6d8a0", "Shipper", "SHIPPER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6d1cf5b6-399d-47d3-83d8-e3989602005b", "3c1d182f-8783-4924-82a8-ecb4bd951606", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "89493dc5-eb50-44dd-bc41-62780b9c5d14", "2bdfeb65-8bbc-41e4-80a7-3952ad236874", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "26c604a4-02ae-48f3-9fd9-51b992c8b787");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6d1cf5b6-399d-47d3-83d8-e3989602005b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "89493dc5-eb50-44dd-bc41-62780b9c5d14");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Employees");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "790bd51e-77d8-4e2c-939d-62e33e3245cc", "3c9c4451-675f-47ff-860c-40302039cea4", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c1623422-ea4f-4ce4-8dbf-5b28a391b6a7", "63399b99-c0c7-4bec-9c42-d28065d38322", "User", "USER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d69e090c-9eb1-42fb-b8e0-f878402e5be0", "867a0cd7-c9c0-42a5-949a-1997fe3c15b7", "Shipper", "SHIPPER" });
        }
    }
}
