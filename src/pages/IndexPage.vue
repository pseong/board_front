<template>
  <q-page padding>
    <div class="q-pa-md flex flex-center column items-start q-gutter-md">
      <div class="my-card">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        @row-click="onRowClick"
        row-key="name"
      />
      </div>
    </div>
  </q-page>
</template>
<!--<q-separator />-->

<script>
import axios from 'axios'
export default {
  name: 'IndexPage',
  data () {
    return {
      columns: [
        { name: 'board_rid', align: 'left', label: '번호', field: 'board_rid' },
        { name: 'subject', align: 'left', label: '제목', field: 'subject' },
        { name: 'nickname', align: 'right', label: '닉네임', field: 'nickname' },
        { name: 'created_date', align: 'right', label: '날짜', field: 'created_date' }
      ],
      rows: []
    }
  },
  computed: {
    user () {
      console.log('user')
      return this.$store.state.user
    }
  },
  watch: {
    user: 'getList'
  },
  created () {
    if (this.$store.state.user.token === '') {
      this.$router.push('/login')
    } else {
      this.getList()
    }
  },
  methods: {
    async getList () {
      const ret = await axios({
        method: 'get',
        url: 'http://49.165.168.138:8000/boards',
        data: {},
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      }).catch(e => {
        console.log(e)
        return false
      })
      if (ret === false) {
        this.rows = []
        this.$store.commit('logout')
      } else {
        this.rows = ret.data
      }
    },
    onRowClick (evt, row) {
      this.$router.push({
        path: '/detail',
        query: { board_rid: row.board_rid }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px
</style>
