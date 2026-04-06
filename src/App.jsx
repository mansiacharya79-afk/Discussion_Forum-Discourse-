import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPanel from './components/AuthPanel'
import CosmicBackground from './components/CosmicBackground'
import ForumViewShell from './components/ForumViewShell'
import Particles from './components/Particles'
import PostsPage from './components/PostsPage'
import TopicsPage from './components/TopicsPage'
import useForumController from './hooks/useForumController'

export default function App() {
  const {
    authPanelProps,
    comments,
    commentText,
    forumShellProps,
    handleAddComment,
    handleCreatePost,
    handleCreateTopic,
    handleDeleteComment,
    handleDeletePost,
    handleDeleteTopic,
    handleLogin,
    handleRegister,
    initials,
    isAdmin,
    loadComments,
    loggedInUser,
    openTopicRoute,
    postContent,
    posts,
    selectedTopic,
    setCommentText,
    setPostContent,
    setTopicDescription,
    setTopicTitle,
    topicDescription,
    topicTitle,
    topics,
  } = useForumController()

  const guardAuth = (element) => (loggedInUser ? element : <Navigate to="/login" replace />)
  const guardGuest = (element) => (loggedInUser ? <Navigate to="/topics" replace /> : element)
  const postsRouteElement = guardAuth(
    <ForumViewShell {...forumShellProps} currentView="posts" showAdmin={false}>
      <PostsPage
        selectedTopic={selectedTopic}
        postContent={postContent}
        setPostContent={setPostContent}
        onCreatePost={handleCreatePost}
        posts={posts}
        isAdmin={isAdmin}
        initials={initials}
        onDeletePost={handleDeletePost}
        onLoadComments={loadComments}
        comments={comments}
        commentText={commentText}
        setCommentText={setCommentText}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
    </ForumViewShell>
  )

  return (
    <>
      <CosmicBackground />
      <Particles />

      <div className="relative z-[2]">
        <Routes>
          <Route path="/" element={<Navigate to={loggedInUser ? '/topics' : '/register'} replace />} />

          <Route
            path="/register"
            element={guardGuest(<AuthPanel page="register" {...authPanelProps} onSubmit={handleRegister} />)}
          />

          <Route
            path="/login"
            element={guardGuest(<AuthPanel page="login" {...authPanelProps} onSubmit={handleLogin} />)}
          />

          <Route
            path="/topics"
            element={guardAuth(
              <ForumViewShell {...forumShellProps} currentView="topics" showAdmin>
                <TopicsPage
                  topicTitle={topicTitle}
                  setTopicTitle={setTopicTitle}
                  topicDescription={topicDescription}
                  setTopicDescription={setTopicDescription}
                  onCreateTopic={handleCreateTopic}
                  topics={topics}
                  isAdmin={isAdmin}
                  onOpenTopic={openTopicRoute}
                  onDeleteTopic={handleDeleteTopic}
                />
              </ForumViewShell>
            )}
          />

          <Route
            path="/topics/:topicId/:topicSlug"
            element={postsRouteElement}
          />

          <Route path="/topics/:topicId" element={postsRouteElement} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
