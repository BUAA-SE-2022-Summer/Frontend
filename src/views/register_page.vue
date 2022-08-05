<template>
  <div style="background-color: rgba(255,255,255,0.85);">
  <v-card
      :loading="loading"
      class="mx-auto my-12"
      width="450"
     
     
    >
    <div style="width:100%;height:200px;margin-top: 20px;">
      <img src="https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/formtop.png" style="width:400px;margin-left: 15px;">
    </div>
    <div style="width:350px;margin-left:50px;margin-top: 0px;color: palevioletred;">
    <v-row>
    <v-col>
      <v-text-field
              v-model="form.username"
              label="昵称"    
              clearable
              style="color:palevioletred"
       ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
              v-model="form.relname"
              label="真实姓名"
              clearable
              style="color:palevioletred"
              color="palevioletred"
         ></v-text-field>
    </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
              v-model="form.password_1"
              label="密码"
              clearable
         ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
              v-model="form.password_2"
              label="确认密码"
              clearable
         ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
         <v-text-field
              v-model="form.email"
              label="邮箱"
              clearable
         ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
              v-model="form.phonenumber"
              label="手机号码（选填）"
              clearable
         ></v-text-field>
      </v-col>
    </v-row>
    <v-bottom-navigation
              :value="value"
              color="pink"
              style="width: 100%;"
            >
              <v-btn @click="register">
                <span>注册</span>
          
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
          
            
        </v-bottom-navigation>
    </div>
    </v-card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Register_1",
  data() {
    return {
      form: {
        username: "",
        password_1: "",
        password_2: "",
        email:"",
        realname:"",
        phonenumber:"",
        introduction:"",
      }
    }
  },
  methods: {
    register: function () {
        var login_sucess=0
      this.$axios.post('/user/register ', qs.stringify({
            username: this.form.username,
            password: this.form.password_1,
            password_confirm:this.form.password_2,
            real_name:this.form.realname,
            email: this.form.email,
            phone:this.form.phonenumber,
            profile:this.form.introduction
          }
            ))
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success("注册成功");
              this.$router.push('/');
              //setTimeout(() => {
              //window.open('/login', '_self');
              //}, 1000);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    toRegister: function () {
      // 跳转注册的路由
      this.$router.push('/');
    }
  },
}
</script>

<style scoped>

#div_1{
  width: 100%;
  height: 755px;
  background-color: white;
  background: rgba(255, 255, 255, 0.7);

}
#register {
  font-family: 'Noto Serif SC', serif;
  /* background: url('https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/loginback.png');
  background-size: 100% 100%; */
}
#register .el-input__inner {
  font-family: 'Noto Serif SC', serif;
  height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
}
#register .wrap {
  width: 300px;
  height: 600px;
  padding: 0 25px 0 25px;
  line-height: 50px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);;
  border-radius: 15px;
  color: #303133;
  top: 80px;
  border: 2px solid #ebeef5;
  box-shadow: 2px 2px 12px 2px rgb(0 0 0 / 10%);
  transition: .3s;
}
#register .btn_register {
  margin-top: 25px;
  text-align: center;
}
#register .btn_register button{
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}
#register .suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
#register .bgbox {
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
#register .suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
.main{
  width: 100%;
  height: 100vh;
  background-image: url("https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/welBack2.jpg");
  background-size:cover ;

}
</style>
