<template>
  <div class="about">
    <h1>解决了nginx部署后 vue非主页路由刷新后出现404的问题</h1>
    <h1>试试push上去能不能直接改变 try</h1>
    <h1>分支合并尝试</h1>
    <div class="mt-3">
    <b-button-group>
      <b-button variant="success">Success</b-button>
      <b-button variant="info">Info</b-button>
      <b-button variant="warning">Warning</b-button>
    </b-button-group>
      <v-btn small>Normal</v-btn>
   </div>
    <v-btn color="primary" dark>Accept
      <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
    </v-btn>

   <div style="width:100%;background-color:antiquewhite; height: 2000px;">
   <!-- <MemberManage></MemberManage> -->
   <TeamMainVue></TeamMainVue>
   </div>

  </div>
</template>
<script>
import MemberManage from "../components/team/MemberManage.vue";
import TeamMainVue from "@/components/team/TeamMain.vue";
export default {
    components: { MemberManage ,TeamMainVue}
}
</script>