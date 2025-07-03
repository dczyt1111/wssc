Page({
  data: {
    goods: null,
    selectedSpecs: {},
    cartCount: 0
  },

  onLoad(options) {
    const id = options.id;
    this.loadGoodsDetail(id);
    this.loadCartCount();
  },

  // 加载商品详情
  loadGoodsDetail(id) {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟数据
      const goods = {
        id: id,
        name: `纸巾`,
        price: (Math.random() * 100 + 10).toFixed(2),
        originalPrice: (Math.random() * 150 + 100).toFixed(2),
        discount: (Math.random() * 5 + 5).toFixed(1),
        sales: Math.floor(Math.random() * 1000),
        express: '免运费',
        images: [
          'https://example.com/goods1.jpg',
          'https://example.com/goods2.jpg',
          'https://example.com/goods3.jpg'
        ],
        specs: [
          { name: '颜色', values: ['红色', '蓝色', '黑色', '白色'] },
          { name: '尺寸', values: ['S', 'M', 'L', 'XL'] }
        ],
        detail: `
          <div style="color:#333;font-size:14px;">
            <p>商品详情内容，支持HTML格式</p>
            <p>这里可以放置商品的详细描述、参数、使用方法等</p>
            <img src="https://example.com/detail1.jpg" style="width:100%;"/>
            <img src="https://example.com/detail2.jpg" style="width:100%;"/>
          </div>
        `
      };
      
      this.setData({
        goods: goods,
        selectedSpecs: {
          '颜色': goods.specs[0].values[0],
          '尺寸': goods.specs[1].values[0]
        }
      });
      
      wx.hideLoading();
    }, 800);
  },

  // 加载购物车数量
  loadCartCount() {
    // 实际项目中应该从后端获取或从全局状态获取
    this.setData({ cartCount: 3 }); // 模拟数据
  },

  // 选择规格
  selectSpec(e) {
    const { name, value } = e.currentTarget.dataset;
    this.setData({
      [`selectedSpecs.${name}`]: value
    });
  },

  // 加入购物车
  addToCart() {
    const { goods, selectedSpecs } = this.data;
    const specsText = Object.values(selectedSpecs).join(' ');
    
    wx.showLoading({ title: '添加中...' });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      });
      
      // 更新购物车数量
      this.setData({ cartCount: this.data.cartCount + 1 });
    }, 500);
  },

  // 立即购买
  buyNow() {
    const { goods, selectedSpecs } = this.data;
    const specsText = Object.values(selectedSpecs).join(' ');
    
    wx.navigateTo({
      url: `/pages/order/confirm?goodsId=${goods.id}&specs=${encodeURIComponent(specsText)}`
    });
  }
});