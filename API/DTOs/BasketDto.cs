using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class BasketDto : BaseEntity
    {
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}