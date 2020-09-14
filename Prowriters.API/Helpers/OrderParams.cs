namespace Prowriters.API.Helpers
{
    public class OrderParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; }=1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize)? MaxPageSize:value; }
        }

        public bool IsPaymentReceived { get; set; }
        public bool IsCompleted { get; set; }
        public string BookTitle { get; set; }
    }
}