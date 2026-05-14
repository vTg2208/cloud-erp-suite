import { useState } from 'react'

export default function SettingsGeneral() {
  const [companyName, setCompanyName] = useState('Amdox ERP')
  const [currency, setCurrency] = useState('USD')
  const [timezone, setTimezone] = useState('UTC')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">General Settings</h1>

      <div className="card max-w-lg">
        {saved && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
            Settings saved successfully!
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
            <input id="company" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input-default" />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Currency</label>
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-default">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
            <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="input-default">
              <option value="UTC">UTC</option>
              <option value="EST">EST (UTC-5)</option>
              <option value="PST">PST (UTC-8)</option>
              <option value="IST">IST (UTC+5:30)</option>
            </select>
          </div>

          <button onClick={handleSave} className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  )
}
