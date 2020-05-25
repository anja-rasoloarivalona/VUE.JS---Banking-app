<template>
    <div class="verify">
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
                <app-basic-input v-model="code" id="Enter the code"/>
                <div class="verify__form__cta" @click="$emit('setCurrentView', 'SendCode')">Send code again</div>
                <app-btn @click.native="verifyCode">
                    <span v-if="!loading">Confirm</span>
                    <app-spinner v-else></app-spinner>
                </app-btn>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      code: ''
    }
  },
  methods: {
    ...mapMutations([
      'addError'
    ]),
    verifyCode: async function () {
      if (this.code.length < 1) {
        return this.addError('Code is required')
      }
      this.loading = true
      const graphqlQuery = {
        query: `{verifyResetPasswordCode(
          code:"${this.code}",
          email: "${this.user.email}"
          )}`
      }
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.verifyResetPasswordCode
        if (resData) {
          this.$emit('code-correct', resData)
        }
        this.loading = false
      } catch (err) {
        err.response.data.errors.forEach((err, index) => {
          setTimeout(() => this.addError(err.message), (index + 1) * 500)
        })
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ]),
    userEmail () {
      const email = this.user.email
      const emailName = email.split('@')[0]
      const emailDomaine = email.split('@')[1]
      const res = `${emailName.charAt(0)}...${emailName.slice(-1)}@${emailDomaine}`
      return res
    }
  },
  props: {
    user: Object
  }
}
</script>

<style lang="scss" scoped>
.verify {
    &__text {
        font-size: $font-m;
        color: var(--textColor--dark);
        margin-bottom: 2rem;
    }
    &__info {
        margin-bottom: 2rem;
        // background: var(--on-surfaceColor);
        background: var(--backgroundColor);
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
    &__form__cta {
        font-size: $font-s;
        color: var(--textColor--dark);
        cursor: pointer;
        &:hover {
            text-decoration: underline;
            color: var(--mainColor)
        }
    }
}
</style>
