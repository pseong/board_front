<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-page padding>
    <div class="q-pa-md flex flex-center column items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ board.nickname }}</q-item-label>
            <q-item-label caption>
              {{ board.created_date }}
            </q-item-label>
          </q-item-section>
          <div side>
            <q-btn flat round color="red" icon="mdi-heart" />
            <q-btn flat round color="accent" icon="mdi-bookmark" />
            <q-btn flat round color="primary" icon="mdi-share" />
          </div>
        </q-item>
        <q-item>
          {{ board.subject }}
        </q-item>

        <q-separator />

        <q-card-section>
          <q-card-section v-html="board.content" />
        </q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <q-editor
            v-model="editor[0]"
            :definitions="{
              bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
          />
        </div>
        <q-item>
          <q-btn class="my-card" @click="submit(0, board.board_rid, 1)" outline color="primary" label="등록" />
        </q-item>
      </q-card>
      <div class="my-card" flat bordered>
        <q-list bordered class="rounded-borders">
          <div v-bind:key="i" v-for="(comment, i) in commentList">
            <q-expansion-item group="somegroup" v-model="expanded[i+1]" expand-icon-toggle>
              <template v-slot:header>
                <div class="my-card row">
                  <div class="q-ml-xl" v-bind:key="i" v-for="i in comment.LEVEL"></div>
                  <div class="col">
                    <div verticle>
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar>
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ comment.nickname }}</q-item-label>
                          <div class="row">
                            <q-item-label caption >
                              {{ comment.created_date }}
                              <a class="q-ml-xs" @click="expand(i+1)">답글쓰기</a>
                              <a v-if="comment.user_rid === $store.state.user.user_rid" class="q-ml-xs" @click="edit(i+1)">수정</a>
                              <a v-if="comment.user_rid === $store.state.user.user_rid" class="q-ml-xs" @click="remove(comment.board_rid)">삭제</a>
                            </q-item-label>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-card-section v-html="comment.content" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                </div>
              </template>
              <q-card>
                <q-card-section>
                  <q-editor v-model="editor[i+1]" min-height="5rem" />
                </q-card-section>
              </q-card>
              <q-item>
                <q-btn class="my-card" @click="submit(i+1, comment.board_rid, comment.LEVEL)" outline color="primary" label="등록" />
              </q-item>
            </q-expansion-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<!--<q-separator />-->

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px
</style>

<script>
import axios from 'axios'
export default {
  name: 'DetailPage',
  data () {
    return {
      commentList: [],
      board: {},
      editor: Array.apply(null, new Array(1000)).map(String.prototype.valueOf, ''),
      expanded: Array.apply(null, new Array(1000)).map(Boolean.prototype.valueOf, false)
    }
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
      const ret = (await axios({
        method: 'post',
        url: 'http://49.165.168.138:8000/boards/detail',
        data: { board_rid: this.$route.query.board_rid },
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      }).catch(e => {
        console.log(e)
        return false
      }))
      if (ret === false) {
        return false
      } else {
        console.log(ret.data)
        this.commentList = ret.data.comments
        console.log(ret.data.comments)
        this.board = ret.data.board
      }
    },
    async submit (idx, id, lv) {
      console.log(id)
      const ret = (await axios({
        method: 'post',
        url: 'http://49.165.168.138:8000/boards/create',
        data: {
          parent_rid: id,
          subject: this.board.subject,
          content: this.editor[idx],
          lv: lv + 1
        },
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      }).catch(e => {
        console.log(e)
        return false
      }))
      if (ret === false) {
        return false
      } else {
        console.log(ret.data)
        this.getList()
        this.editor[idx] = ''
      }
    },
    expand (idx) {
      if (this.expanded[idx] === true) {
        this.expanded[idx] = false
      } else {
        this.expanded[idx] = true
      }
    },
    edit (idx) {
      if (this.expanded[idx] === true) {
        this.expanded[idx] = false
      } else {
        this.expanded[idx] = true
      }
    },
    async remove (boardRid) {
      console.log(boardRid)
      const ret = (await axios({
        method: 'post',
        url: 'http://49.165.168.138:8000/boards/delete',
        data: {
          board_rid: boardRid
        },
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      }).catch(e => {
        console.log(e)
        return false
      }))
      if (ret === false) {
        this.$q.notify({
          message: '삭제할 수 없습니다.',
          color: 'negative'
        })
      } else {
        this.$q.notify({
          message: '삭제되었습니다.',
          color: 'positive'
        })
        this.getList()
      }
    }
  }
}
</script>
