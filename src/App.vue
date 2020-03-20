<template>
  <div id="app">
    <router-view name="starter" v-if="this.$store.state.status !== 'active'"/>
    <div v-else class="app-main">
      <sidebar></sidebar>
      <navbar></navbar>
      <div class="app__navbarFiller">
        <div class="app__navbarFiller__in"></div>
      </div>
      <div class="app__view">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Sidebar from './components/Layout/Sidebar'
import Navbar from './components/Layout/Navbar'
export default {
  data () {
    return {
      loading: true
    }
  },
  components: {
    Sidebar,
    Navbar
  },
  created: async function () {
    const localData = localStorage.getItem('bank-data')
    if (!localData) {
      return
    }
    const data = JSON.parse(localData)
    if (!data.token || !data.expiryDate) {
      console.log('NO TOKEN')
      return
    }
    if (new Date(data.expiryDate) <= new Date()) {
      console.log('Token not valid anymore')
      return
    }
    this.$store.commit('authUser', data)
    Vue.http.headers.common.Authorization = 'Bearer ' + data.token
    const graphqlQuery = {
      query: `{
        user {
          wallets {
            _id
            walletType
            amount
            supplier
            shortId
            color
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
        }
      }`
    }
    try {
      const response = await this.$http.post('', graphqlQuery)
      const resData = await response.json()
      const responseData = resData.data.user
      this.$store.commit('initWallets', responseData.wallets)
      this.$store.commit('initIncomes', responseData.incomes)
      this.$store.commit('initExpenses', responseData.expenses)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
  overflow-x: hidden;
}

.app-main {
  display: grid;
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem max-content;
  background: $color-grey--light;
  max-width: 100vw;
  .app__view {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    background: $color-grey--light;
    min-height: calc(100vh - 9rem);
    max-width: 120rem;
    padding-top: 2rem;
  }
  .app__title {
    &--md {
      font-size: $font-xl;
    }
  }
  .app__navbarFiller {
    grid-row: 1 / 2;
    grid-column: 2 / 4;
    background: $color-primary;
    position: relative;
    z-index: 2;
     &__in {
       background: $color-grey--light;
       height: 100%;
       width: 100%;
       position: absolute;
       z-index: 1;
        border-top-left-radius: 4rem;
     }
  }
}
.color-primary {
color: $color-primary
}
.color-grey-main {
color: $color-grey--main
}
</style>
