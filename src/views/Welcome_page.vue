<template>

  <div class="main">
    <div class="part1">
      <div class="mobook_head">
      <img src="../img/logo.png" style="position: absolute;top:0px;left:70px;width: 300px;height: 150px;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 0px;">
    </div>

    <el-button v-if="this.iflogin!==1" type="info" round style="background-color: black;position: absolute;left:1300px;top:30px;color: white;" @click="login">登录/注册</el-button>
    <el-popover
        placement="top-start"
        :title=this.username
        width="200"
        trigger="hover"
        >
      <img v-if="this.iflogin===1" :src="this.userhead" style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px" slot="reference">
      <div>
        <el-button type="info" @click="logout" round style="background-color: black;">退出登录</el-button>
      </div>
    </el-popover>
    </div>
    <div class="cardPart">
      <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-btn
          large
          color="black"
          style="background:#F06450;border: transparent;width: 100%;"
        >
          GO NOW
        </v-btn>
       <v-btn
          large
          color="black"
          style="background:#F28375;border: transparent;width: 100%;"
        >
          项目管理
         </v-btn>
       <v-btn
          large
          color="black"
          style="background:#F8A39A;border: transparent;width: 100%;"
        >
          原型设计
         </v-btn>
        <v-btn
          large
          color="black"
          style="background:#FBC4BB;border: transparent;width: 100%;"
        >
          文档编辑
         </v-btn>
         <v-btn
          large
          color="black"
          style="background:#FFE2E0;border: transparent;width: 100%;"
        >
          uml图绘制
         </v-btn>
    </v-card>
    </div>

    <div class="part2">

    </div>
    <div class="part3">

    </div>

    <el-container>
  <el-header>
  </el-header>
  <el-container>
    <el-aside width="50%" >
      <div style="margin-top:10px;width:450px;margin-left: 100px; height: 290px;">
        <el-card :body-style="{ padding: '0px' }">
        <img src="../img/welBack1.jpg" class="image">
      </el-card>
      </div>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>

   <el-container>
    <el-main>Main</el-main>
    <el-aside width="50%">
      <div style="margin-top:10px;width:600px;margin-left:100px;">
        <el-card :body-style="{ padding: '0px' }">
        <img src="../img/welBack2.jpg" class="image">
      </el-card>
      </div>
    </el-aside>
  </el-container>

</el-container>
    <!--<div class="top" style="position: absolute;top:20px;left:20px;font-size: 30px"><b>欢迎使用墨书</b></div>-->

   <!-- 头部部分 -->
   <!-- <div class="welcome-head">

    <div class="mobook_head">
      <img src="../img/logo.png" style="position: absolute;top:0px;left:70px;width: 200px;height: 100px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px;">
    </div>

    <el-button v-if="this.iflogin!==1" type="info" round style="background-color: #f28f6e;position: absolute;left:1300px;top:50px" @click="login">登录/注册</el-button>

      <el-popover
          placement="top-start"
          :title=this.username
          width="200"
          trigger="hover"
          >
        <img v-if="this.iflogin===1" :src="this.userhead" style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px" slot="reference" @click="gouc">
        <div>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </el-popover>
    <img v-if="this.iflogin===1" :src="this.userhead" style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px">
    <div v-if="this.iflogin===1" style="position: absolute;top:55px;left:1360px"><b>{{this.username}}</b></div>

    </div> -->


  <!-- 头部结束 -->


    <!-- <div class="zouma" style="position: absolute;top:130px;left:0px;width:100%;background-color: whitesmoke;height:350px;z-index: 1">

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

    </div> -->


    <!-- <div v-if="this.click_introduction===1" class="introduction_card" style="position: absolute;top:100px;left:210px;width: 600px;height:300px;z-index: 2">

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
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Welcome_page",
  data(){
    return{
      iflogin:JSON.parse(sessionStorage.getItem('IfLogin')),
      username:'',
      userhead: '',
      click_introduction:0
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
    },
    gouc(){
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
.welcome-head{
  background-color: white;
  position: absolute;
  width:100%;
  top:0px;
  height:2000px;
  left:0px;
  /* background: url("../img/back3.jpg"); */
  background-size: cover;
  /* background-repeat: no-repeat; */
}

.el-aside {
    background-color:white;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 300px;
  }
  .el-header{
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
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .image{
    height: 250px;
  }
  
.part1{
  width: 100%;
  height: 150px;
  background: url("../assets/welBack2.jpg");
  background-size:cover ;
}
.cardPart{
  width: 100%;
  height: 400px;
  background: url("../assets/welBack2.jpg");
  background-size:cover ;
}

</style>
