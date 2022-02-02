using System.Collections;
using System.Collections.Generic;
using System.Linq;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ToOrderDto(this IQueryable<Order> query)
        {
            return query.Select(order=> new OrderDto
            {
                Id = order.Id,
                BuyerId =  order.BuyerId,
                OrderDate = order.OrderDate,
                OrderItems = order.OrderItems.ToOrderItemDto(),
                OrderStatus = order.OrderStatus.ToString(),
                ShippingAddress = order.ShippingAddress,
                SubTotal = order.SubTotal,
                DeliveryFee =  order.DeliveryFee,
                Total = order.GetTotal(),
            }).AsNoTracking();
        }

        private static List<OrderItemDto> ToOrderItemDto(this List<OrderItem> list)
        {
            return list.Select(orderItem=> new OrderItemDto
            {
                ProductId = orderItem.ItemOrdered.ProductId,
                Name = orderItem.ItemOrdered.Name,
                PictureUrl = orderItem.ItemOrdered.PictureUrl,
                Price = orderItem.Price,
                Quantity = orderItem.Quantity,
            }).ToList();
        }
    }
}