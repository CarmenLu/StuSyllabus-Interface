// pages/index/index.js
import regeneratorRuntime from '../../utils/third-party/runtime' // eslint-disable-line
import { wxRequest } from '../../utils/lib/wxApi'
import { api } from '../../utils/api'
import { getDateInfo, getTermList } from '../../utils/function/week'
import { getTermData } from '../../utils/function/term'

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    // todo 日程的数据结构
    data: {
        classData: [],
        month: ' ',
        year: ' ',
        StuWeek: '',
        TermList: [],
        today: ' ',
        dayList: [],
        WeekTermList: [],
        currentTab: '0',
        currentSwiper: '0'
    },
    changeTab: function (e) {
        console.log(e)
        this.setData({
            currentTab: e.currentTarget.dataset.current
        })
    },
    switchSwiper: function (e) {
        this.setData({
            currentSwiper: e.detail.current
        })
    },
    callback1: function () {
        let that = this
        let TermList = getTermList()
        TermList = getTermData(TermList, that.data.classData)
        this.setData({
            TermList
        })
        let today = getDateInfo(new Date())
        console.log(today)
        let WeekTermList = TermList[today.StuWeek - 1]
        console.log(WeekTermList)
        console.log(TermList)
        wx.setStorageSync('TermList', this.data.TermList)
        let dayList = new Array(7)
        for (let i = 0; i < WeekTermList.length; i++) {
            dayList[i] = WeekTermList[i].dateData
        }
        console.log(dayList)
        this.setData({
            month: today.month,
            StuWeek: today.StuWeek,
            year: today.year,
            today,
            dayList,
            WeekTermList,
            currentSwiper: today.day2 - 1,
            currentTab: today.day2 - 1
        })
        console.log(this.data.WeekTermList)
    },
    /* 拿取课表 */
    async getClassData() {
        let classData = wx.getStorageInfoSync('classData')
        let termList = wx.getStorageInfoSync('TermList')
        if (classData !== null) {
            this.setData({
                classData
            })
        }
        if (termList !== null) {
            this.setData({
                TermList:termList
            })
        }
        let responseData = await wxRequest({
            url: api.getData
        })
        console.log(responseData)
        if (responseData.data['code'] === '0') {
            let classData = responseData.data['class']
            wx.setStorageSync('classData', classData)
            this.setData({
                classData
            })
            console.log(this.data)
            this.callback1()
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.getClassData()
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
