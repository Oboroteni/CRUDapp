<template>
  <div id="app">
    <header>
      <router-link :to="{ name: 'posts' }"><strong>Posts</strong></router-link>
    </header>
    <main><router-view :key="$route.fullPath" /></main>
    <ToastList />
  </div>
</template>

<script>
import ToastList from '@/components/ToastList.vue'
export default { name: 'App', components: { ToastList } }
</script>

<style>
:root { --bg:#f6f7f9; --card:#fff; --text:#1f2937; --muted:#6b7280; --primary:#2563eb; --danger:#dc2626; --border:#e5e7eb; }
* { box-sizing: border-box; }
body { margin:0; font-family: system-ui, sans-serif; background:var(--bg); color:var(--text); }
a { color: var(--primary); text-decoration: none; }
header { background:var(--card); border-bottom:1px solid var(--border); padding:14px 24px; }
main { max-width:760px; margin:24px auto; padding:0 16px; }
.card { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:16px; margin:12px 0; }
.card h3 { margin:0 0 6px; }
.row { display:flex; gap:8px; align-items:center; margin:12px 0; }
.between { justify-content:space-between; }
.muted { color:var(--muted); }
.btn { display:inline-block; padding:8px 14px; border:1px solid var(--border); border-radius:6px; background:var(--card); color:var(--text); cursor:pointer; font-size:14px; }
.btn:disabled { opacity:.5; cursor:not-allowed; }
.btn.primary { background:var(--primary); border-color:var(--primary); color:#fff; }
.btn.danger { background:var(--danger); border-color:var(--danger); color:#fff; }
.search, .form input, .form textarea { width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:6px; font:inherit; }
.search { max-width:320px; }
.form label { display:block; margin-bottom:14px; font-weight:600; }
.form input, .form textarea { margin-top:6px; font-weight:400; }
.invalid { border-color:var(--danger) !important; }
.error-text { color:var(--danger); font-weight:400; }
.error { background:#fef2f2; color:var(--danger); padding:12px; border-radius:6px; margin:12px 0; }
.overlay { position:fixed; inset:0; background:rgba(0,0,0,.4); display:flex; align-items:center; justify-content:center; }
.modal { background:var(--card); padding:20px; border-radius:8px; width:360px; max-width:90%; }
.toasts { position:fixed; right:16px; bottom:16px; display:flex; flex-direction:column; gap:8px; }
.toast { padding:10px 14px; border-radius:6px; color:#fff; background:#16a34a; }
.toast.error { background:var(--danger); }
</style>
