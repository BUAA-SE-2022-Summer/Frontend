<template>
  <div>
    <img class="bgbox" id="bgbox" alt="" src="../img/背景.jpg">
    <div style="position: absolute;width: 400px;top:35px">
      <el-card class="box-card" style="position: absolute;height:600px;width: 400px;background-color: rgba(255, 255, 255, 0.85);">
        <div slot="header" class="clearfix">
          <span>文件操作区</span>
        </div>
        <div>
          <el-input v-model="input" placeholder="请输入文档名称"></el-input>
          <v-btn style="position: absolute;left: 20px;top:140px;background-color: rgba(255, 255, 255, 0.85)">创建新文档</v-btn>
          <el-input v-model="input" placeholder="请输入文档名称" style="position: absolute;left: 20px;top:200px;width:360px"></el-input>
          <v-btn style="position: absolute;left: 20px;top:260px;background-color: rgba(255, 255, 255, 0.85)">查找文档</v-btn>
          <el-input v-model="input" placeholder="请输入文档名称" style="position: absolute;left: 20px;top:320px;width:360px"></el-input>
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
    <div><v-btn style="background-color: rgba(255, 255, 255, 0.85)">保存文档</v-btn></div>
  </div>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
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
      inside: '<h2> \t<strong><em>请于此开始编辑</em></strong></h2>',
      textname:'',
      input:'',
    }
  },
  created() {

  },
  methods: {
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){
      console.log(this.content)
    }, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g,'<');
      str = str.replace(/&gt;/g,'>');
      return str;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    this.content = this.inside;  // 请求后台返回的内容字符串
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
