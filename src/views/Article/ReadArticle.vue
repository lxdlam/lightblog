<template>
  <div id="read-article">
    <div id="title">
      <h1>{{ arr.title }}</h1>
    </div>
    <el-divider></el-divider>
    <div id="info-bar">
      <div id="left-bar">
        <img id="img-bar" :src="this.user_img" alt="" />
        <div id="word-bar">
          <div class="username">
            <strong>{{ arr.author_nickname }}</strong>
          </div>
          <div class="article-info">
            {{ dateStr }} &emsp; 浏览 {{ arr.reading }}
          </div>
        </div>
      </div>
      <div id="right-bar">
        <template v-if="isOnFocus == false">
          <div id="button-bar">
            <el-button plain>+ 关注</el-button>
          </div>
        </template>
        <template v-else-if="isOnFocus == true">
          <div id="button-bar">
            <el-button plain>取消关注</el-button>
          </div>
        </template>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="article-container">
      <Renderer
        content="
### 一、原型链继承
```
var ob = {name:'小明',friends:['小明','小白']};

var ob1 = object(ob);
ob1.name = '小小';
ob1.friends.push('小黑');

var ob2 = object(ob);
console.log(ob2.named);//小明
console.log(ob2.friends);//小明，小白，小黑
```
##### 特点：
原型链中函数可以复用，但造成了属性的不必要共享

##### 说明：
&nbsp;&nbsp;&nbsp;&nbsp; ob1给name赋值时创建了自身的name属性，并未对父对象的name属性进行操作，而ob1对friends进行添加操作时，自身未查找到friends，所以往上查找对父对象的friends进行了修改；所以ob2读取name时，自身没有name，只能从父对象查找，并未受到ob1的影响；而ob2读取friends时直接读取了父对象属性，受到了ob1修改的影响。

##### 缺点：
当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
在创建子类型(例如创建Son的实例)时,不能向超类型(例如Father)的构造函数中传递参数.

"
      ></Renderer>
    </div>
    <div id="thumb-bar">
      <el-button type="primary" plain @click="thumb">喜 欢</el-button>
    </div>

    <el-divider></el-divider>
    <div id="comment-bar">
      <h1>评论</h1>
      <div class="submit-comment">
        <el-row>
          <el-col :span="1">
            <i id="icon-bar" class="el-icon-s-custom"></i>
            <!-- <el-image id="placeholder" icon="el-icon-user"></el-image> -->
          </el-col>
          <el-col :span="22">
            <el-input
              type="textarea"
              :rows="Rows"
              placeholder="输入评论..."
              v-model="textarea"
              @focus="increseRows"
              @blur="decreseRows"
              class="input-comment"
            />
          </el-col>
          <el-button v-if="isOnFocus" type="primary" id="submit-button">
            发表评论
          </el-button>
        </el-row>
      </div>
      <CommentList></CommentList>
      <CommentItem
        avatar_sm="http://pic.baike.soso.com/p/20130110/20130110235135-1881501597.jpg"
        user_nickname="李泽林"
        comment="感谢博主分享"
        :comment_time="1559738627000"
      ></CommentItem>
      <CommentItem
        avatar_sm="https://cn.bing.com/th?id=OIP.Yppu9B9I6HRz4JmUwNXawgAAAA&pid=Api&rs=1&p=0"
        user_nickname="臧博浩"
        comment="博主666"
        :comment_time="1559738627000"
      ></CommentItem>
      <CommentItem
        avatar_sm="https://img.4hw.com.cn/20190529/87fccee3d753990e592c222fe0c697d9.jpg!logo"
        user_nickname="李洋"
        comment="学到了学到了"
        :comment_time="1559738627000"
      ></CommentItem>
    </div>
  </div>
</template>

