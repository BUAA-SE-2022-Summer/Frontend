<template>

  <div class="main">
    <div class="part1">
      <v-bottom-navigation style="height:90px" class="topBar">
        <v-btn value="recent">
          <span style="color: black;font-size: large;">欢迎您加入墨书大家庭</span>

          <v-icon style="color: #F06450;">mdi-heart</v-icon>
        </v-btn>
        <div class="mobook_head">
          <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/logo.png"
            style="position: absolute;top:0px;left:70px;width: 180px;height: 90px;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 0px;">
        </div>

        <el-button v-if="this.iflogin !== 1" type="info" round
          style="background-color: black;position: absolute;left:1300px;top:30px;color: white;" @click="login">登录/注册
        </el-button>
        <el-popover placement="top-start" :title=this.username width="200" trigger="hover">
          <img v-if="this.iflogin === 1" :src="this.userhead"
            style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px"
            slot="reference">
          <div>


            <!-- 个人信息查看 -->
            <v-btn class="mt-12" color="primary" @click="overlay = !overlay"
              style="background-color: black;color: palevioletred;width: 100%;">
              个人信息
            </v-btn>
            <v-overlay :value="overlay">
              <true_user_centerVue></true_user_centerVue>
              <v-btn color="primary" @click="overlay = false" style="color: palevioletred;width: 100%;">
                返回主页
              </v-btn>
            </v-overlay>
            <!-- 修改个人信息 -->
            <v-btn class="mt-12" color="primary" @click="overlay2 = !overlay2"
              style="background-color: black;color: palevioletred;width: 100%;">
              修改个人信息
            </v-btn>
            <v-overlay :value="overlay2">
              <user_centerVue></user_centerVue>
              <!-- <true_user_centerVue></true_user_centerVue> -->
              <v-btn color="primary" @click="overlay2 = false" width="100%" style="color: palevioletred;">
                返回主页
              </v-btn>
            </v-overlay>
            <!-- <v-btn></v-btn> -->
            <el-button type="info" @click="logout" style="background-color: black;color: palevioletred;width: 100%;">
              退出登录</el-button>
          </div>
          <el-button v-if="this.iflogin !== 1" type="info" round
            style="background-color: black;position: absolute;left:1300px;top:30px;color: white;" @click="login">登录/注册
          </el-button>
          <el-popover placement="top-start" :title=this.username width="200" trigger="hover">
            <img v-if="this.iflogin === 1" :src="this.userhead"
              style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px"
              slot="reference">
            <div>
              <el-button type="info" @click="gouc" round style="background-color: black;">进入个人中心</el-button>
              <el-button type="info" @click="logout" round style="background-color: black;">退出登录</el-button>
            </div>
          </el-popover>
        </el-popover>
      </v-bottom-navigation>
    </div>
    <div class="part2">
      <div class="left1" style="position:absolute;float:left;width: 500px;height: 800px;margin-top: 100px;">
        <div class="left-bottom" style="width:100%;height:250px;">
          <v-card class="mx-auto" max-width="400">

            <v-btn v-if="this.iflogin !== 1" large style="background:#F06450;border: transparent;width: 100%;"
              @click="login">
              免费使用
            </v-btn>
            <v-btn v-else large style="background:#F06450;border: transparent;width: 100%;" @click="toMain">
              进入工作台
            </v-btn>
            <v-btn large style="background:#F28375;border: transparent;width: 100%;">
              项目管理
            </v-btn>
            <v-btn large style="background:#F8A39A;border: transparent;width: 100%;">
              原型设计
            </v-btn>
            <v-btn large style="background:#FBC4BB;border: transparent;width: 100%;">
              文档编辑
            </v-btn>
            <v-btn large style="background:#FFE2E0;border: transparent;width: 100%;">
              uml图绘制
            </v-btn>
          </v-card>

        </div>
        <div class="left-bottom" style="width:100%;height:250px;">
          <v-card class="mx-auto" max-width="400">
            <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/webPage.gif" style="width:400px">
          </v-card>

        </div>
      </div>

      <div class="left2" style="position:absolute;float:left;width: 400px;margin-left: 600px;">
        <div class="left-top" style="width:100%;height:250px;margin-top: 130px;">
          <v-card class="mx-auto" max-width="300px">
            <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/webPage3.gif" style="width:300px">
          </v-card>

        </div>
        <div class="left-bottom" style="width:100%;height:300px;">
          <v-card class="mx-auto" max-width="380px">
            <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack4.jpg" style="width:380px">
          </v-card>
        </div>
      </div>
      <div class="right" style="position:absolute;float:left;margin-left: 1000px;width: 800px;">
        <div class="right-top" style="width:100%;height:240px;margin-top: 150px;">
          <v-card class="mx-auto" max-width="300px" style="float:left">
            <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack1.jpg" style="width:300px">
          </v-card>

        </div>
        <div class="right-bottom" style="width:100%;height:350px;">
          <v-card class="mx-auto" max-width="500px" style="float:left">
            <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/pages.png" style="width:500px">
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user_centerVue from './user_info_change.vue';
import true_user_centerVue from './true_user_center.vue';
export default {
  components: { user_centerVue, true_user_centerVue },
  name: "Welcome_page",
  data() {
    return {
      iflogin: JSON.parse(sessionStorage.getItem('IfLogin')),
      username: '',
      userhead: '',
      click_introduction: 0,
      overlay: false,
      overlay2: false,
      isreloaded: false,  //进入该页面先reload
    }
  },
  created() {
    this.$axios.get('/user/get_user_info ').then(
      res => {
        this.username = res.data.data.username;
        this.userhead = res.data.data.img;
      }
    );
  },
  mounted() {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  methods: {
    freeuse() {
      if (this.iflogin === 0) {
        this.$alert('请先进行登录/注册', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已确认消息`
            });
          }
        });
      }
    },
    login() {
      this.$router.push('/login')
    },
    toMain() {
      if (this.login != 0) {
        this.$router.push('/dashboard/demo/console')
      }
    },
    clickintroduction() {
      if (this.click_introduction === 0) {
        this.click_introduction = 1;
      }
      else {
        this.click_introduction = 0;
      }
    },
    logout() {
      this.iflogin = 0;
      sessionStorage.setItem('IfLogin', JSON.stringify(0));
    },
    gouc() {
      this.$router.push('/true_user_center')
    }
  }
}
</script>

<style scoped>
.part1 {
  width: 100%;
  height: 100px;
  background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.jpg");
  background-size: cover;
}



.part2 {
  position: relative;
  width: 100%;
  height: 1000px;
  background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.jpg");
  background-size: cover;
}

.topBar {
  background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.png");
  background-size: cover;
}
</style>
