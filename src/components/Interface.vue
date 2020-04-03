<template>
  <div>
    <button id="upload" @click="dialogVisible = true;" class="btn btn-info">上传文件</button>
    <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <input type="file" multiple="multiple" id="selectFile">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>
    <div id="successList">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">成功解析文件列表</h3>
        </div>
        <div class="panel-body">
          <ul class="list-group">
            <li class="list-group-item" v-for="(file, index) in successList" :key="index">
              <span>文件名: {{ file.name }}</span>
              <span>大小: {{ Math.round(file.size / 1024) }}KB</span>
              <span>MD5: {{ file.md5 }}</span>
              <span>identity: {{ file.identity }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectList: Array,
      identity: String
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    computed:{
      successList() {
        return this.selectList.filter((file) => {
          return file.state === 1 && file.identity === this.identity;
        })
      }
    },
    methods: {
      upload() {
        var inputFiles = document.getElementById('selectFile');
        // FileList {0: File, 1: File, length: 2}
        for (let i = 0; i < inputFiles.files.length; i++) {
          let file = inputFiles.files[i];
          let isExist = false;
          let fileIndex = 0;
          // 将file存入selectList中
          this.selectList.forEach((item, index) => {
            if (item.name === file.name) {
              isExist = true;
              fileIndex = index;
              return;
            }
          });
          // state：标识文件状态，0代表未解析/解析中，1代表解析成功，2代表取消解析
          file.state = 0;
          // progress：当前文件的解析进度，null为未开始解析
          file.progress = null;
          // identity：代表当前界面标识
          file.identity = this.identity;

          if (isExist === false) {
            this.selectList.push(file);
          } else {
            this.$confirm('已存在同名文件，是否覆盖？')
              .then(_ => {
                done(this.selectList.splice(fileIndex, 1, file));
              })
              .catch(_ => {});
          }
        }
        this.dialogVisible = false;
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style scoped>
  #upload {
    width: 40%;
    display: block;
    margin: 10px auto;
  }

  #successList {
    width: 80%;
    margin: 10px auto;
  }

  ul li {
    text-align: center;
  }

  span {
    display: block;
  }
  .panel-body {
    height: auto;
  }
</style>
