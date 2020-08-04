<template>
  <div class="hello">
    <div style="margin: 20px 0;"></div>
    <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入内容"
            v-model="textarea">
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-button @click="send(textarea)"> 发送</el-button>
    <el-button @click="copyFromClip()"> 发送剪贴板</el-button>


    <div style="margin: 20px 0;"></div>
    <div style="margin: 20px 0;"></div>


    <ul class="infinite-list"  style="overflow:auto">
      <li v-for="(item,index) in cloudText" class="infinite-list-item" style="margin: 5%">


        <el-card class="box-card" @click = "test()">
          <div slot="header" class="clearfix">
            <span>剪贴板id: &nbsp;&nbsp;&nbsp;{{item.Id}}-----点击文字可复制</span>
            <el-button class="btn" :data-clipboard-text="cloudText[index].Text" @click = "copy()" style="float: right; padding: 3px 0" type="text">复制</el-button>
          </div>
          <div class="btn" :data-clipboard-text="cloudText[index].Text" @click = "copy()">
              {{item.Text}}
          </div>
        </el-card>


      </li>
    </ul>



  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      textarea: "",
      cloudText:[
              {
        "CreateTime": "2020-04-06 23:01:26",
        "UpdateTime": "2020-04-06 23:01:26",
        "Id": 0,
        "Text": "网络无法访问",
        "Type": 1
      },{
        "CreateTime": "2020-04-06 23:01:26",
        "UpdateTime": "2020-04-06 23:01:26",
        "Id": 0,
        "Text": "网络无法访问",
        "Type": 1
      },{
        "CreateTime": "2020-04-06 23:01:26",
        "UpdateTime": "2020-04-06 23:01:26",
        "Id": 0,
        "Text": "网络无法访问",
        "Type": 1
      },{
        "CreateTime": "2020-04-06 23:01:26",
        "UpdateTime": "2020-04-06 23:01:26",
        "Id": 0,
        "Text": "网络无法访问",
        "Type": 1
      },{
        "CreateTime": "2020-04-06 23:01:26",
        "UpdateTime": "2020-04-06 23:01:26",
        "Id": 0,
        "Text": "网络无法访问",
        "Type": 1
      },{
        "CreateTime": "2020-04-06 23:01:26",
        "UpdateTime": "2020-04-06 23:01:26",
        "Id": 0,
        "Text": "网络无法访问",
        "Type": 1
      },],
      cliptext: ""
    }
  },
  methods:{
    send(sendtext){
      this.$axios({
        method: "post",
        url: "http://localhost:8090/clip/insert", // 接口地址
        data: {
          text: sendtext  // 传接口参数
        }
      }).then(response => {
        console.log(response, "success");   // 成功的返回
        this.$message({
          message: '插入成功',
          type: 'success'
        });
      }).catch(error => console.log(error, "error")); // 失败的返回


      setTimeout(()=>{
        this.query()
      },500)

    },
    query(){
      this.$axios({
        method: "post",
        url: "http://localhost:8090/clip/query", // 接口地址
        data: {
        }
      }).then(response => {
        console.log(response, "success");   // 成功的返回
        this.cloudText = response.data.data;
        this.$message({
          message: '查询成功',
          type: 'success'
        });
      }).catch(error => {
        console.log(error, "error")
        this.$message({
          message: '网络错误',
          type: 'warning'
        });
      }); // 失败的返回
    },
    copy () {
      console.log("copy")
      const clipboard = new Clipboard('.btn')
      clipboard.on('success',e =>{
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        clipboard.destroy() //使用destroy可以清楚缓存
      })
      clipboard.on('error', e => {
        alert('copy error')
        clipboard.destroy()
      })
    },
    test(index){
      console.log("test")
    },
    copyFromClip(){
      navigator.clipboard.readText().then(
        clipText => {
          this.cliptext = clipText
          this.send(clipText);
        }
      );
    }


  },
  created() {
    //先发送一边
/*
    navigator.clipboard.readText().then(
            clipText => {
              this.cliptext = clipText
              this.send(clipText);
            });
*/
      this.query();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%
  }

  li {list-style-type:none; margin: 0 0 0 0;padding:0;}
  ul {
    margin:auto auto;
    padding:0;
    text-align: center;
  }

  el-card{
    margin: auto auto auto auto;
  }
</style>
