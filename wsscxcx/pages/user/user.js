Page({
  data: {
    isLogin: false,
    userInfo: {},
    orderCount: {
      waitPay: 0,
      waitDeliver: 0,
      waitReceive: 0,
      waitComment: 0,
      afterSale: 0
    }
  },

  onLoad() {
    this.checkLoginStatus();
    this.loadOrderCount();
  },

  onShow() {
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    // 实际项目中应该从缓存或后端获取登录状态
    const isLogin = wx.getStorageSync('isLogin') || false;
    const userInfo = wx.getStorageSync('userInfo') || {};
    
    this.setData({
      isLogin,
      userInfo
    });
  },

  // 加载订单数量统计
  loadOrderCount() {
    // 模拟API请求
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 模拟数据
      this.setData({
        orderCount: {
          waitPay: 2,
          waitDeliver: 1,
          waitReceive: 3,
          waitComment: 0,
          afterSale: 1
        }
      });
      wx.hideLoading();
    }, 500);
  },

  // 跳转到登录页
  navigateToLogin() {
    if (this.data.isLogin) return;
    
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  // 跳转到订单列表
  navigateToOrderList(e) {
    const status = e.currentTarget.dataset.status || 0;
    wx.navigateTo({
      url: `/pages/order/list?status=${status}`
    });
  },

  // 跳转到售后
  navigateToAfterSale() {
    wx.navigateTo({
      url: '/pages/after-sale/list'
    });
  },

  // 跳转到地址管理
  navigateToAddress() {
    wx.navigateTo({
      url: '/pages/address/list'
    });
  },

  // 跳转到优惠券
  navigateToCoupon() {
    wx.navigateTo({
      url: '/pages/coupon/list'
    });
  },

  // 跳转到收藏
  navigateToCollect() {
    wx.navigateTo({
      url: '/pages/collect/list'
    });
  },

  // 联系客服
  navigateToCustomerService() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567'
    });
  },

  // 跳转到设置
  navigateToSetting() {
    wx.navigateTo({
      url: '/pages/setting/setting'
    });
  }
});