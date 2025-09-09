<template>
  <div class="stack" :class="dir === 'up' ? 'dir-up' : 'dir-down'">
    <div
      v-for="(c, i) in cards"
      :key="c.id ?? i"
      class="card"
      :class="{ shown: i <= active, active: i === active }"
      :style="styleFor(i)"
    >
      <div class="card-inner">
        <div class="left">
          <div class="step-badge">{{ i + 1 }}</div>
          <h3 class="card-title">{{ c.title }}</h3>
          <p class="card-desc" v-if="c.text">{{ c.text }}</p>
          <ul class="tags" v-if="c.tags?.length">
            <li v-for="tag in c.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
        <div class="right">
          <div class="media-frame">
            <img v-if="c.image" :src="c.image" alt="" />
            <div v-else class="placeholder" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="progress" aria-hidden="true">
      <span v-for="(_, i) in cards" :key="i" :class="{ active: i === active }" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  cards: { type: Array, required: true },
  active: { type: Number, required: true },
  dir:    { type: String, default: 'down' } 
})

const styleFor = (i) => {
  const shown = i <= props.active
  const offsetY = shown ? (props.active - i) * 16 : -12
  const nudgeX = i === props.active ? 'var(--nudge)' : '0px'
  return {
    transform: `translateY(${offsetY}px) translateX(${nudgeX}) rotate(var(--tilt))`,
    opacity: shown ? 1 : 0,
    zIndex: 100 + i
  }
}
</script>

<style scoped>
:host, .stack {
  --bg: #0f1419;
  --surface: #141a21;
  --line: #2a3139;
  --text: #e6e8eb;
  --muted: #a0a7b0;
  --pill: #1c232c;
  --accent: #70e1ff; 
}

.stack {
  position: relative;
  height: min(70vh, 560px);
}

.card {
  position: absolute;
  inset: 0;
  background: var(--surface);
  color: var(--text);
  border-radius: 20px;
  box-shadow:
    0 12px 30px rgba(0,0,0,.35),
    0 0 0 1px var(--line) inset;
  padding: clamp(16px, 2.4vw, 28px);
  opacity: 0;
  transform: translateY(40px);
  transition: transform .45s ease, opacity .35s ease, box-shadow .35s ease, outline-color .35s ease;
  outline: 0 solid transparent;
  will-change: transform, opacity;
  contain: layout paint style;
}

.card.active {
  box-shadow:
    0 18px 60px rgba(0,0,0,.5),
    0 0 0 1px color-mix(in srgb, var(--accent) 40%, var(--line)) inset;
}

.card-inner {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  align-items: center;
  gap: clamp(20px, 4vw, 48px);
  height: 100%;
}

.left { align-self: center; }
.step-badge {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.08));
}
.card-title {
  margin: 0 0 10px;
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  line-height: 1.2;
}
.card-desc {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.6;
  max-width: 60ch;
}

.tags {
  display: flex; flex-wrap: wrap; gap: 10px;
  padding: 0; margin: 0; list-style: none;
}
.tags li {
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--pill);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: .95rem;
  white-space: nowrap;
}

.right { align-self: stretch; }
.media-frame {
  height: 100%;
  min-height: 280px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #0f1419;
  position: relative;
  overflow: hidden;
}
.media-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.placeholder::before,
.placeholder::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 0;
  pointer-events: none;
  background:
    linear-gradient( to bottom right, transparent 49.5%, rgba(255,255,255,.18) 50%, transparent 50.5%),
    linear-gradient( to top right,    transparent 49.5%, rgba(255,255,255,.18) 50%, transparent 50.5%);
}
.placeholder {
  position: absolute; inset: 0;
}

.progress {
  position: absolute;
  bottom: -28px; left: 50%;
  transform: translateX(-50%);
  display: flex; gap: 8px;
}
.progress span {
  width: 8px; height: 8px; border-radius: 999px;
  background: #39404a;
}
.progress span.active {
  background: var(--accent);
  width: 28px;
}

/* Mobile */
@media (max-width: 900px) {
  .card-inner { grid-template-columns: 1fr; gap: 18px; }
  .media-frame { min-height: 200px; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card { transition-duration: .01ms; }
}
</style>
