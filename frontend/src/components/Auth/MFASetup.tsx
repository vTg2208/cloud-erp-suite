import { useState } from 'react'

export default function MFASetup() {
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'qr' | 'verify'>('qr')

  return (
    <div className="max-w-md mx-auto p-6 card">
      <h2 className="text-xl font-semibold mb-4">Setup Multi-Factor Authentication</h2>

      {step === 'qr' ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Scan this QR code with your authenticator app
          </p>
          <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-gray-500">QR Code</span>
          </div>
          <button onClick={() => setStep('verify')} className="btn-primary w-full">
            Next
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            className="input-default text-center text-2xl tracking-widest"
            maxLength={6}
          />
          <button className="btn-primary w-full">Verify</button>
        </div>
      )}
    </div>
  )
}
