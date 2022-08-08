<template>
<div>
  <div id="printme" v-html="this.init"></div>
  <el-button v-print="printObj" style="margin-left: 47vw">导出pdf</el-button>
</div>
</template>

<script>
export default {
  name: "pdftest",
  data() {
    return {
      init:JSON.parse(sessionStorage.getItem('pdf')),
      printObj: {
        id: 'printme',
        popTitle: '打印标题控制'
      },
    }
  }
}
</script>

<style scoped>

</style>
