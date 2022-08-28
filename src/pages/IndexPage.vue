<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      @row-click="onRowClick"
      row-key="name"
    />
  </div>
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
      return this.$store.state.user
    }
  },
  mounted () {
    this.getList()
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
