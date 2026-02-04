// app.ts
const THEME_KEY = 'app_theme'

App<IAppOption>({
  globalData: {
    theme: 'default' as 'default' | 'dark' | 'mint',
  },
  onLaunch() {
    const saved = wx.getStorageSync(THEME_KEY) as string | undefined
    if (saved === 'dark' || saved === 'mint' || saved === 'default') {
      this.globalData.theme = saved
    }
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: res => {
        console.log(res.code)
      },
    })
  },
})