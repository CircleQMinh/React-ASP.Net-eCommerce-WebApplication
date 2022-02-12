using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class add_employee_fix_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "imgUrl",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "imgUrl",
                table: "Employees");

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
    }
}
