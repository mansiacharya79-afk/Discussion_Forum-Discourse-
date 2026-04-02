export default function TopBar({
  loggedInUser,
  isAdmin,
  initials,
  onLogout,
  showAdmin = true,
}) {
  return (
    <nav className="bar sticky top-0 z-[100]">
      <div className="bar-in">
        <div className="brand">
          <span className="brand-star">✦</span>
          Discourse
          {showAdmin && isAdmin && <span className="pill-admin">Admin</span>}
        </div>
        <div className="bar-r">
          <div className="uchip">
            <div className="av">{initials(loggedInUser.username)}</div>
            {loggedInUser.username}
          </div>
          <button className="btn-out" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}
