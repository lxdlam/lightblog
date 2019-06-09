<template>
  <div id="register-interest">
    <h1>关注几个兴趣吧～</h1>
    <div class="interest-table">
      <el-table
        ref="table"
        :data="table_data"
        max-height="600"
        @selection-change="handleChange"
        stripe
      >
        <el-table-column type="selection" width="60" fixed />
        <el-table-column prop="name" label="标签" width="180" fixed />
        <el-table-column prop="desc" label="描述" width="720" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterInterest",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      choiceCount: 0,
      choices: [],
      table_data: [
        { id: "a", name: "a", desc: "aaa" },
        { id: "b", name: "b", desc: "bbb" },
        { id: "c", name: "c", desc: "ccc" },
        { id: "d", name: "d", desc: "ddd" },
        { id: "e", name: "e", desc: "eee" },
        { id: "f", name: "f", desc: "fff" },
        { id: "g", name: "g", desc: "ggg" },
        { id: "h", name: "h", desc: "hhh" },
        { id: "i", name: "i", desc: "iii" },
        { id: "j", name: "j", desc: "jjj" },
        { id: "k", name: "k", desc: "kkk" },
        { id: "l", name: "l", desc: "lll" },
        { id: "m", name: "m", desc: "mmm" },
        { id: "n", name: "n", desc: "nnn" },
        { id: "o", name: "o", desc: "ooo" },
        { id: "p", name: "p", desc: "ppp" },
        { id: "q", name: "q", desc: "qqq" },
        { id: "r", name: "r", desc: "rrr" },
        { id: "s", name: "s", desc: "sss" },
        { id: "t", name: "t", desc: "ttt" },
        { id: "u", name: "u", desc: "uuu" },
        { id: "v", name: "v", desc: "vvv" },
        { id: "w", name: "w", desc: "www" },
        { id: "x", name: "x", desc: "xxx" },
        { id: "y", name: "y", desc: "yyy" },
        { id: "z", name: "z", desc: "zzz" }
      ]
    };
  },
  methods: {
    handleChange(val) {
      const vm = this;

      console.log(this.user.interest);
      vm.user.interest = [];
      val.forEach(row => vm.user.interest.push(row.id));

      vm.$emit("selected");
    }
  }
};
</script>

<style scoped>
#register-interest {
  display: table;
  margin: 0 auto;
}

.interest-table {
  max-width: 960px;
  text-align: center;
}
</style>
