/* ==========================================================
   站点脚本 (所有页面共用)
   1. 暗色/浅色模式: 记住访客的选择 (localStorage)
  2. 首页大图: 若存在 images/index/hero.png 则自动显示
   ========================================================== */

// ---- 1. 主题: 在页面渲染前先读取已保存的选择, 避免闪烁 ----
var root = document.documentElement;
try {
  var saved = localStorage.getItem('theme');          // 'dark' 或 'light'
  if (saved) root.setAttribute('data-theme', saved);
} catch (e) {}                                         // 隐私模式下可能读取失败, 忽略

// 当前生效的主题 (没手动选过时, 跟随系统设置)
function currentTheme() {
  return root.getAttribute('data-theme') ||
         (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

// 页面加载完成后再绑定按钮和首页大图
document.addEventListener('DOMContentLoaded', function () {

  // 导航栏右侧的切换按钮
  var btn = document.getElementById('theme');
  function updateLabel() {
    btn.textContent = currentTheme() === 'dark' ? 'Light' : 'Dark';
  }
  updateLabel();
  btn.onclick = function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateLabel();
  };

  // 首页大图: 图片存在才设置为背景, 不存在就保持深蓝渐变
  var hero = document.getElementById('hero-bg');
  if (hero) {
    var img = new Image();
    img.onload = function () { hero.style.backgroundImage = 'url(images/index/hero.png)'; };
    img.src = 'images/index/hero.png';
  }

    // 页脚: 自动显示页面的最后修改日期 (格式 2026/11/03)
  var stamp = document.getElementById('last-updated');
  if (stamp) {
    var d = new Date(document.lastModified);
    if (!isNaN(d)) {
      stamp.textContent = d.getFullYear() + '/' +
        String(d.getMonth() + 1).padStart(2, '0') + '/' +
        String(d.getDate()).padStart(2, '0');
    }
  }
});


