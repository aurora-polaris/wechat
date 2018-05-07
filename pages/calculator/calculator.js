Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1:'Backspace',
    index2: 'clear',
    index3: 'a',
    index4: '+',
    index5: '7',
    index6: '8',
    index7: '9',
    index8: '-',
    index9: '4',
    index10: '5',
    index11: '6',
    index12: '*',
    index13: '1',
    index14: '2',
    index15: '3',
    index16: '/',
    index17: '0',
    index18: '.',
    index19:'=',
    index20:'history',
    screenData:'0',
    last:false,
    arr:[],
    logs:[]
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
    
  },
  history:function(){
    wx.navigateTo({
      url: '../list/list',
    })
  },
  clickbtn:function(e){
    var value=e.target.id;
    if (value == this.data.index1){ //  退格
      var data = this.data.screenData;
      if (data==0){return}
      data = data.substring(0, data.length-1)
      if (data == '' || data=='.'){
        data=0
      }
      this.setData({screenData:data})
      this.data.arr.pop()
    }
    else if(value==this.data.index2){ //清空
      this.setData({screenData:'0'})
      this.data.arr.length=0
    }
    else if(value==this.data.index3){ // 负号,这里只是给第一个元素加了负号
      var data=this.data.screenData;
      if(data==0){
        return
      }
      var firstWord=data.substring(0,1)
      if(firstWord=='-'){
        data=data.substring(1,data.length)
        this.data.arr.shift()
      }else{
        data='-'+data
        this.data.arr.unshift('-')
      }
      this.setData({screenData:data})
    }
    else if(value==this.data.index19){ // =
      var data=this.data.screenData
      if(data==0){
        return
      }
      var lastWord=data.substring(data.length-1,data.length)
      if(isNaN(lastWord)){
        return
      }
      var num='';

      var last;
      var arr=this.data.arr;
      var optarr=[]
      for(var i in arr){
        if(isNaN(arr[i])==false||arr[i]==this.data.index3||arr[i]==this.data.index18){
          num+=arr[i]
        }else{
          last=arr[i]
          optarr.push(num)
          optarr.push(arr[i])
          num=''
        }
      }
      optarr.push(Number(num))
      // 操作小数
      var result=Number(optarr[0])*1.0
      // 运算
      for(var i=1;i<optarr.length;i++){
        if(isNaN(optarr[i])){  
          if (optarr.length > 3) {
            // 先加后减
            if (optarr[3] == this.data.index8) {
              var num = result
              num -= Number(optarr[4])
              result = num
            }
            // 先减后加
            else if (optarr[3] == this.data.index4) {
              var num = result
              num += Number(optarr[4])
              result = num
            }
          } 
          // +
          if(optarr[1]==this.data.index4){
            result+=Number(optarr[i+1])
          }
          // -
          else if (optarr[1] == this.data.index8) {
            result -= Number(optarr[i + 1])
          }
          // *
          else if (optarr[1] == this.data.index12) {
            result *= Number(optarr[i + 1])
          }
          // /
          else if (optarr[1] == this.data.index16) {
            result /= Number(optarr[i + 1])
          }
        }
       
      }
      this.data.arr.length=0;  
      this.data.arr.push(result)
      this.setData({screenData:result+''})

      //存储数据 wx.setStorageSync(key, data)
      this.data.logs.push(data+'='+result)
      // callogs 覆盖之前的值
      wx.setStorageSync('callogs', this.data.logs)
      this.data.arr.length=0;
      this.data.arr.push(result);
      this.setData({screenData:result+''})
    }
    else{
      if (value == this.data.index4 || value == this.data.index8 || value == this.data.index12 || value == this.data.index16){
        if(this.data.last==true||this.data.screenData==0){
          return
        }
      }
      var screenData=this.data.screenData;
      var data;
      if(screenData==0){
        data=value
      }else{
        data=screenData+value
      }
      // 这里的this指的是page，page提供了一个setData的方法去操纵数值
      this.setData({ screenData: data })
      this.data.arr.push(value)
      // 判断第三次输入的是不是运算符
      if (value == this.data.index4 || value == this.data.index8 || value == this.data.index12 || value == this.data.index16){
        this.setData({last:true})
      }else{
        this.setData({ last: false })
      }
    }
    
  }
})