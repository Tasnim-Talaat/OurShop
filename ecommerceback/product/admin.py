from django.contrib import admin
from .models import Product , Review,Category,Wishlist,Cart
# Register your models here.
# admin.site.register(Product)
admin.site.register(Wishlist)
admin.site.register(Cart)
admin.site.register(Category)
admin.site.register(Review)




@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price','rating' ,'category','user','image']
    list_editable = ['price']
    ordering = ['name','-price']
    list_filter = ['category', 'price']
    search_fields = ['name__startswith']

