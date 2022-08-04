<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-left">
        <div class="home-header-left-title">
          <span>项目列表</span>
        </div>
      </div>
      <div class="home-header-right">
        <div class="home-header-right-img">
          <v-btn style="border-radius: 50%">
            <v-avatar size="40px" style="border-radius: 50%">
              <img src="../../assets/logo.svg" alt="">
            </v-avatar>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="home-middle">
      <button class="but_1">
        <v-list width="100%" class="li_1">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>更新时间</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">更新时间</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">创建时间</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="">
              <v-list-item-title class="tit_1">名称</v-list-item-title>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">创建者</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="">
              <v-list-item-title class="tit_1">升序</v-list-item-title>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">降序</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </button>
      <button class="but_2">
        <v-list width="100%" class="li_1">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>全部类型</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">全部类型</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">原型图</v-list-item-title>
            </v-list-item>


            <v-list-item @click="">
              <v-list-item-title class="tit_1">UML图</v-list-item-title>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">文档</v-list-item-title>
            </v-list-item>


          </v-list-group>
        </v-list>
      </button>
      <button class="but_3">
        <v-list width="100%">
          <v-list-group class="li_2">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
            </template>

            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="tit_1_1">图标</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-icon class="tit_1"><v-icon>mdi-format-list-bulleted</v-icon></v-list-item-icon>
              <v-list-item-title class="tit_1_1">列表</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
      </button>
    </div>
    <div class="home-content">
      <!--<img src="../../assets/empty-star.svg" class="empty-img empty-join-img" alt="">
      <div class="empty-header">无项目</div>
      <span class="empty-desc is-show">点击新建新建项目</span>-->
      <el-table
          :data="projectlist"
          height="400"
          border
          style="width: 500px;left:-150px" @cell-click="findproject">
        <el-table-column
            prop="projectID"
            label="项目编号"
            width="250">
        </el-table-column>
        <el-table-column
            prop="projectName"
            label="项目名称"
            width="250">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: 'Home',
  data() {
    return {
      admins: [
        ['成员管理', 'mdi-account-cog'],
        ['操作日志', 'mdi-book-open-outline'],
      ],
      numproject:0,
      projectlist:[],
      teamid:11,
    }
  },
  created() {
    //this.teamid=sessionStorage.getItem('TeamID');
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/project/get_project_list',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
          teamID:this.teamid
      })
    })
        .then(res => {/* res 是 response 的缩写 */
          //获取用户登录的三个基本信息并存放于sessionStorage
          if (res.data.errno === 0) {
            this.$message.success("获取项目列表成功");
            this.projectlist=res.data.project_list;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
  },
  methods:{
    findproject(row,column,cell,event){
       console.log(row.projectID);
       sessionStorage.setItem('ProjectID',JSON.stringify(row.projectID));
       this.$router.push('/dashboard/demo/console');
    }
  }
}
</script>
<style scoped>
.home {
  width: 1060px;
  height: 167px;
  position: fixed;
  top: 20px;
  right: 0;
  border: 1px solid #ccc;
}
.home-header {
  width: 70%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 0 0 #e0e0e0;
  position: fixed;
  top: 20px;
  right: 0;
}
.home-header-left {
  display: flex;
  align-items: center;
}
.home-header-left-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.home-header-right {
  display: flex;
  align-items: center;
}
.home-header-right-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 20px;
}
.but_1 {
  position: fixed;
  top: 100px;
  right: 320px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}
.but_2 {
  position: fixed;
  top: 100px;
  right: 160px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}
.but_3 {
  position: fixed;
  top: 92px;
  right: 2px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 10px;
}
.li_1 {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.li_2 {
  height: 66px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.tit_1 {
  text-align: left;
}
.tit_1_1 {
  text-align: left;
  margin-left: 20px;
}
.home-content {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: column wrap;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  left: 60%;
  top: 50%;
  transform: translateY(-80px);
}
.home-content .empty-header {
  font-size: 18px;
  line-height: 16px;
  color: rgb(31, 41, 46);
  margin-top: 8px;
  font-weight: 500;
}
.home-content .empty-desc.is-show {
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
  color: rgb(79, 79, 79);
  font-weight: 400;
}
</style>
