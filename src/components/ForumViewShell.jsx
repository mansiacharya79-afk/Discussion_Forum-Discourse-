import TopBar from './TopBar'

export default function ForumViewShell({
  loggedInUser,
  isAdmin,
  initials,
  onLogout,
  onPostsPage,
  onTopicPage,
  onRegisterPage,
  currentView,
  showAdmin,
  children,
}) {
  return (
    <>
      <TopBar
        loggedInUser={loggedInUser}
        isAdmin={isAdmin}
        initials={initials}
        onLogout={onLogout}
        onPostsPage={onPostsPage}
        onTopicPage={onTopicPage}
        onRegisterPage={onRegisterPage}
        currentView={currentView}
        showAdmin={showAdmin}
      />
      {children}
    </>
  )
}
