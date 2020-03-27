<template>
    <div class="transactions-form">
      <div class="transactions-form__close" @click="$emit('closeForm')">
              <app-icon name="close" size="large" color="primary"/>
        </div>
        <form>
            <div class="transactions-form__input-date">
                <label for="date">
                    <span>date</span>
                    <app-date-picker v-model='input.date' id="date"/>
                </label>
            </div>
            <app-select-input :id="'name'" v-model="input.name" :options="[...Object.keys(usersIncomesAndExpenses), 'New transaction']" />
            <app-basic-input  :id="'amount'" v-model="input.amount" />
            <app-basic-input  :id="'details'" v-model="input.details" />
            <app-select-input :id="'wallet'" v-model="input.usedWallet" :options="Object.keys(walletsNameAndId)" />
            <app-select-input :id="'status'" v-model="input.status" :options="['Paid', 'Pending']" />
            <app-basic-input :id="'counter party'" v-model="input.counterparty" v-if="!isFixedExpenses"/>
        </form>
        <app-btn normal primary @click.native="submitForm">
                <span v-if="!loading" v-text="editedTransaction ? 'Edit': 'Add'"></span>
                <app-spinner v-else></app-spinner>
        </app-btn>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addTransactionQuery, editTransactionQuery } from '@/graphQL/transactionsQuery'
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
      userFixedExpenses: []
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
        if (transactionType === 'expense') {
          this.input.category = this.usersIncomesAndExpenses[name].category
        } else {
          this.input.category = ''
        }
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
    }
  },
  mounted () {
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
      console.log(editedData.date.toLocaleDateString())
      this.input = editedData
      this.date = this.editedTransaction.date
    }
  },
  methods: {
    submitForm () {
      if (this.editedTransaction) {
        this.editTransaction()
      } else {
        this.addTransaction()
      }
    },
    addTransaction: async function () {
      this.loading = true
      const graphqlQuery = addTransactionQuery(this.input)
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addTransaction
        this.$store.commit('addTransaction', responseData)
        this.loading = false
        this.$emit('closeForm')
      } catch (err) {
        this.loading = false
      }
    },
    editTransaction: async function () {
      this.loading = true
      const graphqlQuery = editTransactionQuery(this.input)
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.editTransaction
        console.log(responseData)
        this.$store.commit('addTransaction', responseData)
        this.loading = false
        this.$emit('closeForm')
      } catch (err) {
        console.log(err)
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
    &__close {
      display: flex;
      justify-content: flex-end;
      margin: 1rem 0;
    }
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
                color: $color-grey--dark;
            }
            & input {
                height: 4rem;
            }
        }
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
