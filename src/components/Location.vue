<template>
    <Page>
        <ActionBar 
            title="Home's meo" 
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
          <GridLayout>
                <WebView 
                  :src="location" 
                  width="*"
                  height="*"
                />
          </GridLayout>
    </Page>
</template>

<script >
  export default {
    props:{
      location: String
    },
    data() {
      return {
      }
    },
    methods: {
      navigateHome:function(){
        console.log(this.location)
        this.$navigateBack();
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
