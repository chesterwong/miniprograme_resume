// 极简中国地图 GeoJSON（Mock 用，矩形轮廓）
module.exports = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: '中国' },
    geometry: {
      type: 'Polygon',
      coordinates: [[[73.5, 18.2], [135, 18.2], [135, 53.5], [73.5, 53.5], [73.5, 18.2]]]
    }
  }]
}
