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
    const url = '/entry/'
    return this.$axios.$post(url, data)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit('error/set', {
          method: 'entry/create',
          payload: { data }
        }, { root: true })
        throw error
      })
  },
  read ({ state, commit }, { id, params }) {
    let url = '/entry/'
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
        commit('error/set', {
          method: 'entry/read',
          payload: { id, params }
        }, { root: true })
        throw error
      })
  },
  update ({ state, commit }, { id, data }) {
    const url = '/entry/' + id + '/'
    return this.$axios.$patch(url, data)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit('error/set', {
          method: 'entry/update',
          payload: { id, data }
        }, { root: true })
        throw error
      })
  },
  delete ({ state, commit }, { id }) {
    const url = '/entry/' + id + '/'
    return this.$axios.$delete(url)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit('error/set', {
          method: 'entry/delete',
          payload: { id }
        }, { root: true })
        throw error
      })
  },
  vote ({ state, commit }, { data }) {
    const url = '/entry/vote/'
    return this.$axios.$post(url, data)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit('error/set', {
          method: 'entry/vote',
          payload: { data }
        }, { root: true })
        throw error
      })
  }
}
