using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using API.Controllers.DTOs;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Controllers
{
    public class BasketController: BaseApiController
    {
        private readonly StoreContext context;

        public BasketController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasketAsync()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        private static BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    PictureURL = x.Product.PictureUrl,
                    Brand = x.Product.Brand,
                    Type = x.Product.Type,
                    Quantity = x.Quantity

                }).ToList()
            };
        }


        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //Get basket
            var basket = await RetrieveBasket();

            if(basket == null)
            {
                //Create basket
                basket = CreateBasket();
            }
            
            //Get Product
            var product  = await context.Products.FindAsync(productId);
            if(product==null) return BadRequest(new ProblemDetails{Title="Product not found"});

            //Add Item
            basket.AddItem(product, quantity);
            //Save Changes
            var result = await context.SaveChangesAsync() >0;
            if(result)
            return CreatedAtRoute("GetBasket",MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            
            var basket = await RetrieveBasket();

            if(basket==null) return NotFound();

            
            basket.RemoveItem(productId,quantity);

           
            var result = await context.SaveChangesAsync() >0;
            if(result)
                return Ok();
            return BadRequest(new ProblemDetails{Title="Problem in deleting item from basket"});

        }

        private async Task<Basket> RetrieveBasket()
        {
            return await context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId ==Request.Cookies["buyerId"]);
        }

         private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{ IsEssential=true, Expires=DateTime.Now.AddDays(30), HttpOnly=false};
            Response.Cookies.Append("buyerId",buyerId, cookieOptions);

            var basket= new Basket{ BuyerId = buyerId };
            context.Baskets.Add(basket);
            return basket;
        }
    }
    
}