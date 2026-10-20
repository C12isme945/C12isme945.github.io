document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menuBtn = document.querySelector('.nav-menu');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealables.forEach((el) => observer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('visible'));
  }

  const chips = document.querySelectorAll('.filters .chip');
  if (chips.length) {
    const cards = document.querySelectorAll('[data-category]');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        cards.forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('fade-hidden', !match);
        });
      });
    });
  }
});
