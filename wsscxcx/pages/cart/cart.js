Page({
  data: {
    cartItems: [],
    isAllChecked: false,
    totalPrice: 0,
    checkedCount: 0
  },

  onLoad() {
    this.loadCartData();
  },

  onShow() {
    this.calculateTotal();
  },

  // 加载购物车数据
  loadCartData() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟数据
      const cartItems = Array(3).fill(0).map((_, i) => ({
        id: i + 1,
        name: `母婴级纸巾`,
        image: `https://example.com/goods${i + 1}.jpg`,
        price: (Math.random() * 100 + 10).toFixed(2),
        specs: ['多种样式'].join(' '),
        quantity: Math.floor(Math.random() * 5) + 1,
        checked: true
      }));
      
      this.setData({ cartItems });
      this.calculateTotal();
      wx.hideLoading();
    }, 800);
  },

  // 计算总价和选中数量
  calculateTotal() {
    let totalPrice = 0;
    let checkedCount = 0;
    let isAllChecked = true;
    
    this.data.cartItems.forEach(item => {
      if (item.checked) {
        totalPrice += item.price * item.quantity;
        checkedCount += 1;
      } else {
        isAllChecked = false;
      }
    });
    
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      checkedCount,
      isAllChecked
    });
  },

  // 切换商品选中状态
  toggleCheck(e) {
    const id = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems.map(item => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    
    this.setData({ cartItems });
    this.calculateTotal();
  },

  // 切换全选
  toggleAllCheck() {
    const isAllChecked = !this.data.isAllChecked;
    const cartItems = this.data.cartItems.map(item => {
      item.checked = isAllChecked;
      return item;
    });
    
    this.setData({ cartItems, isAllChecked });
    this.calculateTotal();
  },

  // 增加数量
  increaseQuantity(e) {
    const id = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems.map(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    
    this.setData({ cartItems });
    this.calculateTotal();
  },

  // 减少数量
  decreaseQuantity(e) {
    const id = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    
    this.setData({ cartItems });
    this.calculateTotal();
  },

  // 结算
  checkout() {
    if (this.data.checkedCount === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    
    const selectedItems = this.data.cartItems.filter(item => item.checked);
    wx.navigateTo({
      url: `/pages/order/confirm?items=${encodeURIComponent(JSON.stringify(selectedItems))}`
    });
  }
});