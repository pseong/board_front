<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          게시판
        </q-toolbar-title>
        <div v-if="user.token==''" >
          <q-btn outline color="white" @click="login" label="로그인" />
        </div>
        <div v-else>
          <q-btn outline color="white" class="q-mx-sm" label="글쓰기" />
          <q-btn outline color="white" @click="logout" label="로그아웃" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
})
</script>
