<template>
  <div style="">
  <!-- <img style="cursor: pointer;" title="Click to edit image" @click="editElement(this);"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjEtMTAtMDdUMDM6MjU6NTEuNDU5WiZxdW90OyBhZ2VudD0mcXVvdDs1LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk0LjAuNDYwNi43MSBTYWZhcmkvNTM3LjM2JnF1b3Q7IGV0YWc9JnF1b3Q7eUM3cDVNMGpfaDJ2MFh3NDB3b2UmcXVvdDsgdmVyc2lvbj0mcXVvdDsxNS40LjMmcXVvdDsgdHlwZT0mcXVvdDtlbWJlZCZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDtlbVlSU0REUmtEUDJZZDNFWnkzciZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtqWkpCVDRVd0RJQi96YTdtd1NMaVZYdytMNTR3OFR4WlpZdGpJNk04d0Y4dmM1dXdFQk12Vy91MWE3dTJoRmJkZkxHc0Z5K0dneUw1aWMrRVBwSTh6Mjd2c3ZWeVpQR2tLRXNQV2l1NVI2Y04xUElMd3N0SVI4bGhDTXdqTkVhaDdGUFlHSzJod1lReGE4MlV1bjBZbFdidFdRc0hVRGRNUWZMTzBUZkpVWGhhNXNYR24wRzJJbWJPaW50dmVXZk5aMnZOcUVNK2JUUjRTOGRpbUpCeUVJeWJhWWZvbWRES0dvTmU2dVlLbEd0cjJyR25QNnloNUFHWCtJbFlxd1dOLzRvUVAzRmxhZ3d4WG9VY25JczdtSnNDREhoenlEUUppVkQzckhINnRLNEVvUThDTzdWcTJTb2VDd25GWHNFaXpEc1VDcnVBNlFEdHNyb0VhMnpha3FyVE5wd3NNckViVEJFWUMvdlEvZ2JlK3JBS29SVlIzV2J3WTl2dE9EMS9Bdz09Jmx0Oy9kaWFncmFtJmd0OyZsdDsvbXhmaWxlJmd0OyI+PGRlZnMvPjxnPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAzMHB4OyBtYXJnaW4tbGVmdDogMXB4OyI+PGRpdiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5UaGlzIGlzIGEgdGVzdC48L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iNjAiIHk9IjM0IiBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRoaXMgaXMgYSB0ZXN0LjwvdGV4dD48L3N3aXRjaD48L2c+PC9nPjxzd2l0Y2g+PGcgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5Ii8+PGEgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNSkiIHhsaW5rOmhyZWY9Imh0dHBzOi8vd3d3LmRpYWdyYW1zLm5ldC9kb2MvZmFxL3N2Zy1leHBvcnQtdGV4dC1wcm9ibGVtcyIgdGFyZ2V0PSJfYmxhbmsiPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTBweCIgeD0iNTAlIiB5PSIxMDAlIj5WaWV3ZXIgZG9lcyBub3Qgc3VwcG9ydCBmdWxsIFNWRyAxLjE8L3RleHQ+PC9hPjwvc3dpdGNoPjwvc3ZnPg==">
  -->
 <v-btn @click="sendMessage">sendMessage</v-btn>
    <!-- <div style="width: 100vw;height:6vh;background-color: whitesmoke;">
  <router-link to="/">
    <div>
      <img :src="this.logourl" style="width: 30vh;height:6vh;position: absolute;">
      </div>
  </router-link>
      <div style="position: absolute;left:90vh;height:6vh;background-color: whitesmoke">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select=""
                 style="background-color: whitesmoke;height: 7vh;top:-1vh" text-color="black"
                 active-text-color="red" router>
          <el-menu-item index="/textbustest"><b>文档</b></el-menu-item>
          <el-menu-item index="/prototype"><b>原型设计</b></el-menu-item>
          <el-menu-item index="3"><b>uml绘制</b></el-menu-item>
        </el-menu>
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
</div> -->

  <iframe :src="src" frameborder="1" style="width:100%;height: 94vh;" ref="iframe"></iframe>
  </div>
