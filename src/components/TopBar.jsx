export default function TopBar({
  loggedInUser,
  isAdmin,
  initials,
  onLogout,
  onPostsPage,
  onTopicPage,
  onRegisterPage,
  currentView = 'topics',
  showAdmin = true,
}) {
  return (
    <nav className="sticky top-0 z-[100] border-b border-[var(--border)] bg-[rgba(250,244,230,0.92)] backdrop-blur-[28px] backdrop-saturate-[1.5]">
      <div className="mx-auto flex h-[66px] max-w-[860px] items-center justify-between px-[24px] max-[860px]:h-auto max-[860px]:flex-wrap max-[860px]:gap-[10px] max-[860px]:py-[10px]">
        <div className="order-1 flex items-center gap-[8px] bg-[linear-gradient(135deg,#1a2240,#d14a16)] bg-clip-text font-['Outfit',sans-serif] text-[22px] font-extrabold text-transparent">
          <span className="inline-block text-[18px] text-[#d14a16] animate-[spin_8s_linear_infinite] [-webkit-text-fill-color:initial]">✦</span>
          Discourse
          {showAdmin && isAdmin && <span className="rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-[9px] py-[3px] text-[9px] font-extrabold uppercase tracking-[0.12em] text-white">Admin</span>}
        </div>

        <div className="order-3 flex items-center gap-[6px] rounded-full border border-[rgba(199,187,171,0.65)] bg-[rgba(255,255,255,0.6)] p-[4px] shadow-[0_8px_20px_rgba(26,34,64,0.08)] max-[860px]:basis-full max-[860px]:justify-start" role="navigation" aria-label="Primary">
          <button className={`rounded-full border border-transparent px-[14px] py-[6px] font-['Space_Grotesk',sans-serif] text-[12px] font-bold uppercase tracking-[0.04em] transition-all duration-200 ${currentView === 'posts' ? 'bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white shadow-[0_7px_20px_rgba(209,74,22,0.3)]' : 'bg-transparent text-[var(--muted)] hover:border-[rgba(209,74,22,0.25)] hover:bg-[rgba(209,74,22,0.1)] hover:text-[var(--text)]'}`} onClick={onPostsPage}>Posts</button>
          <button className={`rounded-full border border-transparent px-[14px] py-[6px] font-['Space_Grotesk',sans-serif] text-[12px] font-bold uppercase tracking-[0.04em] transition-all duration-200 ${currentView === 'topics' ? 'bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white shadow-[0_7px_20px_rgba(209,74,22,0.3)]' : 'bg-transparent text-[var(--muted)] hover:border-[rgba(209,74,22,0.25)] hover:bg-[rgba(209,74,22,0.1)] hover:text-[var(--text)]'}`} onClick={onTopicPage}>Topics</button>
          <button className="rounded-full border border-transparent bg-transparent px-[14px] py-[6px] font-['Space_Grotesk',sans-serif] text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--muted)] transition-all duration-200 hover:border-[rgba(209,74,22,0.25)] hover:bg-[rgba(209,74,22,0.1)] hover:text-[var(--text)]" onClick={onRegisterPage}>Register / Sign Up</button>
        </div>

        <div className="order-2 ml-auto flex items-center gap-[12px] max-[860px]:ml-0">
          <div className="flex items-center gap-[8px] rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.56)] px-[14px] py-[6px] text-[13px] font-medium max-[620px]:hidden">
            <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d14a16,#1a2240)] text-[11px] font-bold text-white">{initials(loggedInUser.username)}</div>
            {loggedInUser.username}
          </div>
          <button className="rounded-[10px] border border-[rgba(244,63,94,0.25)] bg-transparent px-[14px] py-[7px] font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-[var(--muted)] transition-all duration-200 hover:border-[var(--danger)] hover:bg-[rgba(154,46,36,0.1)] hover:text-[#9a2e24]" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}
