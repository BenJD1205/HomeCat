<template>
    <Page>
        <ActionBar 
            title="Home's Meo" 
            fontSize="30" fontWeight="bold"
            fontFamiy="Poppins" color="#e250aa"
            android:flat="true"
            background="#FFFFFF"
            >
             <ActionItem @tap="navigateCart()"
                    android.systemIcon="ic_menu_view"
                    android.position="right"
                />
                 <ActionItem 
                android.systemIcon="ic_menu_back"
                android.position="right"
                @tap="navigateHome()"
                />
        </ActionBar>
          <StackLayout>
              <FlexboxLayout margin="20">
                  <Image 
                    :src="productCurrent.image"
                    width="170"
                    height="170"
                    background="#CFF4D2"
                    borderRadius="10"
                    padding="10"
                    />
                    <FlexboxLayout
                        flexDirection="column"
                        paddingLeft="15"
                        alignItems="Left"
                    >
                        <Label 
                            :text="productCurrent.name"
                            color="#000000"
                            fontSize="20"
                            fontWeight="bold"
                        />
                        <Label 
                            :text=" 'GIá : ' + productCurrent.price +' VNĐ' "
                            color="grey"
                            fontSize="16"
                            margin="20 0"
                        />
                        <Label 
                            :text=" 'Số lượng : '  + productCurrent.amount + ' con '"
                            color="#000000"
                            fontSize="16"
                        />
                    </FlexboxLayout>
              </FlexboxLayout>
              <FlexboxLayout margin="30 20 20 20">
                  <TextView 
                    editable="false"
                    autcorrect="false"
                    :text="productCurrent.des"
                    fontSize="16"
                    color="#000000"
                    textWrap="wrap"
                    borderBottom="none"
                  />
              </FlexboxLayout>
              <FlexboxLayout
                marginTop="200"
                flexDirection="column"
                alignItems="center"
                >
                  <FlexboxLayout alignItems="center">
                      <Button 
                            width="50" height="50"
                            background="lightgrey"
                            text="-"
                            @tap="minus()"
                        />
                        <Label 
                            :text="countProduct"
                             color="#000000"
                            fontSize="20"
                            padding="0 20"
                        />
                        <Button 
                            width="50" height="50"
                            background="lightgrey"
                            text="+"
                            @tap="plus()"
                        />
                  </FlexboxLayout>
                  <Button 
                    width="200"
                    height="50"
                    background="#e250aa"
                    color="#ffffff"
                    text="Thêm vào giỏ hàng"
                    @tap="addCart()"
                    />
              </FlexboxLayout>
          </StackLayout>
    </Page>
</template>

<script >
import Cart from './Cart.vue';
  export default {
    props:{
        product: Object,
        user1:String
    },
    data() {
      return {
          productCurrent: this.product,
          countProduct:1,
          Carts:[]
      }
    },
    methods: {
       addCart:function(){
         let product = {
           id: this.product.id,
            name: this.product.name,
            image: this.product.image,
            price: this.product.price,
            amount: this.countProduct,
            des: this.product.des
         } ;

          var flag = false;
          if(this.Carts.length < 0){
            flag = false;
          }
          else{
            this.Carts.map(x=>{
              if(product.name == x.name){
                flag = true;
              }
            })
          }

          if(flag == false){ this.Carts.push(product) }
          else{
            this.Carts.map(x=>{
                (product.name == x.name)? 
                x.amount+=1 : x.amount = x.amount;
            })
          }

        // var flag=false;
        // if(this.Carts.length<0){
        //   flag=false
        // }
        // else{
        //   for(var i =0;i <this.Carts.length;i++){
        //     if(product.name==this.Carts[i].name){
        //       flag=true
        //     }
        //   }
        // }
        // if (flag==false){
        //   this.Carts.push(product)
        // }
        //   else{
        //      this.Carts.map(x=>{
        //          (product.name == x.name)? 
        //         x.amount+=1 : x.amount = x.amount;
        //      });
        // }
        // for(var i =0;i <this.Carts.length;i++){
          //   if(product.name==this.Carts[i].name){
          //     this.Carts[i].amount+=1
          //   }
          // }
      },
      navigateCart:function(){
        this.$navigateTo(Cart,{
          transition: {
            name:"slideLeft",
            duration: 200,
            curve:"easeIn"
          },
          props:{ 
            carts: this.Carts
          }
        })
      },
      navigateHome:function(){
        this.$navigateBack();
      },
      plus(){
        if(this.countProduct > 0 && 
        this.countProduct < this.productCurrent.amount){
          this.countProduct+=1;
        }
      },
      minus(){
        (this.countProduct > 1)?
          this.countProduct -= 1 : this.countProduct = this.countProduct;
      }

     
    },
    computed:{
    
    },
    filters:{
       
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    TextField:focus{
      border-bottom: 2 solid #e250aa;
    }

</style>
