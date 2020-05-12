<template>
    <div class="transactions-form">
        <slot />
        <form>
            <app-date-input   :id="'date'"  v-model="input.date" />
            <app-select-input :id="'name'" v-model="input.name" :options="[...Object.keys(usersIncomesAndExpenses), 'New transaction']" v-if="!isEditingTransaction" />
            <app-basic-input  :id="'amount'" v-model="input.amount" />
            <app-basic-input  :id="'details'" v-model="input.details" />
            <app-select-input :id="'wallet'" v-model="input.usedWallet" :options="userWallets" />
            <app-select-input :id="'status'" v-model="input.status" :options="['Paid', 'Pending']" />
            <app-basic-input  :id="'counter party'" v-model="input.counterparty" v-if="showCounterparty"/>
        </form>
        <div class="transactions-form__cta">
            <app-btn normal warning v-if="isCancelBtnDisplayed" @click.native="closeBackdrop">Cancel</app-btn>
            <app-btn normal primary @click.native="submitForm">
                    <span v-if="!loading" v-text="isEditingTransaction ? 'Edit': 'Add'"></span>
                    <app-spinner v-else></app-spinner>
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      input: {
        _id: null,
        budgetId: null,
        date: new Date(),
        name: null,
        amount: 0,
        details: '',
        usedWallet: '',
        walletId: '',
        status: 'Paid',
        transactionType: null,
        counterparty: ''
      },
      loading: false,
      date: new Date(),
      userFixedExpenses: [],
      userWallets: []
    }
  },
  watch: {
    'input.name': function (name) {
      if (!this.isEditingTransaction) {
        // ADDING A NEW TRANSACTION
        const transactionType = this.usersIncomesAndExpenses[name].transactionType
        this.input.budgetId = this.usersIncomesAndExpenses[name]._id
        this.input.transactionType = transactionType
        if (transactionType === 'expense') {
          // THE NEW TRANSACTION IS AN EXPENSE
          if (this.usersIncomesAndExpenses[name].expenseType === 'fixed') {
            // --------THE EXPENSE IS FIXED
            this.input.date = new Date(this.usersIncomesAndExpenses[name].nextPayout)
            this.input.amount = this.usersIncomesAndExpenses[name].amount
          } else {
            // -------THE EXPENSE IS VARIABLE
            this.input.amount = 0
            this.input.counterparty = ''
            this.input.date = new Date()
          }
        } else {
          // THE NEW TRANSACTION IS AN INCOME
          this.input.date = new Date(this.usersIncomesAndExpenses[name].nextPayout)
          this.input.counterparty = this.usersIncomesAndExpenses[name].from
          this.input.amount = this.usersIncomesAndExpenses[name].amount
        }
      }
      // CHECK IF THE CURRENT EXPENSE TRANSACTION IS A PAYMENT FOR THE CREDIT CARD : We need to make sure that the credit card receiving the payment doesn't not appear in the list of payment
      const creditCards = ['Visa', 'MasterCard']
      if (name && creditCards.includes(name.split(' ')[0])) {
        const updatedWallets = { ...this.walletsNameAndId }
        delete updatedWallets[name]
        this.userWallets = Object.keys(updatedWallets)
      } else {
        this.userWallets = Object.keys(this.walletsNameAndId)
      }
    },
    'input.usedWallet': function (waletName) {
      this.input.walletId = this.walletsNameAndId[waletName]
    }
  },
  computed: {
    ...mapGetters([
      'usersIncomesAndExpenses',
      'walletsNameAndId',
      'isEditingTransaction'
    ]),
    isFixedExpenses () {
      if (this.userFixedExpenses.includes(this.input.name)) {
        return true
      } else return false
    },
    showCounterparty () {
      const res = []
      const d = this.input.name
      if (d) {
        const name = d.split(' ')[0]
        if (['Visa', 'MasterCard'].includes(name)) {
          res.push(false)
        }
      }
      if (this.isFixedExpenses) {
        res.push(false)
      }

      if (res.includes(false)) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.userWallets = Object.keys(this.walletsNameAndId)
    if (!this.isEditingTransaction) {
      const userFixedExpenses = []
      const usersIncomesAndExpenses = this.usersIncomesAndExpenses
      for (const transaction in usersIncomesAndExpenses) {
        if (usersIncomesAndExpenses[transaction].transactionType !== 'income' && usersIncomesAndExpenses[transaction].expenseType === 'fixed') {
          userFixedExpenses.push(transaction)
        }
      }
      this.userFixedExpenses = userFixedExpenses
      this.input.name = Object.keys(this.usersIncomesAndExpenses)[0]
      this.input.usedWallet = Object.keys(this.walletsNameAndId)[0]
      this.input.walletId = this.walletsNameAndId[this.input.usedWallet]
    } else {
      let usedWallet = ''
      for (const walletName in this.walletsNameAndId) {
        if (this.walletsNameAndId[walletName] === this.isEditingTransaction.usedWalletId) {
          usedWallet = walletName
        }
      }
      const editedData = {
        ...this.isEditingTransaction,
        date: new Date(this.isEditingTransaction.date),
        amount: this.isEditingTransaction.amount >= 0 ? this.isEditingTransaction.amount : this.isEditingTransaction.amount * -1,
        walletId: this.isEditingTransaction.usedWallet,
        usedWallet: usedWallet
      }
      this.input = editedData
      this.date = this.isEditingTransaction.date
    }
  },
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ]),
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
        this.closeBackdrop()
      } else {
        this.loading = false
      }
    },
    editTransaction: async function () {
      const res = await this.$store.dispatch('editTransaction', this.input)
      if (res) {
        this.loading = false
        this.closeBackdrop()
      } else {
        this.loading = false
      }
    }
  },
  props: {
    isCancelBtnDisplayed: Boolean
  }
}
</script>

<style lang="scss">
.transactions-form {
    & form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: max-content;
        grid-auto-rows: max-content;
        column-gap: 2rem;
        row-gap: 1rem;
    }
    &__input-date {
        display: flex;
        flex-direction: column;
        width: 100%;
        & label {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
        }
        & span {
            width: 100%;
            margin-bottom: 0.5rem;
            font-size: 13px;
            &:first-child {
                color: var(--textColor--dark);
            }
            & input {
                height: 4rem;
            }
        }
    }
    &__cta {
       display: flex;
       justify-content: center;
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
