export default function SettingsIntegrations() {
  const integrations = [
    { id: '1', name: 'AWS SES', description: 'Email Service', status: 'connected' },
    { id: '2', name: 'Stripe', description: 'Payment Processing', status: 'disconnected' },
    { id: '3', name: 'Keycloak', description: 'SSO Authentication', status: 'connected' },
    { id: '4', name: 'Twilio', description: 'SMS Notifications', status: 'disconnected' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((i) => (
          <div key={i.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{i.name}</h3>
                <p className="text-sm text-gray-500">{i.description}</p>
              </div>
              <button
                className={`px-3 py-1 text-sm rounded-lg ${
                  i.status === 'connected'
                    ? 'bg-green-100 text-green-700'
                    : 'btn-primary'
                }`}
              >
                {i.status === 'connected' ? 'Connected' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
