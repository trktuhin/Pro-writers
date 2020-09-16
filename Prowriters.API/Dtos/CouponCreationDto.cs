namespace Prowriters.API.Dtos
{
    public class CouponCreationDto
    {
        public int? Id { get; set; }
        public string CouponValue { get; set; }
        public float DiscountPercent { get; set; }
    }
}