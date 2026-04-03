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
    <nav className="bar sticky top-0 z-[100]">
      <div className="bar-in">
        <div className="brand">
          <span className="brand-star">✦</span>
          Discourse
          {showAdmin && isAdmin && (
            <span className="pill-admin">Admin</span>
          )}
        </div>
        <div className="bar-links" role="navigation" aria-label="Primary">
          <button
            className={`bar-link-btn ${currentView === 'posts' ? 'on' : ''}`}
            onClick={onPostsPage}
          >
            Posts
          </button>
          <button
            className={`bar-link-btn ${currentView === 'topics' ? 'on' : ''}`}
            onClick={onTopicPage}
          >
            Topics
          </button>
          <button className="bar-link-btn" onClick={onRegisterPage}>Register / Sign Up</button>
        </div>
        <div className="bar-r">
          <div className="uchip">
            <div className="av">
              {initials(loggedInUser.username)}
            </div>
            {loggedInUser.username}
          </div>
          <button className="btn-out" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}
