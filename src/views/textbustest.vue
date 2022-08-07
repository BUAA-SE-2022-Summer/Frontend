<template>
  <div>
    <div>
      <img class="bgbox" id="bgbox" alt="" src="../../src/img/背景.jpg">
      <div style="width: 1540px;height:6vh;background-color: whitesmoke;">
        <router-link to="/">
          <div><img :src="this.logourl" style="width: 20vh;height:6vh;position: absolute;"></div>
        </router-link>
        <div style="left:25vh;position: absolute">
          <el-button type="text" icon="el-icon-arrow-left"
            style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">返回</el-button>
        </div>
        <div style="left:90vh;position: absolute">
          <el-button type="text" icon="el-icon-document"
            style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">文档</el-button>
        </div>
        <div style="left:105vh;position: absolute">
          <el-button type="text" icon="el-icon-s-platform"
            style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">原型设计
          </el-button>
        </div>
        <div style="left:123vh;position: absolute">
          <el-button type="text" icon="el-icon-picture"
            style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">UML绘制
          </el-button>
        </div>
        <div style="left:175vh;position: absolute"><img :src="this.userhead"
            style="border-radius: 50%;width: 6vh;height: 6vh"></div>
        <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>
        <el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
          <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
          <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="this.now_textname" placement="bottom">
          <div style="left:62vh;position: absolute;top:1.5vh"><b>当前文档</b></div>
        </el-tooltip>
      </div>
      <div>
        <!--<el-table :data="this.textdata" height="600" border stripe
                  style="position:absolute;width: 60vh;top:12vh" @cell-click="find">
          <el-table-column prop="file_name" label="文档列表" width:20vh>
          </el-table-column>
        </el-table>-->
      </div>
      <div style="position: absolute;width: 300px;height:5vh;background-color: wheat;top:690px">
        <div style="top:5px;position: absolute;left: 10px;cursor: pointer" @click="showtrash"><b>> 回收站</b></div>
      </div>
      <div v-if="this.ifnew === 0">
        <el-tooltip class="item" effect="dark" content="新建文档" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:40px;top:55px"><i class="el-icon-plus" style=""
              @click="changenew"></i></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除当前文档" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:130px;top:55px"><i class="el-icon-delete-solid"
              style="" @click="deletetxt"></i></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="保存文档" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:220px;top:55px"><i class="el-icon-document-checked"
              style="" @click="savetxt"></i></div>
        </el-tooltip>
      </div>
      <div v-if="this.ifnew === 1" style="width: 21vh;position: absolute;">
        <el-input v-model="inputname" placeholder="请输入文档名称"></el-input>
        <el-button type="primary" style="position: absolute;width: 9vh;" @click="createnewtxt">确认</el-button>
        <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消</el-button>
      </div>
      <div v-if="this.ifshow === 1" style="position: absolute;width: 300px;height:91vh;background-color: whitesmoke">
      </div>
      <div v-if="this.ifshow === 1" style="position: absolute;width: 300px;height:5vh;background-color: wheat;top:50px">
        <div style="top:5px;position: absolute;left: 10px;cursor: pointer" @click="closetrash"><b>> 回收站</b></div>
        <doxlists1></doxlists1>
      </div>
      <div v-if="this.ifshow === 0"
        style="position: absolute;width: 300px;height:80vh;background-color: whitesmoke;top:12vh">
        <doxlist></doxlist>
      </div>
      <div ref="editorContainer" style="width: 165vh;position: absolute;left:40vh;height:100vh;minHeight: 100vh"></div>
      <!--<div style="position: absolute;left:700px;top:80vh"><v-btn text color="primary" @click="outtxt">导出当前文档</v-btn></div>-->
      <!--<div style="position: absolute;left:900px;top:80vh"><v-btn text color="error" @click="deletetxt">删除当前文档</v-btn></div>
      <div style="position: absolute;left:1100px;top:80vh"><v-btn text color="primary" @click="createnewtxt">新建文档</v-btn></div>-->
    </div>
    <!--<div><el-button @click="load">cnm</el-button></div>-->
  </div>
