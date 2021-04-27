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
    const url = '/tag/'
    return this.$axios.$post(url, data)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to create Tag.', data },
          { root: true }
        )
        throw error
      })
  },
  read ({ state, commit }, { id, params }) {
    let url = '/tag/'
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
              ? 'Failed to read Tag. The Tag id was ' + id + '.'
              : 'Failed to read Tag collection.',
            data: null
          },
          { root: true })
        throw error
      })
  },
  update ({ state, commit }, { id, data }) {
    const url = '/tag/' + id + '/'
    return this.$axios.$patch(url, data)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to update Tag with id ' + id + '.', data },
          { root: true }
        )
        throw error
      })
  },
  delete ({ state, commit }, { id }) {
    const url = '/tag/' + id + '/'
    return this.$axios.$delete(url)
      .catch((error) => {
        commit(
          'error/set',
          { message: 'Failed to delete Tag with id ' + id + '.', data: null },
          { root: true }
        )
        throw error
      })
  }
}
