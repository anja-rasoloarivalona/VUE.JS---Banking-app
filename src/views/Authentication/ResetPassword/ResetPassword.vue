<template>
    <div class="reset">
            <div class="reset__view">
                <h3>Reset password</h3>
                <component
                :is="currentView"
                :user="user"
                @code-sent="setUserEmail($event)"
                @code-correct="setUserToken($event)"
                @setCurrentView="setCurrentView($event)"
                >
                </component>
            </div>
    </div>
</template>

<script>
import SendCode from './SendCode'
import VerifyCode from './VerifyCode'
import ChangePassword from './ChangePassword'
export default {
  data () {
    return {
      currentView: 'SendCode',
      user: {
        token: null,
        email: ''
      }
    }
  },
  components: {
    SendCode,
    VerifyCode,
    ChangePassword
  },
  methods: {
    setUserEmail (email) {
      this.currentView = 'VerifyCode'
      this.user.email = email
    },
    setUserToken (token) {
      this.currentView = 'ChangePassword'
      this.user.token = token
    },
    setCurrentView (view) {
      this.currentView = view
      if (view === 'SendCode') {
        this.resetUser()
      }
    },
    resetUser () {
      this.user = {
        token: null,
        email: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reset {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.reset__view {
    background: var(--surfaceColor);
    width: 50rem;
    // height: 50vh;
    padding: 3rem 5rem;
    border-radius: .5rem;
     & h3 {
        color: var(--mainColor);
        margin-bottom: 2rem;
        font-size: 3rem;
    }
}
</style>
