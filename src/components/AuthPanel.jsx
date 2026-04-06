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
    <div className="relative isolate flex min-h-screen items-center justify-center p-[28px] max-[540px]:p-[18px] before:pointer-events-none before:absolute before:left-[8%] before:top-[6%] before:z-[-1] before:h-[420px] before:w-[420px] before:rounded-full before:bg-[radial-gradient(circle,rgba(209,74,22,0.24)_0%,rgba(209,74,22,0.05)_48%,transparent_70%)] before:blur-[2px] before:content-[''] after:pointer-events-none after:absolute after:bottom-[8%] after:right-[10%] after:z-[-1] after:h-[360px] after:w-[360px] after:rounded-full after:bg-[radial-gradient(circle,rgba(26,34,64,0.2)_0%,rgba(26,34,64,0.05)_50%,transparent_72%)] after:content-['']">
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(160deg,rgba(255,252,246,0.96)_0%,rgba(247,239,226,0.96)_62%,rgba(240,230,212,0.98)_100%)] px-[40px] py-[48px] shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_24px_60px_rgba(26,34,64,0.22),0_0_42px_rgba(209,74,22,0.13)] backdrop-blur-[18px] backdrop-saturate-[1.2] animate-[scaleIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)] max-[540px]:rounded-[22px] max-[540px]:px-[22px] max-[540px]:py-[34px] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_18%,rgba(209,74,22,0.14),transparent_48%)] before:content-[''] after:pointer-events-none after:absolute after:inset-[1px] after:rounded-[27px] after:border after:border-dashed after:border-[rgba(199,187,171,0.38)] after:content-[''] max-[540px]:after:rounded-[21px]">
        <div className="relative z-[1] mb-[6px] bg-[linear-gradient(135deg,#1a2240_0%,#d14a16_52%,#ad3a10_100%)] bg-[length:200%_auto] bg-clip-text text-center font-['Outfit',sans-serif] text-[34px] font-extrabold text-transparent animate-[shimmer_4s_linear_infinite] max-[540px]:text-[30px]">✦ Discourse</div>
        <p className="relative z-[1] mb-[30px] text-center text-[12px] uppercase tracking-[0.05em] text-[var(--muted)]">where ideas travel at the speed of thought</p>

        <div className="relative z-[1] mb-[24px] flex gap-[4px] rounded-[14px] border border-[var(--border)] bg-[rgba(255,255,255,0.62)] p-[4px]">
          <button className={`flex-1 rounded-[11px] border-0 px-[10px] py-[10px] font-['Space_Grotesk',sans-serif] text-[14px] font-semibold transition-all duration-200 ${page === 'register' ? 'bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white shadow-[0_7px_22px_rgba(209,74,22,0.34),0_0_0_1px_rgba(173,58,16,0.24)]' : 'bg-transparent text-[var(--muted)] hover:bg-[rgba(209,74,22,0.08)] hover:text-[var(--text)]'}`} onClick={() => setPage('register')}>
            Register
          </button>
          <button className={`flex-1 rounded-[11px] border-0 px-[10px] py-[10px] font-['Space_Grotesk',sans-serif] text-[14px] font-semibold transition-all duration-200 ${page === 'login' ? 'bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white shadow-[0_7px_22px_rgba(209,74,22,0.34),0_0_0_1px_rgba(173,58,16,0.24)]' : 'bg-transparent text-[var(--muted)] hover:bg-[rgba(209,74,22,0.08)] hover:text-[var(--text)]'}`} onClick={() => setPage('login')}>
            Sign In
          </button>
        </div>

        <div className="relative z-[1] flex flex-col gap-[12px]">
          {page === 'register' && (
            <>
              <input
                className="w-full rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="w-full rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {page === 'login' && (
            <input
              className="w-full rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            className="w-full rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="group relative overflow-hidden rounded-[13px] border-0 bg-[linear-gradient(135deg,var(--primary)_0%,var(--secondary)_55%,#7a2a0c_100%)] bg-[length:200%_auto] px-[18px] py-[14px] font-['Outfit',sans-serif] text-[15px] font-bold tracking-[0.02em] text-white shadow-[0_10px_30px_rgba(209,74,22,0.3)] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-right hover:shadow-[0_12px_40px_rgba(173,58,16,0.42)] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent)] before:opacity-0 before:transition-opacity before:content-[''] hover:before:opacity-100" onClick={onSubmit}>
            {page === 'register' ? 'Create Account →' : 'Sign In →'}
          </button>
        </div>

        {message && (
          <div className="relative z-[1] mt-[18px] rounded-[12px] border border-[rgba(209,74,22,0.3)] bg-[linear-gradient(135deg,rgba(209,74,22,0.14),rgba(173,58,16,0.08))] px-[16px] py-[11px] text-center text-[13px] text-[#7a2a0c] animate-[slideDown_0.3s_ease]">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
