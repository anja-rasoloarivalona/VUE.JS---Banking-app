<template>
    <div class="transactions-form">
        <slot />
        <form>
            <app-select-input v-model="input.transactionType" :options="[{value: 'income', i18: 'income'}, {value: 'expense', i18: 'expense'}]" :id="'Type'" i18/>
            <app-date-input   :id="'Date'"  v-model="input.date" />
            <app-expense-input v-model="expense" v-if="input.transactionType.value === 'expense'"/>
            <app-income-input v-model="income" v-if="input.transactionType.value === 'income'"/>
            <app-basic-input  :id="'Amount'" v-model="input.amount" type="number"/>
            <app-basic-input  :id="'Details'" v-model="input.details" />
            <app-select-input :id="'Wallet'" v-model="input.usedWallet" :options="displayedWalletsList"  v-if="input.transactionType.value" i18/>
            <app-basic-input  :id="'Counter party'" v-model="input.counterparty" v-if="input.transactionType.value && input.transactionType.value === 'expense'"/>
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
import AppIncomeInput from '@/components/Input/IncomeInput/IncomeInput'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      input: {
        _id: null,
        date: new Date(),
        amount: 0,
        details: '',
        usedWallet: '',
        walletId: '',
        transactionType: {

        },
        counterparty: ''
      },
      expense: {
        category: {

        },
        subcategory: {

        }
      },
      income: {

      },
      loading: false
    }
  },
  watch: {
    'expense.category': function (next, prev) {
      if (Object.keys(prev).length > 0 && next.name !== prev.name) {
        this.expense.subcategory = {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'walletsNameAndId',
      'isEditingTransaction',
      'expensesList',
      'incomesList'
    ]),
    displayedWalletsList () {
      const userWallets = [...this.user.wallets]
      const res = []
      userWallets.forEach(wallet => {
        this.user.walletTypeList.find(type => {
          if (type.value === wallet.walletType) {
            res.push({
              i18: type.i18,
              custom: wallet.name,
              _id: wallet._id,
              value: wallet._id
            })
          }
        })
      })
      return res
    }
  },
  mounted () {
    if (this.isEditingTransaction) {
      this.input._id = this.isEditingTransaction._id
      this.input.transactionType = {
        value: this.isEditingTransaction.transactionType,
        i18: this.isEditingTransaction.transactionType
      }
      this.input.details = this.isEditingTransaction.details
      this.input.counterparty = this.isEditingTransaction.counterparty
      this.input.date = new Date(this.isEditingTransaction.date)

      let walletCustom, walletI18, walletType

      this.user.wallets.find(wallet => {
        if (wallet._id === this.isEditingTransaction.usedWalletId) {
          walletCustom = wallet.name
          walletType = wallet.walletType
          return true
        }
      })
      this.user.walletTypeList.find(wallet => {
        if (wallet.value === walletType) {
          walletI18 = wallet.i18
        }
      })

      this.input.usedWallet = {
        i18: walletI18,
        custom: walletCustom,
        _id: this.isEditingTransaction.usedWalletId,
        value: this.isEditingTransaction.usedWalletId
      }

      if (this.isEditingTransaction.transactionType === 'expense') {
        this.input.amount = this.isEditingTransaction.amount * -1
        this.expense = {
          category: {
            name: this.isEditingTransaction.category,
            i18: this.expensesList[this.isEditingTransaction.category].i18
          },
          subcategory: {
            name: this.isEditingTransaction.subcategory,
            i18: this.expensesList[this.isEditingTransaction.category].subcategory[this.isEditingTransaction.subcategory].i18
          }
        }
      }
      if (this.isEditingTransaction.transactionType === 'income') {
        this.input.amount = this.isEditingTransaction.amount
        this.income = {
          value: this.isEditingTransaction.subcategory,
          i18: this.incomesList.category[this.isEditingTransaction.subcategory].i18
        }
      }
    }
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
      const data = {
        ...this.input,
        walletId: this.input.usedWallet._id
      }
      if (this.input.transactionType.value === 'expense') {
        data.category = this.expense.category.name
        data.subcategory = this.expense.subcategory.name
      } else {
        data.category = 'Income'
        data.subcategory = this.income.value
      }

      if (this.isEditingTransaction) {
        this.editTransaction(data)
      } else {
        this.addTransaction(data)
      }
    },
    addTransaction: async function (data) {
      const res = await this.$store.dispatch('addTransaction', data)
      if (res) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    },
    editTransaction: async function (data) {
      const res = await this.$store.dispatch('editTransaction', data)
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
    AppExpenseInput,
    AppIncomeInput
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
        row-gap: 1.5rem;
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
