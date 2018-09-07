<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="avatar" :src="avatar" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="nickName"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'token',
      'nickName',
      'avatar',
      'orders'
    ])
  },
  components: {
    card
  },
  methods: {},
  created () {
  }
}
</script>

<style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128px;
    height: 128px;
    margin: 20px;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }
</style>
