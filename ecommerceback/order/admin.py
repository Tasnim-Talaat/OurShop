from django.contrib import admin

# Register your models here.
from .models import Order , OrderItem,ShippingAddress
# Register your models here.
# admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)