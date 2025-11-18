document.addEventListener('DOMContentLoaded', ()=>{
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', ()=>{
    const shown = nav.style.display === 'flex';
    nav.style.display = shown ? '' : 'flex';
  });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'light') root.style.colorScheme = 'light';
  themeBtn.addEventListener('click', ()=>{
    const cur = getComputedStyle(root).getPropertyValue('color-scheme').trim() || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.style.colorScheme = next;
    localStorage.setItem('theme', next);
    themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        if(nav.style.display === 'flex') nav.style.display = '';
      }
    })
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Filters
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#projects-grid .card').forEach(card=>{
        if(filter === '*' ) card.style.display = '';
        else {
          const tags = card.dataset.tags.split(' ');
          card.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });

  // Project modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const modalClose = document.getElementById('modal-close');
  document.querySelectorAll('[data-project]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const data = JSON.parse(btn.dataset.project);
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalLink.href = data.link || '#';
      modal.setAttribute('aria-hidden','false');
    });
  });
  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Contact form (demo behavior)
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg.textContent = 'Thanks — message received (demo).';
    form.reset();
    setTimeout(()=> msg.textContent = '', 4000);
  });
});
