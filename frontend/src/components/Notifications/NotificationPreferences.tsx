import { useState } from 'react'
import type { NotificationPreferences as Prefs } from '@/types'

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState<Prefs>({
    email: true,
    push: true,
    sms: false,
    inApp: true,
  })

  const toggle = (key: keyof Prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="card">
      <h3 className="font-semibold mb-4">Notification Preferences</h3>
      <div className="space-y-3">
        {Object.entries(prefs).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm capitalize">{key}</label>
            <button
              onClick={() => toggle(key as keyof Prefs)}
              className={`w-12 h-6 rounded-full transition-colors ${
                value ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
