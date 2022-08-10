<template>
    <div>
        <projectlevelbanner />
        <div style="margin-left: 100px;width:1400px;margin-top: 50px;">
            <div style="float:left;margin-right: 50px;margin-top: 30px;width:200px">
                <v-card
      max-width="300"
     

    >


      <v-app-bar
        dark
        color=""
        style="background:#8da8c4;"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>菜单栏</v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-btn @click="deBug">debug</v-btn> -->
      </v-app-bar>

      <v-container>
         <v-btn style="width: 100%;font-size: 15px;height: 70px;background-color: white;"
         @click="create=!create"
         >
         <v-icon style="color:#8da8c4">mdi-newspaper-plus</v-icon>
          新建项目
         </v-btn >
         <v-dialog v-model="create" max-width="500px">
            <v-card>
            <v-card-title class="text-h5">创建项目</v-card-title>
            <v-text-field  label="名称" filled v-model="name" style="height:40px;" placeholder="项目名称"></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="create=false">返回</v-btn>
              <v-btn color="blue darken-1" text @click="create_project()">确认</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
            <!-- <div @click="create=false" style="width: 400px;text-align: center;font-size: 15px;color: white;">返回</div> -->
         </v-dialog>
         <!-- <v-overlay :value="create" :dark=isdark :opacity="0.3">
            <createProjectVue />
            <div @click="create=false" style="width: 400px;text-align: center;font-size: 15px;color: white;">返回</div>
         </v-overlay> -->

         <v-btn style="width: 100%;font-size: 15px;height: 70px;background-color: white;" @click="showPage=0">
         <v-icon style="color:#8da8c4">mdi-all-inclusive</v-icon>
          全部项目
         </v-btn>
         <v-btn style="width: 100%;font-size: 15px;height: 70px;background-color: white;" @click="showPage=1">
         <v-icon style="color:#8da8c4">mdi-account-details</v-icon>
          我的创建
         </v-btn>
         <v-btn style="width: 100%;font-size: 15px;height: 70px;background-color: white;" @click="showPage=2">
         <v-icon style="color:#8da8c4">mdi-star-box</v-icon>
          我的收藏
         </v-btn>
         <v-btn style="width: 100%;font-size: 15px;height: 70px;background-color: white;" @click="showPage=3">
         <v-icon style="color:#8da8c4">mdi-delete</v-icon>
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
import qs from 'qs'
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
          name:"",
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
        create_project(){
            this.create=false
      var teamID=sessionStorage.getItem('TeamID');
      var desc="空";
      console.log("项目名称：",this.name)
      this.$axios({
        method: 'post',
        url: '/api/project/create_project',
        data: qs.stringify({
          project_name:this.name,
          project_desc:desc,
          teamID: teamID,
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("创建项目成功");
          } else {
            this.$message.error(res.data.msg);
          }
          this.$router.go(0)
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    }
}

</script>
