<template>
  <div>
    <h3>使用margin负值法进行布局</h3>
    <div class="clearfix">
      <div class="wrap">
        <div class="main">右侧主栏</div>
      </div>
      <div class="side">左侧副栏</div>
    </div>
    <div class="footer">
      底部
    </div>
  </div>
</template>
<style>
.clearfix:before,

.clearfix:after {
  content: ' ';
  display: table;
}

.clearfix:after {
  clear: both;
}

.wrap {
  width: 100%;
  height: 200px;
  background-color: #fff;
  float: left;
}

.main {
  height: 200px;
  margin-left: 210px;
  background-color: #378;
}

.side {
  float: left;
  margin-left: -100%;
  width: 200px;
  height: 200px;
  background-color: #cccccc;
}

.footer {
  width: 100%;
  height: 100px;
  background-color: #eee;
}
</style>
<script>

</script>





