<template>
  <div class="main">
    <!-- 头部 -->
    <header>
      <ul class="nav nav-pills nav-justified">
        <li :class="{ active: isActive }" @click="clickA">
          <router-link to="interfaceA">界面A</router-link>
        </li>
        <li :class="{ active: !isActive }" @click="clickB">
          <router-link to="interfaceB">界面B</router-link>
        </li>
      </ul>
    </header>
    <!-- 界面A/B -->
    <router-view :selectList="selectList" :identity="identity"></router-view>
    <!-- 悬浮窗口 -->
    <UploadInfo :selectList="selectList"></UploadInfo>
  </div>
</template>

<script>
  import UploadInfo from './components/UploadInfo.vue';

  export default {
    data() {
      return {
        isActive: true,
        identity: 'A',
        selectList: [],
        destroy: true
      }
    },
    components: {
      UploadInfo
    },
    mounted() {
      if(this.$route.path.charAt(10) === 'B') {
        this.isActive = false;
        this.identity = 'B';
      };
    },
    methods: {
      clickA() {
        this.isActive = true;
        this.identity = 'A';
      },
      clickB() {
        this.isActive = false;
        this.identity = 'B';
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 70%;
    min-height: 700px;
    margin: 0 auto;
    border: 1px solid #0d030f;
    border-radius: 5px;
  }
</style>
