<template>
  <div>
    <NuxtLink :to="toUrl" class="app-link">
      <b-card no-body class="overflow-hidden article-container">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img-lazy
              :src="article.imageUrl"
              alt="Image"
              class="rounded-0"
            ></b-card-img-lazy>
          </b-col>
          <b-col md="6">
            <b-card-body :title="article.title">
              <b-card-text>
                {{ article.description.substr(0, 150) + '...' }}
              </b-card-text>
              <b-button variant="primary">Read more</b-button>
            </b-card-body>
            <div class="articale-date-container">
              Published At: {{publishedAt}}
            </div>
          </b-col>
        </b-row>
      </b-card>
    </NuxtLink>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    toUrl() {
      return `/article?id=${this.article.id}`
    },
    publishedAt() {
      return dayjs(this.article.publishedAt).format('YYYY-MM-DD')
    },
  },
}
</script>
