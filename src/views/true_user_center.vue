<template>
  <div>
    <div class="banner" style="position: fixed;z-index: 9999;width: 100%;height:60px;background-color: ghostwhite">
      <div class="mobook_head">
        <img src="../img/墨书头.png"
             style="position: absolute;top:0px;left:70px;width: 40px;height: 40px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px"
             @click="returnwelcome">
      </div>
      <div class="name" style="position: absolute;top:15px;left:130px;font-size: 20px"><b>墨书</b></div>
      <el-button
          style="position: absolute;left:500px;border-color: ghostwhite;border-radius: 0px;height:60px;background-color: ghostwhite" @click="jumpchange">
        <b>个人信息修改</b>
      </el-button>
      <el-button
          style="position: absolute;left:650px;border-color: ghostwhite;border-radius: 0px;height:60px;background-color: ghostwhite" @click="jumpcenter">
        <b>个人中心</b>
      </el-button>
      <img :src="this.userhead" style="position: absolute;top:0px;left:1300px;width: 40px;height: 40px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px" slot="reference" >
      <div  style="position: absolute;top:20px;left:1360px"><b>{{this.username}}</b></div>
    </div>
    <div style="position: absolute;height:900px;background-color: whitesmoke;top:60px;width: 100%">
      <el-card class="box-card" style="width: 1000px;height:700px;position: absolute;left:270px;top:40px">
        <div slot="header" class="clearfix">
          <span><b>基本信息</b></span>
        </div>
        <div style="position: absolute;top: 63px; font-size: 10px;color: #999999">
          头像
        </div>
        <img :src="this.userhead" style="width: 210px;height:210px;position: absolute;left:20px;border-radius: 50%">
        <div style="position: absolute;top: 295px; font-size: 10px;color: #999999">
          昵称
        </div>
        <div style="position: absolute;width: 550px;top: 320px;">
          <el-input v-model="username" placeholder="无" :disabled="true"></el-input>
        </div>
        <div style="position: absolute;top: 365px; font-size: 10px;color: #999999">
          姓名
        </div>
        <div style="position: absolute;width: 550px;top: 390px;">
          <el-input v-model="real_name" placeholder="无" :disabled="true"></el-input>
        </div>
        <div style="position: absolute;top: 435px; font-size: 10px;color: #999999">
          电子邮箱
        </div>
        <div style="position: absolute;width: 550px;top: 460px;">
          <el-input v-model="email" placeholder="无" :disabled="true"></el-input>
        </div>
        <div style="position: absolute;top: 505px; font-size: 10px;color: #999999">
          电话
        </div>
        <div style="position: absolute;width: 550px;top: 530px;">
          <el-input v-model="phone" placeholder="无" :disabled="true"></el-input>
        </div>
        <div style="position: absolute;top: 575px; font-size: 10px;color: #999999">
          个性签名
        </div>
        <div style="position: absolute;width: 750px;top: 600px;">
          <el-input v-model="profile" placeholder="无" type="textarea" :disabled="true"></el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  name: "user_center",
  data() {
    return {
      imageUrl: '',
      uploadimgurl:'/user/update_user_img ',
      username:'',
      userhead:'',
      real_name:'',
      email:'',
      phone:'',
      profile:'',
      username1:'',
    };
  },
  created() {
    this.$axios.get('/user/get_user_info ').then(
        res => {
          this.username = res.data.data.username;
          this.userhead = res.data.data.img;
          this.real_name = res.data.data.real_name;
          this.email = res.data.data.email;
          this.phone = res.data.data.phone;
          this.profile = res.data.data.profile;
          this.username1 = this.username;
        }
    );
  },
  methods: {
    returnwelcome() {
      this.$router.push('/');
    },
    jumpchange(){
      this.$router.push('/user_center');
    },
    jumpcenter(){
      this.$router.push('/true_user_center');
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
