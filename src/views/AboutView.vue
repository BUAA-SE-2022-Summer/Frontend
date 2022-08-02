<template>
  <div class="about">

   <div style="width:1000px;background-color:antiquewhite; height: 2000px;">
   <MemberManage></MemberManage>
   
   </div>
   

  </div>
</template>
<script>
import MemberManage from "../components/team/MemberManage.vue";
import MemberTablesVue from "@/components/team/MemberTables.vue";
export default {
    components: { MemberManage,MemberTablesVue }
}
</script>