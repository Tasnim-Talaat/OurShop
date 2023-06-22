from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from ..serializers import ProductSerializers,ReviewSerializers,CategorySerializers
from ..models import Product,Review,Category
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status



# Create your views here.
@api_view(['GET'])
def get_Allcategory(request):
    try:
        category=Category.objects.all()
        serializer=CategorySerializers(category,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_category(request,name):
    try:
        categor=list(Category.objects.filter(name=name))
        categories=list(Product.objects.filter(category=categor[0].id))
        # print(categories)
        serializer=ProductSerializers(data=categories,many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_categoryId(request,id):
    try:
        product=Category.objects.filter(id=id)
        serializer=CategorySerializers(product,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
# @api_view(['POST'])
# @permission_classes([IsAdminUser])
# def create_category(request):
#     new_category=request.data
#     serializer=CategorySerializers(data=new_category)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data,status=status.HTTP_201_CREATED)
#     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_category(request,id):
    inst=Category.objects.get(id=id)
    new_cat=request.data
    serializer = CategorySerializers(data=new_cat, instance=inst)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_category(request,id):
    try:
        category=Category.objects.get(id=id).delete()
        return Response({'delete':"category deleted successfully"},status=status.HTTP_202_ACCEPTED)
    except Category.DoesNotExist:
        return Response({'delete':"category DoesNotExist"},status=status.HTTP_404_NOT_FOUNDD)
    except Exception as ex:
        return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)
    
@api_view(["POST"])
def uploadImagecat(request) : 
    try:
        data = request.data
        category_id = data["category_id"]
        category = Category.objects.get(id = category_id)
        # print(category.image)
        image  = request.FILES.get("image")
        # print(image)
        category.image.save(image.name, image)
        category.save()
        serializer = CategorySerializers(data=Category)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def uploadImagecate(request):
    try:
        image = request.FILES.get("image")

        category = Category()
        category.name=request.data['name']
        category.image.save(image.name, image)
        category.save()

        serializer = CategorySerializers(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as ex:
        return Response(str(ex), status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_allproduct(request):
    try:
        all_product=Product.objects.all()
        serializer=ProductSerializers(all_product,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_allproducts(request):

    search=(request.GET.get('search'))
    all_product=Product.objects.filter(name__contains=search).values()
    return Response(all_product,status=status.HTTP_200_OK)
   

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    new_product=request.data
    # new_product['category_id']
    print(new_product)
    serializer=ProductSerializers(data=new_product)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
   
    


   


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request,id):
    inst=Product.objects.get(id=id)
    new_product=request.data
    # print(new_product['category_id']) 
    serializer = ProductSerializers(data=new_product, instance=inst)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request,id):
    try:
        product=Product.objects.get(id=id).delete()
        return Response({'delete':"product deleted successfully"},status=status.HTTP_202_ACCEPTED)
    except Product.DoesNotExist:
        return Response({'delete':"product DoesNotExist"},status=status.HTTP_404_NOT_FOUNDD)
    except Exception as ex:
        return Response ({"message" : str(ex)} ,status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def get_product(request,id):
    try:
        product=Product.objects.filter(id=id)
        serializer=ProductSerializers(product,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,id):
    # myUser=request.user
    # print(request.user.id)
    myData=request.data
    # myData["product"]=id
    # myData["user"]=myUser.id
    # print(myData)
    serializer=ReviewSerializers(data=myData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    


    
    
@api_view(["POST"])
def uploadImage(request) : 
    try:
        data = request.data
        product_id = data["product_id"]
        product = Product.objects.get(id = product_id)
        image  = request.FILES.get("image")
        product.image.save(image.name, image)
        product.save()
        
        serializer = ProductSerializers(product) 
        return Response(serializer.data)
    except Exception as ex:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["POST"])
def uploadImages(request):
    try:
        image = request.FILES.get("image")

        product = Product()
        product.user_id=request.data['user_id']
        product.name=request.data['name']
        product.brand=request.data['brand']
        product.num_reviews=request.data['num_reviews']
        product.rating=request.data['rating']
        product.category_id=request.data['category']
        product.description=request.data['description']
        product.price=request.data['price']
        product.count_in_stock=request.data['count_in_stock']
        product.image.save(image.name, image)
        product.save()
        serializer = ProductSerializers(product)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as ex:
        return Response(str(ex), status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_TopRateProduct(request):
    try:
        product=Product.objects.filter(rating__gte=4).order_by('-rating')[:10]
        serializer=ProductSerializers(product,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_LatestProduct(request):
    try:
        product= Product.objects.order_by('-created_at')[:10]
        serializer=ProductSerializers(product,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as ex : 
        return Response (serializer.errors,status=status.HTTP_404_NOT_FOUND)