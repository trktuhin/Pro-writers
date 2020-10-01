using System;

namespace Prowriters.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string BookTitle { get; set; }
        public string SubTitle { get; set; }
        public string AuthorName { get; set; }
        public string ProjectDescription { get; set; }
        public string NoOfWord { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public bool CustomizedCopyrightPage { get; set; }
        public bool ProfessionalBookDescription { get; set; }
        public bool PlagiarismReport { get; set; }
        public bool WordFormatting { get; set; }
        public bool IsPaymentReceived { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsCompleted { get; set; }
        public float TotalDiscount { get; set; }
        public DateTime OrderDate { get; set; }
        public string FilePath { get; set; }
    }
}