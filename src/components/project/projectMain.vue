<template>
    <div>
        <projectlevelbanner />
        <div style="margin-left: 100px;width:1400px;margin-top: 50px;">
            <div style="float:left;margin-right: 50px;margin-top: 30px;">
                <v-card
      max-width="300"
      class="mx-auto"

    >


      <v-app-bar
        dark
        color=""
        style="background:#01579B;"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>菜单栏</v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-btn @click="deBug">debug</v-btn> -->
      </v-app-bar>

      <v-container>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #E0F2F1;"
         @click="create=!create"
         >
         <v-icon>mdi-newspaper-plus</v-icon>
          新建项目
         </v-btn >
         <v-overlay :value="create" :dark=isdark :opacity="0.3">
            <createProjectVue />
            <div @click="create=false" style="width: 400px;text-align: center;font-size: 20px;color: white;">返回</div>
         </v-overlay>

         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #E1F5FE;" @click="showPage=0">
         <v-icon>mdi-all-inclusive</v-icon>
          全部项目
         </v-btn>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #B3E5FC;" @click="showPage=1">
         <v-icon>mdi-account-details</v-icon>
          我的创建
         </v-btn>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #80CBC4;" @click="showPage=2">
         <v-icon>mdi-star-box</v-icon>
          我的收藏
         </v-btn>
         <v-btn style="width: 100%;font-size: 20px;height: 70px;background-color: #81D4FA;" @click="showPage=3">
         <v-icon>mdi-delete</v-icon>
          回收站
         </v-btn>
      </v-container>
    </v-card>
            </div>
            <div style="float: left" >
                    <!--<projectAll v-show="showPage===0"></projectAll>
                    <MyProject v-show="showPage===1"></MyProject>
                    <StarProject v-show="showPage===2" :tmp="tmp"></StarProject>
                    <RecycleProject v-show="showPage===3"></RecycleProject>-->
              <projectAll v-if="this.showPage===0"></projectAll>
              <MyProject v-if="this.showPage===1"></MyProject>
              <StarProject v-if="this.showPage===2"></StarProject>
              <RecycleProject v-if="this.showPage===3"></RecycleProject>
                <!-- <createProjectVue /> -->
            </div>
        </div>
    </div>
</template>>

<script>
import projectlevelbanner from "../../views/Projectlevelbanner";
import projectAll from "./projectAll";
import projectMenu from "./projectMenu";
import createProjectVue from "./createProject.vue";
import { create } from 'mathjs';
import CreateProject from "./createProject.vue";
import MyProject from "./myProject.vue";
import StarProject from "./starProject.vue";
import RecycleProject from "./recycleProject.vue";
export default {
    name: "projectMain",
    components: {
    projectlevelbanner,
    projectAll,
    projectMenu,
    createProjectVue,
    CreateProject,
    MyProject,
    StarProject,
    RecycleProject
},
    data() {
        return {
            create:false,
            isdark:false,
            showPage:0,
          tmp:[],
        }
    },
    create(){
        this.create=false
    },
    methods:{
        close_create(){
            this.create=false
            console.log(this.create)
        },
        deBug(){
            console.log(this.showPage)
        },
    }
}

</script>
