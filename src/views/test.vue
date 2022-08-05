<template>
<div>
                          <!-- 创建项目部分开始 -->
                          <el-card class="box-card"
                            style="width: 700px;height: 530px;position: absolute;top:0px;background-color: whitesmoke">
                            <div slot="header" class="clearfix">
                              <span><b>你干~嘛~</b></span>
                            </div>
                            <div style="position: absolute;top:60px">
                              <b>Name</b>
                            </div>
                            <div>
                              <v-textarea>dscsac</v-textarea>
                  <!-- <v-input>123</v-input> -->
                              <el-input v-model="appname" 
                                style="position: absolute;width: 400px;top:80px;left:20px;"></el-input>
                            </div>
                            <div style="position: absolute;top:120px;">
                              <b>Screensize</b>
                            </div>
                            <div @click="click11">
                              <div v-if="this.click1 === 1"
                                style="position:absolute;width:300px;height: 100px;background: white;top:150px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iphonex/11/12
                                  </div>
                                  <div style="color: #8c939d">
                                    375*812
                                  </div>
                                  <div style="position: absolute;left:-50px;top:0px;">
                                    <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else
                                style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:150px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iphonex/11/12
                                  </div>
                                  <div style="color: #8c939d">
                                    375*812
                                  </div>
                                  <div style="position: absolute;left:-50px;top:0px;">
                                    <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div @click="click12">
                              <div v-if="this.click1 === 2"
                                style="position:absolute;width:300px;height: 100px;background: white;top:150px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iphone11/12Max
                                  </div>
                                  <div style="color: #8c939d">
                                    414*896
                                  </div>
                                  <div style="position: absolute;left:-50px;top:0px;">
                                    <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else
                                style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:150px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iphone11/12Max
                                  </div>
                                  <div style="color: #8c939d">
                                    414*896
                                  </div>
                                  <div style="position: absolute;left:-50px;top:0px;">
                                    <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div @click="click13">
                              <div v-if="this.click1 === 3"
                                style="position:absolute;width:300px;height: 100px;background: white;top:250px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iPad(Vertical)
                                  </div>
                                  <div style="color: #8c939d">
                                    768*1024
                                  </div>
                                  <div style="position: absolute;left:-50px;top:0px;">
                                    <img src="../img/ipad.png" style="width: 20px;height: 40px;border-radius: 10%">
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else
                                style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:250px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iPad(Vertical)
                                  </div>
                                  <div style="color: #8c939d">
                                    768*1024
                                  </div>
                                  <div style="position: absolute;left:-50px;top:0px;">
                                    <img src="../img/ipad.png" style="width: 20px;height: 40px;border-radius: 10%">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div @click="click14">
                              <div v-if="this.click1 === 4"
                                style="position:absolute;width:300px;height: 100px;background: white;top:250px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iPad(Horizontal)
                                  </div>
                                  <div style="color: #8c939d">
                                    1024*768
                                  </div>
                                  <div style="position: absolute;left:-60px;top:10px;">
                                    <img src="../img/ipad1.png" style="width: 40px;height: 20px;border-radius: 10%">
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else
                                style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:250px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    iPad(Horizontal)
                                  </div>
                                  <div style="color: #8c939d">
                                    1024*768
                                  </div>
                                  <div style="position: absolute;left:-60px;top:10px;">
                                    <img src="../img/ipad1.png" style="width: 40px;height: 20px;border-radius: 10%">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div @click="click15">
                              <div v-if="this.click1 === 5"
                                style="position:absolute;width:300px;height: 100px;background: white;top:350px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desktop
                                  </div>
                                  <div style="color: #8c939d">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1280*720
                                  </div>
                                  <div style="position: absolute;left:-60px;top:10px;">
                                    <img src="../img/网页.png" style="width: 40px;height: 30px;border-radius: 10%">
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else
                                style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:350px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desktop
                                  </div>
                                  <div style="color: #8c939d">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1280*720
                                  </div>
                                  <div style="position: absolute;left:-60px;top:10px;">
                                    <img src="../img/网页.png" style="width: 40px;height: 30px;border-radius: 10%">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div @click="click16">
                              <div v-if="this.click1 === 6"
                                style="position:absolute;width:300px;height: 100px;background: white;top:350px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Custom
                                  </div>
                                  <div>
                                    <v-textarea > dcascs</v-textarea>
                                
                                    <!-- <el-input v-model="cwidth" placeholder="请输入宽度"
                                      style="position: absolute;width: 80px;height: 10px;left:-50px"></el-input> -->
                                  </div>
                                  <div style="position:absolute;left: 40px;top:33px;font-size: 20px">
                                    *
                                  </div>
                                  <div>
                                    <el-input v-model="cheight" placeholder="请输入高度"
                                      style="position: absolute;width: 80px;height: 10px;left:60px"></el-input>
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else
                                style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:350px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Custom
                                  </div>
                                  <div>
                                    <div>
                                      <!-- <v-textarea style="position: absolute;width: 80px;height: 10px;left:-50px"> </v-textarea> -->
                                      <el-input v-model="cwidth" placeholder="请输入宽度"
                                        style="position: absolute;width: 80px;height: 10px;left:-50px"></el-input>
                                    </div>
                                    <div style="position:absolute;left: 40px;top:33px;font-size: 20px">
                                      *
                                    </div>
                                    <div>
                                      <el-input v-model="cheight" placeholder="请输入高度"
                                        style="position: absolute;width: 80px;height: 10px;left:60px"></el-input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <el-button style="top:470px;position: absolute;">创建原型</el-button>
                            <el-button style="top:470px;position: absolute;left:200px" @click="cancle">取消</el-button>
                          </el-card>
                  </div>
