<template>
    <div class="plan">
        <header class="plan__header">
            <div class="plan__header__details">
                <h1>Monthly average</h1>
                <div class="plan__header__details__item">
                    <div class="plan__header__details__item__key">
                        Incomes
                    </div>
                    <div class="plan__header__details__item__value">
                        $ 1200
                    </div>
                </div>
                <div class="plan__header__details__item">
                    <div class="plan__header__details__item__key">
                        Expenses
                    </div>
                    <div class="plan__header__details__item__value">
                        $ 780
                    </div>
                </div>
                <div class="plan__header__details__item">
                    <div class="plan__header__details__item__key">
                        Savings
                    </div>
                    <div class="plan__header__details__item__value">
                        $ 420
                    </div>
                </div>
            </div>
            <div class="plan__header__chart">
                 <doughnut-chart :styles="chartStyles" :datacollection="data"></doughnut-chart>
            </div>
        </header>
        <div class="plan__item">
            <h2 class="plan__item__title">
                Incomes
            </h2>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Amount</div>
                    <div>Last Payout</div>
                    <div>Next Payout</div>
                </div>
                <ul class="plan__item__details__list">
                    <li class="plan__item__details__list__item" v-for="(income, index) in user.incomes" :key="income.name" :class="{'bg-on-surfaceColor': index % 2 === 0, 'bg-surfaceColor': index % 2 !== 0 }">
                        <h3>{{ income.name}}</h3>
                        <div>${{ income.amount | amount}}</div>
                        <div>{{ income.lastPayout | short-date }}</div>
                        <div>{{ income.nextPayout | short-date }}</div>
                        <div class="plan__item__details__list__item__cta">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="plan__item">
            <h2 class="plan__item__title">
                Expenses
            </h2>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Next Payout</div>
                </div>
                <ul class="plan__item__details__list">
                    <li class="plan__item__details__list__item" v-for="(expense, index) in user.expenses" :key="expense.name" :class="{'bg-on-surfaceColor': index % 2 === 0, 'bg-surfaceColor': index % 2 !== 0 }">
                        <div class="plan__item__details__list__item__name">
                            <div class="plan__item__details__list__item__name__color" :style="{backgroundColor: expense.color}"></div>
                            <div>{{ expense.name}}</div>
                        </div>
                        <div>{{ expense.expenseType}}</div>
                        <div>${{ expense.amount | amount}}</div>
                        <div v-if="expense.nextPayout">{{ expense.nextPayout | short-date}}</div>
                        <div v-else>-</div>
                        <div class="plan__item__details__list__item__cta">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '@/components/Charts/Doughnut'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: null,
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    const labels = []
    const data = []
    const bg = []
    this.user.expenses.forEach(expense => {
      labels.push(expense.name)
      data.push(expense.amount)
      bg.push(expense.color)
    })
    this.data = {
      labels: labels,
      datasets: [
        { data: data, backgroundColor: bg }
      ]

    }
  },
  components: {
    DoughnutChart
  }
}
</script>

<style lang="scss" scoped>
.plan {
    // background: blue;
    &__header {
        // background: salmon;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;
        &__details {
            // background: yellowgreen;
            width: 50%;
            & h1 {
                margin-bottom: 2rem;
            }
            &__item {
                display: flex;
                align-items: center;
                font-size: $font-m;
                margin-bottom: 2rem;
                &__key {
                    height: 100%;
                    width: 15rem;
                    // background: orange;
                }

            }
        }
        &__chart {
            // background: brown;
            width: 100%;
            height: 100%;
            flex: 1;
            position: relative;
            width: 100%;
            height: 13rem;
        }
    }
    &__item {
        // background: red;
        padding: 2rem;
        border: 1px solid var(--lineColor);
        margin-bottom: 2rem;
        border-radius: .5rem;
        &__title {
            text-transform: uppercase;
            margin-bottom: 2rem;
        }
        &__details {
            // background: blue;
            &__header {
                background: var(--backgroundColor);
                padding: 2rem 0;
                display: flex;
                font-size: $font-m;
                padding-left: 2rem;
                border-top-left-radius: .5rem;
                border-top-right-radius: .5rem;
                & div {
                    width: calc(100% / 4);
                    color: var(--textColor--dark)
                }
            }
            &__list {
                list-style: none;
                &__item {
                    display: flex;
                    padding: 2rem 0;
                    padding-left: 2rem;
                    position: relative;
                    &__name {
                        display: flex;
                        align-items: center;
                        &__color {
                            width: 1rem;
                            height: 1rem;
                            margin-right: 2rem;
                            border-radius: .5rem;
                        }
                    }
                    &__cta {
                        position: absolute;
                        right: 1rem;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 3rem !important;
                        height:3rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        transition: all .3s ease-in;
                        cursor: pointer;
                        background: transparent;
                        & span {
                            width: 3px !important;
                            height: 3px;
                            background: $color-grey--main;
                            border-radius: 50%;
                            margin: 1px;
                            transition: all .3s ease-in;
                        }
                        &:hover {
                        background: $color-grey--main;
                            & span {
                                background: $color-white;
                            }
                        }
                    }
                    & > * {
                        width: calc(100% / 4);
                        font-size: $font-m;
                    }
                }
            }
        }
    }
}
</style>
