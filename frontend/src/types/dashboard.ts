export interface Widget {
  id: string
  title: string
  type: 'chart' | 'metric' | 'table' | 'list'
  data: Record<string, unknown>
  position: { x: number; y: number }
  size: { w: number; h: number }
}

export interface Dashboard {
  id: string
  name: string
  widgets: Widget[]
  isDefault: boolean
}

export interface Metric {
  label: string
  value: number
  change: number
  changeType: 'increase' | 'decrease'
}
