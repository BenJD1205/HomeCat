<template>
    <Page>
        <ActionBar 
            title="Home's Meo" 
            fontSize="30" fontWeight="bold"
            fontFamiy="Poppins" color="#e250aa"
            android:flat="true"
            background="#FFFFFF"
            >
                <ActionItem @tap="onTapSearch()"
                android.systemIcon="ic_menu_search"
                android.position="right"
                />
        </ActionBar>
        <BottomNavigation selectedIndex="0">
            <!-- tab bar title -->
            <TabStrip 
                width="*"
                background="#ffffff" 
                borderTop="2px solid grey"
                class="bar-bottom">
                <TabStripItem>
                    <Label 
                    class="fas" 
                    style="font-size:24px; "
                    >{{ "fa-home" | fonticon}}</Label>
                </TabStripItem>
                <TabStripItem class="special">
                    <Label 
                    class="fas" 
                    style="font-size:24px"
                    >{{ "fa-map-marker" | fonticon}}</Label>
                </TabStripItem>
                <TabStripItem class="special">
                    <Label 
                    class="fas" 
                    style="font-size:24px"
                    >{{ "fa-store" | fonticon}}</Label>
                </TabStripItem>
                <TabStripItem class="special">
                    <Label 
                    class="fas" 
                    style="font-size:24px"
                    >{{ "fa-user" | fonticon}}</Label>
                </TabStripItem>
            </TabStrip>

            <!-- tab bar content -->
            <TabContentItem>
                <StackLayout>
                    <SearchBar 
                        v-model="search"
                        v-show="!showSearch"
                            hint="Nhập để tìm kiếm"
                        @textChange="onTextChanged(search)"
                        >
                    </SearchBar>

                    <!-- New product -->
                    <FlexboxLayout margin="20 0 30 0">
                        <Label  
                            :text="fullProducts[0].header"
                            fontSize="20" color="#000000"
                            paddingLeft="20" fontWeight="bold"
                            />
                    </FlexboxLayout>
                    <ScrollView 
                        orientation="horizontal" 
                        scrollBarIndicatorVisible="false" 
                        @scroll="onScrollTabOne($event)"
                        marginLeft="10">
                        <StackLayout orientation="horizontal">
                              <FlexboxLayout 
                                width="150"
                                height="170"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="flex-start"
                                background="#e250aa"
                                borderRadius="10"
                                padding="10"
                                margin="0 10"
                                v-for="item in fullProducts[0].products" :key="item.id"
                                @tap="detailProduct(item)"
                                >
                                    <Image 
                                        :src="item.image" 
                                        width="120" height="120"
                                    
                                    />
                                    <Label 
                                        :text="item.name"
                                        fontSize="16"
                                        color="#fff"
                                    />
                                </FlexboxLayout>
                        </StackLayout>
                    </ScrollView>

                    <!-- full -->
                    <FlexboxLayout margin="30 0 20 0">
                        <Label  
                            :text="fullProducts[1].header"
                            fontSize="20" color="#000000"
                            paddingLeft="20" fontWeight="bold"
                            />
                    </FlexboxLayout>
                    <Tabs selectedIndex="0">
                        <TabStrip 
                            background="#ffffff"
                            dropShadow="none"
                        >
                            <TabStripItem>
                                <Label text="Tất cả" color="#000000"></Label>
                            </TabStripItem>
                            <TabStripItem class="special">
                                <Label text="Mèo quý hiếm" color="#000000"></Label>
                            </TabStripItem>
                            <TabStripItem class="special">
                                <Label text="Mèo thường"  color="#000000"></Label>
                            </TabStripItem>
                            <TabStripItem class="special">
                                <Label text="Ua chuộng" color="#000000"></Label>
                            </TabStripItem>
                        </TabStrip>

                        <TabContentItem>
                            <GridLayout>
                                 <ListView 
                                    for="item in filterProduct" 
                                    @itemTap="itemTapTouch" 
                                    height="600" margin="20 0 0 20">
                                    <v-template>
                                        <FlexboxLayout 
                                            flexDirection="column" 
                                        >
                                            <FlexboxLayout 
                                                alignItems="center" 
                                                justifyContent="flex-start" 
                                                padding="20 0"
                                                @tap="detailProduct(item)"
                                                >
                                                     <!--img-->
                                                <Image :src="item.image" 
                                                     width="70" height="70"
                                                     background="#CFF4D2"
                                                    borderRadius="10"
                                                    padding="10"
                                                     />
                                                     <!--content-->
                                                <FlexboxLayout 
                                                    width="200" height="70" 
                                                    flexDirection="column"
                                                    paddingLeft="20"
                                                >
                                                    <Label :text="item.name" 
                                                    height="30"
                                                    fontSize="15" color="black"
                                                    />
                                                      <Label :text="item.price + 'VNĐ'" 
                                                        height="30"
                                                        fontSize="14" color="grey"
                                                    />
                                                    <Progress 
                                                        :value="item.amount" maxValue="50"
                                                        ></Progress>
                                                </FlexboxLayout>
                                            </FlexboxLayout>
                                        </FlexboxLayout>
                                    </v-template>
                                    </ListView>
                            </GridLayout>
                        </TabContentItem>

                        <TabContentItem>
                            <GridLayout>
                                 <ListView 
                                    for="item in Meoseldom" 
                                    @itemTap="itemTapKimNgan" 
                                    height="600" margin="20 0 0 20">
                                    <v-template>
                                        <FlexboxLayout 
                                            flexDirection="column" 
                                        >
                                            <FlexboxLayout 
                                                @tap="detailProduct(item)"
                                                alignItems="center" 
                                                justifyContent="flex-start" 
                                                padding="20 0">
                                                <Image :src="item.image" 
                                                    width="70" height="70"
                                                    background="#CFF4D2"
                                                    borderRadius="10"
                                                    />
                                                <FlexboxLayout 
                                                    width="200" height="70" 
                                                    flexDirection="column"
                                                    paddingLeft="20"
                                                >
                                                    <Label :text="item.name" 
                                                    height="30"
                                                    fontSize="15" color="black"
                                                    />
                                                      <Label :text="item.price + 'VNĐ'" 
                                                        height="30"
                                                        fontSize="14" color="grey"
                                                    />
                                                    <Progress 
                                                        :value="item.amount" maxValue="100" 
                                                        ></Progress>
                                                </FlexboxLayout>
                                            </FlexboxLayout>
                                        </FlexboxLayout>
                                    </v-template>
                                    </ListView>
                            </GridLayout>
                        </TabContentItem>

                        <TabContentItem>
                            <GridLayout>
                                 <ListView 
                                    for="item in Meomanual" 
                                    @itemTap="itemTapKimNgan" 
                                    height="600" margin="20 0 0 20">
                                    <v-template>
                                        <FlexboxLayout 
                                            flexDirection="column" 
                                        >
                                            <FlexboxLayout 
                                                @tap="detailProduct(item)"
                                                alignItems="center" 
                                                justifyContent="flex-start" 
                                                padding="20 0">
                                                <Image :src="item.image" 
                                                    width="70" height="70"
                                                    background="#CFF4D2"
                                                    borderRadius="10"
                                                    />
                                                <FlexboxLayout 
                                                    width="200" height="70" 
                                                    flexDirection="column"
                                                    paddingLeft="20"
                                                >
                                                    <Label :text="item.name" 
                                                    height="30"
                                                    fontSize="15" color="black"
                                                    />
                                                      <Label :text="item.price + 'VNĐ'" 
                                                        height="30"
                                                        fontSize="14" color="grey"
                                                    />
                                                    <Progress 
                                                        :value="item.amount" maxValue="100" 
                                                        ></Progress>
                                                </FlexboxLayout>
                                            </FlexboxLayout>
                                        </FlexboxLayout>
                                    </v-template>
                                    </ListView>
                            </GridLayout>
                        </TabContentItem>

                        <TabContentItem>
                            <GridLayout>
                                 <ListView 
                                    for="item in MeoPopular" 
                                    @itemTap="itemTapKimNgan" 
                                    height="600" margin="20 0 0 20">
                                    <v-template>
                                        <FlexboxLayout 
                                            flexDirection="column" 
                                            @tap="detailProduct(item)"
                                        >
                                            <FlexboxLayout 
                                                alignItems="center" 
                                                justifyContent="flex-start" 
                                                padding="20 0">
                                                <Image :src="item.image" 
                                                    width="70" height="70"
                                                    background="#CFF4D2"
                                                    borderRadius="10"
                                                    />
                                                <FlexboxLayout 
                                                    width="200" height="70" 
                                                    flexDirection="column"
                                                    paddingLeft="20"
                                                >
                                                    <Label :text="item.name" 
                                                    height="30"
                                                    fontSize="15" color="black"
                                                    />
                                                      <Label :text="item.price + 'VNĐ'" 
                                                        height="30"
                                                        fontSize="14" color="grey"
                                                    />
                                                    <Progress 
                                                        :value="item.amount" maxValue="100" 
                                                        ></Progress>
                                                </FlexboxLayout>
                                            </FlexboxLayout>
                                        </FlexboxLayout>
                                    </v-template>
                                    </ListView>
                            </GridLayout>
                        </TabContentItem>
                    </Tabs>
                </StackLayout>
            </TabContentItem>

            <TabContentItem>
                <GridLayout>
                                <Label 
                                    text="Chi Nhánh" 
                                    fontSize="22" 
                                    color="#000000" fontWeight="bold"
                                    padding="20"
                                    background="#ffffff"
                                    />
                                 <ListView 
                                    for="item in Locations" 
                                    @itemTap="itemTapTouch" 
                                    height="*" margin="20 0 0 20">
                                    <v-template>
                                        <FlexboxLayout 
                                            flexDirection="column" 
                                        >
                                            <FlexboxLayout 
                                                alignItems="left" 
                                                justifyContent="flex-start" 
                                                flexDirection="column"
                                                padding="20 0"
                                                margin="20 0"
                                                @tap="navigateLocation(item.link)"
                                                >
                                                    <Label :text="item.name" 
                                                    height="30"
                                                    fontSize="18" color="black"
                                                    />
                                                     <Label :text="item.address" 
                                                    height="30"
                                                    fontSize="16" color="grey"
                                                    />
                                            </FlexboxLayout>
                                        </FlexboxLayout>
                                    </v-template>
                                    </ListView>
                            </GridLayout>
            </TabContentItem>
            <TabContentItem>
                <ScrollView>
                  <StackLayout>
                    <Label text="Meo's Store" fontSize="16" bold />
                  
                    <GridLayout columns="*,*" rows="*" if="rowCount>0" v-for="i in rowCount" :key="i.id">
                        <card-view class="card" margin="10" col="0" elevation="20">
                            <GridLayout rows="120,auto,auto,auto" columns="*,*,*" class="card-layout" @tap="showDetail([i-1]*itemsPerRow)">
                            <Image :src="Items[(i-1)*itemsPerRow].image" row="0" colSpan="3" />
                            <Label :text="Items[(i-1)*itemsPerRow].name" row="1" colSpan="3"  />
                            <Label :text="Items[(i-1)*itemsPerRow].price|dollars" row="2" colSpan="3"  />
                            </GridLayout>
                        </card-view>
                        <card-view class="card" margin="10" col="1" elevation="20">
                            <GridLayout rows="120,auto,auto,auto" columns="*,*,*" class="card-layout" @tap="showDetail([i-1]*itemsPerRow+1)">
                            <Image :src="Items[(i-1)*itemsPerRow+1].image" row="0" colSpan="3" />
                            <Label :text="Items[(i-1)*itemsPerRow+1].name" row="1" colSpan="3"  />
                            <Label :text="Items[(i-1)*itemsPerRow+1].price|dollars" row="2" colSpan="3"  />
                            </GridLayout>
                        </card-view>
                    </GridLayout>
                  </StackLayout>
                </ScrollView>
            </TabContentItem>
            <TabContentItem>
                <GridLayout>
                    <FlexboxLayout 
                        marginTop="200"
                        flexDirection="column"
                        alignItems="center"
                        >
                            <Button 
                            text="Đăng kí" 
                            width="150" height="50"
                            color="#ffffff" fontSize="18"
                            background="#e250aa"
                            @tap="navigateSignIn()"
                            />
                            <Button 
                            text="Đăng nhập" 
                            width="150" height="50"
                            color="#ffffff" fontSize="18"
                            background="##e250a1"
                            @tap="navigateSignUp()"
                            />
                    </FlexboxLayout>
                </GridLayout>
            </TabContentItem>
            
        </BottomNavigation>
        
    </Page>
