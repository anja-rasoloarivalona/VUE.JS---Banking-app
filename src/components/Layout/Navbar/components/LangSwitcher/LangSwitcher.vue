<template>
    <div class="lang">
      <app-toggle-list>
          <template #value>
              <div :style="{cursor: 'pointer'}" class="lang__value">{{ currentLangName }}</div>
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
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
      'theme',
      'currentLanguage'
    ]),
    displayedLangList () {
      return this.langlist.filter(lang => lang.value !== this.currentLanguage)
    },
    currentLangName () {
      return this.langlist.filter(lang => lang.value === this.currentLanguage)[0].name
    }
  },
  methods: {
    ...mapMutations([
      'setLanguage'
    ]),
    selectLanguage (lang) {
      this.$i18n.locale = lang
      this.currentLang = lang
      this.setLanguage(lang)
    }
  }
}
</script>

<style lang="scss" scoped>
.lang {
  font-size: $font-s;
  position: relative;
  margin-left: 4rem;
  &__value {
      width: 6rem;
  }
  &__list {
    padding: 1rem 0;
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
  }
}
</style>
