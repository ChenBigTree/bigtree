// pages/mine/mine.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    img: ''
  },
  click: function () {
    that = this
    that.setData({
      flag: true
    })
  },
  onclick: function () {
    that = this
    that.setData({
      flag: false
    })
  },
  chose: function () {
    that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'image',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFiles
        console.log('res====>', res)
        that.setData({
          img: res.tempFiles[0].path
        })
        console.log('data====>', that.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})