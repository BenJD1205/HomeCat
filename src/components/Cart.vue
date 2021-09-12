<template>
    <Page>
        <ActionBar 
            title="Home's Meo" 
            fontSize="30" fontWeight="bold"
            fontFamiy="Poppins" color="#e250aa"
            android:flat="true"
            background="#FFFFFF"
            >
                 <ActionItem 
                android.systemIcon="ic_menu_back"
                android.position="right"
                @tap="navigateHome()"
                />
        </ActionBar>
        <GridLayout columns="*," rows="*,auto,*" orientation="vertical">
          <RadListView for="item in carts" ref="listView" @itemTap="onItemTap"
          swipeActions="true" @itemSwipeProgressStarted="onSwipeStarted" >

            <v-template>
              <FlexboxLayout flexDirection="row" >
                <FlexboxLayout 
                    alignItems="center" 
                    justifyContent="space-between" 
                    flexDirection="row"

                    >
                    <Image :src="item.image" 
                            width="70" height="70"
                            background="#CFF4D2"
                          borderRadius="10"
                          padding="10"
                        />
                        <Label :text="item.name" 
                        fontSize="18" color="black"
                        />
                          <Label :text="item.address" 
                        fontSize="16" color="grey"
                        />
                          <Label :text="item.quantity" 
                        fontSize="16" marginRight="10" marginLeft="10" color="grey"
                        />
                          <Label :text="item.price*item.amount + 'VNĐ' " 
                        fontSize="16" color="grey"
                        />
                </FlexboxLayout>
                </FlexboxLayout>
            </v-template>
            <v-template name="itemswipe">
              <GridLayout  columns=" auto,*, auto" background="#fff">
                <StackLayout id="edit-view" col="0" class="swipe-item left" orientation="horizontal"
                @tap="onLeftSwipeClick"> 
                  <Label text="Xem thêm" textAlignment="center" verticalAlignment="center" 
                  horizontalAlignment="center" backgroundColor="#fff" width="70" height="110"/>
                  
                </StackLayout>
                <StackLayout id="delete-view" col="2" class="swipe-item right" orientation="horizontal"
                @tap="onRightSwipeClick"> 
                  <Label text="Delete" textAlignment="center" verticalAlignment="center" 
                  horizontalAlignment="center" backgroundColor="#fff" width="70" height="110"/>
                  
                </StackLayout>
              </GridLayout>
            </v-template>
          </RadListview>
          <Label text="" row="1" textWrap="true" />
          
          <StackLayout col="0" row="2" alignItems="center" orientation="vertical" >
            <Label 
                  :text=" 'Tổng tiền : ' + total + 'VNĐ' "
                  background="#e250aa"
                  fontSize="16"
                  color="#000000"
                  fontWeight="bold"
                  marginTop="25"
                  marginBottom="0"
                />
            <Button text="Mua" @tap="showBuy()" width="150" fontSize="18" backgroundColor="#e250aa" />
            
          </StackLayout>
        </GridLayout>
    </Page>
</template>

<script >
  import Home from './App.vue'
  export default {
    props:{
      checkLogin:Boolean,
      carts:Array
    },
    data() {
      return {
        Products:[],
      }
    },
    methods: {
      navigateHome:function(){
        this.$navigateBack();
      },
      onSwipeStarted ({ data, object }) {

        const swipeLimits = data.swipeLimits;

        const swipeView = object;// đối tượng hiện tại đag kéo

        const leftItem = swipeView.getViewById('edit-view');//Mark

        const rightItem = swipeView.getViewById('delete-view');//Delete

        swipeLimits.left = leftItem.getMeasuredWidth();//do rong cua left item 70

        swipeLimits.right = rightItem.getMeasuredWidth();//do rong cua right item 70

        swipeLimits.threshold = leftItem.getMeasuredWidth()/2;//gioi han nguong de keo

      },
      onLeftSwipeClick(){
        this.$navigateTo(Home,{
          transition: {
            name:"slideLeft",
            duration: 200,
            curve:"easeIn"
          }
        });
      },
      onRightSwipeClick({object}){
        confirm({ 
          title: "Xóa",
          message: "Bạn có muốn xóa",
          cancelButtonText: "Hông thích",
          okButtonText: "Có đó"
        }).then((result)=>{
          if(result==true){
            //splice
            this.carts.splice(this.carts.indexOf(object.bindingContext),1);
          }
          this.$ref.listView.notifySWipeToExecuteFinished();
        });
      },
      showBuy(){
        confirm({
          title: "Xác nhận đơn hàng",
          message: "Bạn có chắc xác nhận mua hàng",
          cancelButtonText: "Hủy",
          okButtonText: "Có đó"
        }).then((result)=>{
          if(result==true){
            //splice
            this.carts= this.carts.length=0;
            alert({
              title:"Xác nhận đơn hàng",
              message:"Cảm ơn đã mua hàng",
              okButtonText:"Oke"
            }).then(()=>{
              console.log("hello");
            })
          }
          this.$ref.listView.notifySWipeToExecuteFinished();
        });
      }
      
    },
    computed:{
      itemTapTouch:function(){},

      total:function(){
        let sum = 0;
        this.carts.map(x=>{
            sum +=(x.amount * x.price);
        })
        return sum;
      }
    },
    // filters:{
    //    filterCurrency(number){
    //      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number)
    //    }
    // }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #f596ee;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }


</style>
