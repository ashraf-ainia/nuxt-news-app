export const state = () => ({
    articles: []
})

export const mutations = {
    setArticles(state, newArticles) {
        state.articles = newArticles
    },
    emptyArticles(state) {
        state.articles = []
    }
}

export const getters = {
    getArticleById: state => id => {
        return state.articles.find(el => el.id === id)
    }
}