document.addEventListener("DOMContentLoaded", () => {
  console.log("Projects Page Loaded");

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
        } else {
          const categories = card.getAttribute('data-category');
          
          if (categories && categories.includes(filterValue)) {
            card.classList.remove('hidden');
            card.classList.add('fade-in');
          } else {
            card.classList.add('hidden');
            card.classList.remove('fade-in');
          }
        }
      });

      // Scroll to first visible project smoothly
      setTimeout(() => {
        const firstVisible = document.querySelector('.project-card:not(.hidden)');
        if (firstVisible) {
          firstVisible.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }
      }, 100);
    });
  });

  // Animate project cards on scroll
  const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  };

  // Count and display project statistics
  const displayStats = () => {
    const totalProjects = projectCards.length;
    const chatbotProjects = document.querySelectorAll('[data-category*="chatbot"]').length;
    const webappProjects = document.querySelectorAll('[data-category*="webapp"]').length;
    const automationProjects = document.querySelectorAll('[data-category*="automation"]').length;

    console.log(`Total Projects: ${totalProjects}`);
    console.log(`Chatbot Projects: ${chatbotProjects}`);
    console.log(`Web App Projects: ${webappProjects}`);
    console.log(`Automation Projects: ${automationProjects}`);
  };

  // Add hover effect for tech badges
  const addBadgeHoverEffects = () => {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
      badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
      });
      
      badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  };

  // Add click effect to project cards
  const addCardClickEffect = () => {
    projectCards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking on a link or button
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          return;
        }

        // Add a subtle scale effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'translateY(-10px)';
        }, 100);
      });
    });
  };

  // Highlight featured projects
  const highlightFeatured = () => {
    const featuredCards = document.querySelectorAll('.project-card.featured');
    
    featuredCards.forEach(card => {
      // Add a subtle pulsing effect to featured projects
      setInterval(() => {
        card.style.boxShadow = '0 15px 40px rgba(255, 152, 0, 0.3)';
        setTimeout(() => {
          card.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.25)';
        }, 1000);
      }, 3000);
    });
  };

  // Search functionality (bonus feature)
  const addSearchFunctionality = () => {
    // Check if there's a search input (you can add this to HTML if needed)
    const searchInput = document.querySelector('#project-search');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        projectCards.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const content = card.querySelector('.project-content').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    }
  };

  // Smooth scroll for anchor links
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

  // Highlight active navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#ff9800';
    }
  });

  // Add loading animation for images (if you add project images later)
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // Add keyboard navigation for filters
  const addKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key) - 1;
        const buttons = document.querySelectorAll('.filter-btn');
        if (buttons[index]) {
          buttons[index].click();
        }
      }
    });
  };

  // Track project view analytics (for future integration)
  const trackProjectViews = () => {
    projectCards.forEach(card => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const projectName = card.querySelector('h3').textContent;
            console.log(`Project viewed: ${projectName}`);
            // Here you can add analytics tracking code
            observer.unobserve(card);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(card);
    });
  };

  // Initialize all functionality
  animateOnScroll();
  displayStats();
  addBadgeHoverEffects();
  addCardClickEffect();
  highlightFeatured();
  addSearchFunctionality();
  lazyLoadImages();
  addKeyboardNavigation();
  trackProjectViews();

  // Add a count badge to filter buttons
  const updateFilterCounts = () => {
    filterButtons.forEach(button => {
      const filter = button.getAttribute('data-filter');
      let count = 0;

      if (filter === 'all') {
        count = projectCards.length;
      } else {
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category');
          if (categories && categories.includes(filter)) {
            count++;
          }
        });
      }

      // Add count badge (you can uncomment this if you want counts displayed)
      // button.innerHTML = `${button.textContent} <span class="count-badge">(${count})</span>`;
    });
  };

  updateFilterCounts();

  updateFilterCounts();

  // Resume Download Handler for Projects Page
  const projectsResumeBtn = document.querySelector('#projects-resume-btn');
  if (projectsResumeBtn) {
    projectsResumeBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const pdfUrl = 'https://awsprojectpc11052025.s3.us-east-1.amazonaws.com/DeepakResumeFiles/DeepakMote_TechnicalBusinessAnalyst_CV.docx.pdf';
      const fileName = 'DeepakMote_TechnicalBusinessAnalyst_CV.pdf';
      
      try {
        // Show loading state
        projectsResumeBtn.textContent = 'Downloading...';
        projectsResumeBtn.style.pointerEvents = 'none';
        
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
        projectsResumeBtn.textContent = 'Download Resume';
        projectsResumeBtn.style.pointerEvents = 'auto';
      } catch (error) {
        console.error('Download failed:', error);
        // If fetch fails, fallback to opening in new tab
        window.open(pdfUrl, '_blank');
        projectsResumeBtn.textContent = 'Download Resume';
        projectsResumeBtn.style.pointerEvents = 'auto';
      }
    });
  }

  console.log("All project features initialized successfully!");
});