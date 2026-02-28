// 个人介绍：王驰 Chester - 微信小程序开发者，含 Front End / Back End / SQL 三个 tab
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createScopedThreejs } = require('../../lib/threejs-miniprogram')

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
    canvas3dSize: 140,
    threeInited: false,
    frontEndItems: FRONT_END_ITEMS,
    backEndItems: BACK_END_ITEMS,
    sqlItems: SQL_ITEMS,
    intro: '王驰（Chester），上海 · 微信小程序开发。熟悉小程序端到端开发与云开发，具备前端、后端与数据库实践经历。',
  },
  onLoad() {
    const sys = wx.getSystemInfoSync()
    this.setData({
      canvas3dSize: Math.floor(Math.min(sys.windowWidth * 0.4, 160))
    })
  },
  onShow() {
    const app = getApp<IAppOption>()
    this.setData({ theme: app.globalData.theme || 'default' })
  },
  onReady() {
    if (this.data.activeTab === 0) {
      setTimeout(() => this.initThreeHuman(), 400)
    }
  },
  initThreeHuman() {
    const q = this.createSelectorQuery()
    q.select('#webgl-human')
      .fields({ node: true, size: true })
      .exec((res: unknown[]) => {
        const r = res?.[0] as { node?: WechatMiniprogram.Canvas; width?: number; height?: number } | undefined
        if (!r?.node) return
        const canvas = r.node
        const THREE = createScopedThreejs(canvas)
        const scene = new THREE.Scene()
        const w = r.width || 140
        const h = r.height || 140
        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
        camera.position.set(0, 0, 4)
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
        const headGeo = new THREE.SphereGeometry(0.25, 16, 16)
        const bodyGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.6, 16)
        const limbGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.35, 8)
        const mat = new THREE.MeshPhongMaterial({ color: 0x07c160 })
        const head = new THREE.Mesh(headGeo, mat)
        head.position.y = 0.95
        const body = new THREE.Mesh(bodyGeo, mat)
        body.position.y = 0.5
        const la = new THREE.Mesh(limbGeo, mat)
        la.position.set(-0.25, 0.7, 0)
        la.rotation.z = 0.3
        const ra = new THREE.Mesh(limbGeo, mat)
        ra.position.set(0.25, 0.7, 0)
        ra.rotation.z = -0.3
        const ll = new THREE.Mesh(limbGeo, mat)
        ll.position.set(-0.12, 0.15, 0)
        const rl = new THREE.Mesh(limbGeo, mat)
        rl.position.set(0.12, 0.15, 0)
        scene.add(head, body, la, ra, ll, rl)
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(2, 2, 2)
        scene.add(light)
        scene.add(new THREE.AmbientLight(0x666666))
        const raf = (cb: () => void) => (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(cb) : setTimeout(cb, 16))
        const animate = () => {
          raf(animate)
          head.rotation.y += 0.01
          renderer.render(scene, camera)
        }
        animate()
        this.setData({ threeInited: true })
      })
  },
  onTabTap(e: WechatMiniprogram.TouchEvent) {
    const index = Number((e.currentTarget as WechatMiniprogram.Target).dataset.index)
    if (typeof index === 'number' && index >= 0 && index <= 2) {
      this.setData({ activeTab: index })
      if (index === 0) setTimeout(() => this.initThreeHuman(), 300)
    }
  },
  onShareAppMessage() {
    return { title: '王驰 Chester - 个人介绍', path: '/pages/index/index' }
  },
})
