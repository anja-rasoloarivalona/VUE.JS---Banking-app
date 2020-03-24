<template>
    <div class="transactions-form">
        <form>
            <div class="transactions-form__input-date">
                <label for="date">
                    <span>date</span>
                    <app-date-picker v-model='input.date' id="date"/>
                </label>
            </div>
            <app-select-input :id="'name'" v-model="input.name" :options="[...Object.keys(usersTransactions), 'New transaction']" />
            <app-basic-input  :id="'amount'" v-model="input.amount" />
            <app-basic-input  :id="'details'" v-model="input.details" />
            <app-select-input :id="'wallet'" v-model="input.usedWallet" :options="Object.keys(walletsNameAndId)" />
            <app-select-input :id="'status'" v-model="input.status" :options="['Paid', 'Pending']" />
            <app-basic-input :id="'counter party'" v-model="input.counterparty" v-if="!isFixedExpenses"/>
        </form>
        <app-btn normal primary @click.native="addTransaction">
                <span v-if="!loading">Add</span>
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
      category: '', // for expenses only
      loading: false,
      date: new Date(),
      userFixedExpenses: []
    }
  },
  watch: {
    'input.name': function (name) {
      const transactionType = this.usersTransactions[name].transactionType
      this.input.transactionType = transactionType
      if (transactionType === 'expense') {
        this.category = this.usersTransactions[name].category
        if (this.usersTransactions[name].expenseType === 'fixed') {
          this.input.date = new Date(this.usersTransactions[name].nextPayout)
          this.input.amount = this.usersTransactions[name].amount
        } else {
          this.input.amount = 0
          this.input.counterparty = ''
          this.input.date = new Date()
        }
      } else {
        this.input.counterparty = this.usersTransactions[name].from
        this.input.amount = this.usersTransactions[name].amount
        this.input.date = new Date(this.usersTransactions[name].nextPayout)
        this.category = ''
      }
    },
    'input.usedWallet': function (waletName) {
      this.input.walletId = this.walletsNameAndId[waletName]
    }
  },
  computed: {
    ...mapGetters([
      'usersTransactions',
      'walletsNameAndId'
    ]),
    isFixedExpenses () {
      if (this.userFixedExpenses.includes(this.input.name)) {
        return true
      } else return false
    }
  },
  mounted () {
    const userFixedExpenses = []
    const usersTransactions = this.usersTransactions
    for (const transaction in usersTransactions) {
      if (usersTransactions[transaction].transactionType !== 'income' && usersTransactions[transaction].expenseType === 'fixed') {
        userFixedExpenses.push(transaction)
      }
    }
    this.userFixedExpenses = userFixedExpenses
    this.input.name = Object.keys(this.usersTransactions)[0]
    this.input.usedWallet = Object.keys(this.walletsNameAndId)[0]
    this.input.walletId = this.walletsNameAndId[this.input.usedWallet]
  },
  methods: {
    addTransaction: async function () {
      this.loading = true
      const graphqlQuery = {
        query: `mutation {
              addTransaction(transactionInput: {
                  date: "${this.input.date}",
                  name: "${this.input.name}",
                  counterparty: "${this.input.counterparty}",
                  amount: "${this.input.amount}",
                  details: "${this.input.details}",
                  usedWallet: "${this.input.usedWallet}",
                  walletId: "${this.input.walletId}",
                  status: "${this.input.status}",
                  transactionType: "${this.input.transactionType}",
                  category: "${this.category}",
              }) {
                    transaction {
                        _id
                        shortId
                        date
                        name
                        counterparty
                        amount
                        details
                        usedWallet
                        status
                        transactionType
                        category
                        owner
                    }
                     wallets {
                        _id
                        walletType
                        amount
                        supplier
                        shortId
                        color
                    }
                    incomes {
                        _id
                        name
                        amount
                        from
                        frequency {
                            counter
                            period
                        }
                        lastPayout
                        nextPayout
                        autoWriting
                        notification
                    }
                    expenses {
                        _id
                        name
                        amount
                        category
                        expenseType
                        lastPayout
                        nextPayout
                        used
                        owner
                        frequency {
                          counter
                          period
                        }
                    }
              }
          }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addTransaction
        this.$store.commit('addTransaction', responseData)
        console.log(responseData)
      } catch (err) {
        this.loading = false
      }
    }
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
