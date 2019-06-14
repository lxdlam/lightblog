<template>
  <div id="personal-attention">
    <ul
      class="attention-line"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="30px"
    >
      <AttentionItem
        v-for="(item, index) in this.arr"
        :key="index"
        :arr="item"
      ></AttentionItem>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import AttentionItem from "@/components/Auth/Personal/AttentionItem";
export default {
  name: "PersonalAttention",
  props: {},
  data() {
    return {
      arr: [{}],
      loading: false,
      startNum: 0,
      endNum: 10
    };
  },
  components: {
    // 在这里加载你的组件
    AttentionItem
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 1000);
    },
    loadAttention(uid, token, start, end) {
      const vm = this;

      this.$api.follow
        .fetchFollowedList(uid, token, start, end)
        .then(data => {
          vm.arr = data.data.arr;
          // console.log(vm.arr);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("出错啦");
          // console.log(err);
        });
    }
  },
  // computed: {
  // noMore() {
  //   return this.count >= 15;
  // },
  // disabled() {
  //   return this.loading || this.noMore;
  // }
  // },
  mounted: function() {
    // console.log(this.startNum);
    this.loadAttention(
      this.$store.state.user.uid,
      this.$store.state.user.token,
      this.startNum,
      this.endNum
    );
  }
};
</script>

}

<style scoped>
#personal-attention {
  width: 100%;
  /* background-color: aqua; */
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: -20px;
  padding-right: 30px;
}
</style>
