import { useState } from 'react';
import api from '../api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

export function AIPage() {
  const [itemId, setItemId] = useState('INV-001');
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchForecast = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/api/ai/forecast/${itemId}`);
      setForecastData(response.data.forecast);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch forecast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ padding: 24, height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#4f8ef7,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.4px', color: 'var(--text)' }}>AI Intelligence</h1>
            <p style={{ fontSize: 13, color: 'var(--text2)' }}>Powered by proprietary time-series models & NLP</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Demand Forecasting Widget */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Demand Forecasting (F-06)</h2>
            <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>Predict 30-day inventory demand using Exponential Smoothing</p>
          </div>
          <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                className="erp-input"
                style={{ flex: 1 }}
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter Item ID (e.g., INV-001)"
              />
              <button className="erp-btn" onClick={fetchForecast} disabled={loading}>
                {loading ? 'Analyzing...' : 'Generate Forecast'}
              </button>
            </div>

            {error && (
              <div style={{ padding: 12, background: 'var(--red-bg)', color: 'var(--red)', borderRadius: 8, fontSize: 13 }}>
                {error}
              </div>
            )}

            {forecastData.length > 0 ? (
              <div style={{ height: 300, marginTop: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{fontSize: 10, fill: 'var(--text3)'}} axisLine={false} tickLine={false} minTickGap={20} />
                    <YAxis tick={{fontSize: 10, fill: 'var(--text3)'}} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                      itemStyle={{ color: 'var(--accent)' }}
                    />
                    <Area type="monotone" dataKey="predicted_demand" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg3)', borderRadius: 12, minHeight: 200, border: '1px dashed var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>Enter an Item ID to see the forecast</span>
              </div>
            )}
          </div>
        </div>

        {/* NLP Chatbot Widget */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Conversational AI</h2>
              <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>Ask questions about company data</p>
            </div>
            <div style={{ background: 'rgba(79,142,247,.15)', border: '1px solid rgba(79,142,247,.3)', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>● ONLINE</div>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/Qo13UNSzDfdfBox_SN8YJ"
            width="100%"
            style={{ flex: 1, border: 'none', minHeight: 400 }}
            allow="microphone"
            title="Amdox AI Assistant"
          />
        </div>
      </div>
    </div>
  );
}
