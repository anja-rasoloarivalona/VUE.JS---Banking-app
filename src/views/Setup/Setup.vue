<template>
    <div class="setup">
        <backdrop v-if="displayBackdrop">
            <transition name="fade" mode="out-in" appear>
                <verify-code v-if="currentAppStatus === 'setup-verify-code'" @displayWelcome="loadWelcome"/>
                <welcome v-else-if="displayWelcome" @hideWelcome="hideWelcome"/>
                <!-- <completed v-else-if="isSetupCompleted"/> -->
            </transition>
        </backdrop>

        <div class="setup__view">
          <general />
          <budget v-if="setup.setupType === 'budget'" />
        </div>
    </div>
</template>

<script>
import Backdrop from '@/components/Layout/Backdrop/Backdrop'
// import Completed from './Completed'
import VerifyCode from './VerifyCode'
import Welcome from './Welcome'

import General from './General/General'
import Budget from './Budget/Budget'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      displayBackdrop: false,
      displayWelcome: false,
      displayVerificationCode: false,
      isSetupCompleted: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'setup',
      'currentAppStatus'
    ])
  },
  mounted () {
    if (this.currentAppStatus === 'setup-verify-code') {
      this.displayBackdrop = true
    } else {
      this.loadWelcome()
    }
  },
  methods: {
    loadVerificationCode () {
      setTimeout(() => {
        this.displayVerificationCode = true
        this.displayBackdrop = true
      }, 1000)
    },
    loadWelcome () {
      setTimeout(() => {
        this.displayBackdrop = true
        this.displayWelcome = true
      }, 1000)
    },
    // loadCompleted () {
    //   setTimeout(() => {
    //     this.displayBackdrop = true
    //     this.isSetupCompleted = true
    //   })
    // },
    hideWelcome () {
      this.displayBackdrop = false
      this.displayWelcome = false
      this.loading = false
    }
  },
  components: {
    Backdrop,
    Budget,
    // Completed,
    General,
    VerifyCode,
    Welcome
  }
}
</script>

<style lang="scss" >
.setup {
    width: 100%;
    max-width: 120rem;
    position: relative;
    display: flex;
    justify-content: center;
    ::-webkit-scrollbar {
      display: none !important;
    }
    &__view {
        width: 100%;
        height: 100%;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
        // background: red;
        &__content {
            position: absolute;
            top: 10rem;
            left: 0;
            right: 0;
            margin: auto;
            width: 50%;
            max-width: 50rem;
            // height: 200vh;
            background: $color-white;
            border-radius: .5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 7rem;
            padding-bottom: 2rem;
            transition: all .5s ease-in;
            &.left {
                transform: translateX(-100vw);
            }
            &.right {
                transform: translateX(100vw);
            }
            &.center {
                transform: translateX(0);
            }
            &.expand {
              padding-top: 0;
              max-width: unset;
              width: 100%;
              min-height: 80%;
              top: 0;
              & .setup__view__content__imgContainer {
                left: unset;
                top: 2.5rem;
                left: 3rem;
                margin: unset;
                width: 5rem;
                height: 5rem;
              }
            }
            &__title {
                font-size: 2rem;
                color: var(--textColor--dark);
                margin-bottom: 3rem;
            }
            &__text {
                font-size: $font-s;
                text-align: center;
                margin-top: 3rem;
                line-height: 1.4;
            }
            &__form {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 25rem);
                grid-template-rows: max-content;
                grid-auto-rows: max-content;
                column-gap: 1rem;
                row-gap: 1rem;
                align-items: center;
                justify-content: center;
                justify-items: center;
                padding: 1rem 0;
            }
            &__imgContainer {
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                background: rgb(226, 226, 226);
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                left: 0;
                right: 0;
                margin: auto;
                top: -5rem;
            }
            & .label, & .input {
                width: 25rem !important;
            }
            &__cta {
              // background: green;
              position: absolute;
              bottom: -8rem;
            }
            &--main {
              width: 100%;
              display: flex;
              flex-direction: column;
              padding:  0 3rem;
              padding-bottom: 2rem;
              // background: blue;
              flex: 1;
              & .setup-table {
                // flex: 1;
                // height: 100%;
              }
              &__title {
                  display: flex;
                  align-items: center;
                  height: 10rem;
                  margin-bottom: 3rem;
                  margin-left: 8rem;
                  color: var(--textColor--dark)
              }
              &__add {
                  position: absolute;
                  top: 3rem;
                  right: 3rem;
                  width: 3rem;
                  height: 3rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  &:hover {
                    background: var(--secondaryColor);
                  }
              }
            }
        }
    }
}

</style>
