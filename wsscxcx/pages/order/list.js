Page({
  data: {
    currentTab: 1, // 默认选中待付款标签
    orderList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    isLoading: false,
    statusMap: {
      0: '全部',
      1: '待付款',
      2: '待发货',
      3: '待收货',
      4: '待评价',
      5: '已完成',
      6: '已取消'
    }
  },

  onLoad(options) {
    // 从URL参数中获取初始状态
    if (options.status) {
      this.setData({
        currentTab: parseInt(options.status)
      });
    }
    this.loadOrderList();
  },

  // 加载订单列表
  loadOrderList() {
    if (this.data.isLoading || !this.data.hasMore) return;
    
    this.setData({ isLoading: true });
    
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟数据 - 主要生成待付款订单(状态为1)
      const status = this.data.currentTab === 0 ? null : this.data.currentTab;
      const newOrders = this.generateMockOrders(status);
      
      this.setData({
        orderList: this.data.page === 1 ? newOrders : this.data.orderList.concat(newOrders),
        page: this.data.page + 1,
        hasMore: newOrders.length >= this.data.pageSize,
        isLoading: false
      });
      
      wx.hideLoading();
    }, 800);
  },

  // 生成模拟订单数据
  generateMockOrders(status) {
    const count = this.data.pageSize;
    const orders = [];
    
    for (let i = 0; i < count; i++) {
      // 如果指定了状态，则生成指定状态的订单，否则随机生成
      const orderStatus = status !== null ? status : Math.floor(Math.random() * 6) + 1;
      
      // 如果是第一页且指定了待付款状态，确保至少有一条待付款订单
      if (this.data.page === 1 && status === 1 && i === 0) {
        orders.push(this.createMockOrder(1));
        continue;
      }
      
      orders.push(this.createMockOrder(orderStatus));
    }
    
    return orders;
  },

  // 创建单个模拟订单
  createMockOrder(status) {
    const goodsCount = Math.floor(Math.random() * 3) + 1;
    const goodsList = [];
    let totalAmount = 0;
    
    for (let i = 0; i < goodsCount; i++) {
      const price = (Math.random() * 100 + 20).toFixed(2);
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      goodsList.push({
        goodsId: Math.floor(Math.random() * 1000) + 1,
        name: `商品${Math.floor(Math.random() * 1000) + 1}`,
        image: `https://example.com/goods${Math.floor(Math.random() * 5) + 1}.jpg`,
        specs: ['红色', 'M'].join(' '),
        price: price,
        quantity: quantity
      });
      
      totalAmount += parseFloat(price) * quantity;
    }
    
    // 随机添加运费
    const freight = Math.random() > 0.5 ? (Math.random() * 15 + 5).toFixed(2) : 0;
    totalAmount += parseFloat(freight);
    
    return {
      orderNo: 'NO' + Date.now() + Math.floor(Math.random() * 1000),
      status: status,
      goodsList: goodsList,
      totalAmount: totalAmount.toFixed(2),
      freight: freight,
      createTime: new Date().toLocaleString()
    };
  },

  // 切换订单状态标签
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.currentTab === index) return;
    
    this.setData({
      currentTab: index,
      orderList: [],
      page: 1,
      hasMore: true
    });
    
    this.loadOrderList();
  },

  // 加载更多
  loadMore() {
    if (this.data.hasMore) {
      this.loadOrderList();
    }
  },

  // 获取状态文本
  getStatusText(status) {
    return this.data.statusMap[status] || '';
  },

  // 跳转到订单详情
  navigateToDetail(e) {
    const orderNo = e.currentTarget.dataset.orderNo;
    wx.navigateTo({
      url: `/pages/order/detail?orderNo=${orderNo}`
    });
  },

  // 取消订单
  cancelOrder(e) {
    const orderNo = e.currentTarget.dataset.orderNo;
    
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中...' });
          
          // 模拟API请求
          setTimeout(() => {
            // 更新本地订单状态
            const orderList = this.data.orderList.map(order => {
              if (order.orderNo === orderNo) {
                order.status = 6; // 已取消
              }
              return order;
            });
            
            this.setData({ orderList });
            wx.hideLoading();
            wx.showToast({
              title: '订单已取消',
              icon: 'success'
            });
          }, 800);
        }
      }
    });
  },

  // 支付订单
  payOrder(e) {
    const orderNo = e.currentTarget.dataset.orderNo;
    
    wx.showLoading({ title: '支付中...' });
    
    // 模拟支付流程
    setTimeout(() => {
      // 更新本地订单状态
      const orderList = this.data.orderList.map(order => {
        if (order.orderNo === orderNo) {
          order.status = 2; // 待发货
        }
        return order;
      });
      
      this.setData({ orderList });
      wx.hideLoading();
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      });
    }, 1500);
  }
});