</template>
<script>
import { createEditor } from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css';
import doxlists1 from "../components/demo/trashlists";
import doxlist from "../components/demo/doxlists";
import qs from "qs";
export default {
  components: { doxlists1, doxlist },
  name: "textbustest",
  data() {
    return {
      editor1: null,
      newContent: '',
      logourl: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png',
      userhead: '',
      username: '',
      teamname: sessionStorage.getItem('TeamName'),
      projectname: sessionStorage.getItem('ProjectName'),
      projectid: sessionStorage.getItem('ProjectID'),
      teamid: sessionStorage.getItem('TeamID'),
      fatherid: sessionStorage.getItem('project_root_fileID'),
      textdata: [
      ],
      trashlist: [
      ],
      now_id: 0,
      now_textname: '',
      ifnew: 0,
      inputname: '',
      ifshow: 0,
    }
  },
  created() {
    //alert('进入详情页');
    this.now_id = JSON.parse(sessionStorage.getItem('now_textid'));
    //alert("textbus当前文档id为"+this.now_id);
    this.now_textname = JSON.parse(sessionStorage.getItem('now_textname'));
    this.$axios.get('/api/user/get_user_info ').then(
      res => {
        this.userhead = res.data.data.img;
        this.username = res.data.data.username;
        console.log(this.userhead)
      }
    );
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/file/project_root_filelist',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        projectID: this.projectid,
      })
    })
      .then(res => {/* res 是 response 的缩写 */
        if (res.data.errno === 0) {
          this.textdata = res.data.filelist;
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    console.log("当前项目id" + this.projectid);
    console.log("当前文档id" + this.now_id);
  },
  methods: {
    load() {
      this.editor1.replaceContent(this.newContent);
    },
    outtxt() {

    },
    closecreate() {
      this.ifnew = 0;
    },
    closetrash() {
      this.ifshow = 0;
    },
    showtrash() {
      this.ifshow = 1;
    },
    changenew() {
      this.ifnew = 1;
    },
    createnewtxt() {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/create_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID: this.teamid,
          projectID: this.projectid,
          file_name: this.inputname,
          file_type: 'doc',
          fatherID: this.fatherid
        })
      })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.$message.success("文档创建成功");
            window.location.reload();
            //this.$router.go(0);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
      this.ifnew = 0;
    },
    deletetxt() {
      this.$axios({
        method: 'post',
        url: '/api/file/delete_file',
        data: qs.stringify({
          fileID: this.now_id,
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("删除成功");
            window.location.reload();
          } else {
            alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    find(row, column, cell, event) {
      //alert(row.fileID);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          fileID: row.fileID,
        })
      })
        .then(res => {/* res 是 response 的缩写 */
          //获取用户登录的三个基本信息并存放于sessionStorage
          if (res.data.errno === 0) {
            this.$message.success("打开成功");
            sessionStorage.setItem('now_textid', JSON.stringify(res.data.fileID));
            sessionStorage.setItem('now_textname', JSON.stringify(res.data.file_name));
            window.location.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    savetxt() {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/edit_file ',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          fileID: this.now_id,
          content: this.editor1.getContents().content
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
  mounted() {
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        fileID: this.now_id,
      })
    })
      .then(res => {/* res 是 response 的缩写 */
        //获取用户登录的三个基本信息并存放于sessionStorage
        if (res.data.errno === 0) {
          this.$message.success('导入文件成功');
          this.newContent = res.data.content;
          //alert(this.newContent);
          _this.editor1.replaceContent(this.newContent);
          //this.inside = res.data.content;
          sessionStorage.setItem('now_textid', JSON.stringify(res.data.fileID));
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    const _this = this;
    _this.editor1 = createEditor();
    //const editor = createEditor();
    _this.editor1.mount(this.$refs.editorContainer);
    const newContent = '<p>这里新内容！</p>';
    // _this.editor1.replaceContent(newContent);
    _this.editor1.onChange.subscribe(() => {
      console.log(_this.editor1.getContents().content);
    });
    _this.editor1.onReady.subscribe(() => {
      //alert(this.newContent);
      //_this.editor1.replaceContent(this.newContent);
    })
  }
}
</script>

<style scoped>
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
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden;
}

.textbus-container {
  line-height: 1.428;
  border-radius: 5px;
  height: 583px;
  color: #495060;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
