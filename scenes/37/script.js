// Eastern Upside-Down Island — small client-side tweaks
(function(){
  const flipBtn = document.getElementById('flip-btn');
  const hcBtn   = document.getElementById('hc-btn');

  let flipped = true; // start flipped
  document.body.style.transform = 'rotate(180deg)';
  document.body.style.transition = 'transform 300ms ease';
  flipBtn.textContent = 'Unflip World';

  // Set initial link transform fix
  document.querySelectorAll('.exit.flip').forEach(a => {
    a.style.transform = 'scaleX(-1)';
  });

  flipBtn?.addEventListener('click', () => {
    flipped = !flipped;
    if(flipped){
      document.body.style.transform = 'rotate(180deg)';
      flipBtn.textContent = 'Unflip World';
      document.querySelectorAll('.exit.flip').forEach(a => {
        a.style.transform = 'scaleX(-1)';
      });
    } else {
      document.body.style.transform = 'none';
      flipBtn.textContent = 'Flip World';
      document.querySelectorAll('.exit.flip').forEach(a => {
        a.style.transform = 'none';
      });
    }
  });

  hcBtn?.addEventListener('click', () => {
    const on = document.body.classList.toggle('hc');
    hcBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
})();
