using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace API.Entities
{
    public class Basket : BaseEntity
    {
        

        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if(Items.All(item=> item.ProductId != product.Id))
            {
                Items.Add(new BasketItem{
                    Product = product,
                    ProductId = product.Id,
                    Quantity = quantity
                });
            }
            else{
                var item = Items.FirstOrDefault(x=>x.ProductId == product.Id);
                if(item!=null){               
                    item.Quantity += quantity;
                }
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            if(productId>0)
            {
                var itemToBeRemoved =  Items.FirstOrDefault(x=>x.ProductId == productId);
                if(itemToBeRemoved==null){
                    return;
                }
                itemToBeRemoved.Quantity -= quantity;
                    if(itemToBeRemoved.Quantity==0)
                        
                        Items.Remove(itemToBeRemoved);
                
            }
        }
    }

}