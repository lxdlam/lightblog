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
        :account="item.user_id"
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
      arr: {}
    };
  },
  components: {
    // 在这里加载你的组件
    AttentionItem
  },
  methods: {},
  mounted: function() {
    let attentionList = {
      response_time: 1560315024475,
      code: 0,
      msg: "success",
      data: {
        start: 0,
        end: 1,
        sum: 2,
        arr: [
          {
            user_id: 1,
            user_nickname: "yuasdyuas"
          },
          {
            user_id: 3,
            user_nickname: "liyang"
          }
        ]
      }
    };
    this.arr = attentionList.data.arr;
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
