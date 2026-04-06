import { useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:8081/api'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

export default function useForumController() {
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
  const topicRouteWithSlugMatch = useMatch('/topics/:topicId/:topicSlug')
  const topicRouteIdOnlyMatch = useMatch('/topics/:topicId')
  const topicRouteMatch = topicRouteWithSlugMatch || topicRouteIdOnlyMatch
  const routeTopicId = topicRouteMatch?.params?.topicId ? Number(topicRouteMatch.params.topicId) : null
  const routeTopicSlug = topicRouteWithSlugMatch?.params?.topicSlug || null

  const isAdmin = loggedInUser?.role === 'ADMIN'
  const initials = (name) => (name ? name.slice(0, 2).toUpperCase() : '??')

  const slugify = (value) =>
    String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const recentFirst = (items) => {
    return [...items].sort((a, b) => {
      const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime()
      const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime()
      if (timeB !== timeA) return timeB - timeA
      return (b.id || 0) - (a.id || 0)
    })
  }

  const fetchJson = (path, options) => fetch(`${API_BASE}${path}`, options).then((r) => r.json())
  const deleteByPath = (path) => fetch(`${API_BASE}${path}`, { method: 'DELETE' })

  const loadTopics = () => fetchJson('/topics').then((data) => setTopics(recentFirst(data)))

  const fetchPostsByTopicId = (topicId) =>
    fetchJson('/posts').then((data) => setPosts(recentFirst(data.filter((p) => p.topic?.id === topicId))))

  const handleRegister = () =>
    fetchJson('/users', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ username, email, password, role: 'USER' }),
    }).then(() => setMessage('Account created! Sign in now.'))

  const handleLogin = () =>
    fetchJson('/users').then((users) => {
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
    fetchJson('/topics', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ title: topicTitle, description: topicDescription, user: loggedInUser }),
    }).then(() => {
      setTopicTitle('')
      setTopicDescription('')
      loadTopics()
    })

  const handleDeleteTopic = (id) => deleteByPath(`/topics/${id}`).then(loadTopics)

  const openTopicRoute = (topic) => {
    setSelectedTopic(topic)
    navigate(`/topics/${topic.id}/${slugify(topic.title)}`)
  }

  const handleCreatePost = () => {
    if (!selectedTopic) return Promise.resolve()

    return fetchJson('/posts', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ content: postContent, user: loggedInUser, topic: selectedTopic }),
    }).then(() => {
      setPostContent('')
      return fetchPostsByTopicId(selectedTopic.id)
    })
  }

  const handleDeletePost = (id) => {
    if (!selectedTopic) return Promise.resolve()
    return deleteByPath(`/posts/${id}`).then(() => fetchPostsByTopicId(selectedTopic.id))
  }

  const loadComments = (postId) =>
    fetchJson('/comments').then((data) =>
      setComments((prev) => ({ ...prev, [postId]: data.filter((c) => c.post?.id === postId) }))
    )

  const handleAddComment = (post) => {
    const text = commentText[post.id]
    if (!text) return
    fetchJson('/comments', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ content: text, user: loggedInUser, post }),
    }).then(() => {
      setCommentText((prev) => ({ ...prev, [post.id]: '' }))
      loadComments(post.id)
    })
  }

  const handleDeleteComment = (commentId, postId) =>
    deleteByPath(`/comments/${commentId}`).then(() => loadComments(postId))

  const clearSessionState = () => {
    setLoggedInUser(null)
    setSelectedTopic(null)
    setPosts([])
  }

  const handleLogout = () => {
    clearSessionState()
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
        const fetchedTopics = await fetchJson('/topics')
        if (cancelled) return
        setTopics(fetchedTopics)
        topic = fetchedTopics.find((t) => t.id === routeTopicId)
      }

      if (!topic) {
        navigate('/topics', { replace: true })
        return
      }

      setSelectedTopic(topic)
      const canonicalSlug = slugify(topic.title)
      if (routeTopicSlug !== canonicalSlug) {
        navigate(`/topics/${topic.id}/${canonicalSlug}`, { replace: true })
      }
      await fetchPostsByTopicId(topic.id)
    }

    resolveTopicAndPosts()

    return () => {
      cancelled = true
    }
  }, [loggedInUser, navigate, routeTopicId, routeTopicSlug, topics])

  const goToPostsPage = () => {
    navigate(selectedTopic ? `/topics/${selectedTopic.id}/${slugify(selectedTopic.title)}` : '/topics')
  }

  const authPanelProps = {
    setPage: (next) => navigate(next === 'register' ? '/register' : '/login'),
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    message,
  }

  const forumShellProps = {
    loggedInUser,
    isAdmin,
    initials,
    onLogout: handleLogout,
    onPostsPage: goToPostsPage,
    onTopicPage: () => navigate('/topics'),
    onRegisterPage: () => {
      clearSessionState()
      navigate('/register')
    },
  }

  return {
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
  }
}
