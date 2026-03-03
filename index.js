document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Home Page Loaded");
  
  // Smooth scrolling for anchor links
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

  // Add active state to navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#ff9800';
    }
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Counter animation for stats
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 30);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector('.stat-number');
        const target = parseInt(number.textContent);
        animateCounter(number, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
  });

  // Resume Download Handler - Force download for cross-origin files
  const resumeButton = document.querySelector('.btn.secondary');
  if (resumeButton) {
    resumeButton.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const pdfUrl = 'Deepak_Mote_Resume.pdf';
      const fileName = 'Deepak_Mote_Resume.pdf';
      
      try {
        // Show loading state
        resumeButton.textContent = 'Downloading...';
        resumeButton.style.pointerEvents = 'none';
        
        // Fetch the file
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        
        // Create a download link
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(blobUrl);
        
        // Reset button
        resumeButton.textContent = 'Download Resume';
        resumeButton.style.pointerEvents = 'auto';
      } catch (error) {
        console.error('Download failed:', error);
        // If fetch fails, fallback to opening in new tab
        window.open(pdfUrl, '_blank');
        resumeButton.textContent = 'Download Resume';
        resumeButton.style.pointerEvents = 'auto';
      }
    });
  }


});
