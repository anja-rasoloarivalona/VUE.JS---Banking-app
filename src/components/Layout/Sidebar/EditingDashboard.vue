<template>
    <div class="edit-dashboard">
        <div class="edit-dashboard__list">
            <h3>Displayed items</h3>
            <div class="edit-dashboard__list__item" v-for="(item, index) in data" :key="item.i">
                  <div class="edit-dashboard__list__item__key">{{ item.i }}</div>
                  <div class="edit-dashboard__list__item__toggle" :class="{active: data[index].displayed}" @click="selectItem(index)">
                      <div class="edit-dashboard__list__item__toggle__content"></div>
                  </div>
                  <!-- <input type="checkbox" v-model="data[index].displayed" @change="updateLayout"/> -->
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
    &__list {
        font-size: $font-m;
        margin-bottom: 5rem;
        // background: red;
        & h3 {
          // background: blue;
          text-align: center;
        }
        &__item {
            display: flex;
            align-items: center;
            margin: 3rem 0;
            justify-content: space-between;
            width: 100%;
            height: 2rem;
            // background: yellow;
            &__key {
                text-transform: capitalize;
                color: var(--textColor--dark)
            }
            &__toggle {
              background: var(--on-surfaceColor);
              height: 2.5rem;
              width: 6rem;
              position: relative;
              border-radius: 1.5rem;
              cursor: pointer;
              box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.247);
              &.active {
                // background: var(--mainColor--dark);
                & .edit-dashboard__list__item__toggle__content {
                  background: var(--mainColor);
                  transform: translateX(3.3rem);
                }
              }
              &__content {
                position: absolute;
                top: 0;
                bottom: 0;
                left: .4rem;
                margin: auto;
                width: 2rem;
                height: 2rem;
                background: grey;
                box-shadow: 0 8px 6px -4px rgba(0,0,0,.25);
                border-radius: 50%;
                transition: all .3s ease-in;
              }
            }
            & input {
                cursor: pointer;
            }
        }
    }
    &__cta {
      display: flex;
      justify-content: space-between;
      // background: red;
      & button {
        margin: 0;
      }
    }
}
</style>
