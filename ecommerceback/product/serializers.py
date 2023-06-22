from rest_framework import serializers
from .models import Product,Review,Category,Wishlist,Cart
from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework_simplejwt.tokens import RefreshToken



class UserSerializers(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField(read_only = True) 
    email = serializers.SerializerMethodField(read_only = True) 
    _id = serializers.SerializerMethodField(read_only = True) 
    isAdmin = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model =User
        fields ="__all__"
    def get_name(self , obj ) :
        name = obj.first_name 
        if name == "" : 
            name = obj.email
        return name
    def get_email(self , obj ) :
        email = obj.username 
        return email
    def get__id(self , obj) : 
        return obj.id
    def get_isAdmin(self, obj) : 
        return obj.is_superuser
    
    



class UserserializerWithToken(UserSerializers) : 
    token = serializers.SerializerMethodField(read_only = True)
    class Meta : 
        model = User 
        fields = "__all__"
    def get_token(self , obj) : 
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializers(serializers.ModelSerializer):
    def validate_rating(self,value):
        if value < 1 or value > 5:
            print("value",value)
            raise serializers.ValidationError("rate must be between 1 to 5")
        else:
            # print("value",value)
            return value
    class Meta:
        model =Review
        fields = "__all__"
        # ["name","rating","comment"]
        
class CategorySerializers(serializers.ModelSerializer) : 
    # product=serializers.SerializerMethodField()
    class Meta : 
        model = Category 
        fields = "__all__"
    # def get_product(self,obj):
        # all_category=Product.objects.filter(product=obj)
        # serializer=ProductSerializers(all_category,many=True)
        # return serializer.data

class ProductSerializers(serializers.ModelSerializer):
    reviews=serializers.SerializerMethodField()
    # category=serializers.SerializerMethodField(read_only = True)
    num_reviews=serializers.SerializerMethodField()
    rating=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    class Meta:
        model =Product
        fields ="__all__"
        
   
    
    def get_reviews(self,obj):
        all_reviews=Review.objects.filter(product=obj)
        serializer=ReviewSerializers(all_reviews,many=True)
        return serializer.data
    
    # def get_category(self,obj):
    #     all_category=Category.objects.filter(product=obj)
    #     serializer=CategorySerializers(all_category,many=True)
    #     return serializer.data
    
    def get_user(self,obj):
        my_user=User.objects.filter(product=obj)
        serializer=UserSerializers(my_user,many=True)
        return serializer.data
    
    def get_num_reviews(self,obj):
        len_reviews=len(Review.objects.filter(product=obj))
        return len_reviews
    
    
    def get_rating(self,obj):
        len_reviews=len(Review.objects.filter(product=obj))
        reviews = Review.objects.filter(product=obj).aggregate(rate=(Sum('rating'))/len_reviews)
        # print(reviews)
        # rate=reviews.rating__sum/int(len_reviews)
        return reviews


class userCartSerializers(serializers.ModelSerializer) : 
    product = serializers.SerializerMethodField() 
    user=serializers.SerializerMethodField()
    class Meta : 
        model = Cart 
        fields = "__all__"
    def get_product(self,obj):
        product=Product.objects.filter(cart=obj)
        serializer=ProductSerializers(product,many=True)
        return serializer.data
    
    def get_user(self,obj):
        my_user=User.objects.filter(cart=obj)
        serializer=UserSerializers(my_user,many=True)
        return serializer.data
    
class userWishlistSerializers(serializers.ModelSerializer) : 
    product = serializers.SerializerMethodField() 
    user=serializers.SerializerMethodField()
    class Meta : 
        model = Wishlist 
        fields = "__all__"
    def get_product(self,obj):
        product=Product.objects.filter(wishlist=obj)
        serializer=ProductSerializers(product,many=True)
        return serializer.data
    
    def get_user(self,obj):
        my_user=User.objects.filter(wishlist=obj)
        serializer=UserSerializers(my_user,many=True)
        return serializer.data

    #       
