using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Prowriters.API.Dtos
{
    public class OrderDto
    {
        [Required]
        public string BookTitle { get; set; }
        [Required]
        public string SubTitle { get; set; }
        public string AuthorName { get; set; }
        [Required]
        public string ProjectDescription { get; set; }
        [Required]
        public string NoOfWord { get; set; }
        [Required]
        public string ClientName { get; set; }
        [Required]
        public string ClientEmail { get; set; }
        public bool CustomizedCopyrightPage { get; set; }
        public bool ProfessionalBookDescription { get; set; }
        public bool PlagiarismReport { get; set; }
        public bool WordFormatting { get; set; }
        public float TotalDiscount { get; set; }
        public IFormFile DocFile { get; set; }
    }
}