// 学习履历：王驰 Chester 学习经历与成长轨迹
const RESUME_LIST = [
  {
    id: '1',
    time: '2025 - 至今',
    title: '微信小程序开发实践',
    desc: '小程序 Skyline / Glass-easel、云开发、自定义组件与分包，持续跟进官方能力与最佳实践。',
  },
  {
    id: '2',
    time: '2024 - 2025',
    title: '前端与 Node 全栈',
    desc: 'Vue / React、TypeScript、Node.js 与 RESTful API，参与 H5 与后台管理项目。',
  },
  {
    id: '3',
    time: '2023 - 2024',
    title: '计算机基础与数据库',
    desc: '数据结构、网络、操作系统基础；MySQL、Redis 入门与简单业务建模。',
  },
  {
    id: '4',
    time: '2022 - 2023',
    title: 'Web 前端入门',
    desc: 'HTML / CSS / JavaScript、响应式布局与基础交互，完成课程与小型练手项目。',
  },
]

Page({
  data: {
    theme: 'default' as string,
    resumeList: RESUME_LIST,
  },
  onShow() {
    const app = getApp<IAppOption>()
    this.setData({ theme: app.globalData.theme || 'default' })
  },
})
