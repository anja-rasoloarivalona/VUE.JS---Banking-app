<template>
    <div class="verify">
        <h1>Verification code</h1>
        <div class="verify__text">
            There may be a delay before receiving your code
        </div>
        <div class="verify__info">
            <div class="verify__info__img">
                <app-icon name="email" color="primary" size="extra-large"/>
            </div>
            <div class="verify__info__text">
                <div>The client center sent your code to</div>
                <div><b>{{userEmail}}</b></div>
            </div>
        </div>
        <form class="verify__form">
            <app-basic-input v-model="code" id="Enter the code" bgWhite/>
            <div>Back to signup</div>
            <app-btn @click.native="submit">
                <span v-if="!loading">Confirm</span>
                <app-spinner v-else></app-spinner>
            </app-btn>
        </form>
    </div>
</template>

<script>
import { verifyCodeQuery } from '@/graphQL/authQuery'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      code: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    userEmail () {
      const email = this.$store.state.auth.userEmail
      const emailName = email.split('@')[0]
      const emailDomaine = email.split('@')[1]
      const res = `${emailName.charAt(0)}...${emailName.slice(-1)}@${emailDomaine}`
      return res
    }
  },
  methods: {
    ...mapMutations([
      'setAppStatus',
      'addError'
    ]),
    submit: async function () {
      this.loading = true
      const graphQLQuery = verifyCodeQuery(this.code)
      try {
        const response = await axios.post('/', graphQLQuery)
        const resData = response.data.data.verifyUserCode
        if (resData === 'succeeded') {
          this.loading = false
          this.setAppStatus('setup')
          this.$emit('displayWelcome')
        }
      } catch (err) {
        this.loading = false
        err.response.data.errors.forEach((err, index) => {
          setTimeout(() => this.addError(err.message), (index + 1) * 500)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.verify {
    width: 50rem;
    height: 50vh;
    padding: 3rem 5rem;
    background: var(--backgroundColor);
    border-radius: .5rem;
    & h1 {
        color: var(--mainColor);
        margin-bottom: 2rem;
        font-size: 3rem;
    }
    &__text {
        font-size: $font-m;
        color: var(--textColor--dark);
        margin-bottom: 2rem;
    }
    &__info {
        margin-bottom: 2rem;
        background: #dfeaee;
        border-radius: .5rem;
        padding: 2rem;
        display: flex;
        font-size: $font-m;
        &__img {
            // background: red;
        }
        &__text {
            width: 100%;
            text-align: center;
            & div:first-child {
                margin-bottom: 1rem;
            }
        }
    }
    & button {
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
}
</style>
