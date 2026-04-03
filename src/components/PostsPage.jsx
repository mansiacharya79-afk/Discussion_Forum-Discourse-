function PostCard({
  post,
  index,
  isAdmin,
  initials,
  onDeletePost,
  onLoadComments,
  comments,
  commentText,
  setCommentText,
  onAddComment,
  onDeleteComment,
}) {
  return (
    <div
      className="post-item"
      style={{ animationDelay: `${index * 55}ms`, marginBottom: 12 }}
    >
      <div className="p-top">
        <div className="p-who"><div className="p-av">{initials(post.user?.username)}</div>{post.user?.username}</div>
        {isAdmin && <button className="btn-del" onClick={() => onDeletePost(post.id)}>Delete</button>}
      </div>

      <p className="p-body">{post.content}</p>

      <button className="btn-tog" onClick={() => onLoadComments(post.id)}>💬 Comments</button>

      {comments[post.id] && (
        <div className="cmt-list">
          {comments[post.id].length === 0 ? (
            <p className="text-[13px] text-[var(--muted)]">No comments yet.</p>
          ) : (
            comments[post.id].map((comment) => (
              <div key={comment.id} className="cmt">
                <div>
                  <span className="cmt-user">{comment.user?.username}</span>
                  <span className="cmt-txt">{comment.content}</span>
                </div>
                {isAdmin && (
                  <button className="btn-del" onClick={() => onDeleteComment(comment.id, post.id)}>Del</button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="cmt-row flex gap-2.5">
        <input
          className="cmt-inp flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-slate-50 outline-none"
          type="text"
          placeholder="Add a comment…"
          value={commentText[post.id] || ''}
          onChange={(e) => setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))}
        />
        <button className="btn-send" onClick={() => onAddComment(post)}>Send ↑</button>
      </div>
    </div>
  )
}

export default function PostsPage({
  selectedTopic,
  postContent,
  setPostContent,
  onCreatePost,
  posts,
  isAdmin,
  initials,
  onDeletePost,
  onLoadComments,
  comments,
  commentText,
  setCommentText,
  onAddComment,
  onDeleteComment,
}) {
  return (
    <div className="wrap mx-auto max-w-[860px] px-6 pb-[100px] pt-11">
      <div className="pg-head">
        <div className="pg-title">{selectedTopic?.title}</div>
        <p className="pg-sub">{selectedTopic?.description}</p>
      </div>

      <div className="glass-card mb-7 p-7">
        <div className="card-lbl">Write a Post</div>
        <textarea
          className="ta mb-2 w-full resize-none rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
          style={{ height: 100 }}
          placeholder="Share something worth reading…"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button className="btn-pub" onClick={onCreatePost}>Post Reply <span className="arr">→</span></button>
      </div>

      <div className="divider">
        <div className="div-line" />
        <span className="div-txt">{posts.length} Posts</span>
        <div className="div-line" />
      </div>

      <div className="list flex flex-col gap-3">
        {posts.length === 0 ? (
          <div className="empty"><div className="empty-icon">✍️</div>No posts yet. Start the conversation!</div>
        ) : (
          posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              isAdmin={isAdmin}
              initials={initials}
              onDeletePost={onDeletePost}
              onLoadComments={onLoadComments}
              comments={comments}
              commentText={commentText}
              setCommentText={setCommentText}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
            />
          ))
        )}
      </div>
    </div>
  )
}
