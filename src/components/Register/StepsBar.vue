<template>
  <div id="register-steps-bar">
    <el-steps :active="step - 1" simple>
      <el-step title="填写用户信息" icon="el-icon-user-solid" />
      <el-step title="上传头像" icon="el-icon-picture" />
      <el-step title="选择兴趣" icon="el-icon-s-opportunity" />
      <el-step title="完成" icon="el-icon-success" />
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "RegisterStepsBar",
  props: {
    step: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped></style>
