<template>
  <div class="main">
    <!--<div class="top" style="position: absolute;top:20px;left:20px;font-size: 30px"><b>欢迎使用墨书</b></div>-->
    <div style="background-color: #999999;position: absolute;width:1500px;top:20px;height:130px;left:10px">
    <div class="mobook_head">
      <img src="../img/墨书头.png" style="position: absolute;top:20px;left:70px;width: 60px;height: 60px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px">
    </div>
    <div class="name" style="position: absolute;top:50px;left:150px;font-size: 20px"><b>墨书</b></div>
      <div class="产品介绍" style="position: absolute;top:50px;left:300px;font-size: 20px;background-color: #999999">
        <el-popover
            placement="top-start"
            title="墨书产品功能介绍"
            width="200"
            trigger="hover"
            content="墨书是一款方便的协作设计软件">
          <el-button slot="reference" style="background-color: #999999;border-color: #999999"><b>产品功能介绍</b></el-button>
        </el-popover>
      </div>
    <el-button v-if="this.iflogin===0" type="info" round style="background-color: #99a9bf;position: absolute;left:1300px;top:50px" @click="login">登录/注册</el-button>
    <img v-if="this.iflogin===1" :src="this.userhead" style="position: absolute;top:30px;left:1300px;width: 50px;height: 50px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px">
    <div v-if="this.iflogin===1" style="position: absolute;top:55px;left:1360px"><b>{{this.username}}</b></div>
    </div>
    <div class="zouma" style="position: absolute;top:150px;left:10px;width:1500px;background-color: whitesmoke;height:600px">
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
  </div>
</template>

<script>
export default {
  name: "Welcome_page",
  data(){
    return{
      iflogin:1,
      username:'张博皓',
      userhead: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/test001.jpg'

    }
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
