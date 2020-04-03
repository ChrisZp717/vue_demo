<template>
  <!-- 悬浮窗口 -->
  <div class="panel panel-default" id="uploadInfo">
    <div class="panel-heading">
      <h3 class="panel-title">文件解析进程</h3>
    </div>
    <div class="panel-body">
      <ul class="list-group">
        <li class="list-group-item" v-for="(item, index) in selectList" :key="index">
          <div class="fileInfoList">
            <span>文件名: {{ item.name }}</span>
            <span>大小: {{ Math.round(item.size / 1024) }}KB</span>
            <span>状态: {{ state(item.state) }}</span>
          </div>
          <el-button id="cancelBtn" type="primary" @click="cancel(item, index)" v-if="item.state === 0">取 消</el-button>
          <div class="progress">
            <div class="progress-bar progress-bar-info" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="`width: ${ item.progress || 0 }%`">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import sparkMD5 from '../js/sparkMD5.js';
  export default {
    props: {
      selectList: Array,
      // successList: Array
    },
    methods: {
      cancel(file, index) {
        clearTimeout(file.timer); // 清除定时器
        file.timer = null; // 将定时器置为 Null
        file.state = 2; // 将state置为2，代表取消解析
        this.selectList.splice(index, 1, file); // 更新列表
      },
      state(state) {
        if (state === 0) return '解析中';
        if (state === 1) return '解析成功';
        if (state === 2) return '取消解析';
      }
    },
    watch: {
      selectList() {
        let list = this.selectList;
        list.forEach((file) => {
          let index = list.indexOf(file);
          if (file.state === 0 && file.progress === null) {
            sparkMD5(file, index, list);
          }
        })
      }
    }
  }
</script>

<style>
  .fileInfoList {
    width: 70%;
    display: inline-block;
  }

  span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
  }
  
  span:last-child {
    margin-bottom: 3px;
  }

  #uploadInfo {
    width: 400px;
    height: 400px;
    position: fixed;
    right: 0;
    bottom: 0;
  }

  .panel-body {
    height: 370px;
  }

  .list-group {
    height: 98%;
    /* overflow: auto; */
    overflow-y: overlay;
  }

  .list-group li {
    padding-right: 35px;
  }

  .progress {
    margin: 0;
    padding: 0;
    height: 5px;
  }

  #cancelBtn {
    width: 30%;
    float: right;
  }
</style>
