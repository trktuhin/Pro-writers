using Microsoft.EntityFrameworkCore.Migrations;

namespace Prowriters.API.Migrations
{
    public partial class IsPaymentReceived : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPaymentReceived",
                table: "Orders",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaymentReceived",
                table: "Orders");
        }
    }
}
