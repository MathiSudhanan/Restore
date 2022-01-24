using System;
using System.Threading.Tasks;
using API.DTOs;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;

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
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();
            return basket.MapBasketToDto();
        }

        


        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //Get basket
            var basket = await RetrieveBasket(GetBuyerId());

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
            return CreatedAtRoute("GetBasket",basket.MapBasketToDto());

            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            
            var basket = await RetrieveBasket(GetBuyerId());

            if(basket==null) return NotFound();

            
            basket.RemoveItem(productId,quantity);

           
            var result = await context.SaveChangesAsync() >0;
            if(result)
                return Ok();
            return BadRequest(new ProblemDetails{Title="Problem in deleting item from basket"});

        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId ==buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

         private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{ IsEssential=true, Expires=DateTime.Now.AddDays(30), HttpOnly=false};
                Response.Cookies.Append("buyerId",buyerId, cookieOptions);
            }
            

            var basket= new Basket{ BuyerId = buyerId };
            context.Baskets.Add(basket);
            return basket;
        }
    }
    
}