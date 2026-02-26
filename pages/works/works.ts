// 作品分享：王驰 Chester 项目与作品
const WORKS_LIST = [
  {
    id: '1',
    title: '个人简历小程序',
    desc: 'Skyline + Glass-easel 渲染，自定义导航栏、轮播、Tab 与底部菜单，个人介绍 / 作品 / 履历 / 用户中心。',
    tags: ['小程序', 'Skyline', 'TypeScript'],
    time: '2026',
  },
  {
    id: '2',
    title: '微信云开发示例项目',
    desc: '云函数、云数据库与云存储联调，用户登录与数据 CRUD，适合作为小程序全栈入门模板。',
    tags: ['云开发', 'Node', '云数据库'],
    time: '2025',
  },
  {
    id: '3',
    title: 'H5 活动页 / 落地页',
    desc: 'Vue 3 + Vite 搭建的活动页与表单提交，适配移动端与微信内浏览器。',
    tags: ['Vue3', 'H5', '移动端'],
    time: '2025',
  },
  {
    id: '4',
    title: '管理后台前端',
    desc: 'React + Ant Design 的后台管理界面，权限与菜单配置、表格与图表展示。',
    tags: ['React', 'Ant Design', '后台'],
    time: '2024',
  },
]

Page({
  data: {
    theme: 'default' as string,
    worksList: WORKS_LIST,
  },
  onShow() {
    const app = getApp<IAppOption>()
    this.setData({ theme: app.globalData.theme || 'default' })
  },
  onShareAppMessage() {
    return { title: '王驰 Chester - 作品分享', path: '/pages/index/index' }
  },
})
