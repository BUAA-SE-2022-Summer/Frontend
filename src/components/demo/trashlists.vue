<template>
  <div class="home" style="border:1px;">
    <div style="margin-top:5.5vh;width:300px;margin-left: 0px;border-color:black;border-style:solid;">
      <v-data-table height="68vh" :headers="headers" :items="desserts" sort-by="projectUser" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>删除的文件</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">恢复文档</span>
                </v-card-title>
                <!--<v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.projectName" label="Dessert projectName"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>-->

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="review">恢复文档</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog2" max-width="500px">

              <v-card>
                <v-card-title>
                  <span class="headline">删除文档</span>
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
          <!--<v-btn @click="toItem(item)" small style="background-color: palevioletred;border: 0;">
            详情
          </v-btn>-->
          <v-icon small class="mr-2" @click="reviewItem(item)" color="purple">
            mdi-arrow-u-up-left-bold
          </v-icon>
          <v-icon small @click="deleteforever(item)" color="red">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <!--<v-btn color="primary" @click="initialize">打开回收站</v-btn>-->
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
      teamname: '',
      numproject: 0,
      projectlist: [],
      teamid: 0,
      projectID: 0,
      dialog: false,
      dialog2: false,
      headers: [
        {
          text: '文档名称',
          align: 'start',
          sortable: false,
          value: 'file_name',
        },
        //{ text: '文档编号', value: 'fileID' },
        //{ text: '删除时间 ', value: 'delete_time' },
        //{ text: '文档类型 ', value: 'file_type'},
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
      projectname: JSON.parse(sessionStorage.getItem('ProjectName'))
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
    this.projectID = JSON.parse(sessionStorage.getItem('ProjectID'));
    this.teamname = JSON.parse(sessionStorage.getItem('TeamName'));
    this.$axios({
      method: 'post',
      url: '/api/file/delete_filelist_in_project ',
      data: qs.stringify({
        projectID: this.projectID,
      })
    }).then(res => {
      console.log(res.data)
      if (res.data.errno === 0) {
        this.$message.success("获取回收站内容成功");
        this.desserts = res.data.delete_filelist
        console.log(this.desserts)
      } else {
        alert(res.data.msg);
        this.$message.error(res.data.msg);
      }
    })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
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
      this.$axios({
        method: 'post',
        url: '/api/file/delete_filelist_in_project',
        data: qs.stringify({
          projectID: this.projectID,
        })
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          this.$message.success("获取回收站内容成功");
          this.desserts = res.data.delete_filelist;
          console.log(this.desserts)
        } else {
          alert(res.data.msg);
          this.$message.error(res.data.msg);
        }
      })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    },

    editItem(item) {

      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteforever(item) {
       //item.fileID
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',           /* 指明请求方式，可以是 get 或 post */
          url: '/api/file/completely_delete_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
          data: qs.stringify({
            fileID: item.fileID,
          })
        })
            .then(res => {/* res 是 response 的缩写 */
              if (res.data.errno === 0) {
                this.$message.success("删除成功");
                this.initialize();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);         /* 若出现异常则在终端输出相关信息 */
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    deleteItem(item) {

      const index = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog2 = true
      // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },
    reviewItem(item) {
      const index = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    OK() {
      // this.desserts.splice(index, 1)
      console.log("删除", this.editedItem)
      this.delete_project(this.editedItem.projectID)
      this.close()
    },
    review() {
      console.log("恢复", this.editedItem)
      this.review_doc(this.editedItem.fileID)
      this.close()
    },
    review_doc(ID) {
      this.$axios({
        method: 'post',
        url: '/api/file/restore_file ',
        data: qs.stringify({
          fileID: ID,
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("恢复成功");
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
      console.log("跳转文档详情页")
      const index = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log('存储文档id:' + this.editedItem.fileID);
      //console.log(this.editedItem.project_root_fileID);
      //console.log("存储当前更改的projectID: " + this.editedItem.projectID)
      //sessionStorage.setItem('ProjectID', JSON.stringify(this.editedItem.projectID));
      //sessionStorage.setItem('project_root_fileID', JSON.stringify(this.editedItem.project_root_fileID));
      //alert(row.project_root_fileID);
      // this.$router.push('/dashboard/demo/console');
      sessionStorage.setItem('now_textid', JSON.stringify(this.editedItem.fileID));
      this.$router.push('/ed');
    },
  },

}
</script>

