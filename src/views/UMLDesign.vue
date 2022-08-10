<template>
    <iframe :src="src" frameborder="1" style="width:100%;height: 94vh;" ref="iframe"></iframe>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            umlID:0,
            xmlSrc:"",
             src:"https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=unsavedChanges&proto=json&noSaveBtn=1&noExitBtn=1",
            
        }
    },
    created(){

        this.umlID=this.$route.query.umlID
        this.xmlSrc=this.$route.query.xmlSrc
        console.log(this.umlID, this.xmlSrc)
    },
    methods:{

    },
    mounted(){
        window.addEventListener('message', evt=>{
          var msg=JSON.parse(evt.data)
          console.log(msg)
          if(msg.event=="init"){
            console.log("准备就绪，可以传送消息")
            var msg={action:"load", autosave:1, saveAndExit: '1', modified: 'unsavedChanges',
            xml: this.xmlSrc}
            this.$refs.iframe.contentWindow.postMessage(JSON.stringify(msg), '*')
          }else if(msg.event=='save'){
            var imgSrc = msg.xml
            console.log("返回的xml",imgSrc)
            this.$axios({
                method: 'post',
                url: '/api/file/update_xml ',
                data: qs.stringify({
                    'xmlID':this.umlID,
                    'content':imgSrc

                })
            })
                .then(res => {
                console.log(res.data)
                if (res.data.errno === 0) {
                    this.$message.success("保存xml成功");
                     this.$router.push('/project/uml')
                } else {
                    this.$router.push('/project/uml')
                    // alert(res.data.msg);
                    // this.$message.error(res.data.msg);
                }
                
                })
                .catch(err => {
                console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
            // this.$router.push('/project/uml')
          }
    })
    }
}
</script>