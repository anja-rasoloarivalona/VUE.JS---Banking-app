<template>
    <div class="edit-dashboard">
        <div class="edit-dashboard__list">
            <h3>Displayed items</h3>
            <div class="edit-dashboard__list__item" v-for="(item, index) in data" :key="item.i">
                  <div class="edit-dashboard__list__item__key">{{ item.i }}</div>
                  <div
                    class="edit-dashboard__list__item__switch"
                    :class="{active: data[index].displayed}"
                    @click="selectItem(index)"
                  >   <div class="edit-dashboard__list__item__switch__bar"></div>
                      <div class="edit-dashboard__list__item__switch__toggle"></div>
                  </div>
            </div>
        </div>
        <div class="edit-dashboard__cta">
            <app-btn small warning @click.native="cancel">Cancel</app-btn>
            <app-btn small primary @click.native="submit">Save</app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { editDashboardQuery } from '@/graphQL/editDashboardQuery'
import axios from 'axios'
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.data = this.dashboardData.currentDashboardLayout
    console.log('data', this.data)
  },
  computed: {
    ...mapGetters([
      'dashboardData'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentDashboardLayout',
      'setEditDashboardToFalse'
    ]),
    cancel () {
      this.setEditDashboardToFalse()
    },
    selectItem (index) {
      this.data[index].displayed = !this.data[index].displayed
      this.updateLayout()
    },
    updateLayout () {
      const res = this.data.filter(i => i.displayed === true)
      this.setCurrentDashboardLayout(res)
    },
    submit: async function () {
      const graphqlQuery = editDashboardQuery(this.dashboardData.currentDashboardLayout)
      try {
        await axios.post('/', graphqlQuery)
        this.setEditDashboardToFalse()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-dashboard {
    width: 100%;
    font-size: $font-m;
    color: var(--textColor--dark);
    // background: red;
    height: 100%;
    padding: 0 2rem;
    &__list {
        font-size: $font-m;
        margin-bottom: 5rem;
        & h3 {
          text-align: center;
        }
        &__item {
            display: flex;
            align-items: center;
            margin: 3rem 0;
            justify-content: space-between;
            width: 100%;
            height: 2rem;
            &__switch {
              background: var(--on-surfaceColor);
              height: 1.5rem;
              width: 5rem;
              position: relative;
              border-radius: 1.5rem;
              cursor: pointer;
              box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.247);
              &__bar {
                position: absolute;
                top: 0;
                left: 0;
                width: 0%;
                height: 100%;
                border-radius: 1.5rem;
                background: var(--mainColor--dark);
                transition: all .3s ease-in;
              }
              &__toggle {
                background: var(--mainColor);
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                width: 2rem;
                height: 2rem;
                box-shadow: -1px 0px 5px 1px rgba(37, 37, 37, 0.829);
                border-radius: 50%;
                transition: all .3s ease-in;
              }
              &.active {
                & .edit-dashboard__list__item__switch__toggle {
                  transform: translateX(3rem);
                }
                & .edit-dashboard__list__item__switch__bar {
                  width: 100%;
                }
              }
            }
            &__key {
                text-transform: capitalize;
                color: var(--textColor--dark)
            }
            & input {
                cursor: pointer;
            }
        }
    }
    &__cta {
      display: flex;
      justify-content: space-between;
      & button {
        margin: 0;
      }
    }
}
</style>
