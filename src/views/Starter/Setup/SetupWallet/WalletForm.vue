<template>
    <div class="walletForm">
        <form class="form">
                <app-select-input :id="'type'"  :options="cardType" @selectInput="walletInput.type = $event" bgWhite/>
                <app-input v-model="walletInput.supplier" :id="'supplier'" bgWhite/>
                <app-input v-model="walletInput.amount" :id="'amount'" bgWhite/>
                <app-input v-model="walletInput.shortId" :id="'Last  4 numbers'" bgWhite/>
                <div class="form__color">
                      <span>Color</span>
                      <div class="form__color__select">
                        <div class="form__color__select__value" :style="{background: walletInput.color}" @click="showColorList = !showColorList"></div>
                        <ul class="form__color__select__list" v-if="showColorList">
                          <li
                            v-for="(color, index) in colorList"
                            :key="index" class="form__color__select__list__item"
                            :style="{background: color}"
                            @click="chooseColor(color)">
                          </li>
                        </ul>
                      </div>
                </div>
                <app-btn normal :click="addCard">
                    Add
                </app-btn>
        </form>
        <div class="walletForm__preview">
          <div class="walletForm__preview__card">
              <app-card :card="walletInput" large></app-card>
          </div>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card'
export default {
  data () {
    return {
      walletInput: {
        type: 'Visa',
        amount: 0,
        supplier: 'Bank',
        shortId: 1234,
        color: 'Brown'
      },
      cardType: ['Visa', 'MasterCard', 'Debit', 'Cash'],
      showColorList: false,
      colorList: ['Brown', 'Chocolate', 'Coral', 'Crimson', 'DarkCyan', 'DarkBlue', 'FireBrick', 'OrangeRed', 'Teal']
    }
  },
  components: {
    'app-card': Card
  },
  methods: {
    chooseColor (value) {
      this.walletInput.color = value
      this.showColorList = false
    },
    addCard () {
      console.log('yes')
    }
  }
}
</script>

<style lang="scss" scoped>
.walletForm {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    background: $color-grey--light;
    border-radius: .5rem;

    & .form {
      width: 30%;
      padding: 2rem;
      &__color {
        display: flex;
        align-items: center;
        margin-bottom: 6rem;
        & span {
          width: 6rem;
          margin-bottom: 0.5rem;
          font-size: $font-m;
          color: $color-grey--dark;
        }
        &__select {
          position: relative;
          &__value {
            width: 2em;
            height: 2rem;
            border: 1px solid $color-grey--main;
            border-radius: .3rem;
            cursor: pointer;
          }
          &__list {
            position: absolute;
            top: 0rem;
            left: 6rem;
            list-style: none;
            width: 6rem;
            display: grid;
            border-radius: .5rem;
            overflow: hidden;
            grid-template-columns: repeat(auto-fit, 2rem);
            grid-auto-rows: 2rem;
            &__item {
              width: 2rem;
              height: 2rem;
              cursor: pointer;
            }
          }
        }
      }
      & button {
        height: 3.5rem;
      }
    }

    &__preview {
      width: 100%;
      background: $color-grey--light;
      display: flex;
      align-items: center;
      justify-content: center;
      &__card {
        width: 80%;
        height: 80%;
        background: $color-white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .5rem;
      }
    }
}
</style>
