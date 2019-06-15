<template>
  <div class="comment-item">
    <el-divider></el-divider>
    <el-row>
      <el-col :span="1.5">
        <div class="block">
          <el-image class="com-head" :src="avatar_sm"></el-image>
        </div>
      </el-col>
      <el-col :span="20">
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
          <el-col :span="2" :offset="17"> </el-col>
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
    }
  },
  mounted: function() {
    const date = new Date(this.comment_time);
    //alert(date);
    let month1 = date.getMonth() + 1;
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    let day1 = date.getDate();
    if (day1 < 10) {
      day1 = "0" + day1;
    }
    let hours = date.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    this.dateStr = `${date.getFullYear()}/${month1}/${day1} ${hours}:${minutes}:${seconds}`;
    //显示父评论
    /* if (this.parent_comment_id !== 0 && this.parent_comment_id !== null) {
      this.has_parent = !this.has_parent;
      this.query(this.parent_comment_id);
    } */
  }
};
</script>

<style scoped>
.comment-item {
  width: 100%;
  border-radius: 10px;
}
.el-row {
  margin-bottom: 5px;
}
.el-col {
  border-radius: 4px;
}
.com-head {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}
.block {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: #606266;
  box-shadow: 3px 3px 5px #606264;
  margin-right: 20px;
  margin-left: 20px;
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
  font-size: 15px;
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
  width: 100%;
}
</style>
