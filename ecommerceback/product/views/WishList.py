from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from ..serializers import userWishlistSerializers
from ..models import Wishlist,Product
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getwishlistAll(request,id):
        try:
                # myUser=Wishlist.objects.all()
                myUser=Wishlist.objects.filter(user_id=id)
                # print(myUser)
                serializer=userWishlistSerializers(data=myUser ,many=True)
                if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                return Response(serializer.data)
        except Exception as ex : 
                return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)
        
        
@api_view(['POST'])
def addwishlistitem(request):
        try:
              Wishlist.objects.create(
                    user_id=request.data["user_id"],
                    product_id=request.data["product_id"]
              )
              return Response({"message" : "whishlist Added Successfully"},status=status.HTTP_200_OK)
        except Exception as ex :
                return Response ({"message" : str(ex)},status=status.HTTP_404_NOT_FOUND)
       
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_wishlist(request,id):
    try:
        wishlist=Wishlist.objects.get(id=id).delete()
        return Response({'delete':"whishlist deleted successfully"},status=status.HTTP_202_ACCEPTED)
    except Wishlist.DoesNotExist:
        return Response({'delete':"whishlist DoesNotExist"},status=status.HTTP_404_NOT_FOUNDD)
    except Exception as ex:
        return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)

