from django.urls import path
from ..views import cart
urlpatterns = [
    path('cart/<int:id>/', cart.getcartAll),
    path('add/', cart.addcartitem),
    path('delete/<int:id>/', cart.delete_cart),
    path('deletecartuser/<int:id>/', cart.delete_cartuser),
    

]