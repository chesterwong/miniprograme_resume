const THEME_STORAGE_KEY = 'app_theme'
const THEMES = [
  { id: 'default', name: '默认', desc: '浅色白底' },
  { id: 'dark', name: '深色', desc: '深色护眼' },
  { id: 'mint', name: '清新', desc: '薄荷浅绿' },
] as const

const DEFAULT_AVATAR = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    theme: 'default' as string,
    themeList: THEMES,
    userInfo: { avatarUrl: '', nickName: '未登录' },
    defaultAvatar: DEFAULT_AVATAR,
    version: '1.0.0',
  },
  onLoad() {
    const app = getApp<IAppOption>()
    const theme = app.globalData.theme || 'default'
    this.setData({ theme })
  },
  onShow() {
    const app = getApp<IAppOption>()
    const theme = app.globalData.theme || 'default'
    this.setData({ theme })
  },
  onThemeSelect(e: WechatMiniprogram.TouchEvent) {
    const id = (e.currentTarget as WechatMiniprogram.Target).dataset.id as 'default' | 'dark' | 'mint'
    if (!id) return
    wx.setStorageSync(THEME_STORAGE_KEY, id)
    const app = getApp<IAppOption>()
    app.globalData.theme = id
    this.setData({ theme: id })
    wx.showToast({ title: '已切换皮肤', icon: 'none' })
  },
  onUserInfo() {
    wx.getUserProfile({
      desc: '用于展示用户信息',
      success: (res) => {
        this.setData({
          userInfo: {
            avatarUrl: res.userInfo.avatarUrl || '',
            nickName: res.userInfo.nickName || '微信用户',
          },
        })
      },
    })
  },
  onNotify() {
    wx.showToast({ title: '通知设置', icon: 'none' })
  },
  onPrivacy() {
    wx.showToast({ title: '隐私设置', icon: 'none' })
  },
  onAbout() {
    wx.showToast({ title: '关于我们', icon: 'none' })
  },
  onClearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定清除本地缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({ title: '已清除', icon: 'none' })
        }
      },
    })
  },
})
