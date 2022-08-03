<template>
  <div class="about">

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