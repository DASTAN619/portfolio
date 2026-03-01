document.addEventListener("DOMContentLoaded", () => {
  console.log("Skills Page Loaded");

  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          
          // Add a slight delay for staggered animation
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 100);
          
          observer.unobserve(bar);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    });

    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  };

  // Animate soft skill cards on scroll
  const animateSoftSkills = () => {
    const softSkillCards = document.querySelectorAll('.soft-skill-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    softSkillCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  };

  // Animate skill categories on scroll
  const animateCategories = () => {
    const categories = document.querySelectorAll('.skill-category');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    categories.forEach(category => {
      category.style.opacity = '0';
      category.style.transform = 'translateY(20px)';
      category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(category);
    });
  };

  // Add progress percentage animation
  const animatePercentages = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const levelText = entry.target.textContent;
          const targetNumber = parseInt(levelText.split('/')[0]);
          let currentNumber = 0;
          
          const interval = setInterval(() => {
            if (currentNumber >= targetNumber) {
              clearInterval(interval);
            } else {
              currentNumber++;
              entry.target.textContent = `${currentNumber}/10`;
            }
          }, 50);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    skillLevels.forEach(level => {
      observer.observe(level);
    });
  };

  // Highlight active navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#ff9800';
    }
  });

  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize all animations
  animateSkillBars();
  animateSoftSkills();
  animateCategories();
  animatePercentages();

  // Add hover effect enhancement for skill items
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      const bar = this.querySelector('.skill-bar');
      bar.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
    
    item.addEventListener('mouseleave', function() {
      const bar = this.querySelector('.skill-bar');
      bar.style.boxShadow = 'none';
    });
  });

  // Add ripple effect to soft skill cards
  document.querySelectorAll('.soft-skill-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.left = e.clientX - this.getBoundingClientRect().left - 10 + 'px';
      ripple.style.top = e.clientY - this.getBoundingClientRect().top - 10 + 'px';
      ripple.style.animation = 'ripple-effect 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-effect {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  console.log("All skill animations initialized");
});