export default function(file, index, fileList) {
  // File的slice方法的兼容写法
  let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  let chunkSize = 2097152; // 每个分片最大2MB
  let chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  let sparkMD5 = new SparkMD5.ArrayBuffer();
  // 创建FileReader实例
  let fileReader = new FileReader();

  fileReader.onload = function(e) {
    // 进行SparkMD5分片解析
    file.progress = Math.ceil(currentChunk * chunkSize / file.size * 100);
    currentChunk += 1;
    sparkMD5.append(e.target.result);

    if (currentChunk < chunks) {
      /*
        将任务放到定时器中，异步执行
        当清除timer后，timer值为null
        loadNext就不会再执行，即不会继续解析
      */
      if (file.timer !== null) {
        // console.log('添加之前', file.timer, file.name, currentChunk)
        file.timer = setTimeout(() => {
          loadNext();
          fileList.splice(index, 1, file);
        }, 0);
        // console.log('添加之后', file.timer);
      }
    } else {
      clearTimeout(file.timer);
      file.state = 1;
      file.md5 = sparkMD5.end();
      file.progress = 100;
      // console.log('sparkMD5', file);
      fileList.splice(index, 1, file);
    }
  }

  loadNext();

  function loadNext() {
    let start = currentChunk * chunkSize;
    let end = start + chunkSize > file.size ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }
}
