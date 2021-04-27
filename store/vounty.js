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
    const url = '/vounty/'
    return this.$axios.$post(url, data)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to create Vounty.', data },
          { root: true }
        )
        throw error
      })
  },
  read ({ state, commit }, { id, params }) {
    let url = '/vounty/'
    if (id) url = url + id + '/'
    const config = { params }
    return this.$axios.$get(url, config)
      .then((data) => {
        if (id) commit('set', { current: data })
        else commit('set', data)
        return data
      })
      .catch((error) => {
        commit(
          'error/set',
          {
            message: id
              ? 'Failed to read Vounty. The Tag id was ' + id + '.'
              : 'Failed to read Vounty collection.',
            data: null
          },
          { root: true })
        throw error
      })
  },
  update ({ state, commit }, { id, data }) {
    const url = '/vounty/' + id + '/'
    return this.$axios.$patch(url, data)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to update Vounty with id ' + id + '.', data },
          { root: true }
        )
        throw error
      })
  },
  delete ({ state, commit }, { id }) {
    const url = '/vounty/' + id + '/'
    return this.$axios.$delete(url)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to delete Vounty with id ' + id + '.', data: null },
          { root: true }
        )
        throw error
      })
  },
  start ({ state, commit }, { data }) {
    const url = '/vounty/start/'
    return this.$axios.$post(url, data)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to start Vounty.', data },
          { root: true }
        )
        throw error
      })
  }
}
