import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function RevenueChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const isDark = document.documentElement.classList.contains('dark')

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Revenue',
            data: [65000, 72000, 68000, 85000, 92000, 88000, 125000],
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#0ea5e9',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'Expenses',
            data: [45000, 48000, 52000, 55000, 60000, 58000, 62000],
            borderColor: '#f43f5e',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#f43f5e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: isDark ? '#9ca3af' : '#4b5563',
              padding: 20,
              font: { size: 12 },
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: isDark ? '#1f2937' : '#fff',
            titleColor: isDark ? '#f9fafb' : '#111827',
            bodyColor: isDark ? '#d1d5db' : '#374151',
            borderColor: isDark ? '#374151' : '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: {
              color: isDark ? '#374151' : '#f3f4f6',
            },
            ticks: {
              color: isDark ? '#9ca3af' : '#6b7280',
            },
          },
          y: {
            grid: {
              color: isDark ? '#374151' : '#f3f4f6',
            },
            ticks: {
              color: isDark ? '#9ca3af' : '#6b7280',
              callback: (value) => '$' + (value as number / 1000) + 'k',
            },
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      },
    })

    return () => chart.destroy()
  }, [])

  return <canvas ref={chartRef} />
}
