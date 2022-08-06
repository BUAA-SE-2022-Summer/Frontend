<template>
  <div>
    <div ref="editorContainer"></div>
    <!--<div><el-button @click="load">cnm</el-button></div>-->
  </div>
</template>
<script>
import { createEditor } from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css';
export default {
  name: "textbustest",
  data(){
    return{
      editor1:null,
      newContent:'<p><strong><em>请开始编辑您的文档</em></strong></p>',
    }
  },
  created() {
  },
  methods:{
    load(){
      this.editor1.replaceContent(this.newContent);
    }
  },
  mounted() {
    const _this = this;
    _this.editor1 = createEditor();
    //const editor = createEditor();
    _this.editor1.mount(this.$refs.editorContainer);
    const newContent = '<p>这里新内容！</p>';
    // _this.editor1.replaceContent(newContent);
    _this.editor1.onChange.subscribe(() => {
      console.log(_this.editor1.getContents().content);
    });
    _this.editor1.onReady.subscribe(()=>{
      _this.editor1.replaceContent(this.newContent);
    })
  }
}
</script>

<style scoped>

</style>
