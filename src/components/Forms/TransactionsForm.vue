<template>
    <div class="transactions-form">
        <slot />
        <form>
            <app-select-input v-model="input.transactionType" :options="['Income', 'Expense']" :id="'Type'" />
            <app-date-input   :id="'Date'"  v-model="input.date" />
            <app-category-input v-model="input.genre" v-if="input.transactionType === 'Expense'"/>

            <app-expense-input v-model="input.name" :options="[ 'New transaction']" v-if="input.transactionType === 'Income'" />
            <app-basic-input  :id="'Amount'" v-model="input.amount" />
            <app-basic-input  :id="'Details'" v-model="input.details" />
            <app-select-input :id="'Wallet'" v-model="input.usedWallet" :options="userWallets" v-if="input.transactionType !== ''"/>
            <app-basic-input  :id="'Counter party'" v-model="input.counterparty" v-if="input.transactionType === 'Expense'"/>
        </form>
        <div class="transactions-form__cta">
            <app-btn normal secondary v-if="isCancelBtnDisplayed" @click.native="close">Cancel</app-btn>
            <app-btn normal primary @click.native="submitForm">
                    <span v-if="!loading" v-text="isEditingTransaction ? 'Edit': 'Add'"></span>
                    <app-spinner v-else></app-spinner>
            </app-btn>
        </div>
    </div>
</template>

<script>
import AppExpenseInput from '@/components/Input/ExpenseInput/ExpenseInput'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      input: {
        _id: null,
        budgetId: null,
        date: new Date(),
        genre: {
          category: {

          },
          subcategory: {

          }
        },
        name: null,
        amount: 0,
        details: '',
        usedWallet: '',
        walletId: '',
        transactionType: '',
        counterparty: ''
      },
      loading: false,
      userFixedExpenses: [],
      userWallets: []
    }
  },
  computed: {
    ...mapGetters([
      'walletsNameAndId',
      'isEditingTransaction'
    ]),
    isFixedExpenses () {
      if (this.userFixedExpenses.includes(this.input.name)) {
        return true
      } else return false
    }
  },
  mounted () {

  },
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'resetEditTransaction'
    ]),
    close () {
      this.closeBackdrop()
      this.resetEditTransaction()
    },
    submitForm () {
      this.loading = true
      if (this.isEditingTransaction) {
        this.editTransaction()
      } else {
        this.addTransaction()
      }
    },
    addTransaction: async function () {
      const res = await this.$store.dispatch('addTransaction', this.input)
      if (res) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    },
    editTransaction: async function () {
      const res = await this.$store.dispatch('editTransaction', this.input)
      if (res) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    }
  },
  props: {
    isCancelBtnDisplayed: Boolean
  },
  components: {
    AppExpenseInput
  }
}
</script>

<style lang="scss">
.transactions-form {
     & label.category-input-container {
        grid-column: 1 / -1;
    }
    & form {
        // background: red;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 17vw);
        grid-template-rows: max-content;
        grid-auto-rows: max-content;
        column-gap: 1rem;
        row-gap: 1rem;
        & label span:nth-child(2){
          // height: 4rem;
          & input {
            padding: 0;
            padding-left: 1rem;
            height: 4rem;
          }
        }
        & label.category-input {
          width: 17vw !important;
        }
    }
    &__cta {
       display: flex;
       justify-content: center;
       margin-top: 2rem;
    }
}
.vc-border {
    border-width: 0px !important;
}
.vc-text-base {
    font-size: 13px !important;
    font-family: "Open Sans", sans-serif !important;
    color: #000000;
}
</style>
