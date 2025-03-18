import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 当前选中的服装类型
    currentType: '',
    // 推荐的服装列表
    recommendList: [],
    // 是否正在加载
    loading: false
  }),
  
  actions: {
    // 设置当前服装类型
    setCurrentType(type) {
      this.currentType = type
    },
    
    // 设置推荐列表
    setRecommendList(list) {
      this.recommendList = list
    },
    
    // 设置加载状态
    setLoading(status) {
      this.loading = status
    }
  }
})