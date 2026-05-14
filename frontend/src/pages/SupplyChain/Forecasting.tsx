export default function SCForecasting() {
  const forecasts = [
    { product: 'Widget A', current: 150, predicted: 200, trend: 'up' },
    { product: 'Widget B', current: 25, predicted: 100, trend: 'up' },
    { product: 'Gadget C', current: 200, predicted: 180, trend: 'down' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Demand Forecasting</h1>
        <button className="btn-primary">Generate Forecast</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecasts.map((f) => (
          <div key={f.product} className="card">
            <h3 className="font-medium text-gray-900 mb-2">{f.product}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Current Stock</span>
                <span className="font-medium">{f.current}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Predicted Demand</span>
                <span className="font-medium">{f.predicted}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Trend</span>
                <span className={f.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {f.trend === 'up' ? '↑ Increasing' : '↓ Decreasing'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
