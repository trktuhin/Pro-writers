﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Prowriters.API.Data;

namespace Prowriters.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("Prowriters.API.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTime>("MessageDate");

                    b.Property<string>("MessageDetails");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Messages");
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

                    b.Property<bool>("IsCompleted");

                    b.Property<bool>("IsDeleted");

                    b.Property<bool>("IsPaymentReceived");

                    b.Property<string>("NoOfWord");

                    b.Property<DateTime>("OrderDate");

                    b.Property<bool>("PlagiarismReport");

                    b.Property<bool>("ProfessionalBookDescription");

                    b.Property<string>("ProjectDescription");

                    b.Property<string>("SubTitle");

                    b.Property<float>("TotalDiscount");

                    b.Property<bool>("WordFormatting");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Prowriters.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsAdmin");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