<script>
import Renderer from "@/components/Markdown/Renderer";
import CommentItem from "@/components/Comment/CommentItem";
import CommentList from "@/components/Comment/CommentList";
export default {
  name: "ReadArticle",
  props: {
    article_id: {
      type: Number,
      required: true
    }
  },
  components: {
    Renderer,
    CommentItem,
    CommentList
  },
  data() {
    return {
      dateStr: "",
      textarea: "",
      Rows: 1,
      isOnFocus: false,
      user_img: "",
      arr: {}
    };
  },
  mounted: function() {
    let articles = {
      response_time: 1559636370445,
      code: 0,
      msg: "success",
      data: {
        start: 0,
        end: 2,
        sum: 2,
        arr: [
          {
            article_id: 1,
            virtual_id: "ac59f05f2d111eca6fc6685333b43998",
            title: "JS中的继承",
            author_id: 1,
            author_nickname: "姚越",
            cover:
              "https://cdn.scotch.io/3660/h49pHk3ORDWKylIlU7bE_maxresdefault.jpg",
            content:
              "# JS中的继承#### [掘金链接](https://juejin.im/entry/588977f28d6d810058e6421d)---### 一、原型链继承//原型式继承  参数o,引用类型值，实质就是一个内存地址",

            articleAbstract: "在这里你可以学到Vue Router的相关内容",
            release_time: 1559627633000,
            thumb: 1,
            reading: 200,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              },
              {
                label_id: 2,
                label_name: "io"
              }
            ]
          }
        ]
      }
    };
    this.arr = articles.data.arr[0];
    this.user_img =
      "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif";
    //////////////////////获取时间
    const date = new Date(articles.data.arr[0].release_time);
    let month1 = date.getMonth() + 1;
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    let day1 = date.getDate();
    if (day1 < 10) {
      day1 = "0" + day1;
    }
    this.dateStr = `${date.getFullYear()}年${month1}月${day1}日 ${date.getHours()}:${date.getMinutes()}`;
  },
  methods: {
    increseRows() {
      //alert("点击了");
      this.Rows = 5;
      this.isOnFocus = true;
    },
    decreseRows() {
      this.Rows = 1;
      this.isOnFocus = false;
    },
    thumb() {}
  }
};
</script>

<style scoped>
#read-article {
  max-width: 1280px;
  width: 960px;
  /* background-color: #eff8fd; */
  background-color: #ffffff;
  box-shadow: 4px 4px 2px #e3e8f3;
  display: table;
  margin: 0 auto;
}
#title h1 {
  width: 100%;
  height: 40px;
  /* background-color: aquamarine; */
  font-family: "Microsoft YaHei";
  font-size: 35px;
  color: #4a4c4e;
  font-weight: bold;
  text-align: start;
  padding-left: 40px;
  padding-top: 20px;
  /* padding-bottom: 5px; */
}
#info-bar {
  width: 100%;
  height: 40px;
  /* background-color: cadetblue; */
  display: flex;
  justify-content: space-between;
  /* padding-top: 20px; */
}
#left-bar {
  height: 100%;
  width: 350px;
  /* background-color: rgb(171, 124, 214); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
}
#word-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 280px;
  /* background-color: aqua; */
  text-align: start;
  padding-left: 20px;
}
#right-bar {
  height: 100%;
  width: 160px;
  /* background-color: blueviolet; */
  /* border: 1px; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-left: 20px; */
}

.circle-md {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
}
.username {
  width: 100%;
  height: 20px;
  /* background-color: brown; */
  font-size: 16px;
  text-align: start;
  /* margin: 15px 0 20px 20px; */
  color: #606266;
}
.article-info {
  width: 100%;
  height: 20px;
  /* background-color: chocolate; */
  font-size: 14px;
  text-align: start;
  color: #606266;
  /* margin: 10px 0 0 20px; */
}
.article-container {
  padding-left: 20px;
  padding-right: 20px;
}
#comment-bar {
  width: 100%;
  min-height: 100px;
  /* background-color: aquamarine; */
}
#comment-bar h1 {
  text-align: center;
  font-size: 15px;
  /* margin-top: 50px; */
}
.submit-comment {
  width: 95%;
  background: #eaf0f8;
  margin-bottom: 20px;
  padding: 10px 0 12px 20px;
}
#placeholder {
  width: 40px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  /* margin-right: 200px; */
}
.input-comment {
  margin-left: 12px;
}
#submit-button {
  width: 100px;
  float: right;
  margin: 10px 30px auto auto;
}
#img-bar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: #606266;
  box-shadow: 3px 3px 5px #606264;
  /* background-color: aqua; */
}
#icon-bar {
  margin-top: 10px;
}
</style>
