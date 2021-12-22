using System.Collections.Generic;
using API.Entities;

namespace API.Controllers.DTOs
{
    public class BasketDto : BaseEntity
    {
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}