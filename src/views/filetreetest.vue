<template>
  <div style="height:500px;width:300px;display: block;overflow-y: scroll;position: absolute;">
  <v-treeview
      v-model="tree"
      :open="open"
      :items="items"
      color="blue"
      activatable
      item-key="name"
      open-on-click
      :active.sync="active"
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.is_dir===true">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else >
        mdi-file-document-outline
      </v-icon>
      <v-icon v-if="item.is_dir===false" @click="edit(item)">
        mdi-pencil
      </v-icon>
      <v-icon v-if="item.is_dir===false" @click="delete1(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-treeview>
    </div>
</template>
<script>
import qs from "qs";

export default {
  data: () => ({
    open: ['public'],
    active:[],
    selection:[],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-json',
      md: 'mdi-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    tree: [],
    items: [

    ],
    teamid:0,
  }),
  methods:{
    edit(item){

    },
    delete1(item){

    },
  },
  created(){
    this.teamid=JSON.parse(sessionStorage.getItem('TeamID'));
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/file/get_file_centre_list',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        teamID: this.teamid,
      })
    })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.$message.success("获取团队文档列表成功");
            this.items=res.data.items;
            //this.$router.go(0);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
  },
}
</script>

<style scoped>

</style>
