var { coverStarsToArray } = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var baseUrl = app.G_DATA.baseUrl;
    var inTheatersUrl = baseUrl + 'v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = baseUrl + 'v2/movie/coming_soon?start=0&count=3';
    var top250Url = baseUrl + 'v2/movie/top250?start=0&count=3';
    var _this =this;
    this.getData(inTheatersUrl,function(data){
        
        _this.setData({
          inTheatersData: data,
          inTheaterstag: '正在热映'
        })
    });
    this.getData(comingSoonUrl, function (data) {
      _this.setData({
        inconmmingsoon: data,
         inconmmingtag: '即将上映'
      })
    });
    this.getData(top250Url, function (data) {
      _this.setData({
        inTop250Data: data,
        inTop250tag: '即将上映'
      })
    });

  },
  getData:function(url,success){
    var _this = this;
    wx.request({
      url:url,
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        success(_this.formatData(res.data));
        console.log(res.data)
      }
    })

  },
  formatData:function(data){
    var arr = [];
    for (var i = 0; i < data.subjects.length;i++){
      arr.push({
        coverImg: data.subjects[i].images.large,
        title: data.subjects[i].title,
        stars: coverStarsToArray(data.subjects[i].rating.stars),
        score: data.subjects[i].rating.average
      })
    }
    return arr;

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