import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(userid, password);
        navigate('/');
      } else {
        await register(userid, username, password);
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg)', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: 400, background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)', padding: '40px 32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #4f8ef7, #a78bfa)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>✦</div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p style={{ fontSize: 14, color: 'var(--text2)' }}>Amdox Cloud ERP Suite</p>
        </div>

        {error && (
          <div style={{ background: error.includes('successful') ? 'var(--green-bg)' : 'var(--red-bg)', color: error.includes('successful') ? 'var(--green)' : 'var(--red)', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 24, textAlign: 'center', border: `1px solid ${error.includes('successful') ? 'var(--green)' : 'var(--red)'}` }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text2)', marginBottom: 6 }}>User ID</label>
            <input 
              type="text" 
              className="erp-input" 
              style={{ width: '100%' }} 
              value={userid} 
              onChange={e => setUserid(e.target.value)} 
              placeholder="e.g. emp001" 
              required 
            />
          </div>
          
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text2)', marginBottom: 6 }}>Full Name</label>
              <input 
                type="text" 
                className="erp-input" 
                style={{ width: '100%' }} 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="John Doe" 
                required={!isLogin} 
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text2)', marginBottom: 6 }}>Password</label>
            <input 
              type="password" 
              className="erp-input" 
              style={{ width: '100%' }} 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="erp-btn" style={{ width: '100%', marginTop: 8, padding: '12px', fontSize: 14 }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(''); }} 
            style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 500, cursor: 'pointer', padding: 0 }}
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
