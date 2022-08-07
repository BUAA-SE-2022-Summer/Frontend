<template>

</template>
<script>
import qs from 'qs'
export default {
  created() {
    // this.star_project(1)
    // this.unstar_project(1)
    // this.create_project("first")
    // this.rename_project(1, "First")
    // this.get_star_project_list()
    // this.get_create_project_list()
    // this.delete_project(1)
    // this.get_delete_project_list()
  },
  methods: {
    //收藏功能,通过测试
    star_project(ID) {
      var teamID = sessionStorage.getItem('TeamID');
      // console.log(teamID)
      this.$axios({
        method: 'post',
        url: '/api/project/star_project',
        data: qs.stringify({
          projectID: ID,
          teamID: teamID
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("收藏项目成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //取消收藏,通过测试
    unstar_project(ID) {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/unstar_project',
        data: qs.stringify({
          projectID: ID,
          teamID: teamID
          // teamID:1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("取消收藏项目成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //创建项目，通过测试
    create_project(name) {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/create_project',
        data: qs.stringify({
          project_name: name,
          teamID: teamID
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("取消收藏项目成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //删除项目,通过测试
    delete_project(ID) {
      var teamID = sessionStorage.getItem('TeamID')
      this.$axios({
        method: 'post',
        url: '/api/project/delete_project',
        data: qs.stringify({

          projectID: ID,
          // teamID: teamID,
          teamID: 1

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("成功");
            // this.initialize()
          } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //重命名项目,通过测试
    rename_project(ID, Name) {
      console.log("修改项目名称", ID, Name)
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/rename_project',
        data: qs.stringify({
          projectID: ID,
          // teamID: teamID,
          teamID: 1,
          project_name: Name

        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success("成功");
          } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //查看改团队项目,通过测试
    get_star_project_list() {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/get_star_project_list',
        data: qs.stringify({
          // teamID: teamID
          teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            console.log(res.data)
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //查看用户创建项目,通过测试
    get_create_project_list() {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/get_create_project_list',
        data: qs.stringify({
          teamID: teamID
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            console.log(res.data)
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    //查看回收站项目,通过测试
    get_delete_project_list() {
      var teamID = sessionStorage.getItem('TeamID');
      this.$axios({
        method: 'post',
        url: '/api/project/get_delete_project_list',
        data: qs.stringify({
          teamID: teamID
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            console.log(res.data)
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },

  },
  //回收站彻底删除项目
  delete_project_recycle_bin(ID) {
    var teamID = sessionStorage.getItem('TeamID');
    this.$axios({
      method: 'post',
      url: '/api/project/get_delete_project_list',
      data: qs.stringify({
        teamID: teamID
        // teamID: 1
      })
    })
      .then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          console.log(res.data)
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })
  }
}
</script>
