function TopicCard({ topic, index, isAdmin, currentUser, onOpen, onDeleteTopic }) {
  const isOwner =
    !!currentUser && currentUser.id != null && topic.user?.id != null && Number(currentUser.id) === Number(topic.user.id)
  const canDelete = isAdmin || isOwner

  return (
    <div
      className="topic-item"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="t-row">
        <div onClick={() => onOpen(topic)} style={{ flex: 1 }}>
          <div className="t-name">{topic.title}</div>
          <div className="t-by"><span className="by-dot" />by {topic.user?.username}</div>
          <div className="t-desc">{topic.description}</div>
        </div>
        <div className="flex items-center">
          {canDelete && (
            <button
              className="btn-del"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this topic?')) {
                  onDeleteTopic(topic.id)
                }
              }}
            >
              Del
            </button>
          )}
          <div className="t-chev ml-3 mt-0.5 text-xl" onClick={() => onOpen(topic)}>›</div>
        </div>
      </div>
    </div>
  )
}

export default function TopicsPage({
  topicTitle,
  setTopicTitle,
  topicDescription,
  setTopicDescription,
  onCreateTopic,
  topics,
  isAdmin,
  currentUser,
  onOpenTopic,
  onDeleteTopic,
}) {
  return (
    <div className="wrap mx-auto max-w-[860px] px-6 pb-[100px] pt-11">
      <div className="pg-head">
        <div className="pg-title">Explore Topics</div>
        <p className="pg-sub">Join a discussion or spark a new one</p>
      </div>

      <div className="glass-card mb-7 p-7">
        <div className="card-lbl">New Topic</div>
        <div className="fields flex flex-col gap-[13px]">
          <input
            className="inp w-full rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
            type="text"
            placeholder="What's this topic about?"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
          />
          <textarea
            className="ta mb-2 w-full resize-none rounded-[13px] border border-white/10 bg-white/5 px-4 py-[13px] text-sm text-slate-50 outline-none"
            style={{ height: 85 }}
            placeholder="Give it some context…"
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
          />
          <div>
            <button className="btn-pub" onClick={onCreateTopic}>Publish Topic <span className="arr">→</span></button>
          </div>
        </div>
      </div>

      <div className="divider">
        <div className="div-line" />
        <span className="div-txt">{topics.length} Topics</span>
        <div className="div-line" />
      </div>

      <div className="list flex flex-col gap-3">
        {topics.length === 0 ? (
          <div className="empty"><div className="empty-icon">🌌</div>No topics yet — be the first explorer!</div>
        ) : (
          topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              isAdmin={isAdmin}
              currentUser={currentUser}
              onOpen={onOpenTopic}
              onDeleteTopic={onDeleteTopic}
            />
          ))
        )}
      </div>
    </div>
  )
}
