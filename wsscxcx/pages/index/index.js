Page({
  data: {
    banners: [],         // 轮播图数据
    navItems: [],       // 导航分类数据
    goodsList: [],      // 商品列表数据
    page: 1,            // 当前页码
    pageSize: 10,       // 每页数量
    hasMore: true,      // 是否还有更多数据
    isLoading: false    // 是否正在加载
  },

  onLoad() {
    this.loadData();
  },

  // 加载数据
  loadData() {
    if (this.data.isLoading) return;
    
    this.setData({ isLoading: true });
    
    // 模拟API请求
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 模拟数据
      const newBanners = [
        { id: 1, imageUrl: '/zp/lb.jfif', link: '' },
        { id: 2, imageUrl: '/zp/lb.jpg', link: '' },
        { id: 3, imageUrl: '/zp/lb.webp', link: '' }
      ];
      
      const newNavItems = [
        { id: 1, name: '手机', icon: '/zp/sj.png' },
        { id: 2, name: '电脑', icon: '/zp/dn.png' },
        { id: 3, name: '家电', icon: '/zp/jd.png' },
        { id: 4, name: '食品', icon: '/zp/sp.png' },
        { id: 5, name: '美妆', icon: '/zp/mz.png' },
        { id: 6, name: '服饰', icon: '/zp/fs.png' },
        { id: 7, name: '图书', icon: '/zp/ts.png' },
        { id: 8, name: '运动', icon: '/zp/lq.png' }
      ];
      
      const newGoods = Array(10).fill(0).map((_, i) => ({
        id: i + (this.data.page - 1) * 10 + 1,
        name: `商品${i + (this.data.page - 1) * 10 + 1}`,
        coverImage: `https://example.com/goods${(i % 5) + 1}.jpg`,
        price: (Math.random() * 100 + 10).toFixed(2),
        originalPrice: (Math.random() * 150 + 30).toFixed(2),
        sales: Math.floor(Math.random() * 1000)
      }));
      
      this.setData({
        banners: newBanners,
        navItems: newNavItems,
        goodsList: this.data.goodsList.concat(newGoods),
        page: this.data.page + 1,
        hasMore: this.data.page < 3, // 模拟只有3页数据
        isLoading: false
      });
      
      wx.hideLoading();
    }, 1000);
  },

  // 下拉加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      this.loadData();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: [],
      page: 1,
      hasMore: true
    });
    this.loadData(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 跳转到分类页
  navigateToCategory(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/category/category?id=${id}`
    });
  },

  // 跳转到商品详情页
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/goods/goods?id=${id}`
    });
  }
});