<template>
  <div style="">
    <div style="width: 100vw;height:6vh;background-color: whitesmoke;">
  <router-link to="/">
    <div>
      <img :src="this.logourl" style="width: 30vh;height:6vh;position: absolute;">
      </div>
  </router-link>
  <div style="left:90vh;position: absolute">
    <el-button type="text" icon="el-icon-document"
      style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">文档</el-button>
  </div>
  <div style="left:105vh;position: absolute">
    <el-button type="text" icon="el-icon-s-platform"
      style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">原型设计
    </el-button>
  </div>
  <div style="left:123vh;position: absolute">
    <el-button type="text" icon="el-icon-picture"
      style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">UML绘制
    </el-button>
  </div>
  <div style="left:175vh;position: absolute">
  
  </div>
  <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>
  <el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
    <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
    <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" :content="this.now_textname" placement="bottom">
    <div style="left:62vh;position: absolute;top:1.5vh"><b>当前文档</b></div>
  </el-tooltip>
</div>
  <iframe src="http://horik.cn:8080/" frameborder="1" style="width:100%;height: 94vh;"></iframe>
  </div>
</template>
<script>
export default {
  setup() {
    
  },
  data(){
    return{
      logourl: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png'
    }
  }
}
</script>