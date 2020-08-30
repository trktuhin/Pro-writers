using Microsoft.EntityFrameworkCore.Migrations;

namespace Prowriters.API.Migrations
{
    public partial class OrderAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BookTitle = table.Column<string>(nullable: true),
                    SubTitle = table.Column<string>(nullable: true),
                    AuthorName = table.Column<string>(nullable: true),
                    ProjectDescription = table.Column<string>(nullable: true),
                    NoOfWord = table.Column<string>(nullable: true),
                    ClientName = table.Column<string>(nullable: true),
                    ClientEmail = table.Column<string>(nullable: true),
                    CustomizedCopyrightPage = table.Column<bool>(nullable: false),
                    ProfessionalBookDescription = table.Column<bool>(nullable: false),
                    PlagiarismReport = table.Column<bool>(nullable: false),
                    WordFormatting = table.Column<bool>(nullable: false),
                    TotalDiscount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
