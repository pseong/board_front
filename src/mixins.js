import axios from 'axios'

export default {
  methods: {
    async $api (url, method, data, headers) {
      return (await axios({
        url,
        method,
        data,
        headers
      }).catch(e => {
        console.log(e)
      })).data
    },
    $base64 (file) {
      return new Promise(resolve => {
        const a = new FileReader()
        a.onload = e => resolve(e.target.result)
        a.readAsDataURL(file)
      })
    }
  }
}
