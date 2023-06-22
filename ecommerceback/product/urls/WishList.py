from django.urls import path
from ..views import WishList
urlpatterns = [
    path('wishlist/<int:id>/', WishList.getwishlistAll),
    path('add/', WishList.addwishlistitem),
    path('delete/<int:id>/', WishList.delete_wishlist),
    

]