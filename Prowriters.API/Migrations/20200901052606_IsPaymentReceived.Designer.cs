﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Prowriters.API.Data;

namespace Prowriters.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200901052606_IsPaymentReceived")]
    partial class IsPaymentReceived
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113");

            modelBuilder.Entity("Prowriters.API.Models.Coupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CouponValue");

                    b.Property<float>("DiscountPercent");

                    b.HasKey("Id");

                    b.ToTable("Coupons");
                });

            modelBuilder.Entity("Prowriters.API.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AuthorName");

                    b.Property<string>("BookTitle");

                    b.Property<string>("ClientEmail");

                    b.Property<string>("ClientName");

                    b.Property<bool>("CustomizedCopyrightPage");

                    b.Property<bool>("IsPaymentReceived");

                    b.Property<string>("NoOfWord");

                    b.Property<bool>("PlagiarismReport");

                    b.Property<bool>("ProfessionalBookDescription");

                    b.Property<string>("ProjectDescription");

                    b.Property<string>("SubTitle");

                    b.Property<float>("TotalDiscount");

                    b.Property<bool>("WordFormatting");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
