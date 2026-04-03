export default function AuthPanel({
  page,
  setPage,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  message,
  onSubmit,
}) {
  return (
    <div className="auth-scene">
      <div className="auth-box">
        <div className="auth-brand">✦ Discourse</div>
        <p className="auth-sub">where ideas travel at the speed of thought</p>
        <div className="tabs">
          <button className={`tab ${page === 'register' ? 'on' : 'off'}`} onClick={() => setPage('register')}>
            Register
          </button>
          <button className={`tab ${page === 'login' ? 'on' : 'off'}`} onClick={() => setPage('login')}>
            Sign In
          </button>
        </div>

        <div className="fields">
          {page === 'register' && (
            <>
              <input
                className="inp"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="inp"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {page === 'login' && (
            <input
              className="inp"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            className="inp"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn-main"
            onClick={onSubmit}
          >
            {page === 'register' ? 'Create Account →' : 'Sign In →'}
          </button>
        </div>

        {message && (
          <div className="msg-toast">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
