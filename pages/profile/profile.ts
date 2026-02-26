// 个人介绍：王驰 Chester - 微信小程序开发者，含 Front End / Back End / SQL 三个 tab
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

Page({
  data: {
    theme: 'default' as string,
    activeTab: 0,
    frontEndItems: FRONT_END_ITEMS,
    backEndItems: BACK_END_ITEMS,
    sqlItems: SQL_ITEMS,
    intro: '王驰（Chester），上海 · 微信小程序开发。熟悉小程序端到端开发与云开发，具备前端、后端与数据库实践经历。',
  },
  onShow() {
    const app = getApp<IAppOption>()
    this.setData({ theme: app.globalData.theme || 'default' })
  },
  onTabTap(e: WechatMiniprogram.TouchEvent) {
    const index = Number((e.currentTarget as WechatMiniprogram.Target).dataset.index)
    if (typeof index === 'number' && index >= 0 && index <= 2) {
      this.setData({ activeTab: index })
    }
  },
  onShareAppMessage() {
    return { title: '王驰 Chester - 个人介绍', path: '/pages/index/index' }
  },
})
