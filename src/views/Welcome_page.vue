<template>
  <div class="main">
    <!--<div class="top" style="position: absolute;top:20px;left:20px;font-size: 30px"><b>欢迎使用墨书</b></div>-->
    <div style="background-color: #999999;position: absolute;width:1520px;top:0px;height:130px;left:0px">
    <div class="mobook_head">
      <img src="../img/墨书头.png" style="position: absolute;top:20px;left:70px;width: 60px;height: 60px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px">
    </div>
    <div class="name" style="position: absolute;top:50px;left:150px;font-size: 20px"><b>墨书</b></div>
      <div class="产品介绍" style="position: absolute;top:50px;left:300px;font-size: 20px;background-color: #999999">
          <el-button slot="reference" style="background-color: #999999;border-color: #999999" @click="clickintroduction"><b>产品功能介绍</b></el-button>
      </div>
    <el-button v-if="this.iflogin!==1" type="info" round style="background-color: #99a9bf;position: absolute;left:1300px;top:50px" @click="login">登录/注册</el-button>
      <el-popover
          placement="top-start"
          :title=this.username
          width="200"
          trigger="hover"
          >
        <img v-if="this.iflogin===1" :src="this.userhead" style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px" slot="reference">
        <div>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </el-popover>
    <!--<img v-if="this.iflogin===1" :src="this.userhead" style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px">-->
    <div v-if="this.iflogin===1" style="position: absolute;top:55px;left:1360px"><b>{{this.username}}</b></div>
    </div>
    <div class="zouma" style="position: absolute;top:130px;left:0px;width:1520px;background-color: whitesmoke;height:350px;z-index: 1">
  <el-carousel indicator-position="outside" height="500px">
    <el-carousel-item>
      <img src="../img/走马灯1.jpg" width="100%" height="100%">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../img/走马灯1.jpg" width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
      <div class="introduct" style="font-size: 30px;position: absolute;left:150px"><b>墨书——让产品设计更优雅</b></div>
      <div><el-button type="info" style="position: absolute;height: 50px;width:100px;left:1200px" @click="freeuse">免费使用</el-button></div>
    </div>
    <div v-if="this.click_introduction===1" class="introduction_card" style="position: absolute;top:100px;left:210px;width: 600px;height:300px;z-index: 2">
      <el-card class="box-card" style="position: absolute;height:300px">
        <div slot="header" class="clearfix">
          <span><b>墨书功能介绍</b></span>
        </div>
        <div>
          作为一款简洁高效的在线合作办公设计软件，墨书包含以下功能
        </div>
        <div>
          <img src="../img/项目管理.jpg" style="width: 100px;height: 80px;left:20px;position: absolute">
        </div>
        <div style="position: absolute;top:130px;left:130px"><b>项目管理</b></div>
        <div>
          <img src="../img/原型设计.jpg" style="width: 100px;height: 80px;left:240px;position: absolute">
        </div>
        <div style="position: absolute;top:130px;left:360px"><b>原型设计</b></div>
        <div>
          <img src="../img/uml.jpg" style="width: 100px;height: 80px;left:20px;position: absolute;top:200px">
        </div>
        <div style="position: absolute;top:220px;left:130px"><b>uml图绘制</b></div>
        <div>
          <img src="../img/文档编辑.jpg" style="width: 100px;height: 80px;left:240px;position: absolute;top:200px">
        </div>
        <div style="position: absolute;top:220px;left:360px"><b>文档编辑</b></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome_page",
  data(){
    return{
      iflogin:JSON.parse(sessionStorage.getItem('IfLogin')),
      username:'',
      userhead: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/test001.jpg',
      click_introduction:0
    }
  },
  created() {
      this.$axios.get('/user/get_user_info ').then(
        res => {
          this.username = res.data.data.username;
        }
    );
  },
  methods:{
    freeuse(){
      if(this.iflogin===0){
        this.$alert('请先进行登录/注册', '提示', {
          confirmButtonText: '确定',
          type:'warning',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已确认消息`
            });
          }
        });
      }
    },
    login(){
      this.$router.push('/login')
    },
    clickintroduction(){
      if(this.click_introduction===0){
        this.click_introduction=1;
      }
      else{
        this.click_introduction=0;
      }
    },
    logout(){
      this.iflogin=0;
      sessionStorage.setItem('IfLogin',JSON.stringify(0));
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
</style>
