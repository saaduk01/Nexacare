(function(){
      /* ── Cursor (only on non-touch) ── */
      var cd=document.getElementById('cd'),cr=document.getElementById('cr');
      if(window.matchMedia('(pointer:fine)').matches){
        var mx=0,my=0,rx=0,ry=0;
        document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY},{passive:true});
        (function loop(){
          rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
          cd.style.cssText='left:'+mx+'px;top:'+my+'px;';
          cr.style.cssText='left:'+rx+'px;top:'+ry+'px;';
          requestAnimationFrame(loop);
        })();
        document.querySelectorAll('a,button').forEach(function(el){
          el.addEventListener('mouseenter',function(){cr.style.width='48px';cr.style.height='48px';cr.style.borderColor='rgba(255,255,255,1)';},{passive:true});
          el.addEventListener('mouseleave',function(){cr.style.width='32px';cr.style.height='32px';cr.style.borderColor='rgba(255,255,255,.7)';},{passive:true});
        });
      } else {
        cd.style.display=cr.style.display='none';
        document.body.style.cursor='auto';
      }

      /* ── Navbar scroll ── */
      var nav=document.getElementById('nav');
      window.addEventListener('scroll',function(){
        nav.classList.toggle('solid',window.scrollY>36);
      },{passive:true});

      /* ── Hamburger / mobile menu ── */
      var hamBtn=document.getElementById('hamBtn');
      var mobMenu=document.getElementById('mobMenu');
      hamBtn.addEventListener('click',function(){
        var open=mobMenu.classList.toggle('open');
        hamBtn.classList.toggle('open',open);
        hamBtn.setAttribute('aria-expanded',open);
        document.body.style.overflow=open?'hidden':'';
      });
      mobMenu.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click',function(){
          mobMenu.classList.remove('open');
          hamBtn.classList.remove('open');
          hamBtn.setAttribute('aria-expanded','false');
          document.body.style.overflow='';
        });
      });

      /* ── Scroll reveal ── */
      var revEls=document.querySelectorAll('.rv');
      if('IntersectionObserver' in window){
        var obs=new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}
          });
        },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
        revEls.forEach(function(el){obs.observe(el);});
      } else {
        revEls.forEach(function(el){el.classList.add('in');});
      }
    })();