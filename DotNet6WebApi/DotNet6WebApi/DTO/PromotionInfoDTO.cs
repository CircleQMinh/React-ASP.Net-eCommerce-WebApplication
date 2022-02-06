using DotNet6WebApi.Data;

namespace DotNet6WebApi.DTO
{
    public class PromotionInfoDTO
    {
        public int PromotionId { get; set; }
        public PromotionDTO Promotion { get; set; }
        public string? PromotionPercent { get; set; }
        public string? PromotionAmount { get; set; }
    }
}
