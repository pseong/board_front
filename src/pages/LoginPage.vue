<template>
  <q-page class="flex flex-center" padding>
    <div class="full-width" style="max-width: 300px">
      <h5 class="q-my-md text-center">Login</h5>
      <q-card>
        <q-card-section>
          <q-form>
            <q-input filled v-model="id" ref="id" label="id" placeholder="id" class="q-mb-md" />
            <q-input filled v-model="password" label="password" type="password" class="q-mb-sm" />
            <!--<q-checkbox label="remember me" :model-value="true" />-->
          </q-form>
        </q-card-section>
        <q-btn label="login" @click="login" class="full-width" color="primary"></q-btn>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data () {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const ret = await axios({
        method: 'post',
        url: 'http://49.165.168.138:8000/login/password',
        data: { id: this.id, password: this.password }
      }).catch(e => {
        console.log(e)
        return false
      })
      if (ret === false) {
        this.$q.notify({
          message: '아이디 패스워드를 확인해주세요.',
          color: 'negative'
        })
        this.id = ''
        this.password = ''
        this.$refs.id.focus()
      } else {
        this.$store.commit('login', ret.data.access_token)
        console.log(ret.data.access_token)
        this.$router.push('/')
      }
    }
  }
}
</script>
