<template>
  <div
      class="wallet"
      :class="{'bg-on-surfaceColor': theme.isDark, light: theme.isLight }"
      v-bind="$attrs"
      :style="{boxShadow: boxShadow}"
      @click="editWallet"
  >
    <div class="wallet__chip">
      <div class="wallet__chip__content" :class="{light: theme.isLight, dark: theme.isDark}">
        <div
          v-for="(point, i) in chipPoints"
          :key='i'
          class="wallet__chip__content__point"
          :class="{dot: point === 'x'}"
        >
        </div>
      </div>
    </div>
    <div class="wallet__name">{{wallet.name}}</div>
    <div class="wallet__amount" :class="{'txt-mainColor': theme.isDark}" v-if="!ghost">{{wallet.amount | amount }}</div>
    <div class="wallet__amount" :class="{'txt-mainColor': theme.isDark}" v-else>$***</div>
    <div class="wallet__type" :class="{'txt-darkColor': theme.isDark}">{{$t(walletType)}}</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      chipPoints: [
        ' ', 'x', ' ', ' ', ' ', 'x', ' ',
        ' ', 'x', 'x', 'x', 'x', 'x', 'x',
        ' ', ' ', ' ', 'x', 'x', 'x', ' ',
        ' ', 'x', 'x', 'x', 'x', 'x', ' ',
        ' ', 'x', 'x', 'x', 'x', ' ', ' '
      ]
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'user'
    ]),
    boxShadow () {
      if (this.theme.isDark) {
        return '3px 3px 7px #191919, -3px -3px 7px #212121'
      } else {
        return '2px 2px 3px #b8b7b7, -3px -3px 7px #ebebeb'
      }
    },
    walletType () {
      let walletType = ''
      this.user.walletTypeList.find((type, index) => {
        if (type.value === this.wallet.walletType || type.value === this.wallet.walletType.value) {
          walletType = this.user.walletTypeList[index].i18
          return true
        }
      })
      return walletType
    }
  },
  methods: {
    ...mapMutations([
      'setEditedWallet',
      'openBackdrop'
    ]),
    editWallet () {
      this.setEditedWallet(this.wallet)
      this.openBackdrop('wallet')
    }
  },
  props: {
    wallet: Object,
    ghost: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wallet {
    min-width: 25rem;
    max-width: 25rem;
    height: 12rem;
    margin: 1rem 0;
    padding: 1.5rem;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    color: $color-white;
    cursor: pointer;
    .light {
      background: whitesmoke;
    }
    &__chip  {
      &__content {
        border-radius: .5rem;
        width: 3rem;
        height: 2rem;
        background: var( --on-surfaceColor);
        display: grid;
        grid-template-columns: repeat(7,1fr);
        grid-template-rows: repeat(5, 1fr);
        align-items: center;
        justify-items: center;
        padding: 2px;
        &.light {
          background-image: linear-gradient(to bottom right, rgb(212, 212, 212), rgb(175, 174, 174));
        }
        &.dark {
          background-image: linear-gradient(to bottom right, rgb(28, 28, 28), rgb(56, 56, 56));
          box-shadow: 3px 2px 2px rgba(8, 8, 8, 0.2) inset, -1px -1px 3px rgba(109, 109, 109, 0.05) inset;
        }
        &__point {
          width: 1px;
          height: 1px;
          &.dot {
            background: rgb(104, 103, 103);
          }
        }
      }
    }
    &__name {
      display: flex;
      justify-content: flex-end;
      color: var(--secondaryColor);
      font-size: $font-s;
    }
    &__type {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      font-size: $font-s;
      color: var(--textColor--dark);
    }
    &__amount {
      display: flex;
      align-items: flex-end;
      font-size: $font-m;
      color: var(--mainColor);
    }
}
</style>
