from django.urls import path
from . import views


urlpatterns = [
    path('all/', views.getAllOrders),
    path('add/', views.addOrderItems),
    path('order/<int:id>/', views.getOrderById),
    path('myorder/', views.getMyOrders),
    path('paid/<int:id>/', views.updateOrderToPaid),
    path('deliver/<int:id>/', views.updateOrderToDelivered),
    
]