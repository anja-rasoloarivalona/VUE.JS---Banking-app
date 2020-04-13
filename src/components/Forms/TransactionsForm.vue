<template>
    <div class="transactions-form">
        <form>
            <div class="transactions-form__input-date">
                <label for="date">
                    <span>date</span>
                    <app-date-picker v-model='input.date' id="date" locale="en"/>
                </label>
            </div>
            <app-select-input :id="'name'" v-model="input.name" :options="[...Object.keys(usersIncomesAndExpenses), 'New transaction']" />
            <app-basic-input  :id="'amount'" v-model="input.amount" />
            <app-basic-input  :id="'details'" v-model="input.details" />
            <app-select-input :id="'wallet'" v-model="input.usedWallet" :options="userWallets" />
            <app-select-input :id="'status'" v-model="input.status" :options="['Paid', 'Pending']" />
            <app-basic-input :id="'counter party'" v-model="input.counterparty" v-if="showCounterparty"/>
        </form>
        <app-btn normal primary @click.native="submitForm">
                <span v-if="!loading" v-text="editedTransaction ? 'Edit': 'Add'"></span>
                <app-spinner v-else></app-spinner>
        </app-btn>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      input: {
        _id: null,
        date: new Date(),
        name: null,
        amount: 0,
        details: '',
        usedWallet: '',
        walletId: '',
        status: 'Paid',
        transactionType: null,
        counterparty: '',
        category: ''// for expenses only
      },
      loading: false,
      date: new Date(),
      userFixedExpenses: [],
      userWallets: []
    }
  },
  watch: {
    'input.name': function (name) {
      const transactionType = this.usersIncomesAndExpenses[name].transactionType
      if (!this.editedTransaction) {
        // ADDING A NEW TRANSACTION
        this.input.transactionType = transactionType
        if (transactionType === 'expense') {
          // THE NEW TRANSACTION IS AN EXPENSE
          this.input.category = this.usersIncomesAndExpenses[name].category
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
          this.input.category = ''
        }
      } else {
        // EDITING A PREVIOUS TRANSACTION
        this.input.transactionType = this.usersIncomesAndExpenses[name].transactionType
        if (transactionType === 'expense') {
          this.input.category = this.usersIncomesAndExpenses[name].category
        } else {
          this.input.category = ''
        }
      }
      // CHECK IF THE CURRENT EXPENSE TRANSACTION IS A PAYMENT FOR THE CREDIT CARD
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
      'walletsNameAndId'
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
    if (!this.editedTransaction) {
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
      console.log('mounted', this.editedTransaction)
      let usedWallet = ''
      for (const walletName in this.walletsNameAndId) {
        if (this.walletsNameAndId[walletName] === this.editedTransaction.usedWalletId) {
          usedWallet = walletName
        }
      }
      const editedData = {
        ...this.editedTransaction,
        date: new Date(this.editedTransaction.date),
        amount: this.editedTransaction.amount >= 0 ? this.editedTransaction.amount : this.editedTransaction.amount * -1,
        walletId: this.editedTransaction.usedWallet,
        usedWallet: usedWallet
      }
      this.input = editedData
      console.log('editing', this.input)
      this.date = this.editedTransaction.date
    }
  },
  methods: {
    submitForm () {
      this.loading = true
      if (this.editedTransaction) {
        this.editTransaction()
      } else {
        this.addTransaction()
      }
    },
    addTransaction: async function () {
      const res = await this.$store.dispatch('addTransaction', this.input)
      if (res) {
        this.loading = false
        this.$emit('closeForm')
      } else {
        this.loading = false
      }
    },
    editTransaction: async function () {
      const res = await this.$store.dispatch('editTransaction', this.input)
      if (res) {
        this.loading = false
        this.$emit('closeForm')
      } else {
        this.loading = false
      }
    }
  },
  props: {
    editedTransaction: [Boolean, Object]
  }
}
</script>

<style lang="scss">
.transactions-form {
    height: 50rem;
    position: relative;
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

    & button {
      position: absolute;
      bottom: 3rem;
      right: 0;
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
