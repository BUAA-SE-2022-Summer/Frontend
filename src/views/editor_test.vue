<template>
  <div>
    <img class="bgbox" id="bgbox" alt="" src="../img/背景.jpg">
    <div style="position: absolute;width: 400px;top:35px">
      <el-card class="box-card" style="position: absolute;height:600px;width: 400px;background-color: rgba(255, 255, 255, 0.85);">
        <div slot="header" class="clearfix">
          <span>文件操作区</span>
        </div>
        <div>
          <el-input v-model="input1" placeholder="请输入文档名称"></el-input>
          <v-btn style="position: absolute;left: 20px;top:140px;background-color: rgba(255, 255, 255, 0.85)"@click="createtext">创建新文档</v-btn>
          <el-input v-model="input2" placeholder="请输入文档名称" style="position: absolute;left: 20px;top:200px;width:360px"></el-input>
          <v-btn style="position: absolute;left: 20px;top:260px;background-color: rgba(255, 255, 255, 0.85)">查找文档</v-btn>
          <el-input v-model="input3" placeholder="请输入文档名称" style="position: absolute;left: 20px;top:320px;width:360px"></el-input>
          <v-btn style="position: absolute;left: 20px;top:380px;background-color: rgba(255, 255, 255, 0.85)">删除文档</v-btn>
        </div>
      </el-card>
    </div>
  <div class="edit_container" style="position: absolute;width: 800px;left:400px;">
    <!--  新增时输入 -->
    <quill-editor
        class="ql-editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)" >
    </quill-editor>
    <!-- 从数据库读取展示 -->
    <!--<div v-html="str" class="ql-editor">
      {{str}}
    </div>-->
    <div><v-btn style="background-color: rgba(255, 255, 255, 0.85)" @click="savetext">保存文档</v-btn></div>
  </div>
    <div>
      <el-table
          :data="this.textdata"
          height="450"
          border
          stripe
          style="width: 320px;position: absolute;left:1200px;top:30px" @cell-click="find">
        <el-table-column
            prop="file_name"
            label="文档名"
            width="140">
        </el-table-column>
        <el-table-column
            prop="last_modify_time"
            label="最后编辑时间"
            width="140">
        </el-table-column>
        <el-table-column
            prop="fileID"
            label="文档id"
            width="140">
        </el-table-column>
      </el-table>
    </div>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import qs from "qs";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      imageUrl: '',
      uploadimgurl:'/user/update_user_img ',
      username:'',
      userhead:'',
      real_name:'',
      email:'',
      phone:'',
      profile:'',
      username1:'',
      imageUrl1:'',
      password:'',
      content: '1234',
      str: '',
      editorOption: {},
      inside: '<h2> \t<strong><em>请于此开始编辑文档</em></strong></h2>',
      textname:'',
      input:'',
      textdata:[
      ],
      input1:'',
      input2:'',
      input3:'',
      now_id:0,
      projectid:10,
      teamid:11,
      fatherid:1,
    }
  },
  created() {
    this.now_id=JSON.parse(sessionStorage.getItem('now_textid'));
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/file/project_root_filelist',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        projectID:this.projectid,
      })
    })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.textdata=res.data.filelist;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        fileID:this.now_id,
      })
    })
        .then(res => {/* res 是 response 的缩写 */
          //获取用户登录的三个基本信息并存放于sessionStorage
          if (res.data.errno === 0) {
            this.$message.success('导入文件成功');
            this.content = res.data.content;
            this.inside = res.data.content;
            sessionStorage.setItem('now_textid',JSON.stringify(res.data.fileID));
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    this.inside=JSON.parse(sessionStorage.getItem('now_textinside'));
    console.log(this.now_id);
  },
  methods: {
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){
      console.log(this.content);
    }, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g,'<');
      str = str.replace(/&gt;/g,'>');
      return str;
    },
    find(row,column,cell,event){
       console.log(row.fileID);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
            fileID:row.fileID,
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success("打开成功");
              sessionStorage.setItem('now_textid',JSON.stringify(res.data.fileID));
              window.location.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
    createtext(){
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/file/create_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID:this.teamid,
          projectID:this.projectid,
          file_name: this.input1,
          file_type:'doc',
          fatherID:this.fatherid
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success("新建文件成功");
              window.location.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
    savetext(){
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/file/edit_file ',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          fileID:this.now_id,
          content:this.content
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success("保存文件成功");
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    //this.content = this.inside;  // 请求后台返回的内容字符串
    //this.content = JSON.parse(sessionStorage.getItem('now_textinside'));
    this.str = this.escapeStringHTML(this.content);
  }
}
</script>
<style>
.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s,transform .25s,filter .25s;
  backface-visibility: hidden;
}
</style>
