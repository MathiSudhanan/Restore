using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class InitializeDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "UserAddress",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Name",
                table: "Orders",
                newName: "ShippingAddress_FullName");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "393ba788-0966-451a-8868-a0105153ef3b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0566dada-b1c9-436d-a293-1d7e9e98824f");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "UserAddress",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_FullName",
                table: "Orders",
                newName: "ShippingAddress_Name");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "2944cece-7546-44c8-9e32-f2c763ad872f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0f556dad-ae13-483b-9f22-c8312bec78bb");
        }
    }
}
