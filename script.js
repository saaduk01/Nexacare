 /* Cursor */
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    (function loop() {
      rx += (mx-rx)*0.14; ry += (my-ry)*0.14;
      dot.style.cssText = `left:${mx}px;top:${my}px;`;
      ring.style.cssText = `left:${rx}px;top:${ry}px;`;
      requestAnimationFrame(loop);
    })();
    // Enlarge cursor on hover
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='50px'; ring.style.height='50px'; ring.style.borderColor='rgba(46,125,94,0.5)'; });
      el.addEventListener('mouseleave', () => { ring.style.width='32px'; ring.style.height='32px'; ring.style.borderColor='rgba(26,51,83,0.35)'; });
    });

    /* Navbar */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('solid', scrollY > 40);
    }, { passive: true });

    /* Hamburger */
    const ham = document.getElementById('ham');
    const nl = document.getElementById('navLinks');
    ham.addEventListener('click', () => nl.classList.toggle('open'));
    nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open')));

    /* Reveal */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    /* Hide cursor on touch */
    if (matchMedia('(pointer:coarse)').matches) {
      dot.style.display = ring.style.display = 'none';
      document.body.style.cursor = 'auto';
    }