// pages/my/my.js
let _this
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openConfirm: function (e) {
    if (_this.data.userInfo == null) {
      this.setData({
        dialogShow: true
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },


  getUserInfo: function (e) {
    wx.getUserInfo({
      success: e => {
        wx.cloud.callFunction({
          name: "login"
        }).then((res) => {
          let userInfoData = {
            nickName: e.userInfo.nickName,
            avatarUrl: e.userInfo.avatarUrl,
            individualResume: '',
            city: e.userInfo.city,
            isAdministrator: false, // 是否管理员
            isTeacher: true, // 是否讲师
            isDistributionMember: false, // 是否分销员
            fans: [], // 粉丝
            partner: [], // 伙伴
            PriceOfCourse: 50,
            openid: res.result.openid,
            distributionMember: [] // 购买的课程
          }
          app.globalData.userInfo = userInfoData
          this.setData({
            showLogin: !_this.data.showLogin,
            userInfo: userInfoData
          });
          console.log("app=>", app.globalData)

          wx.cloud.callFunction({
            name: "userInfo",
            data: {
              userInfoData: userInfoData,
              fun: "add"
            },
            success(res) {
              console.log("存储成功 ==>", res)
            },
            fail: err => {
              console.log("存储失败 ==>", err)
            }
          })
          console.log("userInfoData==>", userInfoData)
        })
        if (_this.userInfoReadyCallback) {
          _this.userInfoReadyCallback(res)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
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
    console.log("app.globalData.userInfo", app.globalData.userInfo)
    // if (app.globalData.userInfo != undefined) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction({
            name: "userInfo",
            data: {
              fun: "get_personal"
            }
          }).then(res => {
            app.globalData.userInfo = res.result.data[0]
            _this.setData({
              userInfo: app.globalData.userInfo
            })
          })
        }
      }
    })

    // console.log("获取全局的用户信息 =>", app.globalData.userInfo)
    // }
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