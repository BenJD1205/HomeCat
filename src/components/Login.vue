<template>
    <Page>
       <StackLayout class="p-20" background="#ffffff" width="300" padding="20">
           <Label text="User: " marginBottom="10"/>
           <TextField id="txtUservID" v-model="user1" marginBottom="10" hint="Enter user..."></TextField>
            <Label text="Email: " marginBottom="10"/>
           <TextField id="txtEmailvID" v-model="email" marginBottom="10" hint="Enter email..."></TextField>
          <Label text="Password: " marginBottom="10"/>
           <TextField secure="true" id="txtPassvID" v-model="pass" marginBottom="10" hint="Enter password..."></TextField>
          <Label v-show="checkLogin == false" text="Password confirm: " marginBottom="10"/>
          <TextField secure="true" v-show="checkLogin == false" marginBottom="10" id="txtPassConfirmvID" v-model="passConfirm" hint="Enter confirm password..."></TextField>
           <Button background="#56c596" color="#ffffff"
           @tap="submitLogin" :text="(checkLogin)? 'Đăng nhập': 'Đăng kí'" />
       </StackLayout>
    </Page>
</template>

<script >
  import Detail from './Detail.vue'
  export default {
     props:{
          checkLogin: Boolean
     },
    data() {
      return {
        user1:'',
        pass: '',
        email: '',
        users:[
          {
            user:'ben',
            email: 's.anh2209@gmail.com',
            password: '123456',
            passConfirm:'123456',
          }
        ],
      }
    },
    methods: {
     
      submitLogin(){
        // var dataSignIn = {  
        //        user: this.users.user,
        //        email: this.users.email,
        //        pass: this.users.pass
        //   }
        //   var dataSignUp = { 
        //        user: this.users.user,
        //        email: this.users.email,
        //        pass: this.users.pass,
        //        passConfirm: this.users.passConfirm
        //   }

          if(this.user1.localeCompare(this.users.user) && this.pass.localeCompare(this.users.password))
          {
            console.log("Welecome"+this.user1);
            this.$navigateTo(Detail,{
              props:{
                user:this.user1
              }
            });
          }

      //  if(this.checkLogin == false){
      //     this.$modal.close(dataSignUp); 
          
      //  }
      //  else{
      //     this.$modal.close(dataSignIn);
      //     this.$navigateTo(Detail,{
      //       user:this.users.user
      //     }); 
      //  }
      }
    },
    computed:{
     
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
</style>
