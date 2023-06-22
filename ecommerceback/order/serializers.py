from rest_framework import serializers
from .models import Order,OrderItem,ShippingAddress
from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework_simplejwt.tokens import RefreshToken
from product.serializers import UserSerializers

class OrderSerializers(serializers.ModelSerializer):
    user=serializers.SerializerMethodField()
    orderItem=serializers.SerializerMethodField()
    shippingAddress=serializers.SerializerMethodField()
    class Meta:
        model =Order
        fields ="__all__"

    def get_user(self,obj):
        my_user=User.objects.filter(order=obj)
        serializer=UserSerializers(my_user,many=True)
        return serializer.data



    def get_orderItem(self,obj):
        all_orderItem=OrderItem.objects.filter(order=obj)
        serializer=OrderItemSerializers(all_orderItem,many=True)
        return serializer.data
    
    def get_shippingAddress(self,obj):
        all_shippingAddress=ShippingAddress.objects.filter(order=obj)
        serializer=ShippingAddressSerializers(all_shippingAddress,many=True)
        return serializer.data


class OrderItemSerializers(serializers.ModelSerializer):
    class Meta:
        model =OrderItem
        fields ="__all__"

class ShippingAddressSerializers(serializers.ModelSerializer):
    class Meta:
        model =ShippingAddress
        fields ="__all__"
