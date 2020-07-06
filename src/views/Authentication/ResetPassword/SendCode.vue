<template>
    <form>
        <app-basic-input id="Enter your email" v-model="email"/>
        <app-btn @click.native="sendCode">
            <span v-if="!loading">Send code</span>
            <app-spinner v-else></app-spinner>
        </app-btn>
    </form>
</template>

<script>
import { validator } from '@/utilities/input-validator.js'
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      loading: false
    }
  },
  methods: {
    ...mapMutations([
      'addError'
    ]),
    sendCode: async function () {
      const errors = validator({ email: this.email })
      if (errors.length > 0) {
        errors.forEach((err, index) => {
          setTimeout(() => this.addError(err), (index + 1) * 500)
        })
        this.loading = false
        return
      }
      this.loading = true
      const graphqlQuery = { query: `{sendCodeToResetPassword(email:"${this.email}")}` }
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.sendCodeToResetPassword
        this.loading = false
        if (resData === 'Code sent') {
          this.$emit('code-sent', this.email)
        }
      } catch (err) {
        // console.log(err.response)
        err.response.data.errors.forEach((err, index) => {
          setTimeout(() => this.addError(err.message), (index + 1) * 500)
        })
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
    background: var(--mainColor);
    height: 4.5rem !important;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0 !important;
    margin-top: 2rem !important;
    & span {
    color: $color-white;
    margin-bottom: 0;
    }
}
</style>
