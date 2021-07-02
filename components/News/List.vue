<template>
  <div style="padding-top: 1em">
    <nuxt keep-alive />
    <h3>
      Search the world popular news article published by over 80,000 news
      sources and blogs
    </h3>
    <b-form-input
      v-model="queryText"
      v-debounce:700ms="queryTextChangedHandler"
      type="search"
      placeholder="Search news"
      class="news-search-input"
      autofocus
    ></b-form-input>
    <hr />
    <div v-if="isLoading" class="text-center">
      <strong>Loading...</strong>
      <b-spinner variant="primary" label="Loading..."></b-spinner>
    </div>
    <ul v-else-if="articles.length > 0">
      <NewsItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </ul>
    <div v-else class="search-hint" >
      <p>
        <img src="~/assets/images/search-news.jpg" width="100" />
        Search news articles to list them here!
        </p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getDirective } from 'vue-debounce'
import Article from '../../Models/Article'
// import dummy from '../../helpers/dummy'

export default {
  directives: {
    debounce: getDirective(),
  },
  data() {
    return {
      queryText: '',
      isLoading: false,
    }
  },
  head: {
    titleTemplate: 'Awesom News App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Search the nost modern news in the world here',
      },
    ],
  },
  computed: {
    articles() {
      return this.$store.state.news.articles
    },
  },
  // mounted() {
  //   // to remove
  //   const dummyArticles = dummy.articles.map((el) => new Article(el))
  //   this.$store.commit('news/setArticles', dummyArticles)
  // },
  // beforeMount() {
  //   this.getNewsArticles()
  // },
  methods: {
    async getNewsArticles() {
      this.isLoading = true
      const yesterday = dayjs().add(-1, 'day').format('YYYY-MM-DD')
      const today = dayjs().format('YYYY-MM-DD')
      if (this.queryText.trim()) {
        const searchText = encodeURI(this.queryText)
        await this.$axios
          .$get(
            `${process.env.NEWS_API_URL}/everything?q=${searchText}&from=${yesterday}&to=${today}&sortBy=popularity&pageSize=20&page=1`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEWS_KEY}`,
              },
            }
          )
          .then((result) => {
            this.isLoading = false
            if (result.status === 'ok' && Array.isArray(result.articles)) {
              const fetchedArticles = result.articles.map(
                (el) => new Article(el)
              )
              this.$store.commit('news/setArticles', fetchedArticles)
            }
          })
          .catch(error => {
            console.log("error: ", error.response?.data?.message)
            this.isLoading = false
            this.$store.commit('news/emptyArticles')
            this.$bvToast.toast(`Error: ${error.response?.data?.message}`, {
              title: error.response?.data?.code,
              autoHideDelay: 5000,
              variant: 'danger'
            })
          })
      } else {
        this.isLoading = false
        this.$store.commit('news/emptyArticles')
      }
    },
    queryTextChangedHandler() {
      this.getNewsArticles()
    },
  },
}
</script>