</template>

<script >
import Login from './Login.vue';
import Detail from './Detail.vue';
import Cart from './Cart.vue';
import Location from './Location.vue';
import Store from './StoreDetail.vue';
  export default {
      props:{
          cart:Object
      },
    data() {
      return {
        showSearch:true,
        search:null,
        checkLogin:false,
        fullProducts:[
            {
                header:'Mới',
                products:[
                    {
                        id:1,
                        name:'Mèo Ba Tư',
                        image:'~/assets/images/meobatu.jpg',
                        des:'Mèo Ba Tư là giống mèo của Ba tư và được đem về nuôi thử cũng như được giới thượng lưu trên toàn thế giới nuôi.',
                        price: 170000,
                        amount:10,
                        quantity: 1
                    },
                     {
                        id:2,
                        name:'Mèo Anh lông ngắn',
                        image:'~/assets/images/meoanh.jpg',
                        des:'Mèo Anh lông ngắn thân hình mũm mĩm, lông ngắn và dày cùng với khuôn mặt to.',
                        price: 300000,
                        amount:5
,
quantity: 1                    },
                      {
                        id:3,
                        name:'Mèo tai cụp',
                        image:'~/assets/images/meocup.jpg',
                        des:'Mèo Scottish Fold hay còn gọi là “Mèo tai cụp” có nguồn gốc từ đất nước Scotland.',
                        price: 340000,
                        amount:10,
                        quantity: 1
                    },
                      {
                        id:4,
                        name:'Mèo Sphinx ',
                        image:'~/assets/images/meocana.jpg',
                        des:'Mèo Sphinx gọi là mèo Ai Cập hay mèo Nhân sư.',
                        price: 120000,
                        amount:15,
                        quantity: 1
                    },
                      {
                        id:5,
                        name:'Mèo Munchkin',
                        image:'~/assets/images/meomun.jpg',
                        des:'Mèo Munchkin rất được yêu thích, ưa chuộng bởi 4 chân ngắn chũn chĩn với khuôn mặt tròn ngây thơ vô cùng.',
                        price: 100000,
                        amount:20,
                        quantity: 1
                    },
                ]
            },
            {
                header:'Mèo',
                products:[
                    {
                       id:1,
                        name:'Mèo Ba Tư',
                        image:'~/assets/images/meobatu.jpg',
                        des:'Mèo Ba Tư là giống mèo của Ba tư và được đem về nuôi thử cũng như được giới thượng lưu trên toàn thế giới nuôi.',
                        price: 170000,
                        amount:10,
                        quantity: 1
                    },
                     {
                        id:2,
                        name:'Mèo Anh lông ngắn',
                        image:'~/assets/images/meoanh.jpg',
                        des:'Mèo Anh lông ngắn thân hình mũm mĩm, lông ngắn và dày cùng với khuôn mặt to.',
                        price: 300000,
                        amount:5
,
quantity: 1                    },
                   {
                        id:3,
                        name:'Mèo tai cụp',
                        image:'~/assets/images/meocup.jpg',
                        des:'Mèo Scottish Fold hay còn gọi là “Mèo tai cụp” có nguồn gốc từ đất nước Scotland.',
                        price: 340000,
                        amount:10,
                        quantity: 1
                    },
                    {
                        id:4,
                        name:'Mèo Sphinx ',
                        image:'~/assets/images/meocana.jpg',
                        des:'Mèo Sphinx hay còn gọi là mèo Ai Cập hay mèo Nhân sư.',
                        price: 120000,
                        amount:5
,
quantity: 1                    },
                    {
                        id:5,
                        name:'Mèo Munchkin',
                        image:'~/assets/images/meomun.jpg',
                        des:'Mèo Munchkin là rất được yêu thích, ưa chuộng bởi 4 chân ngắn chũn chĩn với khuôn mặt tròn ngây thơ vô cùng.',
                        price: 100000,
                        amount:20,
                        quantity: 1
                    },
                    {
                        id:6,
                        name:'Mèo Xiêm',
                        image:'~/assets/images/meoxiem.jpg',
                        des:'Mèo xiêm có bộ lông khá ngắn và mượt, nổi bật nhất trên cơ thể là phần lông ở mặt, đuôi, tai, bàn chân có màu đậm hơn.',
                        price: 15000,
                        amount:25,
                        quantity: 1
                    },
                     {
                        id:7,
                        name:'Mèo rừng Nauy',
                        image:'~/assets/images/meonauy.jpg',
                        des:'Mèo rừng Na Uy là giống mèo lớn với bộ lông dài và dày, thích kết bạn với con người.',
                        price: 400000,
                        amount:5
,
quantity: 1                    },
                     {
                        id:8,
                        name:'Mèo Mỹ lông ngắn',
                        image:'~/assets/images/meomy.jpg',
                        des:'Mèo Mỹ ra đời có thể nói là sự lai tạo giữa giống mèo xiêm, mèo lông dài và mèo lông ngắn.',
                        price: 700000,
                        amount:20,
                        quantity: 1
                    },
                    {
                        id:9,
                        name:'Mèo Russian Blue',
                        image:'~/assets/images/meorussia.jpg',
                        des:'Mèo Nga xanh hai chân của chúng dài, đầu hình nêm và gò má cao, khuôn mặt nhìn như luôn tươi cười.',
                        price: 800000,
                        amount:5
,
quantity: 1                    },
                    {
                        id:10,
                        name:'Mèo Savannah',
                        image:'~/assets/images/meosavannah.jpg',
                        des:'Mèo Savannah là một giống mèo lai, nó là kết quả lai giống giữa một con Linh miêu đồng cỏ và một con mèo nhà',
                        price: 1000000,
                        amount:3
,
quantity: 1                    },
                    {
                        id:11,
                        name:'Mèo Siberian',
                        image:'~/assets/images/meoberian.jpg',
                        des:'Mèo rừng Siberian là loài mèo xuất hiện cách đây hơn 1000 năm, chú mèo quý hiếm nhất trên thế giới.',
                        price: 90000,
                        amount:8
,
quantity: 1                    },
                     {
                        id:12,
                        name:'Mèo Mướp',
                        image:'~/assets/images/meomuop.jpg',
                        des:'Mèo mướp là mèo vằn, là giống mèo rất quen thuộc và phổ biến tại nước ta..',
                        price: 40000,
                        amount:30,
                        quantity: 1
                    },
                      {
                        id:13,
                        name:'Mèo Bali',
                        image:'~/assets/images/meobali.jpg',
                        des:'mèo Bali có nhiều đặc điểm giống nhau. Bali là những chú mèo có tính cách hướng ngoại, tò mò với mọi thứ, thông minh và khả năng giao tiếp với chủ tốt. Là một giống mèo thông minh, chúng muốn trò chuyện với bạn.',
                        price: 250000,
                        amount:10,
                        quantity: 1
                    },
                      {
                        id:14,
                        name:'Mèo Vàng',
                        image:'~/assets/images/meovang.jpg',
                        des:'Mèo vàng thân thiện nhất, sự phá cách tinh nghịch và vẻ ngoài xinh đẹp của chúng .',
                        price: 20000,
                        amount:30,
                        quantity: 1
                    },
                       {
                        id:15,
                        name:'Mèo miến điện Birman',
                        image:'~/assets/images/meobirman.jpg',
                        des:'Mèo Birman hay còn gọi là Mèo thần miến điện có nguồn gốc từ Miến Điện là những truyền thuyết khá hoành tráng.',
                        price: 200000,
                        amount:12,
                        quantity: 1
                    },
                    {
                        id:16,
                        name:'Mèo mặp',
                        image:'~/assets/images/meo.jpg',
                        des:'Là giống mèo nha lúc hiền lành, lúc hung dữ, trắng trẻo, ít lông, chỉ thích ăn ngủ, coi phim, ưu điểm vẽ đẹp, thích chạy deadline, vui tính, thân thiện với mọi người.',
                        price: 10000000000,
                        amount: 1,
                        quantity: 1
                    },
                ]
            }
        ],
        Meoseldom:[
                    {
                        id:16,
                        name:'Mèo mặp',
                        image:'~/assets/images/meo.jpg',
                        des:'Là giống mèo nha lúc hiền lành, lúc hung dữ, trắng trẻo, ít lông, chỉ thích ăn ngủ, coi phim, ưu điểm vẽ đẹp, thích chạy deadline, vui tính, thân thiện với mọi người.',
                        price: 10000000000,
                        amount: 1,
                        quantity: 1
                    },
                   {
                        id:7,
                        name:'Mèo rừng Nauy',
                        image:'~/assets/images/meonauy.jpg',
                        des:'Mèo rừng Na Uy  là giống mèo lớn với bộ lông dài và dày, thích kết bạn với con người.',
                        price: 400000,
                        amount:5
,
quantity: 1                    },
                    {
                        id:10,
                        name:'Mèo Savannah',
                        image:'~/assets/images/meosavannah.jpg',
                        des:'Mèo Savannah là một giống mèo lai, nó là kết quả lai giống giữa một con Linh miêu đồng cỏ và một con mèo nhà',
                        price: 1000000,
                        amount:3
,
quantity: 1                    },
                    {
                       id:11,
                        name:'Mèo Siberian',
                        image:'~/assets/images/meoberian.jpg',
                        des:'Mèo rừng Siberian là loài mèo xuất hiện cách đây hơn 1000 năm, chú mèo quý hiếm nhất trên thế giới.',
                        price: 90000,
                        amount:8
,
quantity: 1                    },
                    {
                       id:4,
                        name:'Mèo Sphinx ',
                        image:'~/assets/images/meocana.jpg',
                        des:'Mèo Sphinx gọi là mèo Ai Cập hay mèo Nhân sư',
                        price: 120000,
                        amount:5
,
quantity: 1                    },
        ],
        Meomanual:[
                {
                         id:14,
                        name:'Mèo Vàng',
                        image:'~/assets/images/meovang.jpg',
                        des:'Mèo vàng thân thiện nhất, sự phá cách tinh nghịch và vẻ ngoài xinh đẹp của chúng .',
                        price: 20000,
                        amount:30,
                        quantity: 1
                    },
                    {
                        id:12,
                        name:'Mèo Mướp',
                        image:'~/assets/images/meomuop.jpg',
                        des:'Mèo mướp là mèo vằn, là giống mèo rất quen thuộc và phổ biến tại nước ta..',
                        price: 40000,
                        amount:30,
                        quantity: 1
                    },
                    {
                        id:6,
                        name:'Mèo Xiêm',
                        image:'~/assets/images/meoxiem.jpg',
                        des:'Mèo xiêm có bộ lông khá ngắn và mượt, nổi bật nhất trên cơ thể là phần lông ở mặt, đuôi, tai, bàn chân có màu đậm hơn.',
                        price: 15000,
                        amount:25,
                        quantity: 1
                    },
        ],
        MeoPopular:[
             {
                        id:2,
                        name:'Mèo Anh lông ngắn',
                        image:'~/assets/images/meoanh.jpg',
                        des:'Mèo Anh lông ngắn thân hình mũm mĩm, lông ngắn và dày cùng với khuôn mặt to.',
                        price: 300000,
                        amount:5
,
quantity: 1                    },
             {
                        id:14,
                        name:'Mèo Vàng',
                        image:'~/assets/images/meovang.jpg',
                        des:'Mèo vàng và đôi khi có chút màu trắng , sự phá cách tinh nghịch và vẻ ngoài xinh đẹp của chúng .',
                        price: 20000,
                        amount:30,
                        quantity: 1
                    },
                     {
                        id:3,
                        name:'Mèo tai cụp',
                        image:'~/assets/images/meocup.jpg',
                        des:'Mèo Scottish Fold hay còn gọi là “Mèo tai cụp” có nguồn gốc từ đất nước Scotland.',
                        price: 340000,
                        amount:10,
                        quantity: 1
                    },
            {
                        id:5,
                        name:'Mèo Munchkin',
                        image:'~/assets/images/meomun.jpg',
                        des:'Mèo Munchkin là một giống mèo rất được yêu thích, 4 chân ngắn chũn chĩn với khuôn mặt tròn ngây thơ vô cùng.',
                        price: 100000,
                        amount:20,
                        quantity: 1
                    },
                    {
                        name:'Mèo Ba Tư',
                        image:'~/assets/images/meobatu.jpg',
                        des:'Mèo Ba Tư là giống mèo của Ba tư và được đem về nuôi thử cũng như được giới thượng lưu trên toàn thế giới nuôi.',
                        price: 170000,
                        amount:10,
                        quantity: 1
                    },
                     {
                        id:4,
                        name:'Mèo Sphinx ',
                        image:'~/assets/images/meocana.jpg',
                        des:'Mèo Sphinx được gọi là mèo Ai Cập hay mèo Nhân sư)',
                        price: 120000,
                        amount:5
,
quantity: 1                    },
                      {
                        id:8,
                        name:'Mèo Mỹ lông ngắn',
                        image:'~/assets/images/meomy.jpg',
                        des:'Mèo Mỹ ra đời có thể nói là sự lai tạo giữa giống mèo xiêm, mèo lông dài và mèo lông ngắn.',
                        price: 700000,
                        amount:20,
                        quantity: 1
                    },
                      {
                        id:13,
                        name:'Mèo Bali',
                        image:'~/assets/images/meobali.jpg',
                        des:'mèo Bali có nhiều đặc điểm giống nhau. Bali là những chú mèo có tính cách hướng ngoại, tò mò với mọi thứ, thông minh và khả năng giao tiếp với chủ tốt. Là một giống mèo thông minh, chúng muốn trò chuyện với bạn.',
                        price: 250000,
                        amount:10,
                        quantity: 1
                    },
                 {
                        id:6,
                        name:'Mèo Xiêm',
                        image:'~/assets/images/meoxiem.jpg',
                        des:'Mèo xiêm có bộ lông khá ngắn và mượt, chúng cũng có nhiều màu đẹp. Đặc điểm nổi bật nhất trên cơ thể là phần lông ở mặt, đuôi, tai, bàn chân có màu đậm hơn những vị trí khác.',
                        price: 15000,
                        amount:25,
                        quantity: 1
                    },
        ],
        Locations:[
            {
                id:1,
                name:"Home's Meo Quận 8",
                address:'63 Dương Bá Trạc, Phường 1, Quận 8, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8104504373105!2d106.68632531483645!3d10.749087262636937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f088724ccf1%3A0x9b3b1a2e9c9b222e!2zNjMgRC4gQsOhIFRy4bqhYywgUGjGsOG7nW5nIDEsIFF14bqtbiA4LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1623557131924!5m2!1svi!2s" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
            {
                id:2,
                name:"Home's Meo Phạm Hùng",
                address:'73 Phạm Hùng, huyện Bình Chánh, xã Bình Hưng ,Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0355575671497!2d106.67275211411608!3d10.731740962953086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e4cbc25696d%3A0x7ad122b4242f5b30!2zNzMgUGjhuqFtIEjDuW5nLCBCw6xuaCBIxrBuZywgQsOsbmggQ2jDoW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1626402539035!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
             {
                id:3,
                name:"Home's Meo Tân Phú",
                address:'270 Lũy Bán Bích, Phường Hòa Thạnh, Quận Tân Phú, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5022309340975!2d106.63014131483654!3d10.772793262206452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea1b4767ecd%3A0x6cdede199be289c7!2zMjcwIEzFqXkgQsOhbiBCw61jaCwgSG_DoCBUaGFuaCwgVMOibiBQaMO6LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1623557704432!5m2!1svi!2s" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
             {
                id:4,
                name:"Home's Meo Quận 3",
                address:'20 Phạm Ngọc Thạch, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3509420196515!2d106.69240051483666!3d10.78441046199516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f340471ee89%3A0x3d3637b34f1f6f9b!2zMjAgUGjhuqFtIE5n4buNYyBUaOG6oWNoLCBQaMaw4budbmcgNiwgUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1623557735395!5m2!1svi!2s" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
             {
                id:5,
                name:"Home's Meo Quận 5",
                address:'255 Nguyễn Tri Phương, Phường 12, Quận 5, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7036156484755!2d106.6547178141163!3d10.757310062489397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef241060cc3%3A0x723431163778b83c!2zMjU1IE5ndXnhu4VuIENow60gVGhhbmgsIFBoxrDhu51uZyAxMiwgUXXhuq1uIDUsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1626402765076!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
              {
                id:6,
                name:"Home's Meo Gò Vấp",
                address:'12 Dương Quảng, Phường 10, Quận Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.489155857185!2d106.66433821483646!3d10.77379776218817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edc90728a3d%3A0xf45555f88c6e1129!2zMTIgRMawxqFuZyBRdWFuZyBUcnVuZywgUGjGsOG7nW5nIDEyLCBRdeG6rW4gMTAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1623557819890!5m2!1svi!2s" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
              {
                id:7,
                name:"Home's Meo quận 7",
                address:'Trần Xuân Soạn, Tân Kiểng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.774878123462!2d106.70642851483639!3d10.751825862587221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f706ac823e1%3A0x586a60ab71ebb338!2zVHLhuqduIFh1w6JuIFNv4bqhbiwgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1623557838637!5m2!1svi!2s" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
              {
                id:8,
                name:"Home's Meo Quận 1",
                address:'32 Nguyễn Cư Trinh , Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
                link:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6061378622753!2d106.68953731411638!3d10.764807262353255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f16f9fa87d5%3A0x37d06387ee111d3f!2zMzIgTmd1eeG7hW4gQ8awIFRyaW5oLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1626402871040!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
            },
            
        ],
        Items: [

              { id: 1, name: "Đồ ăn mèo whiskas", image: "~/assets/images/food.jpg", quantity:1,amount: 20,price: 999000, description: "This round bottle is made of opaque bright rose glass. " },

              { id: 2, name: "Đồ ăn mèo Me-o", image: "~/assets/images/food1.jpg", quantity:1,amount: 20,price: 1499000, description: "This round bottle is made of opaque chartreuse glass. " },

              { id: 3, name: "Đồ ăn mèo minino", image: "~/assets/images/food2.png", quantity:1,amount: 20,price: 499000, description: "This coffin-shaped bottle is made of opaque lilac glass.  " },

              { id: 4, name: "Đồ ăn mèo nutri", image: "~/assets/images/food3.jpg", quantity:1,amount: 20,price: 299000, description: "This cylindrical bottle is made of transparent bright turquoise glass." },

              { id: 5, name: "Pate mèo whiskas", image: "~/assets/images/pate.jpg", quantity:1,amount: 20,price: 899000, description: "This teardrop-shaped bottle is made of translucent bright purple glass.  " },

              { id: 6, name: "Pate mèo Royal", image: "~/assets/images/pate1.jpg", quantity:1,amount: 20,price: 899000, description: "This teardrop-shaped bottle is made of translucent bright purple glass." }

        ],
        itemsPerRow: 2,
      }
    },
    methods: {
        onTapSearch(){
            this.showSearch = !this.showSearch;
        },
        
        onTextChanged(data){
            console.log(data)
        },

        navigateCart(){
            this.$navigateTo(
                Cart,{
                      transition:{
                        name:"fade",
                        duration: 400,
                        curve:"easeIn"
                    },
                    props:{
                        cart: this.cart
                    }
            })
        },

        onScrollTabOne($event){},

        navigateSignUp:function(){
            this.$navigateTo(
                Login, {
                    transition:{
                        name:"slideLeft",
                        duration: 400,
                        curve:"easeIn"
                    },
                    props:{
                        checkLogin: !this.checkLogin
                    }
                }
                );
        },
        navigateSignIn:function(){
            this.$navigateTo(
                Login, {
                    transition:{
                        name:"slideLeft",
                        duration: 400,
                        curve:"easeIn"
                    },
                    props:{
                        checkLogin: this.checkLogin
                    }
                }
                );
        },
        detailProduct:function(data){
            this.$navigateTo(Detail, {
                transition:{
                        name:"slideRight",
                        duration: 400,
                        curve:"easeIn"
                },
                props:{
                    product: data
                }
            })
        },

        navigateLocation(link){
            this.$navigateTo(Location,{
                transition:{
                    name:"slideBottom",
                    duration:300,
                    curve: "easeIn"
                },
                props:{
                    location: link
                }
            })
        },

        showDetail(i){
            this.$navigateTo(Store,{
            transition:{
                name:'slideLeft',
                duration:300,
                curve: 'easeIn'
            },
            props:{
                store: this.Items[i],
            }
            });
        }
       
    },
    computed:{
        // itemTapTouch:function(){},
        // itemTapKimNgan:function(){},

        filterProduct(){
            let Products = [];
            if(!this.search || this.search == ""){
                return this.fullProducts[1].products;
            }

            let search = this.search.trim().toLowerCase();
            console.log(search)

           this.fullProducts[1].products.filter(item=>{
                if(item.name.toLowerCase().indexOf(search)!=-1){
                    Products.push(item)
                }
            })
            return Products;
        },
        rowCount(){
            return Math.ceil(this.Items.length/this.itemsPerRow);
        }
        
    },
    filters:{
       dollars:num=>`${num/1}VNĐ`
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #e250aa;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .bar-bottom, TabStrip{
        box-shadow: -1px -5px 9px -1px rgba(204,194,194,0.75);
    -webkit-box-shadow: -1px -5px 9px -1px rgba(204,194,194,0.75);
    -moz-box-shadow: -1px -5px 9px -1px rgba(204,194,194,0.75);
        border-top-left-radius: 30;
        border-top-right-radius: 30;
    }
</style>
