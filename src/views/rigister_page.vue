<template>
  <div id="register" class="register" style="width: 100%;height: 1200px;margin: 0%;">
    <div >
       <v-card
      :loading="loading"
      class="mx-auto my-12"
      width="450"
      height="850px"
    >
    <div style="width:100%;height:200px;margin-top: 20px;">
      <img src="../img/formtop.png" style="width:400px;margin-left: 15px;">
    </div>
    <div style="width:350px;margin-left:50px;margin-top: 50px;">
      <v-text-field
              v-model="form.username"
              label="昵称"
              outlined
              clearable
       ></v-text-field>
       <v-text-field
              v-model="form.password_1"
              label="密码"
              outlined
              clearable
         ></v-text-field>

          <v-text-field
              v-model="form.password_2"
              label="确认密码"
              outlined
              clearable
         ></v-text-field>

          <v-text-field
              v-model="form.email"
              label="邮箱"
              outlined
              clearable
         ></v-text-field>

          <v-text-field
              v-model="form.relname"
              label="真实姓名（选填）"
              outlined
              clearable
         ></v-text-field>
         <v-text-field
              v-model="form.phonenumber"
              label="手机号码（选填）"
              outlined
              clearable
         ></v-text-field>
         <v-btn
                x-large
                dark
                @click="register"
              >
                注册
           </v-btn>
          <v-btn
                x-large
                dark
                @click="toRegister"
              >
                取消
           </v-btn>
    </div>
    </v-card>
      <!-- <img class="bgbox" id="bgbox" alt="" src="../../src/img/星空4.jpg">
      <div class="wrap">
        <h1 style="position: relative; top: 10px;">注 册</h1>
        <el-form :model="form" ref="form" class="form" style="position: relative; top: 15px;">
          <el-form-item prop="username">
            <el-input placeholder="用户名" type="username" v-model="form.username" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password_1">
            <el-input placeholder="密码" type="password" v-model="form.password_1" autocomplete="off" clearable show-password></el-input>
          </el-form-item>
          <el-form-item prop="password_2" clearable>
            <el-input
                placeholder="确认密码"
                show-password
                clearable
                type="password"
                v-model="form.password_2"
                autocomplete="off"
                @keyup.enter.native="register"
            ></el-input>
          </el-form-item>
          <el-form-item prop="useremail">
            <el-input placeholder="邮箱" type="usermail" v-model="form.email" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item prop="realname">
            <el-input placeholder="真实姓名（选填）" type="realname" v-model="form.realname" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item prop="phonenumber">
            <el-input placeholder="电话号码（选填）" type="phonenumber" v-model="form.phonenumber" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item prop="introduction">
            <el-input placeholder="个人简介（选填）" type="introduction" v-model="form.introduction" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="btn_register">
            <el-button type="primary" @click="register">注&nbsp;&nbsp;册</el-button>
          </el-form-item>
          <div class="suffix">
            <p @click="toRegister">取消</p>
          </div>
        </el-form>
      </div> -->
    </div>
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
              this.$router.push('/login');
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
  /* background: url('../img/loginback.png');
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
</style>
