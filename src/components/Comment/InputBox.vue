<template>
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
          id="input-comment"
        />
      </el-col>
      <el-button
        @click="submitComment($event)"
        v-show="isOnFocus"
        type="primary"
        id="submit-button"
      >
        发表评论
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "InputBox",
  data() {
    return {
      textarea: "",
      Rows: 1,
      isOnFocus: false
    };
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
    thumb() {},
    submitComment(e) {
      //alert("000000");

      e.prventDefault();
    }
  }
};
</script>

<style scoped>
.submit-comment {
  width: 95%;
  background: #eaf0f8;
  margin: auto auto 20px 10px;
  padding: 10px 0 12px 20px;
  border-radius: 7px;
}
#input-comment {
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
