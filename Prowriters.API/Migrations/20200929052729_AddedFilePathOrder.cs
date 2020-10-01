using Microsoft.EntityFrameworkCore.Migrations;

namespace Prowriters.API.Migrations
{
    public partial class AddedFilePathOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Orders");
        }
    }
}
