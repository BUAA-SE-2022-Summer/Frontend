<template>

  <div class="main">
    <div class="part1" style="color:white">
    
      <v-bottom-navigation style="height:90px" class="topBar">
        <v-btn value="recent">
          <span style="color: black;font-size: large;"></span>
          <v-icon large color="red">mdi-star</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <v-btn value="recent">
          <span style="color: black;font-size: large;" @click="overlay2 = !overlay2">修改个人信息</span>
        </v-btn>
        <v-overlay :value="overlay2"  dark=false :opacity="0.3">
        <div>
              <user_centerVue></user_centerVue>
              <!-- <true_user_centerVue></true_user_centerVue> -->
              <div @click="overlay2 = false" style="font-size=40px">
             
                <v-icon style="float:left;color:red;font-weight: 500;" x-large>mdi-arrow-left</v-icon>
                
              </div>
              
          </div>
          </v-overlay>
        <!-- 查看个人信息 -->
         <v-btn value="recent">
          <span style="color: black;font-size: large;" @click="overlay = !overlay">个人中心</span>
        </v-btn>
        <v-overlay :value="overlay" dark=false :opacity="0.3">
              <true_user_centerVue></true_user_centerVue>
              <div @click="overlay = false">
                <v-icon style="float:left;color:red;" x-large>mdi-arrow-left</v-icon>
              </div>
        </v-overlay>

        <v-btn value="recent">
          <span style="color: black;font-size: large;" @click="overlay3 = !overlay3">登录</span>
        </v-btn>
        <v-overlay :value="overlay3" color="white" dark=false :opacity="0.3">
              <login_pageVue></login_pageVue>
              <div @click="overlay3 = false">
                <v-icon style="float:left;color:red;" x-large>mdi-arrow-left</v-icon>
              </div>
        </v-overlay>


        <v-btn value="recent">
          <span style="color: black;font-size: large;" @click="overlay4 = !overlay4">注册</span>
        </v-btn>
         <v-overlay :value="overlay4" dark=false :opacity="0.3">
              <register_pageVue></register_pageVue>
              <div @click="overlay4 = false">
                <v-icon style="float:left;color:red;" x-large>mdi-arrow-left</v-icon>
              </div>
        </v-overlay>
        <v-btn value="recent">
          <span style="color: black;font-size: large;" @click="logout" >退出登录</span>
        </v-btn>
         
         
        <div class="mobook_head">
          <img v-if="this.iflogin === 1" :src="this.userhead"
            style="position: absolute;top:20px;left:70px;width: 50px;height: 50px;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 0px;border-radius: 50%;">
        </div>

        <!-- <el-button v-if="this.iflogin !== 1" type="info" round
          style="background-color: black;position: absolute;left:1300px;top:30px;color: white;" @click="login">登录/注册
        </el-button> -->
      </v-bottom-navigation>
    </div>
    <div class="part2">
      <div class="left1" >
        <div class="left-bottom"  style="margin-left: 10px;width: 400px;margin-top: 30vh;margin-left: 5vw;border-radius: 10px;">
              <v-card @click="toMain">
              <img src="../assets/toMain.png" style="width:400px">
              </v-card>
        </div>
      
      </div>

      
    </div>
  </div>
</template>

<script>
import login_pageVue from './login_page.vue';
import register_pageVue from './register_page.vue';
import user_centerVue from './user_info_change.vue';
import true_user_centerVue from './true_user_center.vue';
export default {
  components: { user_centerVue, true_user_centerVue ,login_pageVue, register_pageVue},
  name: "Welcome_page",
  data() {
    return {
      iflogin: JSON.parse(sessionStorage.getItem('IfLogin')),
      username: '',
      userhead: '',
      click_introduction: 0,
      overlay: false,
      overlay2: false,
      overlay3: false,
      overlay4: false,
      isreloaded: false,  //进入该页面先reload
      opacity: 0,
      dark:false,
    }
  },
  created() {
    this.overlay= false,
      this.overlay2= false,
      this.overlay4=false,
      
    this.$axios.get('/user/get_user_info ').then(
      res => {
        this.username = res.data.data.username;
        this.userhead = res.data.data.img;
      }
    );
    if(this.login==0){
      this.overlay3=true
    }
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
      }else{
        this.$message.push("请先登录")
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
  /* background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.jpg");
  background-size: cover; */
}



.main {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("../assets/mainBack.png");
  background-size: cover;
}

.topBar {
  background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.png");
  background-size: cover;
}
</style>
