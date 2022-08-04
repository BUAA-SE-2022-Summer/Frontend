<template>

  <div class="main">
    <div class="part1">
      <v-bottom-navigation style="height:90px" class="topBar">
        <v-btn value="recent">
          <span style="color: black;font-size: large;">欢迎您加入墨书大家庭</span>

          <v-icon style="color: #F06450;">mdi-heart</v-icon>
        </v-btn>
        <div class="mobook_head">
          <img src="../img/logo.png"
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

            <el-button type="info" @click="gouc" round style="background-color: black;">进入个人中心</el-button>
            <el-button type="info" @click="logout" round style="background-color: black;">退出登录</el-button>
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
            <img src="../assets/webPage.gif" style="width:400px">
          </v-card>

        </div>
      </div>

      <div class="left2" style="position:absolute;float:left;width: 400px;margin-left: 600px;">
        <div class="left-top" style="width:100%;height:250px;margin-top: 130px;">
          <v-card class="mx-auto" max-width="300px">
            <img src="../assets/webPage3.gif" style="width:300px">
          </v-card>

        </div>
        <div class="left-bottom" style="width:100%;height:300px;">
          <v-card class="mx-auto" max-width="380px">
            <img src="../img/welBack2.jpg" style="width:380px">
          </v-card>
        </div>
      </div>
      <div class="right" style="position:absolute;float:left;margin-left: 1000px;width: 800px;">
        <div class="right-top" style="width:100%;height:240px;margin-top: 150px;">
          <v-card class="mx-auto" max-width="300px" style="float:left">
            <img src="../img/welBack1.jpg" style="width:300px">
          </v-card>

        </div>
        <div class="right-bottom" style="width:100%;height:350px;">
          <v-card class="mx-auto" max-width="500px" style="float:left">
            <img src="../assets/pages.png" style="width:500px">
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome_page",
  data() {
    return {
      iflogin: JSON.parse(sessionStorage.getItem('IfLogin')),
      username: '',
      userhead: '',
      click_introduction: 0
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/* 头部css设置 */
.welcome-head {
  background-color: white;
  position: absolute;
  width: 100%;
  top: 0px;
  height: 2000px;
  left: 0px;
  /* background: url("../img/back3.jpg"); */
  background-size: cover;
  /* background-repeat: no-repeat; */
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 300px;
}

.el-header {
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.image {
  height: 250px;
}

.part1 {
  width: 100%;
  height: 100px;
  background: url("../assets/welBack2.jpg");
  background-size: cover;
}

.cardPart {
  position: relative;
  width: 100%;
  height: 300px;
  /* background: url("../assets/welBack2.jpg"); */
  background-size: cover;
}

.part2 {
  position: relative;
  width: 100%;
  height: 1000px;
  background: url("../assets/welBack2.jpg");
  background-size: cover;
}

.topBar {
  background: url("../assets/welBack2.jpg");
  background-size: cover;
}
</style>
