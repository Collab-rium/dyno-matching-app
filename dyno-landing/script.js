// Minimal interaction script after removing pro-rebuild features.
document.addEventListener('DOMContentLoaded', function(){
  // Simple header shrink
  const header = document.getElementById('site-header');
  if(header){
    const onScroll = () => { if(window.scrollY>30) header.classList.add('scrolled'); else header.classList.remove('scrolled'); };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Lightweight smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href'); const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
});
