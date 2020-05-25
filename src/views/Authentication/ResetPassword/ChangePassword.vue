<template>
    <div class="change">
        <template v-if="!success">
            <div class="change__text">
                Please, enter your new password
            </div>
            <form class="change__form">
                <app-basic-input v-model="data.password" id="New password"/>
                <app-basic-input v-model="data.confirmPassword" id="Enter new password again"/>
                <app-btn @click.native="resetPassword">
                    <span v-if="!loading">Confirm</span>
                    <app-spinner v-else></app-spinner>
                </app-btn>
            </form>
        </template>
        <template v-else>
            <div class="change__text">
                Your password has been updated.
            </div>
        </template>

    </div>
</template>

<script>
import { validator } from '@/utilities/input-validator.js'
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      data: {
        password: '',
        confirmPassword: ''
      },
      success: false
    }
  },
  methods: {
    ...mapMutations([
      'addError',
      'setResettingPasswordToFalse'
    ]),
    resetPassword: async function () {
      const errors = validator(this.data)
      if (errors.length > 0) {
        errors.forEach((err, index) => {
          setTimeout(() => this.addError(err), (index + 1) * 500)
        })
        this.loading = false
        return
      }
      this.loading = true
      const graphqlQuery = {
        query: `mutation {resetPassword(
              email: "${this.user.email}",
              password: "${this.data.password}",
              token: "${this.user.token}"
          )}`
      }
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.resetPassword
        if (resData) {
          this.$emit('reset-success')
        }
        this.loading = false
        this.success = true
        setTimeout(() => this.setResettingPasswordToFalse(), 3000)
      } catch (err) {
        err.response.data.errors.forEach((err, index) => {
          setTimeout(() => this.addError(err.message), (index + 1) * 500)
        })
        this.loading = false
      }
    }
  },
  props: {
    user: Object
  }
}
</script>

<style lang="scss" scoped>
.change {
    &__text {
        font-size: $font-m;
        color: var(--textColor--dark);
        margin-bottom: 2rem;
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
