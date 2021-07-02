<template>
  <div class="container">
    <div class="selected-article-container">
      <h4 class="text-center selected-article-title">{{ article.title }}</h4>
      <b-card :img-src="article.imageUrl" img-alt="Article image" img-top>
        <b-card-text>
          {{ article.description }}
        </b-card-text>
        <b-button
          :href="article.originalArticleUrl"
          target="_blank"
          variant="primary"
          >Go to original article</b-button
        >
      </b-card>
      <div class="articale-date-container">Published At: {{ publishedAt }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  computed: {
    article() {
      const articleId = this.$route.query.id
      const selectedArticle = this.$store.state.news.articles.find(
        (el) => el.id === articleId
      )
      return selectedArticle || {}
    },
    publishedAt() {
      return dayjs(this.article.publishedAt).format('YYYY-MM-DD')
    }
  },
  mounted() {
    if (!this.article || !this.article.id) {
      this.$router.push({ name: 'index' })
    }
  },
}
</script>