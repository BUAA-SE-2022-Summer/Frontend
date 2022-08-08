<template>
    <v-card style="width:400px;height: 150px;">
    <v-card-title>
            创建项目
        <v-divider></v-divider>    
        <v-btn @click="create_project()" style="margin-top: 10px;">
            <span>创建</span>
            <v-icon>mdi-file-plus</v-icon>
          </v-btn>
        </v-card-title>   
    <v-text-field  label="名称" filled v-model="name" style="height:40px;" placeholder="项目名称"></v-text-field>
     
    </v-card>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            name:"",

        }
    },
    methods:{
     create_project(){
      var teamID=sessionStorage.getItem('TeamID');
      var desc="空";
      console.log("项目名称：",this.name)
      this.$axios({
        method: 'post',
        url: '/api/project/create_project',
        data: qs.stringify({
          project_name:this.name,
          project_desc:desc,
          teamID: teamID,
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("创建项目成功");
          } else {
            this.$message.error(res.data.msg);
          }
          this.$router.go(0)
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    }
}
</script>