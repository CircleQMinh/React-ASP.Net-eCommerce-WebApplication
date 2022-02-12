using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class add_employee_fix_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "23c55944-4431-4c9b-9412-d10e2e1fde9d");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "632dacc2-9545-4794-9f5d-074da2667c9b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "aa27d77f-fe59-497b-a269-c8210b1376a5");

            migrationBuilder.AddColumn<DateTime>(
                name: "DoB",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "DoB",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Employees");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "23c55944-4431-4c9b-9412-d10e2e1fde9d", "7003b0e7-7424-481d-a783-84fe76086bfe", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "632dacc2-9545-4794-9f5d-074da2667c9b", "af51b534-a99a-42cd-950e-3c15085a4921", "Shipper", "SHIPPER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "aa27d77f-fe59-497b-a269-c8210b1376a5", "200ab521-7d8b-45d6-928d-5baa11de242e", "User", "USER" });
        }
    }
}
