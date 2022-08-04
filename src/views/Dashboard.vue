<template>
  <div id="app">
    <v-navigation-drawer app expand-on-hover height="100vh" mini-variant-width="8.5vh">
      <v-list>
        <v-list-item class="px-2">
          <!-- <v-list-item-avatar >
              <v-img v-bind:src=user_info.img></v-img>
            </v-list-item-avatar> -->
          <!-- <Avatar :username="user_info.username" :backgroundcolor="user_info.username" color="#fff"
            style="vertical-align: middle;" :inline="true" /> -->
        </v-list-item>
        <v-list-item class="px-2">
          <Avatar :username="user_info.username" :backgroundcolor="user_info.username" color="#fff"
            style="vertical-align: middle;" :inline="true" />
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user_info.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user_info.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-dialog v-model="dialog" width="700">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-2" fab dark color="indigo" small v-bind="attrs" v-on="on">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
              <v-list-item-title v-on="on">新建</v-list-item-title>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                ikun
              </v-card-title>
              <v-card class="mx-auto" max-width="700">

                <v-container fluid>
                  <v-row dense>
                    <v-col :cols="6">
                      <v-card>
                        <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'" class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                          <v-card-title>新建团队</v-card-title>
                        </v-img>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="ma-2" color="primary" dark @click="trig1">
                            Create Team
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col :cols="6">
                      <v-card>
                        <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'" class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                          <v-card-title>新建项目</v-card-title>
                        </v-img>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="ma-2" color="primary" dark @click="trig2">
                            Create Project
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                        <div  style="position: absolute;z-index: 9999;width: 300px;top:-50px;left:-50px">
                          <el-card v-if="this.operatenum===1" class="box-card" style="width: 300px;height: 300px;position: absolute;left:-80px;top:100px">
                            <div slot="header" class="clearfix">
                              <span><b>你干~嘛~</b></span>
                            </div>
                            <div>
                              <el-input v-model="input1" placeholder="请输入团队名称"></el-input>
                              <el-button style="position: absolute;left:20px;top:130px" @click="createteam">创建团队</el-button>
                              <el-button style="position: absolute;left:180px;top:130px" @click="cancle">取消</el-button>
                            </div>
                          </el-card>
                          <el-card v-if="this.operatenum===2" class="box-card" style="width: 300px;height: 300px;position: absolute;left:-80px;top:100px">
                            <div slot="header" class="clearfix">
                              <span><b>你干~嘛~</b></span>
                            </div>
                            <div>
                              <el-input v-model="input2" placeholder="请输入项目名称"></el-input>
                              <el-button style="position: absolute;left:20px;top:130px" @click="createproject">创建项目</el-button>
                              <el-button style="position: absolute;left:180px;top:130px" @click="cancle">取消</el-button>
                            </div>
                          </el-card>
                          <el-card v-if="this.operatenum===3" class="box-card" style="width: 700px;height: 530px;position: absolute;left:-300px;top:0px;background-color: whitesmoke">
                            <div slot="header" class="clearfix">
                              <span><b>你干~嘛~</b></span>
                            </div>
                              <div style="position: absolute;top:60px">
                                <b>Name</b>
                              </div>
                              <div>
                                <el-input v-model="appname" placeholder="请输入项目名称" style="position: absolute;width: 400px;top:80px;left:20px;"></el-input>
                              </div>
                              <div style="position: absolute;top:120px;">
                                <b>Screensize</b>
                              </div>
                              <div @click="click11">
                                <div v-if="this.click1===1" style="position:absolute;width:300px;height: 100px;background: white;top:150px;cursor: pointer">
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
                                <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:150px;cursor: pointer">
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
                              <div v-if="this.click1===2" style="position:absolute;width:300px;height: 100px;background: white;top:150px;left:320px;cursor: pointer">
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
                              <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:150px;left:320px;cursor: pointer">
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
                              <div v-if="this.click1===3" style="position:absolute;width:300px;height: 100px;background: white;top:250px;cursor: pointer">
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
                              <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:250px;cursor: pointer">
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
                              <div v-if="this.click1===4" style="position:absolute;width:300px;height: 100px;background: white;top:250px;left:320px;cursor: pointer">
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
                              <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:250px;left:320px;cursor: pointer">
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
                              <div v-if="this.click1===5" style="position:absolute;width:300px;height: 100px;background: white;top:350px;cursor: pointer">
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
                              <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:350px;cursor: pointer">
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
                              <div v-if="this.click1===6" style="position:absolute;width:300px;height: 100px;background: white;top:350px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Custom
                                  </div>
                                  <div>
                                    <el-input v-model="cwidth" placeholder="请输入宽度" style="position: absolute;width: 80px;height: 10px;left:-50px"></el-input>
                                  </div>
                                  <div style="position:absolute;left: 40px;top:33px;font-size: 20px">
                                    *
                                  </div>
                                  <div>
                                    <el-input v-model="cheight" placeholder="请输入高度" style="position: absolute;width: 80px;height: 10px;left:60px"></el-input>
                                  </div>
                                  <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
                                </div>
                              </div>
                              <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:350px;left:320px;cursor: pointer">
                                <div style="position: absolute;left:100px;top: 30px">
                                  <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Custom
                                  </div>
                                  <div>
                                    <div>
                                      <el-input v-model="cwidth" placeholder="请输入宽度" style="position: absolute;width: 80px;height: 10px;left:-50px"></el-input>
                                    </div>
                                    <div style="position:absolute;left: 40px;top:33px;font-size: 20px">
                                      *
                                    </div>
                                    <div>
                                      <el-input v-model="cheight" placeholder="请输入高度" style="position: absolute;width: 80px;height: 10px;left:60px"></el-input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <el-button   style="top:470px;position: absolute;">创建原型</el-button>
                            <el-button   style="top:470px;position: absolute;left:200px" @click="cancle">取消</el-button>
                          </el-card>
                          <el-card v-if="this.operatenum===5" class="box-card" style="width: 300px;height: 300px;position: absolute;left:-80px;top:100px">
                            <div slot="header" class="clearfix">
                              <span><b>你干~嘛~</b></span>
                            </div>
                            <div>
                              <el-input v-model="input5" placeholder="请输入文档名称"></el-input>
                              <el-button style="position: absolute;left:20px;top:130px" @click="createdoc">创建文档</el-button>
                              <el-button style="position: absolute;left:180px;top:130px" @click="cancle">取消</el-button>
                            </div>
                          </el-card>
                        </div>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card>
                        <v-img :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'" class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                          <v-card-title>新建原型图</v-card-title>
                        </v-img>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="ma-2" color="primary" dark @click="trig3">
                            Prototype
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card>
                        <v-img :src="'https://cdn.vuetifyjs.com/images/cards/plane.jpg'" class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                          <v-card-title>新建UML类图</v-card-title>
                        </v-img>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="ma-2" color="primary" dark @click="trig4">
                            UML
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card>
                        <v-img :src="'https://cdn.vuetifyjs.com/images/cards/plane.jpg'" class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                          <v-card-title>新建文档</v-card-title>
                        </v-img>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="ma-2" color="primary" dark @click="trig5">
                            Docs
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-card>
          </v-dialog>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/dashboard/demo/console">
          <v-btn class="mx-2" fab dark color="teal" small>
            <v-icon dark>
              mdi-folder
            </v-icon>
          </v-btn>
          <v-list-item-title>项目</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/dashboard/team">
          <v-btn class="mx-2" fab dark color="pink" small>
            <v-icon>mdi-account-multiple</v-icon>
          </v-btn>
          <v-list-item-title>管理</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div>
          <v-menu allow-overflow top :offset-x="true" :close-on-click="true">
            <template v-slot:activator="{ on }">
              <v-btn class="butt" v-on="on">
                <v-avatar>
                  <img src="../assets/logo.svg" alt="">
                </v-avatar>
              </v-btn>
            </template>
            <TeamListCard />
          </v-menu>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main style="padding:0%">
      <router-view />
    </v-main>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.butt {
  display: block;
  margin: 0 auto;
  width: 20px;
  height: 170px;
  border-radius: 60px;
}
</style>


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
    user_info: JSON.parse(sessionStorage.getItem('user_info')),
    operatenum:0,
    input1:'',
    input2:'',
    input3:'',
    input4:'',
    input5:'',
    dialog:false,
    teamid: JSON.parse(sessionStorage.getItem('TeamID')),
    click1:0,
    projectid:sessionStorage.getItem('ProjectID'),
    fatherid:sessionStorage.getItem('project_root_fileID'),
  }),
  methods: {
    click11(){
      this.click1=1;
    },
    click12(){
      this.click1=2;
    },
    click13(){
      this.click1=3;
    },
    click14(){
      this.click1=4;
    },
    click15(){
      this.click1=5;
    },
    click16(){
      this.click1=6;
    },
    cancle(){
      this.operatenum=0;
    },
    test() {
      alert('You clicked next!')
    },
    trig1(){
      this.operatenum=1;
      this.dialog=true;
    },
    trig2(){
      this.operatenum=2;
      this.dialog=true;
    },
    trig3(){
      this.operatenum=3;
      this.dialog=true;
    },
    trig4(){
      this.operatenum=4;
      this.dialog=true;
    },
    trig5(){
      this.operatenum=5;
      this.dialog=true;
    },
    createteam(){
      console.log(this.input1);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/team/create_team',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          team_name:this.input1,
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
    createproject(){
      console.log(this.input2);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/team/create_team',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          project_name:this.input2,
          project_desc:'',
          teamID:this.teamid
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            if (res.data.errno === 0) {
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
    createdoc(){
      console.log(this.input5);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/file/create_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID:this.teamid,
          projectID:this.projectid,
          file_name: this.input5,
          file_type:'doc',
          fatherID:this.fatherid
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
