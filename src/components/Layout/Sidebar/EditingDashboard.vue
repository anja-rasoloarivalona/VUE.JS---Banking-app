<template>
    <div class="edit-dashboard">
        <p>Feel free to change place or resize any elements of the dashboard</p>
        <div class="edit-dashboard__list">
            <h3>Displayed items</h3>
            <div class="edit-dashboard__list__item" v-for="(item, index) in data" :key="item.i">
                <div class="edit-dashboard__list__item__key">{{ item.i }}</div>
                <input type="checkbox" v-model="data[index].displayed" @change="updateLayout"/>
            </div>
        </div>
        <div class="edit-dashboard__cta">
            <app-btn normal secondary>Cancel</app-btn>
            <app-btn normal primary @click.native="submit">Save</app-btn>
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
      'setCurrentDashboardLayout'
    ]),
    updateLayout () {
      const res = this.data.filter(i => i.displayed === true)
      this.setCurrentDashboardLayout(res)
      console.log('res', res)
    },
    submit: async function () {
      const graphqlQuery = editDashboardQuery(this.dashboardData.currentDashboardLayout)
      try {
        const response = await axios.post('/', graphqlQuery)
        console.log(response)
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
    height: 80%;
    background: var(--surfaceColor);
    padding: 1rem;
    border-radius: .5rem;
    & h3 {
        margin-bottom: 2rem;
        text-align: center;
        color: var(--textColor--dark)
    }
    &__list {
        // background: red;
        margin-top: 4rem;
        font-size: $font-m;
        padding: 0 1rem;
        &__item {
            display: flex;
            align-items: center;
            // background: yellow;
            margin: 2rem 0;
            justify-content: space-between;
            width: 100%;
            &__key {
                text-transform: capitalize;
                color: var(--textColor--dark)
                // background: blue;
            }
            & input {
                cursor: pointer;
            }
        }
    }
    &__cta {
      background: blue;
      display: flex;
      justify-content: space-between;
    }
}
</style>
