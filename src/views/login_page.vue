<template>
  <div id="div_1">
    <v-app>
    <div style="width:100%;" class="main">
    <div class="left" style="position:fixed;float:left;width: 800px;height: 100vh;margin-top: 0;">
    <div class="left-top" style="width:100%;height:30vh;">
      <v-card class="mx-auto my-12" width="30vh" >
          <v-img src="../assets/card1.png" style="margin-top:5vh"></v-img>
      </v-card>
      
    </div>
    <div class="left-bottom" style="width:100%;height:65vh;">
       <v-card class="mx-auto my-12"  width="30vw">
          <v-img src="../assets/card2.png" style="width: 30vw;"></v-img>
      </v-card>
      
    </div>
    </div>
    <div class="right" style="position:fixed;float:left;margin-left: 800px;height:100vh;width: 800px;margin-top: 4px;">
    <div class="right-top" style="width:100%;height:550px;">
      <v-card class="mx-auto my-12" width="400px" height="500px" style="float:left;background-color: white;">
          <div style="width:100%;margin-top: 0;">
            <img src="../img/login.png" style="width:350px;margin-left: 25px;">
          </div>
          <div style="width:300px;margin-left:50px;margin-top: 10px;">
            <v-text-field v-model="form.username" label="昵称" outlined clearable></v-text-field>
            <v-text-field v-model="form.password" label="密码" outlined clearable></v-text-field>
           <!-- <v-app id="inspire"> -->
            <v-bottom-navigation
              :value="value"
              color="pink"
            >
              <v-btn @click="login">
                <span>登录</span>
          
                <v-icon>mdi-login</v-icon>
              </v-btn>
          
              <v-btn @click="toRegister">
                <span>注册</span>
          
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
          
              <v-btn @click="toMain">
                <span>返回主页</span>
          
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-bottom-navigation>
            <!-- </v-app> -->
          </div>
        </v-card>
        
    </div>

    <div class="right-bottom" style="width:25vw;height:400px; margin-left: 0;">
    <v-card class="mx-auto my-12" style="margin-left:0;width: 25vw;">
         <v-img src="../assets/card3.png" style="margin-top:0;width: 25vw;"></v-img>
    </v-card>
        <!-- <v-card class="mx-auto my-12" width="250px" style="float:left;margin-left: 0;">
          <v-img src="../assets/card3.png" style="margin-top:0"></v-img>
      </v-card> -->
      
    </div>
    </div>
    </div>
    </v-app>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "NewLogin",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      value:1,
    }
  },
  methods: {
    login: function () {
      // 检查表单是否有填写内容
      //sessionStorage.setItem('ISLOGIN', JSON.stringify(true));
      //window.location.reload();
      if (this.form.username === '' || this.form.password === '') {
        this.$message.warning("信息不完整，请完善信息");
        return;
      }
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/user/login',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          username: this.form.username,
          password: this.form.password
        })
      })
        .then(res => {/* res 是 response 的缩写 */
          //获取用户登录的三个基本信息并存放于sessionStorage
          if (res.data.errno === 0) {
            this.$message.success("登录成功");
            sessionStorage.setItem('IfLogin', JSON.stringify(1));
            this.$router.push('/dashboard');
            //setTimeout(() => {
            //window.open('/login', '_self');
            //}, 1000);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    toRegister: function () {
      // 跳转注册的路由
      this.$router.push('/register');

    },
    toMain: function () {
      // 跳转注册的路由
      this.$router.push('/app/web');

    }
  }
}
</script>

<style scoped>
#div_0 {
  width: 100%;
  height: 100%;
  border: 1px #1A4BAF;
  background-image: url("../../src/img/星空4.jpg");
  background-size: cover;
  background-attachment: fixed;
}

#login {
  font-family: 'Noto Serif SC', serif;

}

#login .el-input__inner {
  font-family: 'Noto Serif SC', serif;
}

#login .bgbox {
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

#login .logo {
  cursor: pointer;
  overflow: hidden;
  height: 150px;
}

#login .wrap {
  width: 300px;
  height: 310px;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  top: 160px;
  border-radius: 20px;
}

#login .btn_login {
  margin-top: 25px;
  text-align: center;
}

#login .btn_login button {
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}

#login .suffix {
  font-size: 14px;
  line-height: 10px;
  color: #999;
  cursor: pointer;
  float: right;
}


.main{
  width: 100%;
  height: 100vh;
  background-image: url("../assets/welBack2.jpg");
  background-size:cover ;

}
</style>
