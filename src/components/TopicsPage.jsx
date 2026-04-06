function TopicCard({ topic, index, isAdmin, onOpen, onDeleteTopic }) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[rgba(26,34,64,0.18)] bg-[linear-gradient(165deg,rgba(255,252,246,0.95)_0%,rgba(248,241,230,0.96)_58%,rgba(241,229,211,0.97)_100%)] p-[22px_24px] shadow-[0_15px_32px_rgba(26,34,64,0.19),0_0_0_1px_rgba(255,255,255,0.55)_inset] backdrop-blur-[20px] backdrop-saturate-[1.35] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[2px] hover:-translate-y-[4px] hover:border-[var(--card-border)] hover:shadow-[0_23px_56px_rgba(26,34,64,0.23),0_0_0_1px_rgba(209,74,22,0.22),0_0_26px_rgba(209,74,22,0.17)]" style={{ animationDelay: `${index * 55}ms`, animation: 'fadeUp 0.45s ease both' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_50%,rgba(209,74,22,0.18)_0%,transparent_62%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-[linear-gradient(180deg,#d14a16,#ad3a10)] transition-transform duration-300 group-hover:scale-y-100" />
      <div className="relative z-[1] flex items-start justify-between">
        <div className="flex-1" onClick={() => onOpen(topic)}>
          <div className="mb-[4px] font-['Outfit',sans-serif] text-[18px] font-bold text-[var(--text)] transition-colors duration-200 group-hover:text-[#ad3a10]">{topic.title}</div>
          <div className="mb-[8px] flex items-center gap-[5px] text-[12px] text-[var(--muted)]"><span className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />by {topic.user?.username}</div>
          <div className="text-[14px] leading-[1.65] text-[var(--text2)]">{topic.description}</div>
        </div>
        <div className="ml-[12px] flex items-center">
          {isAdmin && (
            <button className="ml-[10px] shrink-0 rounded-[8px] border border-[rgba(154,46,36,0.3)] bg-transparent px-[11px] py-[5px] font-['Space_Grotesk',sans-serif] text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a2e24] transition-all duration-200 hover:scale-[1.04] hover:border-[var(--danger)] hover:bg-[rgba(154,46,36,0.12)]" onClick={() => onDeleteTopic(topic.id)}>
              Del
            </button>
          )}
          <div className="ml-[12px] mt-[2px] text-[20px] text-[var(--muted)] transition-all duration-300 group-hover:translate-x-[5px] group-hover:text-[var(--accent)]" onClick={() => onOpen(topic)}>›</div>
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
  onOpenTopic,
  onDeleteTopic,
}) {
  return (
    <div className="mx-auto max-w-[860px] px-[24px] pb-[100px] pt-[44px] max-[540px]:px-[18px] max-[540px]:pb-[90px] max-[540px]:pt-[36px]">
      <div className="mb-[36px] animate-[fadeUp_0.5s_ease]">
        <div className="mb-[6px] bg-[linear-gradient(135deg,#1a2240_10%,#4f5673_84%)] bg-clip-text font-['Outfit',sans-serif] text-[38px] font-extrabold leading-[1.1] text-transparent">Explore Topics</div>
        <p className="text-[14px] text-[var(--muted)]">Join a discussion or spark a new one</p>
      </div>

      <div className="mb-[28px] rounded-[22px] border border-[rgba(26,34,64,0.18)] bg-[linear-gradient(165deg,rgba(255,252,246,0.95)_0%,rgba(248,241,230,0.96)_58%,rgba(241,229,211,0.97)_100%)] p-[28px] shadow-[0_19px_44px_rgba(26,34,64,0.19),0_0_0_1px_rgba(255,255,255,0.55)_inset,0_0_28px_rgba(209,74,22,0.12)] backdrop-blur-[20px] backdrop-saturate-[1.4] transition-[border-color,box-shadow] duration-300 hover:border-[var(--card-border)] hover:shadow-[0_23px_54px_rgba(26,34,64,0.23),0_0_0_1px_rgba(209,74,22,0.22)_inset,0_0_34px_rgba(209,74,22,0.19)]">
        <div className="mb-[18px] flex items-center gap-[8px] bg-[linear-gradient(90deg,#d14a16,#ad3a10)] bg-clip-text text-[11px] font-bold uppercase tracking-[0.12em] text-transparent before:inline-block before:h-[12px] before:w-[3px] before:rounded-[2px] before:bg-[linear-gradient(#d14a16,#ad3a10)] before:content-['']">New Topic</div>
        <div className="flex flex-col gap-[12px]">
          <input
            className="w-full rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
            type="text"
            placeholder="What's this topic about?"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
          />
          <textarea
            className="mb-[8px] w-full resize-none rounded-[13px] border border-[var(--border)] bg-[rgba(255,255,255,0.64)] px-[16px] py-[13px] font-['Space_Grotesk',sans-serif] text-[14px] leading-[1.7] text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--placeholder)] focus:-translate-y-px focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.94)] focus:shadow-[0_0_0_4px_rgba(209,74,22,0.14),0_0_20px_rgba(209,74,22,0.1)]"
            style={{ height: 85 }}
            placeholder="Give it some context…"
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
          />
          <div>
            <button className="group inline-flex items-center gap-[7px] rounded-[11px] bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-[22px] py-[11px] font-['Outfit',sans-serif] text-[13px] font-bold tracking-[0.02em] text-white shadow-[0_4px_18px_rgba(209,74,22,0.28)] transition-all duration-200 hover:-translate-y-[2px] hover:brightness-110 hover:shadow-[0_8px_28px_rgba(173,58,16,0.45)]" onClick={onCreateTopic}>Publish Topic <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span></button>
          </div>
        </div>
      </div>

      <div className="mb-[24px] flex items-center gap-[16px]">
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />
        <span className="rounded-full border border-[var(--border)] bg-[var(--glass2)] px-[14px] py-[4px] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] backdrop-blur-[8px]">{topics.length} Topics</span>
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />
      </div>

      <div className="flex flex-col gap-[12px]">
        {topics.length === 0 ? (
          <div className="px-[20px] py-[70px] text-center text-[var(--muted)]"><div className="mb-[14px] text-[42px] animate-[pulse_2s_ease-in-out_infinite]">🌌</div>No topics yet — be the first explorer!</div>
        ) : (
          topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              isAdmin={isAdmin}
              onOpen={onOpenTopic}
              onDeleteTopic={onDeleteTopic}
            />
          ))
        )}
      </div>
    </div>
  )
}
