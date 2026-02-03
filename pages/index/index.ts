// index.ts
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 轮播图：4 张未来科技感图片（可替换为本地 /images/ 或配置 downloadFile 域名）
const BANNER_LIST = [
  { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' },
  { url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800' },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' },
  { url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800' },
]

Component({
  data: {
    bannerList: BANNER_LIST,
    activeTab: 0,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    onTabTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number((e.currentTarget as WechatMiniprogram.Target).dataset.index)
      if (typeof index !== 'number' || index < 0 || index > 2) return
      this.setData({ activeTab: index })
    },
    onMenuTap(e: WechatMiniprogram.TouchEvent) {
      const path = (e.currentTarget as WechatMiniprogram.Target).dataset.path as string
      if (path) wx.navigateTo({ url: path })
    },
    onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        'userInfo.avatarUrl': avatarUrl,
        hasUserInfo: !!(nickName && avatarUrl && avatarUrl !== defaultAvatarUrl),
      })
    },
    onInputChange(e: WechatMiniprogram.CustomEvent) {
      const nickName = e.detail.value as string
      const { avatarUrl } = this.data.userInfo
      this.setData({
        'userInfo.nickName': nickName,
        hasUserInfo: !!(nickName && avatarUrl && avatarUrl !== defaultAvatarUrl),
      })
    },
    getUserProfile() {
      wx.getUserProfile({
        desc: '用于展示用户信息',
        success: (res) => {
          this.setData({ userInfo: res.userInfo, hasUserInfo: true })
        },
      })
    },
  },
})
