<template>
  <div class="comment-item">
    <el-row>
      <el-col :span="1">
        <div class="block">
          <el-image class="com-head" :src="avatar_sm"></el-image>
        </div>
      </el-col>
      <el-col :span="23">
        <div class="username">
          <strong>{{ user_nickname }}</strong>
        </div>
        <div class="parent-comment" v-show="has_parent">
          <div class="par-username">
            <strong>{{ parent_comment.user_nickname }}</strong>
          </div>
          <div class="par-com-comtent">
            {{ parent_comment.comment }}
          </div>
        </div>
        <div class="com-content">
          {{ comment }}
        </div>
        <el-row class="com-footer">
          <el-col :span="5">{{ dateStr }}</el-col>
          <el-col :span="2" :offset="17">
            <div class="el-icon-chat-dot-square" @click="reply">回复</div>
          </el-col>
        </el-row>
        <el-input
          type="textarea"
          v-model="textarea"
          v-if="flag"
          :placeholder="placeStr"
          class="com-reply"
        ></el-input>
      </el-col>
    </el-row>
    <label class="gray_line"></label>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    avatar_sm: {
      type: String,
      required: true
    },
    user_nickname: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    comment_time: {
      type: Number,
      required: true
    },
    parent_comment_id: {
      type: Number
    }
  },
  data() {
    return {
      flag: false,
      has_parent: false,
      placeStr: "回复" + this.user_nickname,
      dateStr: "",
      textarea: "",
      parent_comment: []
    };
  },
  methods: {
    reply: function() {
      this.flag = !this.flag;
    },
    query: function(parent_comment_id) {
      this.axios
        .post("./comment/parent_query", { parent_comment_id })
        .then(resp => {
          //console.log(resp);
          if (resp.code === 0) {
            this.parent_comment = resp.data.arr;
          }
        })
        .catch(e => {
          console.log("Query failed. You may encounter a network broken.");
          console.log(e);
        });
    }
  },
  mounted: function() {
    const date = new Date(this.comment_time);
    let month1 = date.getMonth() + 1;
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    let day1 = date.getDate();
    if (day1 < 10) {
      day1 = "0" + day1;
    }
    this.dateStr = `${date.getFullYear()}/${month1}/${day1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //显示父评论
    if (this.parent_comment_id !== 0 && this.parent_comment_id !== null) {
      this.has_parent = !this.has_parent;
      this.query(this.parent_comment_id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 5px;
}
.el-col {
  border-radius: 4px;
}
.com-head {
  width: 80%;
  height: 80%;
}
.gray_line {
  background: #e5e5e5;
  width: 100%;
  height: 2px;
  float: left;
  margin: 0 5px;
}
.username {
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
}
.com-content {
  text-align: left;
  font-size: 16px;
  color: #606266;
  margin-bottom: 10px;
}
.com-footer {
  text-align: left;
  font-size: 10px;
  color: #909399;
  margin-bottom: 5px;
}
.com-reply {
  margin: 10px 10px;
  width: 90%;
}
</style>