</template>
<script>
import TeamListCard from "../components/team/TeamListCard.vue"
import Avatar from 'vue-avatar'
import qs from "qs";
export default {
  components: {
    TeamListCard,
    Avatar,
  },
  data: () => ({
    user_info: {},
    operatenum: 0,
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    dialog: false,
    teamid: JSON.parse(sessionStorage.getItem('TeamID')),
    click1: 0,
    projectid: sessionStorage.getItem('ProjectID'),
    fatherid: sessionStorage.getItem('project_root_fileID'),
    appname:"123",
  }),
  created() {
    this.$axios.get('/user/get_user_info ').then(
      res => {
        this.user_info = res.data.data;
      }
    );
  },
  methods: {
    click11() {
      this.click1 = 1;
    },
    click12() {
      this.click1 = 2;
    },
    click13() {
      this.click1 = 3;
    },
    click14() {
      this.click1 = 4;
    },
    click15() {
      this.click1 = 5;
    },
    click16() {
      this.click1 = 6;
    },
    cancle() {
      this.operatenum = 0;
    },
    test() {
      alert('You clicked next!')
    },
    trig1() {
      this.operatenum = 1;
      this.dialog = true;
    },
    trig2() {
      this.operatenum = 2;
      this.dialog = true;
    },
    trig3() {
      this.operatenum = 3;
      this.dialog = true;
    },

    trig4() {
      window.location.href = 'https://online.visual-paradigm.com/app/diagrams/#diagram:proj=0&type=ClassDiagram&width=11&height=8.5&unit=inch';
      //https://www.iodraw.com/diagram/ 备用网址

    },
    trig5() {
      this.operatenum = 5;
      this.dialog = true;
    },
    createteam() {
      console.log(this.input1);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/team/create_team',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          team_name: this.input1,
        })
      })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.$message.success("团队创建成功");
            this.operatenum = 0;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    },
    createproject() {
      alert("创建项目")
      console.log(this.input2);
      console.log(this.teamid);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/project/create_project',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          project_name: this.input2,
          project_desc: '',
          teamID: this.teamid
        })
      })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            console.log(res.data)
            // console.log(res.data.projectID);
            this.$message.success("项目创建成功");
            this.operatenum = 0;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    },
    createdoc() {
      console.log(this.input5);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/file/create_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID: this.teamid,
          projectID: this.projectid,
          file_name: this.input5,
          file_type: 'doc',
          fatherID: this.fatherid
        })
      })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.$message.success("文档创建成功");
            this.operatenum = 0;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    },
  }
}
</script>
