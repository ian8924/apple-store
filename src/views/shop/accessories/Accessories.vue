<template>
  <main>
    <div class="container-fluid bg-white">
      <div class="row customize-content">
        <div class="col-12 localnav-header-title">
          <h2>{{ title }} 配件</h2>
        </div>
        <div class="col-12">
          <div class="row hero-area">
            <div class="col-md-6 hero-area-text">
              <h3>{{ campaign }}</h3>
            </div>
            <div class="col-md-6 hero-area-img">
              <img
                class="img-fluid"
                src="@/assets/images/Accessories/made-by-apple-accessories-201906.jpg"
                alt=""
              >
            </div>
          </div>
        </div>
        <div class="col-12 filter-navbar">
          <div class="dropdown">
            <button
              id="dropdownMenuButton"
              class="btn dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              所有分類
            </button>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                v-for="categoryTitle in allTitle"
                :key="categoryTitle"
                class="dropdown-item"
                :href="`?category=${categoryTitle}`"
                @click.prevent="changeQuery"
              >{{ categoryTitle }} 配件</a>
            </div>
          </div>
        </div>
        <DisplayServerError
          v-if="Object.keys(items).length === 0"
          @click="retry"
        />
        <div
          v-if="Object.keys(items).length > 0"
          class="col-12"
        >
          <div class="row">
            <div class="col-md-3 subnav-list">
              <h4>所有配件</h4>
              <ul>
                <template v-for="type in category">
                  <li :key="type.id">
                    <a
                      :href="type.href"
                      @click.prevent="changeQuery"
                    >{{
                      type.name
                    }}</a>
                  </li>
                </template>
              </ul>
            </div>
            <div class="col-12 col-md-9 product-content ml-ul-pl">
              <ul>
                <ListItemAccessories
                  v-for="(item, type) in items"
                  :key="type"
                  :item="item"
                  @click="chooseAcc(type)"
                />
              </ul>
              <!-- Pagination -->
              <div
                v-if="pages > 1"
                class="pagination-area"
              >
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        aria-label="Previous"
                        @click.prevent="changePage(-1)"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li
                      v-for="(_, index) in pages"
                      :key="_"
                      class="page-item"
                      :class="{ active: index + 1 === page }"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="assignPage(index + 1)"
                      >{{ index + 1 }}
                      </a>
                    </li>

                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        aria-label="Next"
                        @click.prevent="changePage(+1)"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ListItemAccessories from '@/components/ListItemProduct/ListItemAccessories'
import { CATEGORY, MAP_TITLE, TITLE } from '@/stores/config/config.acc'
export default {
  name: 'Accessories',
  components: { ListItemAccessories },
  data () {
    return {
      page: 1,
      allTitle: TITLE
    }
  },
  computed: {
    items () {
      const availableAccType = this.$store.getters[
        'accessories/availableAccType'
      ]
      // return availableAccType;
      // console.log("TCL: items -> availableAccType", availableAccType);

      const items_ = {}
      const dummy = new Array(10)
      for (let index = 0; index < dummy.length; index++) {
        // console.log("TCL: items -> index", index);
        const key = Object.keys(availableAccType)
          .sort()
          .reverse()[(this.page - 1) * 10 + index]
        if (!key) break
        // console.log("TCL: items -> key", key);
        items_[key] = availableAccType[key]
      }
      return items_
      // https://medium.com/@franklion1227/vue-js-圖片路徑問題-907d6af6fe88
    },
    queryCategory () {
      const query = this.$route.query.category
        ? this.$route.query.category
        : 'iPhone'
      if (!Object.keys(CATEGORY).includes(query)) {
        return 'iPhone'
      }
      return query
    },
    filter () {
      const filter = this.$route.query.filter
        ? this.$route.query.filter.replace('+', ' & ')
        : ''
      return filter
    },
    pages () {
      const availableAccType = this.$store.getters[
        'accessories/availableAccType'
      ]
      const length = Object.keys(availableAccType).length
      const pages =
        length % 10 > 0 ? parseInt(length / 10) + 1 : parseInt(length / 10)

      return pages
    },
    category () {
      return CATEGORY[this.queryCategory].map(item => {
        const category = this.queryCategory
        const href = `?category=${category}&filter=${item.replace(
          ' & ',
          '%2B'
        )}`
        return { name: this.$t(`accFilter.${item}`), href }
      })
    },
    title () {
      return MAP_TITLE[this.queryCategory]
    },
    campaign () {
      return this.filter ? this.$t(`accFilter.${this.filter}`) : 'Apple 出品'
    }
  },
  watch: {
    page () {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
      this.$route.query.page = this.page
      this.$router.replace(this.$route)
    }
  },
  created () {
    const newQuery = {}
    newQuery.category = this.queryCategory
    newQuery.filter = this.filter
    if (newQuery.page) {
      this.page = newQuery.page
    }
    if (Object.keys(this.items).length === 0) {
      this.$store.dispatch('accessories/getAccInfo', {
        category: this.queryCategory,
        filter: this.filter
      })
    }

    const prevQuery = this.$store.getters['accessories/nowQuery']

    if (
      prevQuery.category !== newQuery.category ||
      prevQuery.filter !== newQuery.filter
    ) {
      this.$store.dispatch('accessories/getAccInfo', {
        category: this.queryCategory,
        filter: this.filter
      })
    }
  },
  methods: {
    chooseAcc (event) {
      this.$store.commit('accessories/selectAccType', event)
      this.$router.push({
        name: 'Redeem Acc',
        params: { hero: event },
        query: { page: this.page, category: this.title, filter: this.filter }
      })
    },
    changePage (event) {
      if (this.page + event < 1 || this.page + event > this.pages) return
      this.page += event
    },
    assignPage (event) {
      this.page = event
    },
    retry () {
      this.$store.dispatch('accessories/getAccInfo', {
        category: this.queryCategory,
        filter: this.filter
      })
    },
    changeQuery (e) {
      const url = new URL(e.target.href)
      let filter = url.searchParams.get('filter') || ''
      filter = filter.replace('+', ' & ')
      this.$router.push({
        name: this.$route.name,
        query: {
          category: url.searchParams.get('category'),
          filter: filter
        }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    const newQuery = to.query
    const prevQuery = this.$store.getters['accessories/nowQuery']
    if (
      prevQuery.category !== newQuery.category ||
      prevQuery.filter !== newQuery.filter
    ) {
      this.page = 1
      this.$store.dispatch('accessories/getAccInfo', {
        category: newQuery.category,
        filter: newQuery.filter
      })
    }
    next()
  }
}
</script>

<style>
@media (max-width: 425px) {
  .ml-ul-pl ul {
    padding-left: 0px;
  }
}
</style>
