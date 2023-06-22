from django.db import models
from django.contrib.auth.models import User
from product.models import Product

class Order(models.Model):
    ORDER_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
    )
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    payment_method = models.CharField(max_length=200)
    tax_price = models.FloatField(null=False , blank=False) 
    shipping_price = models.FloatField(null=False , blank=False) 
    total_price = models.FloatField(null=False , blank=False) 
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    class Meta:
        db_table = 'Order'

class OrderItem(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.IntegerField(default=0)
    price = models.FloatField(null=False , blank=False) 
    image = models.ImageField(null=True , blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True,related_name="orderItem")
    class Meta:
        # constraints = [
        #     models.CheckConstraint(check=models.Q(quantity__lte=0), name='quantity must be less than 0'),
        #     # models.CheckConstraint(check=models.Q(price__lte=0), name='price must be less than 0'),
        # ]
        db_table = 'OrderItem'
    

class ShippingAddress(models.Model):
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    order = models.OneToOneField(Order, on_delete=models.CASCADE,related_name="shippingAddress")
    class Meta:
        db_table = 'ShippingAddress'
