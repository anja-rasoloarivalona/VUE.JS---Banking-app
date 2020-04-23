<template>
    <div class="edit-dashboard">
        <div class="edit-dashboard__item">
            Feel free to change place or resize any elements.
        </div>
        <div class="edit-dashboard__item">
            <div class="edit-dashboard__list">
                    <h3>Displayed items</h3>
                    <div class="edit-dashboard__list__item" v-for="(item, index) in data" :key="item.i">
                        <div class="edit-dashboard__list__item__key">{{ item.i }}</div>
                        <input type="checkbox" v-model="data[index].displayed" @change="updateLayout"/>
                    </div>
                </div>
                <div class="edit-dashboard__cta">
                    <app-btn small secondary @click.native="cancel">Cancel</app-btn>
                    <app-btn small primary @click.native="submit">Save</app-btn>
              </div>
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
    &__item {
      background: var(--surfaceColor);
      padding: 2rem;
      border-radius: .5rem;
      margin-bottom: 2rem;
    }
    & h3 {
        margin-bottom: 2rem;
        text-align: center;
        color: var(--textColor--dark)
    }
    &__list {
        font-size: $font-m;
        &__item {
            display: flex;
            align-items: center;
            margin: 2rem 0;
            justify-content: space-between;
            width: 100%;
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
    }
}
</style>
