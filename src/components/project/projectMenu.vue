<template>
  <div>
  <div>
    <v-card
      max-width="300"
      class="mx-auto"
      
    >
  

      <v-app-bar
        dark
        color=""
        style="background:#508090;"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>菜单栏</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn style="background-color: transparent;">
          搜索项目
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-container>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #ccbfd2;">
         <v-icon>mdi-newspaper-plus</v-icon>
          新建项目
         </v-btn >
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #8da8c4;">
         <v-icon>mdi-all-inclusive</v-icon>
          全部项目
         </v-btn>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #ffe8f8;">
         <v-icon>mdi-account-details</v-icon>
          我的创建
         </v-btn>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #c0dbf8;">
         <v-icon>mdi-star-box</v-icon>
          我的收藏
         </v-btn>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #dfe0ff;">
         <v-icon>mdi-delete</v-icon>
          回收站
         </v-btn>
      </v-container>
    </v-card>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>