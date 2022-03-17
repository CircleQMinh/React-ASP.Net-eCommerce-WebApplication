using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet6WebApi.Migrations
{
    public partial class AddGenreDes_AddBookCreateUpdateDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Genres",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Books",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "Books",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6d97722e-7636-4703-9abd-047c5cd9a079", "532baa8a-7309-460b-8780-f1141a92b83b", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ad245d9b-ec05-48c7-9575-3aaed7d01ae7", "a4ba57e8-95a8-4058-a2c6-70f17e273bf4", "Shipper", "SHIPPER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cc83b110-133b-4876-96f6-35a68766afeb", "00b59122-1024-4978-8ed3-20e25fb6157f", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6d97722e-7636-4703-9abd-047c5cd9a079");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "ad245d9b-ec05-48c7-9575-3aaed7d01ae7");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "cc83b110-133b-4876-96f6-35a68766afeb");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Genres");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "Books");

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
    }
}
