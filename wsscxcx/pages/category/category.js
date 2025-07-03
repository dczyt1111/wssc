Page({
  data: {
    categories: [],          // 所有分类数据
    activeCategoryId: null,   // 当前选中的分类ID
    currentCategory: {},      // 当前分类的详细信息
    goodsList: [],            // 商品列表数据
    scrollTop: 0,             // 右侧滚动位置
    page: 1,                  // 当前页码
    pageSize: 10,             // 每页数量
    hasMore: true,            // 是否还有更多数据
    isLoading: false          // 是否正在加载
  },

  onLoad() {
    this.loadCategoryData();
  },

  // 加载分类数据
  loadCategoryData() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟分类数据
      const categories = Array(10).fill(0).map((_, i) => ({
        id: i + 1,
        name: ['手机数码', '电脑办公'][i],
        banner: `https://example.com/category-banner${(i % 3) + 1}.jpg`,
        children: i % 2 === 0 ? Array(6).fill(0).map((_, j) => ({
          id: (i + 1) * 100 + j + 1,
          name: ['热门', '新品', '旗舰', '平价', '套装', '配件'][j],
          icon: `https://example.com/sub-category${(j % 4) + 1}.png`
        })) : null
      }));
      
      this.setData({
        categories,
        activeCategoryId: categories[0].id,
        currentCategory: categories[0]
      });
      
      // 加载第一个分类的商品
      this.loadGoodsList();
      
      wx.hideLoading();
    }, 800);
  },

  // 加载商品列表
  loadGoodsList() {
    if (this.data.isLoading || !this.data.hasMore) return;
    
    this.setData({ isLoading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟商品数据
      const newGoods = Array(this.data.pageSize).fill(0).map((_, i) => ({
        id: i + (this.data.page - 1) * this.data.pageSize + 1,
        name: `${this.data.currentCategory.name}商品${i + (this.data.page - 1) * this.data.pageSize + 1}`,
        coverImage: `https://example.com/goods${(i % 5) + 1}.jpg`,
        price: (Math.random() * 100 + 50).toFixed(2)
      }));
      
      this.setData({
        goodsList: this.data.page === 1 ? newGoods : this.data.goodsList.concat(newGoods),
        page: this.data.page + 1,
        hasMore: this.data.page < 3, // 模拟只有3页数据
        isLoading: false,
        scrollTop: this.data.page === 1 ? 0 : this.data.scrollTop // 第一页时回到顶部
      });
    }, 600);
  },

  // 切换分类
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    if (this.data.activeCategoryId === categoryId) return;
    
    const category = this.data.categories.find(item => item.id === categoryId);
    
    this.setData({
      activeCategoryId: categoryId,
      currentCategory: category,
      goodsList: [],
      page: 1,
      hasMore: true,
      scrollTop: 0
    });
    
    this.loadGoodsList();
  },

  // 右侧内容滚动
  onContentScroll(e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    });
  },

  // 跳转到子分类
  navigateToSubCategory(e) {
    const subCategoryId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/goods/list?categoryId=${subCategoryId}`
    });
  },

  // 跳转到商品详情
  navigateToDetail(e) {
    const goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/goods/detail?id=${goodsId}`
    });
  },

  // 加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      this.loadGoodsList();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: [],
      page: 1,
      hasMore: true
    });
    this.loadGoodsList(() => {
      wx.stopPullDownRefresh();
    });
  }
});