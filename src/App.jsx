import { useState, useEffect, useRef } from 'react'

/* ── ANIMATED CANVAS BACKGROUND ── */
function CosmicBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.7 + 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    const orbs = [
      { x: 0.15, y: 0.2,  r: 320, color: [120, 60, 240],  speed: 0.0007 },
      { x: 0.85, y: 0.15, r: 260, color: [30, 180, 220],  speed: 0.0009 },
      { x: 0.5,  y: 0.8,  r: 300, color: [180, 50, 200],  speed: 0.0006 },
      { x: 0.7,  y: 0.55, r: 200, color: [60, 120, 255],  speed: 0.001  },
    ]

    const draw = () => {
      t += 0.012
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0, '#04040e')
      bg.addColorStop(0.5, '#07071a')
      bg.addColorStop(1, '#050510')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < 3; i++) {
        const yOff = H * (0.25 + i * 0.25) + Math.sin(t * 0.4 + i * 2) * 60
        const grad = ctx.createLinearGradient(0, yOff - 120, 0, yOff + 120)
        const colors = [
          ['rgba(100,40,220,0)', 'rgba(100,40,220,0.04)', 'rgba(100,40,220,0)'],
          ['rgba(20,160,200,0)', 'rgba(20,160,200,0.035)', 'rgba(20,160,200,0)'],
          ['rgba(160,30,200,0)', 'rgba(160,30,200,0.03)',  'rgba(160,30,200,0)'],
        ][i]
        grad.addColorStop(0, colors[0])
        grad.addColorStop(0.5, colors[1])
        grad.addColorStop(1, colors[2])
        ctx.fillStyle = grad
        ctx.fillRect(0, yOff - 120, W, 240)
      }

      orbs.forEach((orb, i) => {
        const cx = (orb.x + Math.sin(t * orb.speed * 3 + i) * 0.06) * W
        const cy = (orb.y + Math.cos(t * orb.speed * 2 + i) * 0.05) * H
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        const [r, gr, b] = orb.color
        g.addColorStop(0, `rgba(${r},${gr},${b},0.12)`)
        g.addColorStop(0.5, `rgba(${r},${gr},${b},0.05)`)
        g.addColorStop(1, `rgba(${r},${gr},${b},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      stars.forEach(s => {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.2 + s.twinkleOffset))
        ctx.beginPath()
        ctx.arc(s.x, s.y + Math.sin(t * s.speed + s.x) * 0.4, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * twinkle})`
        ctx.fill()
      })

      if (Math.sin(t * 0.3) > 0.97) {
        const progress = (Math.sin(t * 0.3) - 0.97) / 0.03
        const sx = W * 0.1 + progress * W * 0.8
        const sy = H * 0.05 + progress * H * 0.3
        const tail = 80
        const sg = ctx.createLinearGradient(sx - tail, sy - tail * 0.4, sx, sy)
        sg.addColorStop(0, 'rgba(255,255,255,0)')
        sg.addColorStop(1, 'rgba(255,255,255,0.7)')
        ctx.strokeStyle = sg
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sx - tail, sy - tail * 0.4)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.018)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }} />
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 14 + 8,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', bottom: '-10px', left: p.left,
          width: p.size, height: p.size, borderRadius: '50%',
          background: `rgba(167,139,250,${p.opacity})`,
          boxShadow: `0 0 ${p.size * 3}px rgba(167,139,250,${p.opacity})`,
          animation: `floatUp ${p.duration}s ${p.delay}s infinite linear`,
        }} />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --glass: rgba(12,10,30,0.65);
    --glass2: rgba(8,6,22,0.75);
    --border: rgba(255,255,255,0.08);
    --border-accent: rgba(139,92,246,0.45);
    --accent: #8b5cf6;
    --accent2: #22d3ee;
    --glow: rgba(139,92,246,0.2);
    --text: #f1f5f9;
    --text2: #94a3b8;
    --muted: #475569;
    --danger: #f43f5e;
  }
  body { font-family:'Space Grotesk',sans-serif; background:#04040e; color:var(--text); min-height:100vh; overflow-x:hidden; }
  .z2 { position:relative; z-index:2; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(139,92,246,0.3); border-radius:99px; }

  /* AUTH */
  .auth-scene { display:flex; align-items:center; justify-content:center; min-height:100vh; padding:24px; }
  .auth-box {
    width:100%; max-width:430px;
    background:var(--glass); border:1px solid var(--border); border-radius:28px; padding:48px 40px;
    backdrop-filter:blur(24px);
    box-shadow:0 0 0 1px rgba(255,255,255,0.04) inset,0 40px 80px rgba(0,0,0,0.6),0 0 60px rgba(139,92,246,0.08);
    animation:scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.92) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);} }
  .auth-brand {
    text-align:center; margin-bottom:6px;
    font-family:'Outfit',sans-serif; font-size:32px; font-weight:800;
    background:linear-gradient(135deg,#c4b5fd 0%,#67e8f9 50%,#f9a8d4 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-size:200% auto; animation:shimmer 4s linear infinite;
  }
  @keyframes shimmer { 0%{background-position:0% center;} 100%{background-position:200% center;} }
  .auth-sub { text-align:center; color:var(--muted); font-size:13px; margin-bottom:36px; letter-spacing:.05em; }
  .tabs { display:flex; gap:4px; background:rgba(255,255,255,.04); border-radius:14px; padding:4px; margin-bottom:28px; border:1px solid var(--border); }
  .tab { flex:1; padding:10px; border:none; border-radius:11px; cursor:pointer; font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:600; transition:all .3s cubic-bezier(.4,0,.2,1); }
  .tab.on  { background:linear-gradient(135deg,#7c3aed,#4338ca); color:#fff; box-shadow:0 4px 20px rgba(124,58,237,.5),0 0 0 1px rgba(167,139,250,.3); }
  .tab.off { background:transparent; color:var(--muted); }
  .tab.off:hover { color:var(--text); background:rgba(255,255,255,.05); }
  .fields { display:flex; flex-direction:column; gap:13px; }
  .inp {
    width:100%; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:13px;
    padding:13px 16px; color:var(--text); font-size:14px; font-family:'Space Grotesk',sans-serif; outline:none;
    transition:all .25s;
  }
  .inp::placeholder { color:var(--muted); }
  .inp:focus { border-color:var(--accent); background:rgba(139,92,246,.06); box-shadow:0 0 0 4px rgba(139,92,246,.12),0 0 20px rgba(139,92,246,.08); transform:translateY(-1px); }
  .btn-main {
    width:100%; border:none; border-radius:13px; padding:14px; font-size:15px; font-weight:700;
    font-family:'Outfit',sans-serif; cursor:pointer;
    background:linear-gradient(135deg,#7c3aed 0%,#4338ca 50%,#0e7490 100%);
    background-size:200% auto; color:#fff;
    box-shadow:0 8px 32px rgba(124,58,237,.35); transition:all .3s; letter-spacing:.02em; position:relative; overflow:hidden;
  }
  .btn-main::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15),transparent); opacity:0; transition:opacity .2s; }
  .btn-main:hover { background-position:right center; transform:translateY(-2px); box-shadow:0 12px 40px rgba(124,58,237,.5); }
  .btn-main:hover::before { opacity:1; }
  .msg-toast {
    margin-top:18px; background:linear-gradient(135deg,rgba(139,92,246,.15),rgba(34,211,238,.08));
    border:1px solid rgba(139,92,246,.3); border-radius:12px; padding:11px 16px;
    font-size:13px; text-align:center; color:#c4b5fd; animation:slideDown .3s ease;
  }
  @keyframes slideDown { from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);} }

  /* TOPBAR */
  .bar { position:sticky; top:0; z-index:100; background:rgba(4,4,14,.82); backdrop-filter:blur(28px) saturate(150%); border-bottom:1px solid var(--border); }
  .bar-in { max-width:860px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; height:66px; }
  .brand { font-family:'Outfit',sans-serif; font-weight:800; font-size:22px; background:linear-gradient(135deg,#c4b5fd,#67e8f9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; display:flex; align-items:center; gap:8px; }
  .brand-star { display:inline-block; font-size:18px; animation:spin 8s linear infinite; -webkit-text-fill-color:initial; color:#8b5cf6; }
  @keyframes spin { to{transform:rotate(360deg);} }
  .pill-admin { font-size:9px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; background:linear-gradient(135deg,#7c3aed,#0e7490); color:#fff; padding:3px 9px; border-radius:999px; }
  .bar-r { display:flex; align-items:center; gap:12px; }
  .uchip { display:flex; align-items:center; gap:8px; background:rgba(255,255,255,.05); border:1px solid var(--border); border-radius:999px; padding:6px 14px 6px 8px; font-size:13px; font-weight:500; }
  .av { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,#7c3aed,#22d3ee); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; flex-shrink:0; }
  .btn-out { background:transparent; border:1px solid rgba(244,63,94,.25); color:var(--muted); border-radius:10px; padding:7px 14px; font-size:13px; font-weight:500; font-family:'Space Grotesk',sans-serif; cursor:pointer; transition:all .2s; }
  .btn-out:hover { border-color:var(--danger); color:#fb7185; background:rgba(244,63,94,.08); }

  /* CONTENT */
  .wrap { max-width:860px; margin:0 auto; padding:44px 24px 100px; }
  .pg-head { margin-bottom:36px; animation:fadeUp .5s ease; }
  .pg-title { font-family:'Outfit',sans-serif; font-size:38px; font-weight:800; background:linear-gradient(135deg,#f1f5f9 20%,#94a3b8 80%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; line-height:1.1; margin-bottom:6px; }
  .pg-sub { color:var(--muted); font-size:14px; }

  .glass-card {
    background:var(--glass); border:1px solid var(--border); border-radius:22px; padding:28px;
    backdrop-filter:blur(16px); margin-bottom:28px;
    box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.03) inset;
    transition:border-color .3s,box-shadow .3s; animation:fadeUp .4s ease;
  }
  .glass-card:hover { border-color:rgba(139,92,246,.2); box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 30px rgba(139,92,246,.06); }
  .card-lbl { font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; background:linear-gradient(90deg,#a78bfa,#67e8f9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:18px; display:flex; align-items:center; gap:8px; }
  .card-lbl::before { content:''; display:inline-block; width:3px; height:12px; border-radius:2px; background:linear-gradient(#a78bfa,#67e8f9); }

  .ta { width:100%; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:13px; color:var(--text); padding:13px 16px; font-size:14px; font-family:'Space Grotesk',sans-serif; resize:none; outline:none; transition:all .25s; line-height:1.7; margin-bottom:8px; }
  .ta::placeholder { color:var(--muted); }
  .ta:focus { border-color:var(--accent); background:rgba(139,92,246,.05); box-shadow:0 0 0 4px rgba(139,92,246,.1); }

  .btn-pub { display:inline-flex; align-items:center; gap:7px; background:linear-gradient(135deg,#7c3aed,#4338ca); color:#fff; border:none; border-radius:11px; padding:11px 22px; font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all .25s; box-shadow:0 4px 18px rgba(124,58,237,.3); letter-spacing:.02em; }
  .btn-pub:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(124,58,237,.5); filter:brightness(1.1); }
  .arr { transition:transform .2s; }
  .btn-pub:hover .arr { transform:translateX(3px); }

  .divider { display:flex; align-items:center; gap:16px; margin:20px 0 24px; }
  .div-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,var(--border),transparent); }
  .div-txt { font-size:11px; font-weight:700; letter-spacing:.12em; color:var(--muted); text-transform:uppercase; background:var(--glass2); border:1px solid var(--border); border-radius:999px; padding:4px 14px; backdrop-filter:blur(8px); }

  /* TOPIC ITEMS */
  .topic-item {
    background:var(--glass); border:1px solid var(--border); border-radius:20px; padding:22px 24px;
    backdrop-filter:blur(16px); transition:all .35s cubic-bezier(.4,0,.2,1); cursor:pointer;
    position:relative; overflow:hidden; animation:fadeUp .45s ease both;
  }
  .topic-item::after { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; border-radius:2px 0 0 2px; background:linear-gradient(180deg,#8b5cf6,#22d3ee); transform:scaleY(0); transform-origin:bottom; transition:transform .3s ease; }
  .topic-item::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 10% 50%,rgba(139,92,246,.08) 0%,transparent 60%); opacity:0; transition:opacity .4s; }
  .topic-item:hover { border-color:var(--border-accent); transform:translateY(-4px) translateX(2px); box-shadow:0 16px 48px rgba(0,0,0,.4),0 0 0 1px rgba(139,92,246,.12); }
  .topic-item:hover::before { opacity:1; }
  .topic-item:hover::after { transform:scaleY(1); }
  .t-row { display:flex; justify-content:space-between; align-items:flex-start; position:relative; z-index:1; }
  .t-name { font-family:'Outfit',sans-serif; font-size:18px; font-weight:700; color:var(--text); margin-bottom:4px; transition:color .2s; }
  .topic-item:hover .t-name { color:#c4b5fd; }
  .t-by { font-size:12px; color:var(--muted); margin-bottom:8px; display:flex; align-items:center; gap:5px; }
  .by-dot { width:5px; height:5px; border-radius:50%; background:var(--accent); display:inline-block; }
  .t-desc { font-size:14px; color:#94a3b8; line-height:1.65; }
  .t-chev { color:var(--muted); font-size:20px; transition:all .3s; flex-shrink:0; margin-top:2px; margin-left:12px; }
  .topic-item:hover .t-chev { color:var(--accent); transform:translateX(5px); }

  /* POSTS */
  .post-item { background:var(--glass); border:1px solid var(--border); border-radius:20px; padding:24px; backdrop-filter:blur(16px); animation:fadeUp .45s ease both; transition:border-color .3s; position:relative; overflow:hidden; }
  .post-item::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(139,92,246,.4),transparent); opacity:0; transition:opacity .3s; }
  .post-item:hover { border-color:rgba(139,92,246,.2); }
  .post-item:hover::before { opacity:1; }
  .p-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
  .p-who { font-size:13px; color:var(--text2); display:flex; align-items:center; gap:7px; }
  .p-av { width:28px; height:28px; border-radius:50%; background:linear-gradient(135deg,#4338ca,#0e7490); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; }
  .p-body { font-size:15px; color:var(--text); line-height:1.75; margin-bottom:20px; }

  .btn-tog { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,.04); border:1px solid var(--border); color:#a78bfa; border-radius:999px; padding:7px 16px; font-size:12px; font-weight:600; font-family:'Space Grotesk',sans-serif; cursor:pointer; transition:all .25s; margin-bottom:16px; letter-spacing:.04em; }
  .btn-tog:hover { background:rgba(139,92,246,.1); border-color:rgba(139,92,246,.35); transform:scale(1.03); }

  .cmt-list { display:flex; flex-direction:column; gap:7px; margin-bottom:16px; }
  .cmt { background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:12px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; font-size:14px; transition:all .2s; animation:fadeUp .3s ease; }
  .cmt:hover { background:rgba(139,92,246,.06); border-color:rgba(139,92,246,.2); }
  .cmt-user { color:#c4b5fd; font-weight:600; margin-right:8px; }
  .cmt-txt { color:#94a3b8; }

  .cmt-row { display:flex; gap:10px; }
  .cmt-inp { flex:1; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:12px; color:var(--text); padding:10px 16px; font-size:13px; font-family:'Space Grotesk',sans-serif; outline:none; transition:all .2s; }
  .cmt-inp::placeholder { color:var(--muted); }
  .cmt-inp:focus { border-color:var(--accent); background:rgba(139,92,246,.05); box-shadow:0 0 0 3px rgba(139,92,246,.1); }
  .btn-send { background:linear-gradient(135deg,#7c3aed,#4338ca); color:#fff; border:none; border-radius:11px; padding:10px 18px; font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all .25s; box-shadow:0 4px 14px rgba(124,58,237,.28); white-space:nowrap; }
  .btn-send:hover { transform:translateY(-1px); box-shadow:0 7px 22px rgba(124,58,237,.45); }

  .btn-del { background:transparent; border:1px solid rgba(244,63,94,.2); color:#f43f5e; border-radius:8px; padding:5px 11px; font-size:11px; font-weight:700; font-family:'Space Grotesk',sans-serif; cursor:pointer; transition:all .2s; letter-spacing:.06em; text-transform:uppercase; flex-shrink:0; margin-left:10px; }
  .btn-del:hover { background:rgba(244,63,94,.12); border-color:var(--danger); transform:scale(1.04); }

  .btn-back { display:inline-flex; align-items:center; gap:7px; color:var(--accent2); font-size:13px; font-weight:600; cursor:pointer; margin-bottom:20px; background:rgba(34,211,238,.07); border:1px solid rgba(34,211,238,.2); border-radius:999px; padding:6px 16px; transition:all .25s; }
  .btn-back:hover { background:rgba(34,211,238,.14); transform:translateX(-3px); }

  .empty { text-align:center; padding:70px 20px; color:var(--muted); }
  .empty-icon { font-size:42px; margin-bottom:14px; animation:pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:.6;}50%{transform:scale(1.1);opacity:1;} }

  .list { display:flex; flex-direction:column; gap:12px; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
`

export default function App() {
  const [page, setPage] = useState('register')
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

  const isAdmin = loggedInUser?.role === 'ADMIN'
  const initials = n => n ? n.slice(0, 2).toUpperCase() : '??'

  const handleRegister = () =>
    fetch('http://localhost:8081/api/users', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username,email,password,role:'USER'}) })
      .then(r=>r.json()).then(()=>setMessage('Account created! Sign in now.'))

  const handleLogin = () =>
    fetch('http://localhost:8081/api/users').then(r=>r.json()).then(users=>{
      const found = users.find(u=>u.username===username&&u.password===password)
      if(found){setLoggedInUser(found);setPage('topics');loadTopics()}
      else setMessage('Invalid username or password.')
    })

  const loadTopics = () => fetch('http://localhost:8081/api/topics').then(r=>r.json()).then(setTopics)

  const handleCreateTopic = () =>
    fetch('http://localhost:8081/api/topics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:topicTitle,description:topicDescription,user:loggedInUser})})
      .then(r=>r.json()).then(()=>{setTopicTitle('');setTopicDescription('');loadTopics()})

  const handleDeleteTopic = id => fetch(`http://localhost:8081/api/topics/${id}`,{method:'DELETE'}).then(loadTopics)

  const loadPosts = topic => {
    setSelectedTopic(topic);setPage('posts')
    fetch('http://localhost:8081/api/posts').then(r=>r.json()).then(d=>setPosts(d.filter(p=>p.topic?.id===topic.id)))
  }

  const handleCreatePost = () =>
    fetch('http://localhost:8081/api/posts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:postContent,user:loggedInUser,topic:selectedTopic})})
      .then(r=>r.json()).then(()=>{setPostContent('');loadPosts(selectedTopic)})

  const handleDeletePost = id => fetch(`http://localhost:8081/api/posts/${id}`,{method:'DELETE'}).then(()=>loadPosts(selectedTopic))

  const loadComments = pid =>
    fetch('http://localhost:8081/api/comments').then(r=>r.json())
      .then(d=>setComments(p=>({...p,[pid]:d.filter(c=>c.post?.id===pid)})))

  const handleAddComment = post => {
    const text=commentText[post.id];if(!text)return
    fetch('http://localhost:8081/api/comments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:text,user:loggedInUser,post})})
      .then(r=>r.json()).then(()=>{setCommentText(p=>({...p,[post.id]:''}));loadComments(post.id)})
  }

  const handleDeleteComment = (cid,pid) => fetch(`http://localhost:8081/api/comments/${cid}`,{method:'DELETE'}).then(()=>loadComments(pid))

  return (
    <>
      <style>{css}</style>
      <CosmicBackground />
      <Particles />

      <div className="z2">

        {/* AUTH */}
        {page!=='topics'&&page!=='posts'&&(
          <div className="auth-scene">
            <div className="auth-box">
              <div className="auth-brand">✦ Discourse</div>
              <p className="auth-sub">where ideas travel at the speed of thought</p>
              <div className="tabs">
                <button className={`tab ${page==='register'?'on':'off'}`} onClick={()=>setPage('register')}>Register</button>
                <button className={`tab ${page==='login'?'on':'off'}`} onClick={()=>setPage('login')}>Sign In</button>
              </div>
              <div className="fields">
                {page==='register'&&<>
                  <input className="inp" type="text" placeholder="Choose a username" value={username} onChange={e=>setUsername(e.target.value)}/>
                  <input className="inp" type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}/>
                </>}
                {page==='login'&&<input className="inp" type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>}
                <input className="inp" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="btn-main" onClick={page==='register'?handleRegister:handleLogin}>
                  {page==='register'?'Create Account →':'Sign In →'}
                </button>
              </div>
              {message&&<div className="msg-toast">{message}</div>}
            </div>
          </div>
        )}

        {/* TOPICS */}
        {page==='topics'&&(
          <>
            <nav className="bar">
              <div className="bar-in">
                <div className="brand"><span className="brand-star">✦</span>Discourse{isAdmin&&<span className="pill-admin">Admin</span>}</div>
                <div className="bar-r">
                  <div className="uchip"><div className="av">{initials(loggedInUser.username)}</div>{loggedInUser.username}</div>
                  <button className="btn-out" onClick={()=>{setPage('login');setLoggedInUser(null)}}>Logout</button>
                </div>
              </div>
            </nav>
            <div className="wrap">
              <div className="pg-head">
                <div className="pg-title">Explore Topics</div>
                <p className="pg-sub">Join a discussion or spark a new one</p>
              </div>
              <div className="glass-card">
                <div className="card-lbl">New Topic</div>
                <div className="fields">
                  <input className="inp" type="text" placeholder="What's this topic about?" value={topicTitle} onChange={e=>setTopicTitle(e.target.value)}/>
                  <textarea className="ta" style={{height:85}} placeholder="Give it some context…" value={topicDescription} onChange={e=>setTopicDescription(e.target.value)}/>
                  <div><button className="btn-pub" onClick={handleCreateTopic}>Publish Topic <span className="arr">→</span></button></div>
                </div>
              </div>
              <div className="divider">
                <div className="div-line"/><span className="div-txt">{topics.length} Topics</span><div className="div-line"/>
              </div>
              <div className="list">
                {topics.length===0
                  ?<div className="empty"><div className="empty-icon">🌌</div>No topics yet — be the first explorer!</div>
                  :topics.map((t,i)=>(
                    <div key={t.id} className="topic-item" style={{animationDelay:`${i*55}ms`}}>
                      <div className="t-row">
                        <div onClick={()=>loadPosts(t)} style={{flex:1}}>
                          <div className="t-name">{t.title}</div>
                          <div className="t-by"><span className="by-dot"/>by {t.user?.username}</div>
                          <div className="t-desc">{t.description}</div>
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                          {isAdmin&&<button className="btn-del" onClick={()=>handleDeleteTopic(t.id)}>Del</button>}
                          <div className="t-chev" onClick={()=>loadPosts(t)}>›</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* POSTS */}
        {page==='posts'&&(
          <>
            <nav className="bar">
              <div className="bar-in">
                <div className="brand"><span className="brand-star">✦</span>Discourse</div>
                <div className="bar-r">
                  <div className="uchip"><div className="av">{initials(loggedInUser.username)}</div>{loggedInUser.username}</div>
                  <button className="btn-out" onClick={()=>{setPage('login');setLoggedInUser(null)}}>Logout</button>
                </div>
              </div>
            </nav>
            <div className="wrap">
              <button className="btn-back" onClick={()=>{setPage('topics');loadTopics()}}>← Topics</button>
              <div className="pg-head">
                <div className="pg-title">{selectedTopic?.title}</div>
                <p className="pg-sub">{selectedTopic?.description}</p>
              </div>
              <div className="glass-card">
                <div className="card-lbl">Write a Post</div>
                <textarea className="ta" style={{height:100}} placeholder="Share something worth reading…" value={postContent} onChange={e=>setPostContent(e.target.value)}/>
                <button className="btn-pub" onClick={handleCreatePost}>Post Reply <span className="arr">→</span></button>
              </div>
              <div className="divider">
                <div className="div-line"/><span className="div-txt">{posts.length} Posts</span><div className="div-line"/>
              </div>
              <div className="list">
                {posts.length===0
                  ?<div className="empty"><div className="empty-icon">✍️</div>No posts yet. Start the conversation!</div>
                  :posts.map((post,i)=>(
                    <div key={post.id} className="post-item" style={{animationDelay:`${i*55}ms`,marginBottom:12}}>
                      <div className="p-top">
                        <div className="p-who"><div className="p-av">{initials(post.user?.username)}</div>{post.user?.username}</div>
                        {isAdmin&&<button className="btn-del" onClick={()=>handleDeletePost(post.id)}>Delete</button>}
                      </div>
                      <p className="p-body">{post.content}</p>
                      <button className="btn-tog" onClick={()=>loadComments(post.id)}>💬 Comments</button>
                      {comments[post.id]&&(
                        <div className="cmt-list">
                          {comments[post.id].length===0
                            ?<p style={{color:'var(--muted)',fontSize:13}}>No comments yet.</p>
                            :comments[post.id].map(c=>(
                              <div key={c.id} className="cmt">
                                <div><span className="cmt-user">{c.user?.username}</span><span className="cmt-txt">{c.content}</span></div>
                                {isAdmin&&<button className="btn-del" onClick={()=>handleDeleteComment(c.id,post.id)}>Del</button>}
                              </div>
                            ))}
                        </div>
                      )}
                      <div className="cmt-row">
                        <input className="cmt-inp" type="text" placeholder="Add a comment…"
                          value={commentText[post.id]||''}
                          onChange={e=>setCommentText(p=>({...p,[post.id]:e.target.value}))}/>
                        <button className="btn-send" onClick={()=>handleAddComment(post)}>Send ↑</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
