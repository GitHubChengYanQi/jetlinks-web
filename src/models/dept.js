export default {
  state: {
    deptTree: []
  },
  reducers: {
    setDeptTree(state, data) {
      state.deptTree = data;
    }
  }
}