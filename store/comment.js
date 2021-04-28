export const state = () => ({
  results: [],
  count: 0,
  next: null,
  previous: null,
  current: {}
})

export const mutations = {
  set (state, data) {
    state.results = data.results
    state.count = data.count
    state.next = data.next
    state.previous = data.previous
    state.current = data.current
  }
}

export const actions = {
  create ({ state, commit }, { data }) {
    const url = '/comment/'
    return this.$axios.$post(url, data)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit(
          'error/set',
          { message: 'Failed to create Comment.', data },
          { root: true }
        )
        throw error
      })
  },
  read ({ state, commit }, { id, params }) {
    let url = '/comment/'
    if (id) url = url + id + '/'
    const config = { params }
    return this.$axios.$get(url, config)
      .then((data) => {
        if (id) commit('set', { current: data })
        else commit('set', data)
        return data
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit(
          'error/set',
          {
            message: id
              ? 'Failed to read Comment. The Comment id was ' + id + '.'
              : 'Failed to read Comment collection.',
            data: null
          },
          { root: true })
        throw error
      })
  },
  update ({ state, commit }, { id, data }) {
    const url = '/comment/' + id + '/'
    return this.$axios.$patch(url, data)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit(
          'error/set',
          { message: 'Failed to update Comment with id ' + id + '.', data },
          { root: true }
        )
        throw error
      })
  },
  delete ({ state, commit }, { id }) {
    const url = '/comment/' + id + '/'
    return this.$axios.$delete(url)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit(
          'error/set',
          { message: 'Failed to delete Comment with id ' + id + '.', data: null },
          { root: true }
        )
        throw error
      })
  },
  vote ({ state, commit }, { data }) {
    const url = '/comment/vote/'
    return this.$axios.$post(url, data)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit(
          'error/set',
          { message: 'Failed to vote on Comment.', data },
          { root: true }
        )
        throw error
      })
  }
}
