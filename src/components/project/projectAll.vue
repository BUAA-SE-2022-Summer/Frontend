<template>
  <div>
    <v-container style="width:1000px;float: left;">
      <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search"
        :sort-by="sortBy" :sort-desc="sortDesc" hide-default-footer>
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search"></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys" label="Sort by"></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
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
                    <v-icon>mdi-file-cog</v-icon>
                    {{ item.projectName }}
                  </span>
                  <v-divider></v-divider>
                  <v-btn @click="star_project(item.projectID)">
                    <v-icon style="color: pink;" v-show="item.is_star">mdi-star</v-icon>
                    <v-icon color="grey" v-show="!item.is_star">mdi-star</v-icon>
                    收藏
                  </v-btn>
                </v-card-title>
                <!-- <div>
                    <span>{{item.projectDesc}}</span>
                  </div> -->
                <v-list dense>
                  <v-list-item>
                    <v-btn style="width:100%">最近使用时间:{{ item.last_modify_time }}</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn style="width:100%">创建时间:{{ item.projectTime }}</v-btn>
                  </v-list-item>
                </v-list>
                <v-bottom-navigation>
                  <v-btn>
                    <span>重命名</span>
                    <v-icon>mdi-history</v-icon>
                  </v-btn>

                  <v-btn @click="delete_project(item.projectID)">
                    <span>删除</span>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn>
                    <span>复制</span>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <router-link :to="{ path: '/textbustest' }" target="_blank" rel="opener"
                    style="text-decoration:none;">
                    <v-btn @click="openProject(item)">
                      <span>详情</span>
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </router-link>
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
    // sessionStorage.setItem('TeamID', 6);
    this.projectLists = this.get_all_project_list()
    // this.copy_project(35)
  },
  methods: {
    openProject(project) {
      sessionStorage.setItem('ProjectID', JSON.stringify(project.projectID));
      console.log("当前选中项目的id是: " + project.projectID);
      sessionStorage.setItem('project_root_fileID', JSON.stringify(project.project_root_fileID));
      sessionStorage.setItem('projectName',JSON.stringify(project.projectName));
      console.log('当前选中项目的项目名称是'+project.projectName);
      console.log("当前选中项目的root_fileID是: " + project.project_root_fileID);
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
    copy_project(ID) {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/copy_project',
        data: qs.stringify({
          projectID: ID,
          teamID: teamID
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("复制项目成功");
            console.log(res.data)
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
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
    rename_project(ID, Name) {
      console.log("修改项目名称", ID, Name)
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/rename_project',
        data: qs.stringify({
          projectID: ID,
          // teamID: teamID,
          teamID: 1,
          project_name: Name

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("重命名项目成功");
          } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
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
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
      this.$router.go(0)
    },
    //删除项目,通过测试
    delete_project(ID) {
      var teamID = sessionStorage.getItem('TeamID')
      this.$axios({
        method: 'post',
        url: '/project/delete_project',
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
    //重命名项目,通过测试
    getMore(ID) {

    }
  },

}
</script>
