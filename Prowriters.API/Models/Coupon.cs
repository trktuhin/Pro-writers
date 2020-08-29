namespace Prowriters.API.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string CouponValue { get; set; }
        public float DiscountPercent { get; set; }
    }
}