﻿using DotNet6WebApi.Data;

namespace DotNet6WebApi.DTO
{
    public class PromotionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string imgUrl { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsLocked { get; set; }
    }

    public class FullPromotionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string imgUrl { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual IList<SimplePromotionInfoDTO> PromotionInfos { get; set; }
        public int Status { get; set; }
        public int Visible { get; set; }
        public bool IsLocked { get; set; }
    }

    public class CreatPromotionDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string imgUrl { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Status { get; set; }
        public int Visible { get; set; }
    }
}
