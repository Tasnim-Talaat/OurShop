from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category (models.Model) : 
    name=models.CharField(max_length=200 , null=False , blank=False , default="Category")
    image = models.ImageField(null=True , blank=True)

    
class Product (models.Model) : 
    name = models.CharField(max_length=200 , null=False , blank=False , default="Product")
    image = models.ImageField(null=True , blank=True)
    brand = models.CharField(max_length=200 , null=False , blank=False) 
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    description = models.TextField() 
    rating = models.FloatField(null=False , default=0) 
    num_reviews = models.IntegerField(default=0)
    price = models.FloatField(null=False , blank=False) 
    count_in_stock = models.IntegerField(default=0 , null=False ,blank=False)
    created_at = models.DateTimeField(auto_now_add=True )
    user = models.ForeignKey(User , on_delete=models.CASCADE,null=True)
    

   
    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(rating__lte=5), name='rating must be less than 5'),
            models.CheckConstraint(check=models.Q(price__gte=0), name='price must be less than 0'),
        ]
        db_table = 'Product'

class Review (models.Model) : 
    product = models.ForeignKey(Product , on_delete=models.CASCADE)
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    rating = models.FloatField(null=False) 
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) 

    class Meta:
        # constraints = [
        #     models.CheckConstraint(check=models.Q(rating__lte=5), name='rating must be less than 5'),
        # ]
        db_table = 'Review'
    # def __str__(self) :
    #     return self.rating
class Cart(models.Model):
        user =models.ForeignKey(User,on_delete= models.CASCADE)
        product= models.ForeignKey(Product, on_delete=models.CASCADE)
        product_qty=models.IntegerField(null=False,blank=False)
        created_at=models.DateTimeField(auto_now_add=True)

class Wishlist(models.Model):
        user =models.ForeignKey(User,on_delete= models.CASCADE)
        product= models.ForeignKey(Product, on_delete=models.CASCADE)
        created_at=models.DateTimeField(auto_now_add=True)