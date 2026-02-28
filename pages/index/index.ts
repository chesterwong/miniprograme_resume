// index.ts
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 柱状图 Mock 数据
const BAR_MOCK = {
  xData: ['Vue', 'React', 'Node', 'MySQL', 'Redis'],
  series: [82, 76, 88, 70, 65]
}

// 地图 Mock 数据：城市 + 经纬度(GCJ02) + 数值
const MAP_MOCK = [
  { name: '北京', value: [116.4, 39.9, 95] },
  { name: '上海', value: [121.5, 31.2, 88] },
  { name: '深圳', value: [114.1, 22.5, 92] },
  { name: '杭州', value: [120.2, 30.3, 85] },
  { name: '成都', value: [104.1, 30.7, 72] }
]

// 转换为 map 组件的 markers 与 include-points 格式
function buildMapData() {
  const markers = MAP_MOCK.map((item, i) => ({
    id: i + 1,
    latitude: item.value[1],
    longitude: item.value[0],
    title: `${item.name}: ${item.value[2]}`,
    iconPath: '/images/marker.png',
    width: 16,
    height: 16,
    callout: {
      content: `${item.name} ${item.value[2]}`,
      display: 'BYCLICK',
      fontSize: 12,
      padding: 6,
      borderRadius: 6,
      bgColor: '#ffffff',
      borderColor: '#07c160',
      borderWidth: 1
    }
  }))
  const includePoints = MAP_MOCK.map(item => ({
    longitude: item.value[0],
    latitude: item.value[1]
  }))
  const lngSum = MAP_MOCK.reduce((s, i) => s + i.value[0], 0)
  const latSum = MAP_MOCK.reduce((s, i) => s + i.value[1], 0)
  return {
    markers,
    includePoints,
    center: { longitude: lngSum / MAP_MOCK.length, latitude: latSum / MAP_MOCK.length }
  }
}

const MAP_DATA = buildMapData()

// 原生 canvas 绘制柱状图（无 echarts 依赖）
function drawBarChartImpl(instance: WechatMiniprogram.Component.TrivialInstance) {
  const data = instance.data as { barChartWidth?: number; barChartHeight?: number }
  const fallbackW = data.barChartWidth && data.barChartWidth > 0 ? data.barChartWidth : 300
  const fallbackH = data.barChartHeight && data.barChartHeight > 0 ? data.barChartHeight : 140
  const query = instance.createSelectorQuery().in(instance)
  query.select('.bar-chart-wrap')
    .boundingClientRect((rect: { width?: number; height?: number } | null) => {
      if (!rect) return
      const w = (rect.width && rect.width > 0 ? rect.width : fallbackW)
      const h = (rect.height && rect.height > 0 ? rect.height : fallbackH)
      const ctx = wx.createCanvasContext('bar-chart', instance)
      const padding = { left: 50, right: 20, top: 20, bottom: 35 }
      const chartW = w - padding.left - padding.right
      const chartH = h - padding.top - padding.bottom
      const maxVal = Math.max(...BAR_MOCK.series)
      const barW = chartW / BAR_MOCK.xData.length * 0.6
      const gap = chartW / BAR_MOCK.xData.length * 0.2
      ctx.setFillStyle('#f0f2f5')
      ctx.fillRect(0, 0, w, h)
      ctx.setFontSize(10)
      ctx.setFillStyle('#666')
      BAR_MOCK.xData.forEach((label, i) => {
        const x = padding.left + gap + i * (barW + gap) + barW / 2 - 8
        ctx.fillText(label, x, h - 10)
      })
      ctx.setFillStyle('#07c160')
      BAR_MOCK.series.forEach((val, i) => {
        const barH = (val / maxVal) * chartH
        const x = padding.left + gap + i * (barW + gap)
        const y = padding.top + chartH - barH
        ctx.fillRect(x, y, barW, barH)
        ctx.setFillStyle('#333')
        ctx.setFontSize(9)
        ctx.fillText(String(val), x + barW / 2 - 4, y - 4)
        ctx.setFillStyle('#07c160')
      })
      ctx.draw()
    })
    .exec()
}

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
    barChartWidth: 300,
    barChartHeight: 140,
    mapCenter: MAP_DATA.center,
    mapScale: 4,
    mapMarkers: MAP_DATA.markers,
    mapIncludePoints: MAP_DATA.includePoints,
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
  lifetimes: {
    attached() {
      const sys = wx.getSystemInfoSync()
      this.setData({
        barChartWidth: Math.floor(sys.windowWidth * 0.85),
        barChartHeight: 140,
      })
    },
  },
  pageLifetimes: {
    show() {
      const app = getApp<IAppOption>()
      const theme = app.globalData.theme || 'default'
      this.setData({ theme })
      if (this.data.activeTab === 0) {
        setTimeout(() => drawBarChartImpl(this), 300)
      }
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
    onMapMarkerTap(e: WechatMiniprogram.TouchEvent) {
      const markerId = (e.detail as { markerId?: number }).markerId
      const item = MAP_MOCK.find((_, i) => i + 1 === markerId)
      if (item) {
        wx.showToast({ title: `${item.name}: ${item.value[2]}`, icon: 'none' })
      }
    },
    onTabTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number((e.currentTarget as WechatMiniprogram.Target).dataset.index)
      if (typeof index !== 'number' || index < 0 || index > 2) return
      this.setData({ activeTab: index })
      if (index === 0) setTimeout(() => drawBarChartImpl(this), 300)
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
