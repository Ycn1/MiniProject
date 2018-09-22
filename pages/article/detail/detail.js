var { articles } = require('../../../data/articles.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var articleId = options.articleId;
    this.data.articleId = articleId;
    var article = articles[articleId];
    this.setData(
      article
    );
    var articleCollection = wx.getStorageSync('articles_acoolection');
    var currentIsCollection = false;
   
    if(articleCollection){
      currentIsCollection = !!articleCollection[articleId]
    }else{
      var data= {};
      data[articleId] = false;
      wx.setStorageSync('articles_acoolection', data)
    }
 
    this.setData({
      currentIsCollection: currentIsCollection
    })
    /**监听是否播放音乐 */
    var _this = this;
    var BackgroundAudioManager = wx.getBackgroundAudioManager();
    BackgroundAudioManager.onPause(function(){
      _this.setData({
        isPlayingMusic: false
      })
    })
    BackgroundAudioManager.onPlay(function(){
      _this.setData({
        isPlayingMusic: true
      })
    })

  },
topAdd:function(){
  var articleCollection = wx.getStorageSync('articles_acoolection');
  var currentIsCollection = articleCollection[this.data.articleId];
  
  articleCollection[this.data.articleId]  = !currentIsCollection;
 
  wx.setStorageSync("articles_acoolection", articleCollection);
  this.setData({
    currentIsCollection: !currentIsCollection
  })
  wx.showToast({
    title: currentIsCollection? '取消收藏':"添加收藏"
   
  })
},
/**
 * 分享
 */
  topShare:function(){
    var itemList = ["分享到微信","分享到微博","分享到QQ"]
    wx.showActionSheet({
      itemList:itemList,
      success: function (res) {
        wx.showToast({
          title: itemList[res.tapIndex] +"成功"

        })
      }
    })
    
  },
  /**是否播放音乐 */
  playMusic:function(){
    var BackgroundAudioManager = wx.getBackgroundAudioManager();

    BackgroundAudioManager.src =this.data.music.src;
    BackgroundAudioManager.title = this.data.music.title;
    BackgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
    var isPlayingMusic = !!this.data.isPlayingMusic;
    if (isPlayingMusic){
      this.setData({
        isPlayingMusic: false
      },function(){
        BackgroundAudioManager.pause()
      })
    }else{
      this.setData({
        isPlayingMusic: true
      }, function () {
        BackgroundAudioManager.play()
      })
    }
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