</template>
<script>
export default {
  setup() {

  },
  data(){
    return{
      logourl: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png',
      activeIndex:'3',
      src:"https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=unsavedChanges&proto=json",
      imgSrc:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjEtMTAtMDdUMDM6MjU6NTEuNDU5WiZxdW90OyBhZ2VudD0mcXVvdDs1LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk0LjAuNDYwNi43MSBTYWZhcmkvNTM3LjM2JnF1b3Q7IGV0YWc9JnF1b3Q7eUM3cDVNMGpfaDJ2MFh3NDB3b2UmcXVvdDsgdmVyc2lvbj0mcXVvdDsxNS40LjMmcXVvdDsgdHlwZT0mcXVvdDtlbWJlZCZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDtlbVlSU0REUmtEUDJZZDNFWnkzciZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtqWkpCVDRVd0RJQi96YTdtd1NMaVZYdytMNTR3OFR4WlpZdGpJNk04d0Y4dmM1dXdFQk12Vy91MWE3dTJoRmJkZkxHc0Z5K0dneUw1aWMrRVBwSTh6Mjd2c3ZWeVpQR2tLRXNQV2l1NVI2Y04xUElMd3N0SVI4bGhDTXdqTkVhaDdGUFlHSzJod1lReGE4MlV1bjBZbFdidFdRc0hVRGRNUWZMTzBUZkpVWGhhNXNYR24wRzJJbWJPaW50dmVXZk5aMnZOcUVNK2JUUjRTOGRpbUpCeUVJeWJhWWZvbWRES0dvTmU2dVlLbEd0cjJyR25QNnloNUFHWCtJbFlxd1dOLzRvUVAzRmxhZ3d4WG9VY25JczdtSnNDREhoenlEUUppVkQzckhINnRLNEVvUThDTzdWcTJTb2VDd25GWHNFaXpEc1VDcnVBNlFEdHNyb0VhMnpha3FyVE5wd3NNckViVEJFWUMvdlEvZ2JlK3JBS29SVlIzV2J3WTl2dE9EMS9Bdz09Jmx0Oy9kaWFncmFtJmd0OyZsdDsvbXhmaWxlJmd0OyI+PGRlZnMvPjxnPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAzMHB4OyBtYXJnaW4tbGVmdDogMXB4OyI+PGRpdiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5UaGlzIGlzIGEgdGVzdC48L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iNjAiIHk9IjM0IiBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRoaXMgaXMgYSB0ZXN0LjwvdGV4dD48L3N3aXRjaD48L2c+PC9nPjxzd2l0Y2g+PGcgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5Ii8+PGEgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNSkiIHhsaW5rOmhyZWY9Imh0dHBzOi8vd3d3LmRpYWdyYW1zLm5ldC9kb2MvZmFxL3N2Zy1leHBvcnQtdGV4dC1wcm9ibGVtcyIgdGFyZ2V0PSJfYmxhbmsiPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTBweCIgeD0iNTAlIiB5PSIxMDAlIj5WaWV3ZXIgZG9lcyBub3Qgc3VwcG9ydCBmdWxsIFNWRyAxLjE8L3RleHQ+PC9hPjwvc3dpdGNoPjwvc3ZnPg=="
    }
  },
  mounted(){
    // iframe对象
    console.log("iframe对象",this.$refs.iframe)
    // iframe的window对象
    this.iframeWin = this.$refs.iframe.contentWindow
    console.log("iframe的window对象",this.iframeWin)
    window.addEventListener('message', evt=>{
          var msg=JSON.parse(evt.data)
          console.log(msg)
          // if(msg.event=="init"){
          //   console.log("准备就绪，可以传送消息")
          //   var msg={action:"load", autosave:1, saveAndExit: '1', modified: 'unsavedChanges',
          //   xml: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAA9CAYAAACJM8YzAAADT3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmVtYmVkLmRpYWdyYW1zLm5ldCUyMiUyMG1vZGlmaWVkJTNEJTIyMjAyMS0wMS0xMVQxMCUzQTQxJTNBMzQuMjQ4WiUyMiUyMGFnZW50JTNEJTIyNS4wJTIwKE1hY2ludG9zaCUzQiUyMEludGVsJTIwTWFjJTIwT1MlMjBYJTIwMTFfMV8wKSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjg3LjAuNDI4MC44OCUyMFNhZmFyaSUyRjUzNy4zNiUyMiUyMGV0YWclM0QlMjJtNXI1QVhFdDE3eWx2WWlEWXo5UyUyMiUyMHZlcnNpb24lM0QlMjIxNC4xLjklMjIlMjB0eXBlJTNEJTIyZW1iZWQlMjIlM0UlM0NkaWFncmFtJTIwaWQlM0QlMjJlbVlSU0REUmtEUDJZZDNFWnkzciUyMiUyMG5hbWUlM0QlMjJQYWdlLTElMjIlM0VqWkxOVG9Rd0VJQ2ZwbGV6MEloNkZkZjE0Z2tUejVXT3ROblNrbElXOE9sdDdWUm9OaVplWU9hYjZmd1RXdmZMeWJKQnZCb09pcFFIdmhENlJNcXlxS283JTJGd3RramVTV1BrVFFXY2tqT215Z2tWJTJCQUx4T2RKSWNSV1VUT0dPWGtrTVBXYUEydHl4aXoxc3k1MjZkUmVkYUJkWkI1Qk5DMFRGM1RkOG1kaVBTJTJCckRiJTJCQXJJVEtYTlJZWDhmckQxMzFrd2E4Mm1qSVZwNmxzSmdEYU5nM013N1JJJTJCRTF0WVlGNlYlMkJxVUdGc2VZVGUlMkY3RGlpV1BiazFOcEZvdGFQZXZDS21KQzFNVHhuZ1RjZ3d1NGNQQ0ZtQjBOMWVaWmlFZE5BTnJnejc3a3lEMFViaGVlYTN3NG5VaFdPd0ZySU5saDdDd0U1Z2VuRjI5QzFyVDBOWmNuYmZsRkltSjNXSXFaQXp2b2ZzTnZNM0JDemlLcEc0NyUyQkxIdGJwd2V2d0UlM0QlM0MlMkZkaWFncmFtJTNFJTNDJTJGbXhmaWxlJTNFoE8CRAAABV1JREFUeF7tm1lIlVsYht+NXoSipGkIGpoDBYqiKIIQSCiRSigOCV2odZuSw51KoYaR8xCkGDmiaCDiVM5JSQiKoSiFaVk5UoKK4nz4Fmd73KmdvZX28ez1rZst7rXW/7/vs961vl/8FQB2wU2nHVAQ5J2dHZ0WKbM4PT29XQF5d5fDrIsLgbgyZF0ku08TQ9ZxwCSPITNkCRyQQCInmSFL4IAEEjnJDFkCBySQyElmyBI4IIFETjJDlsABCSRykhmyBA5IIJGTzJAlcEACiZxkhiyBAxJI5CQzZAkckEAiJ5khS+CABBJPTZLpRra3t6Gvry+B7dqVqDXI379/h5WV1ZHq2tvbERUVha9fvx7o8+DBA3z+/BmlpaVquaNpf7UmBfDlyxf09/cjNDRU3SEq/U46/lgX1eZ/a1JK5+bmxH2+f/8efn5+4tPMzEz8bnR09EjIk5OTWF9fx+XLl9XSqWl/tSYF0NjYiHv37uHTp0/qDlHpd9Lxx7qoNiHvv8GBgQG4u7tjfn4e5ubm4quOjg7cunULd+7cQUVFBc6fP4+ioiLR79mzZ5idnUViYiLq6+uRn58PmiMwMBCFhYUwNjZW0a9pfxqcnp6OyspKbG1twd/fHxkZGfTWwd68tHB8fHwwMTGB4OBgvHjxQqQ6ISEBHz58wLVr15CTk4Nz585hcXERtJvU1NSIRfzo0SM4OTkdGH9caJqO09p2rQ5kX19fBAUF4fbt28Iwejeru7sb9+/fB5mcnZ0tFkVtbS1MTEwQHx+PiIgIxMXFqejWtP/w8LAAUFxcLOal7fjp06fiXpRtdXUVeXl5yM3NRWtrKywtLWFhYYHo6GiEhITg8ePHWFpaQm9vLzIzM8WiffjwIV6+fImkpCT8/PlTzKkc7+bmpimrY/c/dZBXVlZgaGgojLx586YwTgktLS0N1tbWKCgoQGRkpDBubW0Nly5dOhSyuv3HxsZE+jw9PfHt2zcBmdJM193f9m+3BCsrKwtTU1NQKBQizXSczMzMIDU1Fe/evUNZWRkcHR3x9u1bENTOzs4TbffHpXyqINN2rTy337x5gytXrohXPJSQy8vLhbG0RVIjEJR4BweHQyGr25+KPToK6JgwMjISc9Eu8TvIlGA6Kn5ttCucPXsW4eHhAq6trS1iY2Nx9+7dE5/pOgF5f3V9GGQCSom7cOEC+vr6BAT6uaqq6lDI6vYnCJQ8OkNppwgLCxMJ/B3k5ORkvHr1Cj09PeLam5ubGBkZgYeHBz5+/IiLFy/ix48faGhoQExMjCgsx8fHOcn/BpkqW29vbwwNDYmEEAQqwJqamg6FrG7/gIAAAYWOgcHBQXENGpuSkqIyb3Nzs6gX6HGwq6tLFFuvX78WYKlQe/LkifiOzmhnZ2fQQlheXhbFGM07PT29N54mpp3gxo0bQsufbKdqu/4dZHrGpOdkSlldXZ2ovmlbfP78Oby8vA5A1qR/W1ubAEONCjt6vCMAtJhcXFz25iZIrq6u4rp0BtOWTsUgNbqf6upqXL16VRSL9Knc+umeS0pKBGTleJrbwMAALS0tuH79+p9k/P98q5EAbmxsHDiLj3JKnf70HE4QbGxsRCG1sLAAU1NTlccomp8esajYUwKkflRH2Nvb48yZM3u3QAUj/QHHzs5OFJLK9uv4P0r378n/kyRrQxhf4x8HGLIEq4EhM2QJHJBAIieZIUvggAQSOckMWQIHJJDISWbIEjgggUROMkOWwAEJJHKSGbIEDkggkZPMkCVwQAKJnGSGLIEDEkjkJDNkCRyQQCInmSFL4IAEEjnJDFkCBySQqJJkCfRKK1GhUOz+BbaftLWDFNYjAAAAAElFTkSuQmCC"}
          //   this.$refs.iframe.contentWindow.postMessage(JSON.stringify(msg), '*')
          // }
    })
  },
  methods:{
    sendMessage(){
      console.log("向drawio发送消息")
       var msg={action:"load", autosave:1, saveAndExit: '1', modified: 'unsavedChanges',
            xml:this.imgSrc}
            this.$refs.iframe.contentWindow.postMessage(JSON.stringify(msg), '*')
    },
    // 发送消息
    postMessage:function(msg)
    {
        if (this.$refs.iframe != null)
        {
          console.log("发送消息")
            this.$refs.iframe.contentWindow.postMessage(JSON.stringify(msg), '*');
        }
    },
    initializeEditor:function()
    {
        this.postMessage({action: 'load',autosave: 1, saveAndExit: '1',
            modified: 'unsavedChanges', xml: this.getData(),
            title: this.getTitle()});
        
    },
    editElement:function(elem)
    {
        console.log("开始处理图片", elem)
    }
  }
}
</script>
