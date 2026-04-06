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
    <div className="relative overflow-hidden rounded-[20px] border border-[rgba(26,34,64,0.18)] bg-[linear-gradient(165deg,rgba(255,252,246,0.95)_0%,rgba(248,241,230,0.96)_58%,rgba(241,229,211,0.97)_100%)] p-[24px] shadow-[0_15px_32px_rgba(26,34,64,0.19),0_0_0_1px_rgba(255,255,255,0.55)_inset] backdrop-blur-[20px] backdrop-saturate-[1.35] transition-[border-color,box-shadow] duration-300 hover:border-[var(--card-border)] hover:shadow-[0_23px_56px_rgba(26,34,64,0.23),0_0_0_1px_rgba(209,74,22,0.22),0_0_26px_rgba(209,74,22,0.17)]" style={{ animationDelay: `${index * 55}ms`, marginBottom: 12, animation: 'fadeUp 0.45s ease both' }}>
      <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(209,74,22,0.38),transparent)] opacity-0 transition-opacity duration-300 hover:opacity-100" />
      <div className="mb-[14px] flex items-center justify-between">
        <div className="flex items-center gap-[7px] text-[13px] text-[var(--text2)]"><div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d14a16,#1a2240)] text-[11px] font-bold text-white">{initials(post.user?.username)}</div>{post.user?.username}</div>
        {isAdmin && (
          <button className="ml-[10px] shrink-0 rounded-[8px] border border-[rgba(154,46,36,0.3)] bg-transparent px-[11px] py-[5px] font-['Space_Grotesk',sans-serif] text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a2e24] transition-all duration-200 hover:scale-[1.04] hover:border-[var(--danger)] hover:bg-[rgba(154,46,36,0.12)]" onClick={() => onDeletePost(post.id)}>
            Delete
          </button>
        )}
      </div>

      <p className="mb-[20px] text-[15px] leading-[1.75] text-[var(--text)]">{post.content}</p>

      <button className="mb-[16px] inline-flex items-center gap-[7px] rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.62)] px-[16px] py-[7px] font-['Space_Grotesk',sans-serif] text-[12px] font-semibold tracking-[0.04em] text-[#ad3a10] transition-all duration-200 hover:scale-[1.03] hover:border-[rgba(209,74,22,0.35)] hover:bg-[rgba(209,74,22,0.11)]" onClick={() => onLoadComments(post.id)}>💬 Comments</button>

      {comments[post.id] && (
        <div className="mb-[16px] flex flex-col gap-[7px]">
          {comments[post.id].length === 0 ? (
            <p className="text-[13px] text-[#4f5a74]">No comments yet.</p>
          ) : (
            comments[post.id].map((comment) => (
              <div key={comment.id} className="flex items-center justify-between rounded-[12px] border border-[var(--border)] bg-[rgba(255,255,255,0.56)] px-[14px] py-[10px] text-[14px] transition-all duration-200 hover:border-[rgba(209,74,22,0.2)] hover:bg-[rgba(209,74,22,0.09)]">
                <div>
                  <span className="mr-[8px] font-semibold text-[#ad3a10]">{comment.user?.username}</span>
                  <span className="text-[#27324b]">{comment.content}</span>
                </div>
                {isAdmin && (
                  <button className="ml-[10px] shrink-0 rounded-[8px] border border-[rgba(154,46,36,0.3)] bg-transparent px-[11px] py-[5px] font-['Space_Grotesk',sans-serif] text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a2e24] transition-all duration-200 hover:scale-[1.04] hover:border-[var(--danger)] hover:bg-[rgba(154,46,36,0.12)]" onClick={() => onDeleteComment(comment.id, post.id)}>Del</button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="flex gap-[10px]">
        <input
          className="flex-1 rounded-[12px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-[16px] py-[10px] font-['Space_Grotesk',sans-serif] text-[13px] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
          type="text"
          placeholder="Add a comment…"
          value={commentText[post.id] || ''}
          onChange={(e) => setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))}
        />
        <button className="rounded-[13px] bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-[18px] py-[10px] font-['Outfit',sans-serif] text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(209,74,22,0.28)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_7px_22px_rgba(173,58,16,0.45)]" onClick={() => onAddComment(post)}>Send ↑</button>
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
    <div className="mx-auto max-w-[860px] px-[24px] pb-[100px] pt-[44px] max-[540px]:px-[18px] max-[540px]:pb-[90px] max-[540px]:pt-[36px]">
      <div className="mb-[36px] animate-[fadeUp_0.5s_ease]">
        <div className="mb-[6px] bg-[linear-gradient(135deg,#1a2240_10%,#4f5673_84%)] bg-clip-text font-['Outfit',sans-serif] text-[38px] font-extrabold leading-[1.1] text-transparent">{selectedTopic?.title}</div>
        <p className="text-[14px] text-[var(--muted)]">{selectedTopic?.description}</p>
      </div>

      <div className="mb-[28px] rounded-[22px] border border-[rgba(26,34,64,0.18)] bg-[linear-gradient(165deg,rgba(255,252,246,0.95)_0%,rgba(248,241,230,0.96)_58%,rgba(241,229,211,0.97)_100%)] p-[28px] shadow-[0_19px_44px_rgba(26,34,64,0.19),0_0_0_1px_rgba(255,255,255,0.55)_inset,0_0_28px_rgba(209,74,22,0.12)] backdrop-blur-[20px] backdrop-saturate-[1.4] transition-[border-color,box-shadow] duration-300 hover:border-[var(--card-border)] hover:shadow-[0_23px_54px_rgba(26,34,64,0.23),0_0_0_1px_rgba(209,74,22,0.22)_inset,0_0_34px_rgba(209,74,22,0.19)]">
        <div className="mb-[18px] flex items-center gap-[8px] bg-[linear-gradient(90deg,#d14a16,#ad3a10)] bg-clip-text text-[11px] font-bold uppercase tracking-[0.12em] text-transparent before:inline-block before:h-[12px] before:w-[3px] before:rounded-[2px] before:bg-[linear-gradient(#d14a16,#ad3a10)] before:content-['']">Write a Post</div>
        <textarea
          className="mb-[8px] w-full resize-none rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.64)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] leading-[1.7] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
          style={{ height: 100 }}
          placeholder="Share something worth reading…"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button className="group inline-flex items-center gap-[7px] rounded-[11px] bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-[22px] py-[11px] font-['Outfit',sans-serif] text-[13px] font-bold tracking-[0.02em] text-white shadow-[0_4px_18px_rgba(209,74,22,0.28)] transition-all duration-200 hover:-translate-y-[2px] hover:brightness-110 hover:shadow-[0_8px_28px_rgba(173,58,16,0.45)]" onClick={onCreatePost}>Post Reply <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span></button>
      </div>

      <div className="mb-[24px] flex items-center gap-[16px]">
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />
        <span className="rounded-full border border-[var(--border)] bg-[var(--glass2)] px-[14px] py-[4px] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] backdrop-blur-[8px]">{posts.length} Posts</span>
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />
      </div>

      <div className="flex flex-col gap-[12px]">
        {posts.length === 0 ? (
          <div className="px-[20px] py-[70px] text-center text-[var(--muted)]"><div className="mb-[14px] text-[42px] animate-[pulse_2s_ease-in-out_infinite]">✍️</div>No posts yet. Start the conversation!</div>
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
