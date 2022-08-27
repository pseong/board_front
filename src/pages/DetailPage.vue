<template>
  <div class="q-pa-md">
    <q-list bordered>
      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Voted!</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item
        group="somegroup"
        icon="mdi-explore"
        label="답글 달기"
        default-opened
        header-class="text-primary"
      >
        <q-card>
          <q-card-section>
            <q-editor v-model="editor" min-height="5rem" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Voted!</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item group="somegroup" icon="mdi-perm_identity" label="답글 달기" header-class="text-teal">
        <q-card>
          <q-card-section>
            <q-editor v-model="editor" min-height="5rem" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Voted!</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item group="somegroup" icon="mdi-mdi-shopping_cart" label="답글 달기" header-class="text-purple">
        <q-card>
          <q-card-section>
            <q-editor v-model="editor" min-height="5rem" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Voted!</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item group="somegroup" icon="mdi-mdi-shopping_cart" label="답글 달기" header-class="text-purple">
        <q-card>
          <q-card-section>
            <q-editor v-model="editor" min-height="5rem" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailPage',
  data () {
    return {
      boardList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      console.log('board_rid: ', this.$route.query.board_rid)
      this.boardList = (await axios({
        method: 'post',
        url: 'http://49.165.168.138:8000/boards/detail',
        data: { board_rid: this.$route.query.board_rid },
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      }).catch(e => {
        console.log(e)
      })).data
      console.log(this.boardList)
    }
  }
}
</script>
