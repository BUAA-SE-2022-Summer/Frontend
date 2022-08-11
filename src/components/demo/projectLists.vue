<template>
  <div class="home">
    <div>
      <el-col :span="8">
        <el-card shadow="hover">
          <div>
            当前团队:
            <b v-if="this.teamid !== 0">{{ this.teamname }}</b>
            <b v-else>当前还没选中团队哦</b>
            当前项目:
            <b v-if="this.projectID !== 0">{{ this.projectname }}</b>
            <b v-else>当前还没进入项目哦</b>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="margin-top:100px;width:800px;margin-left: 200px;">
      <v-data-table :headers="headers" :items="desserts" sort-by="projectUser" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>全部项目</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">修改项目名称</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.projectName" label="Dessert projectName"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog2" max-width="500px">

              <v-card>
                <v-card-title>
                  <span class="headline">删除项目</span>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="OK">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn @click="toItem(item)" small style="background-color: palevioletred;border: 0;">
            详情
          </v-btn>
          <v-icon small class="mr-2" @click="editItem(item)" color="purple">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">

            mdi-delete
          </v-icon>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">打开项目列表</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  projectName: 'Home',
  data() {
    return {
      admins: [
        ['成员管理', 'mdi-account-cog'],
        ['操作日志', 'mdi-book-open-outline'],
      ],

      numproject: 0,
      projectlist: [],
      teamid: 0,
      teamname: '',
      projectname: '',
      dialog: false,
      dialog2: false,
      headers: [
        {
          text: '项目名称',
          align: 'start',
          sortable: false,
          value: 'projectName',
        },

        { text: '项目创建者', value: 'projectUser' },
        { text: '项目ID', value: 'projectID' },
        { text: '创建时间', value: 'projectTime' },
        { text: '是否星标', value: 'is_star', sortable: false, },
        { text: '操作', value: 'actions', sortable: false },

      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        projectName: '',
        projectUser: 0,
        projectID: 0,
        projectTime: 0,
        is_star: 0,
      },
      defaultItem: {
        projectName: '',
        projectUser: 0,
        projectID: 0,
        projectTime: 0,
        is_star: 0,
      },
    }
  },
  computed: {

    formTitle() {

      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  created() {
    this.teamid = JSON.parse(sessionStorage.getItem('TeamID'));
    this.teamname = JSON.parse(sessionStorage.getItem('TeamName'));
    this.projectname = JSON.parse(sessionStorage.getItem('ProjectName'));
  },
  methods: {
    findproject(row, column, cell, event) {
      console.log(row.projectID);
      console.log(row.project_root_fileID);
      sessionStorage.setItem('ProjectID', JSON.stringify(row.projectID));
      sessionStorage.setItem('project_root_fileID', JSON.stringify(row.project_root_fileID));
      this.$router.push('/dashboard/demo/console');
    },
    initialize() {
      // this.desserts = [
      //   {
      //     projectName: 'Frozen Yogurt',
      //     projectUser: 159,
      //     projectID: 6.0,
      //     projectTime: 24,
      //     is_star: 4.0,
      //   },

      // ]
      this.$axios({
        method: 'post',
        url: '/api/project/get_project_list',
        data: qs.stringify({
          teamID: this.teamid
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("获取项目列表成功");
            this.desserts = res.data.project_list
            console.log(this.desserts)
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },

    editItem(item) {

      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },


    deleteItem(item) {

      const index = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog2 = true
      // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },
    OK() {
      // this.desserts.splice(index, 1)
      console.log("删除", this.editedItem)
      this.delete_project(this.editedItem.projectID)
      this.close()
    },
    delete_project(ID) {
      this.$axios({
        method: 'post',
        url: '/api/project/delete_project',
        data: qs.stringify({

          projectID: ID,
          teamID: this.teamid,

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("成功");
            this.initialize()
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })

    },
    close() {
      this.dialog = false
      this.dialog2 = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    rename_project(ID, Name) {
      console.log("修改项目名称", ID, Name)
      this.$axios({
        method: 'post',
        url: '/api/project/rename_project',
        data: qs.stringify({
          projectID: ID,
          teamID: this.teamid,
          project_name: Name

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("成功");
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },

    save() {

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.rename_project(this.editedItem.projectID, this.editedItem.projectName)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    toItem(item) {
      console.log("跳转详情页")
      const index = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem.projectID);
      console.log(this.editedItem.project_root_fileID);
      console.log(this.editedItem);
      console.log("存储当前更改的projectID: " + this.editedItem.projectID);//这里是打印更改后的projectID的代码
      console.log("存储当前项目名称: " + this.editedItem.projectName);
      sessionStorage.setItem('ProjectID', JSON.stringify(this.editedItem.projectID));// 这里是存储projectID的代码
      sessionStorage.setItem('project_root_fileID', JSON.stringify(this.editedItem.project_root_fileID));
      sessionStorage.setItem('ProjectName', JSON.stringify(this.editedItem.projectName));
      sessionStorage.setItem('is_sharing', JSON.stringify(this.editedItem.is_sharing))
      //alert(row.project_root_fileID);
      this.$router.push('/dashboard/demo/console');
    },
  },

}
</script>
