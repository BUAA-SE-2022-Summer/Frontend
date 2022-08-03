<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>全部成员</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="addMember"
          >
            添加新成员
            <v-icon
            right
            dark
            >
            mdi-plus
            </v-icon>
          </v-btn>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
               
              </v-card-title>
              <v-select
                v-model="editedItem.identity"
                :items="states"
                label="成员身份设置"
            ></v-select>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
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
                 <v-text-field label="邮箱号"  v-model="addEmail"></v-text-field>
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
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
</template>
<script>
    export default{
        data: () => ({
    dialog: false,
    dialogDelete: false,
    DeleteFail: false,
    dialogAdd:false,
    addEmail:'',
    states:['管理员','普通成员'],
    headers: [
      {text: '昵称',align: 'start',sortable: false, value: 'nickname',},
      { text: '姓名', value: 'name',sortable: false, },
      { text: '邮箱', value: 'email',sortable: false, },
      { text: '身份', value: 'identity',sortable: false, },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
    },
  }),
// 计算属性
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    IdentityLevel(){
        return this.$store.state.identity
    }
  },
// 监听
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.close()
    },
    dialogAdd (val) {
      val || this.close()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
        // 初始化成员列表
      this.desserts = [
        {
          nickname: 'Frozen Yogurt',
          name: 159,
          email: 6.0,
          identity: '管理员',
          level:1,
        },
        
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if(this.IdentityLevel<this.editedItem.level){
         this.dialog = true
      }else{
         this.DeleteFail = true
      }
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
    //   判定是否有权限删除
      if(this.IdentityLevel<this.editedItem.level){
        this.dialogDelete = true
      }else{
        this.DeleteFail = true
      }
      
    },
    // 添加新成员
    addMember(){
        console.log("添加新成员")
        this.dialogAdd=true
    },
    addConfirm(){
        console.log("添加",this.addEmail)
        this.close()
    },
    deleteItemConfirm () {
    // 确认删除该成员
      console.log("delete",this.editedItem)
    //未向后端发送信息
      this.desserts.splice(this.editedIndex, 1)
      this.close()
    },

    close () {
      this.dialog = false
      this.dialogDelete = false
      this.DeleteFail = false
      this.dialogAdd=false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        // 修改身份
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        console.log("修改：",this.editedItem)
        if(this.editedItem.identity=='管理员'){
            this.editedItem.level=1
        }else if(this.editedItem.identity=='普通成员'){
            this.editedItem.level=2
        }
        // 未完成对后端发送修改信息
        this.close()
      } else {
        // 添加新成员
        this.desserts.push(this.editedItem)
      }
    },
  },
    }
</script>