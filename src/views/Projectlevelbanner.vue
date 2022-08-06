<template>
  <div>
    <div style="width: 1540px;height:6vh;background-color: whitesmoke;" >
      <router-link to="/"><div><img :src="this.logourl" style="width: 20vh;height:6vh;position: absolute;"></div></router-link>
      <div style="left:25vh;position: absolute"><el-button type="text" icon="el-icon-arrow-left" style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">返回</el-button></div>
      <div style="left:90vh;position: absolute"><el-button type="text" icon="el-icon-s-claim" style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">项目管理</el-button></div>
      <div style="left:110vh;position: absolute"><el-button type="text" icon="el-icon-user-solid" style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">成员管理</el-button></div>
     <!-- <div style="left:123vh;position: absolute"><el-button type="text" icon="el-icon-picture" style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">UML绘制</el-button></div>-->
      <div style="left:175vh;position: absolute"><img :src="this.userhead" style="border-radius: 50%;width: 6vh;height: 6vh" ></div>
      <div style="left:185vh;position: absolute;top:1.5vh"><b>{{this.username}}</b></div>
      <el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom"><div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div></el-tooltip>
      <el-tooltip class="item" effect="dark" content="团队列表" placement="bottom"><div style="left:55vh;position: absolute;top:1.5vh"><i class="el-icon-s-order"></i></div></el-tooltip>
      <!--<el-tooltip class="item" effect="dark" :content="this.now_textname" placement="bottom"><div style="left:62vh;position: absolute;top:1.5vh"><b>当前文档</b></div></el-tooltip>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Projectlevelbanner",
  data(){
    return{
      editor1:null,
      newContent:'',
      logourl:'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png',
      userhead:'',
      username:'',
      teamname:sessionStorage.getItem('TeamName'),
      projectname:sessionStorage.getItem('ProjectName'),
      projectid:sessionStorage.getItem('ProjectID'),
      teamid: sessionStorage.getItem('TeamID'),
      fatherid: sessionStorage.getItem('project_root_fileID'),
      textdata:[
      ],
      now_id:0,
      now_textname:'',
      ifnew:0,
      inputname:'',
    }
  },
  created(){
    this.$axios.get('/user/get_user_info ').then(
        res => {
          this.userhead = res.data.data.img;
          this.username = res.data.data.username;
          console.log(this.userhead)
        }
    );
  }
}
</script>

<style scoped>

</style>
