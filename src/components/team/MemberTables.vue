<template>
  <v-data-table :headers="headers" :items="desserts" :items-per-page="5" sort-by="name" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>全部成员</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="black" class="ma-2 white--text" @click="addMember">
          添加新成员
          <v-icon color="pink">
            mdi-plus
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>

            </v-card-title>
            <v-select v-model="editedItem.identity" :items="states" label="成员身份设置"></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">您确定要踢出该成员吗</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogAdd" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">添加新成员</v-card-title>
            <v-text-field label="昵称" v-model="addName"></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="DeleteFail" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">您没有权限进行该操作</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">确认</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <span>修改权限</span>
      <v-icon mid class="mr-2" @click="editItem(item)" color="purple">
        mdi-pencil
      </v-icon>
      <span>删除成员</span>
      <v-icon mid @click="deleteItem(item)" color="red">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import qs from 'qs'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    DeleteFail: false,
    dialogAdd: false,
    addName: '',
    states: ['管理员', '普通成员'],
    user_list: [],
    headers: [
      { text: '昵称', align: 'start', sortable: false, value: 'username', },
      { text: '姓名', value: 'real_name', sortable: false, },
      { text: '邮箱', value: 'email', sortable: false, },
      { text: '身份', value: 'identity', sortable: false, },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    teamid: '',
    desserts: [],
    editedIndex: -1,
    editedItem: {
    },
  }),
  // 计算属性
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    IdentityLevel() {
      return 0
      // return this.$store.state.identity
    }
  },
  // 监听
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.close()
    },
    dialogAdd(val) {
      val || this.close()
    },
  },

  created() {
    // this.initialize()
    this.teamid = JSON.parse(sessionStorage.getItem('TeamID'))
    this.get_team_info(this.teamid)
    console.log("当前团队", this.teamid)

  },

  methods: {
    initialize() {
      // 初始化成员列表
      this.desserts = [
        {
          nickname: 'Frozen Yogurt',
          name: 159,
          email: 6.0,
          identity: '管理员',
          level: 1,
        },

      ]
    },
    // 获取团队信息
    get_team_info(teamid) {
      console.log("获取团队信息", teamid)
      this.$axios({
        method: 'post',
        url: '/api/team/get_team_info ',
        data: qs.stringify({
          "teamID": teamid
        })
      }).then(res => {
        this.user_list = res.data.user_list
        console.log("获取团队信息", this.user_list)
        for (var i = 0; i < this.user_list.length; i++) {
          if (this.user_list[i].is_creator == true) {
            this.user_list[i].identity = "超管"
          } else if (this.user_list[i].is_supervisor == true) {
            this.user_list[i].identity = "管理员"
            // this.user_list[i].level = 1
          } else {
            // this.user_list[i].level=2
            this.user_list[i].identity = "普通成员"
          }
        }
        this.desserts = this.user_list
        console.log(this.desserts)
        // console.log(this.user_list)
      })
    },
    //邀请成员请求
    invite_people(teamid) {
      teamid = JSON.parse(sessionStorage.getItem('TeamID'))
      this.$axios({
        method: 'post',
        url: '/api/team/invite_member',
        data: qs.stringify({
          "username": this.addName,
          "teamID": teamid
        })
      }).then(res => {
        var result = res.data
        console.log("邀请成员结果", result)
        alert(result.msg)
        // if (result.errno == 0) {
        //   this.$router.go(0)
        // }
      })
    },
    //踢成员请求
    kick_member(teamid, user_name) {
      var e = 0
      teamid = JSON.parse(sessionStorage.getItem('TeamID'))
      this.$axios({
        method: 'post',
        url: '/api/team/kick_member',
        data: qs.stringify({
          "teamID": teamid,
          "username": user_name,
        })
      }).then(res => {
        var result = res.data
        console.log(result)
        alert(result.msg)
        // e=result.errno
        if (result.errno == 0) {
          this.$router.go(0)
        }
      })
      return e
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true

    },
    addMember() {
      console.log("添加新成员")
      this.dialogAdd = true
    },
    addConfirm() {
      console.log("添加", this.addName)
      this.invite_people(11, this.addName)
      this.close()
    },
    deleteItemConfirm() {
      // 确认删除该成员
      console.log("delete", this.editedItem)
      // this.desserts.splice(this.editedIndex, 1)
      //未向后端发送信息
      this.kick_member(11, this.editedItem.username)
      this.close()
    },

    close() {
      this.dialog = false
      this.dialogDelete = false
      this.DeleteFail = false
      this.dialogAdd = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    set_manager(teamid, user_name) {
      teamid = JSON.parse(sessionStorage.getItem('TeamID'))
      this.$axios({
        method: 'post',
        url: '/api/team/set_manager',
        data: qs.stringify({
          "teamID": teamid,
          "username": user_name,
        })
      }).then(res => {
        var result = res.data
        alert(result.msg)
        if (result.errno == 0) {
          this.$router.go(0)
        }
      })
    },
    delete_manager(teamid, user_name) {
      teamid = JSON.parse(sessionStorage.getItem('TeamID'));
      console.log(teamid, user_name)
      this.$axios({
        method: 'post',
        url: '/api/team/delete_manager',
        data: qs.stringify({
          "teamID": teamid,
          "username": user_name,
        })
      }).then(res => {
        var result = res.data
        alert(result.msg)
        if (result.errno == 0) {
          this.$router.go(0)
        }
      })
    },
    save() {
      if (this.editedIndex > -1) {
        // 修改身份
        var old_identity = this.desserts[this.editedIndex].identity
        var new_identity = this.editedItem.identity
        var username = this.editedItem.username
        if (old_identity == new_identity) {
          console.log("相等不做修改")
        } else {
          var errno
          if (new_identity == '管理员') {
            console.log("设置为管理员")
            errno = this.set_manager(11, username)
          } else if (new_identity == '普通成员') {
            errno = console.log("设置为普通成员")
            this.delete_manager(11, username)
          }
        }
        this.close()
      }
    },
  },
}
</script>