<template>

  <div class="main">
    <!-- 邀请部分 -->
    <div style="width:100%;height: 600px;">

      <v-card class="mx-auto my-12" style="width:1000px">
        <v-card-title style="">亲爱的墨书用户{{ this.invitedName }}您好：</v-card-title>
        <div style="width:100%;height: 300px;">
          <div class="cardLeft" style="float:left;width:500px;height:280px;border-radius: 10px; ">
            <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/card7.png"
              style="width:400px;height:270px">
          </div>
          <div class="cardRight" style="float:left;width:500px;">
            <v-row style="height:200px">
              <v-col>
                <img :src="this.inviteHead" style="width: 150px;height:150px;border-radius: 50%">
              </v-col>
              <v-col>
                <v-icon x-large style="width:150px;height:150px">mdi-plus</v-icon>
              </v-col>
              <v-col>

                <img :src="this.invitedHead" style="width: 150px;height:150px;border-radius: 50%">
              </v-col>
            </v-row>
            <v-card-text style="font-size:20px;color: black;font-weight: 500;">
              {{ this.inviteName }}邀请您加入{{ this.teamName }}团队,确认请点击以下链接：</v-card-text>
            <v-text-field outlined label="请输入您的密码" v-model="password"> </v-text-field>
            <v-btn width="100%" @click="sendConfirm"
              style="background: transparent; border-left: transparent;border-right: transparent;">确认加入</v-btn>
          </div>
        </div>
        <div style="width:1000px;height: 200px;">
          <!-- <div style="width:100%"> -->
          <v-icon style="align-self: center;color: palevioletred;">mdi-star</v-icon>
          <!-- <v-icon style="align-self: center;">mdi-sun</v-icon> -->
          <!-- </div> -->
          <v-divider style="color: black;background-color: black;">
          </v-divider>
          <span style="font-size: 20px;font-size:400;font-family:Arial, Helvetica, sans-serif;">

            墨书中的团队管理可以将每个人联系在一起，具有共同编辑功能。加入团队，更高效设计。</span>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import user_centerVue from './user_info_change.vue';
import true_user_centerVue from './true_user_center.vue';
import qs from 'qs'
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
      token: "",
      inviteName: "邀请人",
      invitedName: "被邀请人",
      inviteHead: "",
      invitedHead: "",
      teamName: "团队名称",
      absolute: false,
      opacity: 0.46,
      zIndex: 5,
      password:"",
    }
  },
  created() {
    this.token = this.$route.query.token
    console.log("网页token", this.token)
    this.sendtoken()
    // this.sendConfirm()
    this.$axios.get('/api/user/get_user_info').then(
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
        this.$router.push('/teamdashboard')
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
    },
    sendtoken() {
      // 发送token获取基础信息
      console.log("发送token")
      var url = "/api/team/confirm_invitation"
      // this.$axios.get('/api/team/confirm_invitation').then(
      //   res => {
      //     console.log(res.data)
      //   }
      // );
      this.$axios({
        method: 'post',
        url: url,
        data: qs.stringify({
          "token": this.token,
        })
      }).then(res => {
        var result = res.data
        console.log(result)
        // alert(result.msg)
        this.teamName = result.team_name
        this.inviteName = result.invitor_name
        this.inviteHead = result.invitor_avatar
        this.invitedName = result.username
        this.invitedHead = result.user_avater
      })
      //  this.$axios.get('/api/team/invite_member').then(res=>{
      //         var result = res.data
      //         console.log(result)
      //         this.teamName=result.team_name
      //         this.inviteName=result.invitor_name
      //         this.inviteHead=result.invitor_avatar
      //         this.invitedName=result.username
      //         this.invitedHead=result.user_avater

      //   })


    },
    sendConfirm() {
      //发送接收邀请
      console.log("开始发送确认申请", this.token)
      var url = "/api/team/accept_invitation"
      this.$axios({
        method: 'post',
        url: url,
        data: qs.stringify({
          "token": this.token,
          password:this.password,
        })
      }).then(res => {
        var result = res.data
        console.log(result)
        alert(result.msg)
        if (result.errno === 0) {
          this.$message.success(result.msg)
          this.$router.push('/')
        }else{
          this.$message.error(result.msg)
        }
      })

    },
  }
}
</script>

<style scoped>
.part1 {
  width: 100%;
  height: 100px;
  /* background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.jpg"); */
  background-size: cover;
}



.part2 {
  position: relative;
  width: 100%;
  height: 1000px;
  /* background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.jpg"); */
  background-size: cover;
}

.topBar {
  /* background: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.png"); */
  background-size: cover;
}
</style>
<!-- 
  http://192.168.5.4:8080/email？token=eyJ1c2VySUQiOjMxLCJlbWFpbCI6IjE1OTk3NjM3MzFAcXEuY29tIiwidGVhbUlEIjoxMSwiaW52aXRvcklEIjoxfQ.Yuv5Xw.FMk0zSWoCC1jrVdMUrh7zFv1lWok
 -->