from django.urls import path
from ..views import products

urlpatterns = [
    path('category/', products.get_Allcategory),
    path('category/<int:id>/', products.get_categoryId),
    path('category/<str:name>/', products.get_category),
    # path('createcat/', products.create_category),
    path('dellcat/<int:id>/', products.delete_category),
    path('updatecat/<int:id>/', products.update_category),
    path("uploadcat/" ,products.uploadImagecat , name="imagecat-upload"),
    path("uploadcate/" ,products.uploadImagecate , name="imagecate-upload"),
    path('all/', products.get_allproduct),
    path('search/', products.get_allproducts),
    path('create/', products.create_product),
    path('product/<int:id>/', products.get_product),
    path('delete/<int:id>/', products.delete_product),
    path('update/<int:id>/', products.update_product),
    path('rev/<int:id>/', products.createProductReview),
    path("upload/" ,products.uploadImage , name="image-upload"),
    path("uploade/" ,products.uploadImages , name="image-uploade"),


    path("top/" ,products.get_TopRateProduct),
    path("latest/" ,products.get_LatestProduct),

]