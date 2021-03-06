// pages/home/home.js
var _this;
let i = 0
let num = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hides: true,
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    i++
    num.push(i)
    this.setData({
      num
    })
  },
  // 展示一言展示框
  touse() {
    this.setData({
      hides: false
    })
  },
  // 隐藏一言展示框
  top() {
    this.setData({
      hides: true
    })
  },
  // 获取时间
  timeFun() {
    var time = new Date;
    var day = time.getDay();
    var date = time.getDate();
    day = day == 0 ? "天" : day == 1 ? "一" : day == 2 ? "二" : day == 3 ? "三" : day == 4 ? "四" : day == 5 ? "五" : "六"
    date = date < 10 ? "0" + date : date
    _this.setData({
      date,
      day
    })
  },

  // 获取一言
  hitokotoFun() {
    wx.cloud.callFunction({
      name:"basics-http",
      success(res) {
        
        console.log("一言", JSON.parse(res.result))
        return
        _this.setData({
          hitokoto: {
            hitokoto: res.result.data.hitokoto,
            name: res.result.data.from_who == null ? res.result.data.from : res.result.data.from_who
          }
        })
        // 停止下拉刷新
        wx.stopPullDownRefresh()
      },
      fail(err) {
        console.log(err)
      }
    })
    return
    wx.request({
      url: "https://v1.hitokoto.cn",

      method: "get",
      dataType: "json",
      success(res) {
        console.log("一言", res.data)
        _this.setData({
          hitokoto: {
            hitokoto: res.data.hitokoto,
            name: res.data.from_who == null ? res.data.from : res.data.from_who
          }
        })
        // 停止下拉刷新
        wx.stopPullDownRefresh()
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    _this = this;
    this.timeFun()
    this.hitokotoFun()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.hitokotoFun()
  },


})