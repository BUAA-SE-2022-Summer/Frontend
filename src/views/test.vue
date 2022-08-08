<template>
  <div>
    <v-container style="width:1000px;float: left;">
      <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search"
        :sort-by="sortBy" :sort-desc="sortDesc" hide-default-footer>
        <template v-slot:header>
          <v-toolbar dark color="blue darken-4" class="mb-1">
            <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search"></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys" label="Sort by"></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue darken-1" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue darken-1" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
        <!-- 以下为card部分 -->
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.projectName" cols="12" sm="12" md="6" lg="4">
              <v-card style="">
                <v-card-title class="subheading font-weight-bold">

                  <span class="d-inline-block text-truncate" style="max-width: 150px;">
                    <v-icon style="color: #26A69A;">mdi-file-cog</v-icon>
                    {{ item.projectName }}
                  </span>
                  <v-divider></v-divider>
                  <v-btn @click="Star(item)" style="background-color: white;">
                    <v-icon style="color: #FBC02D;" v-show="item.is_star">mdi-star</v-icon>
                    <v-icon color="black" v-show="!item.is_star">mdi-star</v-icon>
                    收藏
                  </v-btn>
                </v-card-title>
                <!-- <div>
                    <span>{{item.projectDesc}}</span>
                  </div> -->
                <v-list dense>
                  <v-list-item>
                    <v-btn style="width:100%;background-color: white;">最近使用时间:{{ item.last_modify_time }}</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn style="width:100%;background-color: white;">创建时间:{{ item.projectTime }}</v-btn>
                  </v-list-item>
                </v-list>
                <v-bottom-navigation>
                  <!-- <v-btn @click="reaname=!rename"> -->
                  <v-btn @click="Rename(item.projectName)">
                    <span>重命名</span>
                    <v-icon style="color:#673AB7">mdi-history</v-icon>
                  </v-btn>
                  
                  <v-dialog v-model="rename" max-width="500px" persistent>
                    <v-card>
                      <v-card-title>
                        重命名
                      </v-card-title>
                      <v-text-field outlined v-model="newname" placeholder="新的名称"></v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="rename_project(item.projectID)">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-btn @click="delete_project(item.projectID)" style="">
                    <span>删除</span>
                    <v-icon style="color:#D50000">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn @click="Copy(item.projectName)">
                    <span>复制</span>
                    <v-icon style="color:#1B5E20">mdi-plus</v-icon>
                  </v-btn>

                  
                  <v-dialog v-model="copy" max-width="500px">
                    <v-card>
                      <v-card-title>
                        复制项目的新名称：
                      </v-card-title>
                      <v-text-field outlined v-model="copyName" placeholder="新的名称"></v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="copy_project(item.projectID)">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- <router-link :to="{ path: '/textbustest' }" style="text-decoration:none;"> -->

                    <v-btn @click="openProject(item)">
                      <span>详情</span>
                      <v-icon style="color:#E65100">mdi-link</v-icon>
                    </v-btn>
                  <!-- </router-link> -->
                </v-bottom-navigation>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <!-- 以下为控制翻页部分 -->
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page:6</span>
            <v-spacer></v-spacer>

            <span class="mr-4
              grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      projectLists: [],
      // itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 6,
      sortBy: 'projectName',
      keys: [
        'projectTime',
        'last_modify_time',
        'is_star',
      ],
      items: [
        {
          projectName: 'Frozen Yogurt',
          projectDesc: 159,
          projectTime: 6.0,
          last_modify_time: 24,
          is_star: 4.0,
        },

      ],
      rename:false,
      copy:false,
      newname:"新名称",
      copyName:"xin",
      showPage:0,
    }

  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `projectName`)
    },
  },
  created() {
    sessionStorage.setItem('TeamID', 6);
    this.projectLists = this.get_create_project_list()
    this.rename=false
    this.copy=false
    // this.copy_project(35)
  },
  methods: {
    Star(item){
      console.log("收藏，解除收藏")
      console.log(item)
      if(item.is_star){
        console.log("解除收藏")
        this.unstar_project(item.projectID)
      }else{
        console.log("收藏")
        this.star_project(item.projectID)
      }
    },
    Rename(name){
      this.newname=name
      this.rename=true
    },
    Copy(name){
      this.copyName=name
      this.copy=true
    },
    close(){
      this.rename=false
      this.copy=false
    },
    openProject(project) {
      sessionStorage.setItem('ProjectID', JSON.stringify(project.projectID));
      console.log("当前选中项目的id是: " + project.projectID);
      sessionStorage.setItem('project_root_fileID', JSON.stringify(project.project_root_fileID));
      sessionStorage.setItem('projectName',JSON.stringify(project.projectName));
      console.log('当前选中项目的项目名称是'+project.projectName);
      console.log("当前选中项目的root_fileID是: " + project.project_root_fileID);
      this.$router.push("/textbustest")
    },
    get_create_project_list(){
      var teamID=sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/get_create_project_list',
        data: qs.stringify({
          teamID: teamID
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            console.log(res.data)
          } 
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    get_all_project_list() {
      var teamID = JSON.parse(sessionStorage.getItem('TeamID'));
      this.$axios({
        method: 'post',
        url: '/api/project/get_project_list',
        data: qs.stringify({

          teamID: teamID
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("获取项目列表成功");
            // console.log(res.data)
            this.items = res.data.project_list
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //复制项目报错500
    copy_project(ID) {
      var teamID = sessionStorage.getItem('TeamID');
      console.log("复制项目", ID, this.copyName)
      this.$axios({
        method: 'post',
        url: '/api/project/copy_project',
        data: qs.stringify({
          projectID: ID,
          projectName:this.copyName,
          // teamID: teamID
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("复制项目成功");
            console.log(res.data)
            // this.$router.go(0)
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
            this.copy=false
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
        this.copy=false
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    //重命名项目,通过测试
    rename_project(ID) {
      console.log("修改项目名称", ID, this.newname)
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/rename_project',
        data: qs.stringify({
          projectID: ID,
          teamID: teamID,
          // teamID: 1,
          project_name: this.newname

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("重命名项目成功");
            this.$router.go(0)
          } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
            this.rename=false
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //取消收藏,通过测试
    unstar_project(ID) {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/unstar_project',
        data: qs.stringify({
          projectID: ID,
          teamID: teamID
          // teamID:1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("取消收藏项目成功");
            this.$router.go(0)
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //收藏功能,通过测试
    star_project(ID) {
      // alert("收藏")
      console.log(ID)
      var teamID = sessionStorage.getItem('TeamID');
      console.log(teamID)
      this.$axios({
        method: 'post',
        url: '/api/project/star_project',
        data: qs.stringify({
          projectID: ID,
          teamID: teamID
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("收藏项目成功,您可以在我的收藏中进行查看");
            this.$router.go(0)
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
      this.$router.go(0)
    },
    //删除项目,报错404
    delete_project(ID) {
      var teamID = sessionStorage.getItem('TeamID')
      this.$axios({
        method: 'post',
        url: '/api/project/delete_project',
        data: qs.stringify({

          projectID: ID,
          teamID: teamID,
          // teamID: 1

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("删除成功");
            // this.initialize()
          } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },

    getMore(ID) {
        
    },
  
  },

}
</script>
