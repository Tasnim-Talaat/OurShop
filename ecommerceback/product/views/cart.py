from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from ..serializers import userCartSerializers
from ..models import Cart,Product
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getcartAll(request,id):
        try:
                # myUser=Wishlist.objects.all()
                myUser=Cart.objects.filter(user_id=id)
                # print(myUser)
                serializer=userCartSerializers(data=myUser ,many=True)
                if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                return Response(serializer.data)
        except Exception as ex : 
                return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)
        
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addcartitem(request):
        try:
              Cart.objects.create(
                    user_id=request.data["user_id"],
                    product_id=request.data["product_id"],
                    product_qty=request.data['product_qty']

              )
              return Response({"message" : "cart Added Successfully"},status=status.HTTP_200_OK)
        except Exception as ex :
                return Response ({"message" : str(ex)},status=status.HTTP_404_NOT_FOUND)
        # try:
        #         wishlist=request.data
        #         print(wishlist)
        #         serializer=userWishlistSerializers(data=wishlist,many=True)
        #         if serializer.is_valid():
        #                 serializer.save()
        #                 print(serializer.data)
        #                 return Response(serializer.data,status=status.HTTP_200_OK)
        #         return Response(serializer.data,status=status.HTTP_200_OK)                
        # except Exception as ex :
        #         return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart(request,id):
    try:
        cart=Cart.objects.get(id=id).delete()
        return Response({'delete':"cart deleted successfully"},status=status.HTTP_202_ACCEPTED)
    except Cart.DoesNotExist:
        return Response({'delete':"cart DoesNotExist"},status=status.HTTP_404_NOT_FOUNDD)
    except Exception as ex:
        return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cartuser(request,id):
    try:
        cart=Cart.objects.filter(user_id=id).delete()
        return Response({'delete':"cart deleted successfully"},status=status.HTTP_202_ACCEPTED)
    except Cart.DoesNotExist:
        return Response({'delete':"cart DoesNotExist"},status=status.HTTP_404_NOT_FOUNDD)
    except Exception as ex:
        return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)

