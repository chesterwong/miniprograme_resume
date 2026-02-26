// index.ts
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 轮播图：4 张未来科技感图片（可替换为本地 /images/ 或配置 downloadFile 域名）
const BANNER_LIST = [
  { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' },
  { url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800' },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' },
  { url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800' },
]

const FRONT_END_ITEMS = [
  '微信小程序：WXML、WXSS、WXS、Skyline / Glass-easel',
  '前端基础：HTML5、CSS3、JavaScript、TypeScript',
  '框架：Vue 2/3、React、小程序自定义组件与分包',
  '工程化：npm、构建流程、样式预处理（Less）',
  '交互与性能：骨架屏、懒加载、首屏优化',
]
const BACK_END_ITEMS = [
  'Node.js：Express / Koa、RESTful API 设计',
  '微信云开发：云函数、云数据库、云存储',
  '后端语言：Java、Python 基础，接口联调',
  '微服务：网关、鉴权、日志与监控',
  '运维：Linux 基础、Docker、CI/CD 基础',
]
const SQL_ITEMS = [
  '关系型：MySQL、SQL 编写与索引优化',
  '云数据库：微信云开发 NoSQL、聚合查询',
  '缓存：Redis 缓存策略与 Session',
  '文档型：MongoDB 基础与简单 CRUD',
]

// 本地/自建 Dify 请改为你的 base + 路径，并在小程序后台配置 request 合法域名
const DIFY_WORKFLOW_URL = 'https://api.dify.ai/v1/workflows/run'
const DIFY_API_KEY = 'app-WujD2Rlofu2g9oPBW551IH21'

Component({
  data: {
    theme: 'default' as string,
    techCapability: 0,
    difyLoading: false,
    difyResult: '',
    difyText: '',
    difyThinking: '',
    difyError: '',
    bannerList: BANNER_LIST,
    activeTab: 0,
    frontEndItems: FRONT_END_ITEMS,
    backEndItems: BACK_END_ITEMS,
    sqlItems: SQL_ITEMS,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  pageLifetimes: {
    show() {
      const app = getApp<IAppOption>()
      const theme = app.globalData.theme || 'default'
      this.setData({ theme })
    },
  },
  methods: {
    handlePlus() {
      this.setData({ techCapability: this.data.techCapability + 1 })
    },
    fetchDify() {
      this.setData({ difyLoading: true, difyError: '', difyResult: '', difyText: '', difyThinking: '' })
      wx.request({
        url: DIFY_WORKFLOW_URL,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        data: {
          inputs: {
            content: ''
          },
          response_mode: 'blocking',
          user: 'abc-123',
        },
        success: (res) => {
          const data = res.data as Record<string, unknown>
          const str = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data)
          let difyText = ''
          let difyThinking = ''
          const outputs = (data?.data as Record<string, unknown>)?.outputs as Record<string, unknown> | undefined
          if (outputs) {
            const textVal = outputs.text ?? outputs.Text
            const thinkVal = outputs['<think>'] ?? outputs.think
            difyText = typeof textVal === 'string' ? textVal : ''
            difyThinking = typeof thinkVal === 'string' ? thinkVal : ''
            if (!difyThinking && difyText) {
              const match = difyText.match(/<think>([\s\S]*?)<\/think>/i)
              if (match) difyThinking = match[1].trim()
            }
          }
          this.setData({ difyResult: str, difyText, difyThinking, difyLoading: false })
        },
        fail: (err) => {
          this.setData({
            difyError: err.errMsg || '请求失败',
            difyLoading: false,
          })
        },
      })
    },
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
    onShareAppMessage(): WechatMiniprogram.Page.ICustomOption {
      return {
        title: "王驰 Chester 的个人简历 - 微信小程序",
        path: "/pages/index/index",
      }
    },
  },
})
