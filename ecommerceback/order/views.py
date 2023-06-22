

from django.shortcuts import render,HttpResponse
from .models import Order,OrderItem,ShippingAddress
# from ..product.models import Cart,Product
from product.models import Cart, Product
from rest_framework.decorators import api_view,permission_classes

from .serializers import OrderSerializers,ShippingAddress,OrderItemSerializers
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status
from django.utils import timezone
from django.contrib.auth.models import User
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):

    try:
        order=Order.objects.all()
        serializer=OrderSerializers(order,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,id):
    try:
        order=Order.objects.filter(id=id)
        serializer=OrderSerializers(order,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except : 
        return Response({"message":serializer.errors} , status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getMyOrders(request) : 
    try : 
        my_user = request.user
        # print(my_user)
        orders = Order.objects.filter(user_id=my_user.id)
        serializer = OrderSerializers(data=orders , many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except : 
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    # user = request.user 
    data = request.data
    # print(data)
    cartId=[]
    # # cart_data = []
    for key,value in request.data.items():
        if key.startswith('cartId'):
            cartId.append({key:value})
    # print(cartId)
    myuser=User.objects.get(id=data['userId'])
    order = Order.objects.create(
        user =myuser , 
        payment_method = data["paymentMethod"] , 
        tax_price = data["taxPrice"] , 
        shipping_price = data["shippingPrice"] , 
        total_price = data["totalPrice"]
        
    )
    
    # #shipping address
    shipping_address = ShippingAddress.objects.create(
        order = order , 
        address = data['address'] , 
        city = data["city"] , 
        postal_code = data["postalCode"] , 
        country = data["country"]         
        
    )
    for i in cartId:
        for value in i.values():
            cart=Cart.objects.get(id=value)
            productId=cart.product_id
            product = Product.objects.get(id=productId)
            # print(product)
            OrderItem.objects.create(order = order , 
                                  product = product,
                                  name =product.name , 
                                  quantity = cart.product_qty , 
                                  price = product.price  , 
                                  image = product.image
                                  )
            product.count_in_stock = product.count_in_stock - int(cart.product_qty)
            product.save()
        serializer = OrderSerializers(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,id):
    try:
        order=Order.objects.get(id=id)
        if not order.is_paid  :
            order.is_paid=True
            order.paid_at=timezone.now()
            order.save()
            return Response({"message":order},status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,id):
    try:
        order=Order.objects.get(id=id)
        if not order.is_delivered  :
            order.is_delivered=True
            order.delivered_at=timezone.now()
            order.save()
            return Response({"message":order},status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response ({"message" : "user Not Found"} ,status=status.HTTP_404_NOT_FOUND)



