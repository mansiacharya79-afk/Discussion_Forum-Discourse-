import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import './App.css'
import AuthPanel from './components/AuthPanel'
import CosmicBackground from './components/CosmicBackground'
import Particles from './components/Particles'
import PostsPage from './components/PostsPage'
import TopBar from './components/TopBar'
import TopicsPage from './components/TopicsPage'

export default function App() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [topicTitle, setTopicTitle] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [posts, setPosts] = useState([])
  const [postContent, setPostContent] = useState('')
  const [commentText, setCommentText] = useState({})
  const [comments, setComments] = useState({})

  const navigate = useNavigate()
  const topicRouteMatch = useMatch('/topics/:topicId/:topicSlug')
  const routeTopicId = topicRouteMatch?.params?.topicId ? Number(topicRouteMatch.params.topicId) : null

  const isAdmin = loggedInUser?.role === 'ADMIN'
  const initials = (name) => (name ? name.slice(0, 2).toUpperCase() : '??')
  const sortByNewestId = (items) => [...items].sort((a, b) => Number(b?.id || 0) - Number(a?.id || 0))

  const slugify = (value) =>
    String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const loadTopics = () =>
    fetch('http://localhost:8081/api/topics')
      .then((r) => r.json())
      .then((data) => setTopics(sortByNewestId(data)))

  const fetchPostsByTopicId = (topicId) =>
    fetch('http://localhost:8081/api/posts')
      .then((r) => r.json())
      .then((data) => setPosts(sortByNewestId(data.filter((p) => p.topic?.id === topicId))))

  const handleRegister = () =>
    fetch('http://localhost:8081/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role: 'USER' }),
    })
      .then((r) => r.json())
      .then(() => setMessage('Account created! Sign in now.'))

  const handleLogin = () =>
    fetch('http://localhost:8081/api/users')
      .then((r) => r.json())
      .then((users) => {
        const found = users.find((u) => u.username === username && u.password === password)
        if (found) {
          setLoggedInUser(found)
          navigate('/topics')
          loadTopics()
        } else {
          setMessage('Invalid username or password.')
        }
      })

  const handleCreateTopic = () =>
    fetch('http://localhost:8081/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: topicTitle, description: topicDescription, user: loggedInUser }),
    })
      .then((r) => r.json())
      .then(() => {
        setTopicTitle('')
        setTopicDescription('')
        loadTopics()
      })

  const handleDeleteTopic = (id) =>
    fetch(`http://localhost:8081/api/topics/${id}`, { method: 'DELETE' }).then(loadTopics)

  const openTopicRoute = (topic) => {
    setSelectedTopic(topic)
    navigate(`/topics/${topic.id}/${slugify(topic.title)}`)
  }

  const handleCreatePost = () => {
    if (!selectedTopic) return Promise.resolve()

    return fetch('http://localhost:8081/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: postContent, user: loggedInUser, topic: selectedTopic }),
    })
      .then((r) => r.json())
      .then(() => {
        setPostContent('')
        return fetchPostsByTopicId(selectedTopic.id)
      })
  }

  const handleDeletePost = (id) => {
    if (!selectedTopic) return Promise.resolve()

    return fetch(`http://localhost:8081/api/posts/${id}`, { method: 'DELETE' }).then(() =>
      fetchPostsByTopicId(selectedTopic.id)
    )
  }

  const loadComments = (postId) =>
    fetch('http://localhost:8081/api/comments')
      .then((r) => r.json())
      .then((data) =>
        setComments((prev) => ({
          ...prev,
          [postId]: sortByNewestId(data.filter((c) => c.post?.id === postId)),
        }))
      )

  const handleAddComment = (post) => {
    const text = commentText[post.id]
    if (!text) return
    fetch('http://localhost:8081/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text, user: loggedInUser, post }),
    })
      .then((r) => r.json())
      .then(() => {
        setCommentText((prev) => ({ ...prev, [post.id]: '' }))
        loadComments(post.id)
      })
  }

  const handleDeleteComment = (commentId, postId) =>
    fetch(`http://localhost:8081/api/comments/${commentId}`, { method: 'DELETE' }).then(() => loadComments(postId))

  const handleLogout = () => {
    setLoggedInUser(null)
    setSelectedTopic(null)
    setPosts([])
    navigate('/login')
  }

  useEffect(() => {
    if (!loggedInUser) return
    loadTopics()
  }, [loggedInUser])

  useEffect(() => {
    if (!loggedInUser || !Number.isFinite(routeTopicId)) return

    let cancelled = false

    const resolveTopicAndPosts = async () => {
      let topic = topics.find((t) => t.id === routeTopicId)

      if (!topic) {
        const fetchedTopics = await fetch('http://localhost:8081/api/topics').then((r) => r.json())
        if (cancelled) return
        setTopics(sortByNewestId(fetchedTopics))
        topic = fetchedTopics.find((t) => t.id === routeTopicId)
      }

      if (!topic) {
        navigate('/topics', { replace: true })
        return
      }

      setSelectedTopic(topic)
      await fetchPostsByTopicId(topic.id)
    }

    resolveTopicAndPosts()

    return () => {
      cancelled = true
    }
  }, [loggedInUser, navigate, routeTopicId, topics])

  return (
    <>
      <CosmicBackground />
      <Particles />

      <div className="z2 relative z-[2]">
        <Routes>
          <Route path="/" element={<Navigate to={loggedInUser ? '/topics' : '/register'} replace />} />

          <Route
            path="/register"
            element={
              loggedInUser ? (
                <Navigate to="/topics" replace />
              ) : (
                <AuthPanel
                  page="register"
                  setPage={(next) => navigate(next === 'register' ? '/register' : '/login')}
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  message={message}
                  onSubmit={handleRegister}
                />
              )
            }
          />

          <Route
            path="/login"
            element={
              loggedInUser ? (
                <Navigate to="/topics" replace />
              ) : (
                <AuthPanel
                  page="login"
                  setPage={(next) => navigate(next === 'register' ? '/register' : '/login')}
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  message={message}
                  onSubmit={handleLogin}
                />
              )
            }
          />

          <Route
            path="/topics"
            element={
              loggedInUser ? (
                <>
                  <TopBar
                    loggedInUser={loggedInUser}
                    isAdmin={isAdmin}
                    initials={initials}
                    onLogout={handleLogout}
                    showAdmin={true}
                  />
                  <TopicsPage
                    topicTitle={topicTitle}
                    setTopicTitle={setTopicTitle}
                    topicDescription={topicDescription}
                    setTopicDescription={setTopicDescription}
                    onCreateTopic={handleCreateTopic}
                    topics={topics}
                    isAdmin={isAdmin}
                    currentUser={loggedInUser}
                    onOpenTopic={openTopicRoute}
                    onDeleteTopic={handleDeleteTopic}
                  />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/topics/:topicId/:topicSlug"
            element={
              loggedInUser ? (
                <>
                  <TopBar
                    loggedInUser={loggedInUser}
                    isAdmin={isAdmin}
                    initials={initials}
                    onLogout={handleLogout}
                    showAdmin={false}
                  />
                  <PostsPage
                    selectedTopic={selectedTopic}
                    postContent={postContent}
                    setPostContent={setPostContent}
                    onCreatePost={handleCreatePost}
                    posts={posts}
                    isAdmin={isAdmin}
                    currentUser={loggedInUser}
                    initials={initials}
                    onDeletePost={handleDeletePost}
                    onLoadComments={loadComments}
                    comments={comments}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    onBack={() => {
                      navigate('/topics')
                      loadTopics()
                    }}
                  />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
