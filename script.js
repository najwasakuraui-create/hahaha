// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block: 'start'});
  });
});

// Accordion: fakultas
document.querySelectorAll('.accordion-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const item = btn.parentElement;
    const panel = item.querySelector('.accordion-panel');
    const isOpen = panel.style.display === 'block';
    // close others
    document.querySelectorAll('.accordion-panel').forEach(p=> p.style.display='none');
    if(!isOpen){
      panel.style.display = 'block';
      panel.scrollIntoView({behavior:'smooth', block:'nearest'});
    } else {
      panel.style.display = 'none';
    }
  });
});

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
});

// Play / Pause anthem
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('anthemAudio');
let isPlaying = false;

playBtn.addEventListener('click', ()=>{
  if(!isPlaying){
    audio.play().catch(err=>{
      console.warn('audio play blocked', err);
      alert('Audio tidak bisa diputar otomatis — periksa file anthem.mp3 di repo.');
    });
    playBtn.textContent = 'Pause Song';
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = 'Play Song!!';
    isPlaying = false;
  }
});

// Accessibility: stop audio when navigating away
window.addEventListener('pagehide', ()=> { if(!audio.paused) audio.pause(); });

// Optional: populate faculty data dynamically (example, can extend)
const extraFaculties = [
  {
    name: 'Fakultas Ekonomi dan Bisnis',
    desc: 'Fokus pada ekonomi, manajemen, dan akuntansi.',
    progs: ['Ekonomi Pembangunan S1','Manajemen S1','Akuntansi S1']
  },
  {
    name: 'Fakultas Kedokteran',
    desc: 'Pendidikan kedokteran untuk membentuk tenaga medis profesional.',
    progs: ['Pendidikan Dokter S1']
  }
];

const facultyList = document.getElementById('facultyList');
extraFaculties.forEach(f=>{
  const item = document.createElement('div');
  item.className = 'accordion-item';
  item.innerHTML = `
    <button class="accordion-btn">${f.name}</button>
    <div class="accordion-panel">
      <p class="faculty-desc">${f.desc}</p>
      <ul class="program-list">${f.progs.map(p=>`<li>${p}</li>`).join('')}</ul>
    </div>
  `;
  facultyList.appendChild(item);
});
// Re-bind new buttons
document.querySelectorAll('.accordion-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const panel = btn.parentElement.querySelector('.accordion-panel');
    const isOpen = panel.style.display === 'block';
    document.querySelectorAll('.accordion-panel').forEach(p=> p.style.display='none');
    panel.style.display = isOpen ? 'none' : 'block';
  });
});
