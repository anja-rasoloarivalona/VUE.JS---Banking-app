<template>
    <div class="lang">
      <app-toggle-list>
          <template #value>
              <span :style="{cursor: 'pointer'}">{{ currentLangName }}</span>
          </template>
          <template #list>
            <ul class="lang__list" :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}">
              <li
                  v-for="lang in displayedLangList"
                  :key="lang.value"
                  class="lang__list__item"
                  @click="selectLanguage(lang.value)"
              >
                  {{ lang.name }}
              </li>
            </ul>
          </template>
      </app-toggle-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      currentLang: 'en',
      langlist: [
        {
          name: 'Deutsh',
          value: 'de'
        },
        {
          name: 'English',
          value: 'en'

        },
        {
          name: 'Español',
          value: 'es'
        },
        {
          name: 'Français',
          value: 'fr'
        },
        {
          name: 'Italiano',
          value: 'it'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ]),
    displayedLangList () {
      return this.langlist.filter(lang => lang.value !== this.currentLang)
    },
    currentLangName () {
      return this.langlist.filter(lang => lang.value === this.currentLang)[0].name
    }
  },
  methods: {
    selectLanguage (lang) {
      this.$i18n.locale = lang
      this.currentLang = lang
    }
  }
}
</script>

<style lang="scss" scoped>
.lang {
  // background: salmon;
  font-size: $font-s;
  width: 6rem;
  position: relative;
  &__list {
    list-style: none;
    background: $color-white;
    top: 3rem;
    left: -3rem;
    width: 13rem;
    position: absolute;
    border-radius: .5rem;
    &__item {
      padding: 1rem 2rem;
      cursor: pointer;
      color: var(--textColor--dark);
      &:hover {
        color: var(--mainColor)
      }
    }
    &__icon {
      transform: rotate(180deg);
      // background: green;
      position: absolute;
      bottom: -2rem;
      right: -.9rem;
      margin: auto;
      z-index: 3;
    }
  }
}
</style>
