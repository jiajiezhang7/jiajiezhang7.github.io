/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
  // These should be the same as the settings in _variables.scss
  scssLarge = 925; // pixels

  // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  
  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function() {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });    

  // init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({offset: -65});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

});

/* ==========================================================================
   MODERN JAVASCRIPT ENHANCEMENTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  /* Modern Navigation Enhancements */
  const masthead = document.querySelector('.masthead');
  const navLinks = document.querySelectorAll('.masthead__menu-item a');
  
  // Enhanced scroll effect for navigation
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for backdrop blur effect
    if (scrollTop > 50) {
      masthead.classList.add('scrolled');
    } else {
      masthead.classList.remove('scrolled');
    }
    
    // Auto-hide navigation on scroll down (mobile)
    if (window.innerWidth <= 768) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        masthead.style.transform = 'translateY(-100%)';
      } else {
        masthead.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = scrollTop;
  });

  // Active navigation highlighting
  function updateActiveNav() {
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      link.classList.remove('current');
      if (link.getAttribute('href') === currentPath || 
          (currentPath === '/' && link.getAttribute('href') === '/')) {
        link.classList.add('current');
      }
    });
  }
  
  updateActiveNav();

  /* Scroll to Top Button */
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* Enhanced Image Loading with Lazy Loading */
  const images = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transform = 'scale(0.95)';
          img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          
          // Fade in effect
          setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
          }, 100);
          
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  /* Smooth Reveal Animations for Content */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  // Add reveal animation to various elements
  const revealElements = document.querySelectorAll('h1, h2, h3, p, .author__urls li, .page__content img');
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.classList.add('reveal-element');
    revealObserver.observe(el);
  });
  
  // CSS for revealed state
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-element.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(revealStyle);

  /* Enhanced Author Profile Hover Effects */
  const authorAvatar = document.querySelector('.author__avatar img');
  if (authorAvatar) {
    authorAvatar.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    authorAvatar.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  /* Dynamic Social Links Enhancement */
  const socialLinks = document.querySelectorAll('.author__urls a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  /* Enhanced Mobile Menu */
  const mobileMenuBtn = document.querySelector('.greedy-nav button');
  const hiddenLinks = document.querySelector('.hidden-links');
  
  if (mobileMenuBtn && hiddenLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('close');
      hiddenLinks.classList.toggle('hidden');
      
      // Add backdrop
      if (!hiddenLinks.classList.contains('hidden')) {
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        backdrop.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 15;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        document.body.appendChild(backdrop);
        
        setTimeout(() => backdrop.style.opacity = '1', 10);
        
        backdrop.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('close');
          hiddenLinks.classList.add('hidden');
          backdrop.remove();
        });
      } else {
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        if (backdrop) backdrop.remove();
      }
    });
  }

  /* Publication Cards Enhancement */
  const publicationCards = document.querySelectorAll('.publication-item');
  publicationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });

  /* Enhanced Code Block Features */
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(block => {
    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.className = 'copy-code-btn';
    copyBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      padding: 0.5rem;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    block.style.position = 'relative';
    block.appendChild(copyBtn);
    
    block.addEventListener('mouseenter', () => copyBtn.style.opacity = '1');
    block.addEventListener('mouseleave', () => copyBtn.style.opacity = '0');
    
    copyBtn.addEventListener('click', () => {
      const code = block.querySelector('code') || block;
      navigator.clipboard.writeText(code.textContent).then(() => {
        copyBtn.innerHTML = '✅ Copied!';
        setTimeout(() => copyBtn.innerHTML = '📋 Copy', 2000);
      });
    });
  });

  /* Enhanced Link Hover Effects */
  const contentLinks = document.querySelectorAll('.page__content a');
  contentLinks.forEach(link => {
    if (!link.querySelector('img')) { // Skip image links
      link.addEventListener('mouseenter', function() {
        this.style.textDecoration = 'none';
        this.style.borderBottomWidth = '3px';
        this.style.borderBottomStyle = 'solid';
        this.style.paddingBottom = '2px';
      });
    }
  });

  /* Typing Animation for Main Title */
  const mainTitle = document.querySelector('.page__title');
  if (mainTitle && window.location.pathname === '/') {
    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    mainTitle.style.borderRight = '2px solid #2563eb';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        mainTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          mainTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  /* Performance Optimization */
  let ticking = false;
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateAnimations);
      ticking = true;
    }
  }
  
  function updateAnimations() {
    // Batch DOM updates here
    ticking = false;
  }

  /* Accessibility Enhancements */
  
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #2563eb;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 9999;
    transition: top 0.3s ease;
  `;
  
  skipLink.addEventListener('focus', function() {
    this.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Keyboard navigation improvements
  document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
      const closeBtn = document.querySelector('.greedy-nav button.close');
      const backdrop = document.querySelector('.mobile-menu-backdrop');
      if (closeBtn) {
        closeBtn.classList.remove('close');
        hiddenLinks.classList.add('hidden');
        if (backdrop) backdrop.remove();
      }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
  });

  /* Error Handling for Images */
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.background = 'linear-gradient(45deg, #f3f4f6, #e5e7eb)';
      this.style.display = 'flex';
      this.style.alignItems = 'center';
      this.style.justifyContent = 'center';
      this.style.minHeight = '200px';
      this.alt = 'Image could not be loaded';
    });
  });

  console.log('✨ Modern enhancements loaded successfully!');
});

/* Utility Functions */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
