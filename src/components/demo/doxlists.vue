<template>
  <div class="home">
    <div style="position: absolute;top:200px;left:30px;font-size: 30px"><b>{{this.projectname}}</b></div>
    <div style="margin-top:100px;width:800px;margin-left: 200px;">
      <v-data-table :headers="headers" :items="desserts" sort-by="projectUser" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>全部文件</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">修改文档名称</span>
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
                  <v-btn color="blue darken-1" text @click="close">Cancle</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="OK">删除文档</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <!--<v-btn @click="toItem(item)" small style="background-color: palevioletred;border: 0;">
            详情
          </v-btn>-->
          <v-icon small class="mr-2" @click="toItem(item)" color="purple">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">打开文件列表</v-btn>
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
      projectID:0,
      dialog: false,
      dialog2: false,
      headers: [
        {
          text: '文档名称',
          align: 'start',
          sortable: false,
          value: 'file_name',
        },
        { text: '文档编号', value: 'fileID' },
        { text: '最后修改时间 ', value: 'last_modify_time' },
        { text: '文档类型 ', value: 'file_type'},
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
      projectname:sessionStorage.getItem('ProjectName')
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
    this.teamid = sessionStorage.getItem('TeamID');
    this.projectID = sessionStorage.getItem('ProjectID');
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
       url: '/file/project_root_filelist',
       data: qs.stringify({
         projectID: this.projectID,
       })
     }).then(res => {
           console.log(res.data)
            if (res.data.errno === 0) {
             this.$message.success("获取文件列表成功");
             this.desserts = res.data.filelist
              console.log(this.desserts)
            } else {
             alert(res.data.msg);
             this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
           console.log(err);         /* 若出现异常则在终端输出相关信息 */
         });
      //this.desserts = [{
       // fileID: 1,
        //file_name:'黄瑞yyds',
        //create_time: '8/5',
       // last_modify_time :'8/6',
       // file_type: 'dox',
     // }
     // ]
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
      this.delete_doc(this.editedItem.fileID)
      this.close()
    },
    delete_doc(ID) {
      this.$axios({
        method: 'post',
        url: '/file/delete_file',
        data: qs.stringify({
          fileID: ID,
        })
      })
          .then(res => {
            console.log(res.data)
            if (res.data.errno === 0) {
              this.$message.success("删除成功");
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
        url: '/project/rename_project',
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
      console.log('存储文档id:'+this.editedItem.fileID);
      //console.log(this.editedItem.project_root_fileID);
      //console.log("存储当前更改的projectID: " + this.editedItem.projectID)
     //sessionStorage.setItem('ProjectID', JSON.stringify(this.editedItem.projectID));
      //sessionStorage.setItem('project_root_fileID', JSON.stringify(this.editedItem.project_root_fileID));
      //alert(row.project_root_fileID);
     // this.$router.push('/dashboard/demo/console');
      sessionStorage.setItem('now_textid',JSON.stringify(this.editedItem.fileID));
      this.$router.push('/ed');
    },
  },

}
</script>

