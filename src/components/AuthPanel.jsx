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
    <div className="auth-scene flex min-h-screen items-center justify-center p-6">
      <div className="auth-box w-full max-w-[430px] rounded-[28px] border border-white/10 bg-[rgba(12,10,30,0.65)] p-[48px_40px]">
        <div className="auth-brand">✦ Discourse</div>
        <p className="auth-sub">where ideas travel at the speed of thought</p>
        <div className="tabs mb-7 flex gap-1 rounded-[14px] border border-white/10 bg-white/5 p-1">
          <button className={`tab ${page === 'register' ? 'on' : 'off'}`} onClick={() => setPage('register')}>Register</button>
          <button className={`tab ${page === 'login' ? 'on' : 'off'}`} onClick={() => setPage('login')}>Sign In</button>
        </div>

        <div className="fields flex flex-col gap-[13px]">
          {page === 'register' && (
            <>
              <input
                className="inp w-full rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="inp w-full rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {page === 'login' && (
            <input
              className="inp w-full rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            className="inp w-full rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn-main w-full rounded-[13px] border-0 bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-700 p-3.5 text-[15px] font-bold text-white"
            onClick={onSubmit}
          >
            {page === 'register' ? 'Create Account →' : 'Sign In →'}
          </button>
        </div>

        {message && <div className="msg-toast">{message}</div>}
      </div>
    </div>
  )
}
