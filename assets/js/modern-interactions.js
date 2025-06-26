/**
 * Modern Interactions for Enhanced UI
 * Adds smooth animations and interactive effects
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initModernInteractions();
  });

  function initModernInteractions() {
    // Add smooth reveal animations to page content
    addRevealAnimations();
    
    // Add enhanced hover effects to cards
    addCardHoverEffects();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add loading animations
    addLoadingAnimations();
  }

  function addRevealAnimations() {
    // Add reveal animation to main content
    const pageInnerWrap = document.querySelector('.page__inner-wrap');
    if (pageInnerWrap) {
      // Add a small delay to ensure styles are loaded
      setTimeout(() => {
        pageInnerWrap.classList.add('is-visible');
      }, 100);
    }

    // Stagger animations for list items
    const portfolioItems = document.querySelectorAll('.archive__item');
    portfolioItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 200 + (index * 100));
    });
  }

  function addCardHoverEffects() {
    // Add hover effects to archive items (portfolio, publications, etc.)
    const archiveItems = document.querySelectorAll('.archive__item');
    archiveItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  function addSmoothScrolling() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  function addLoadingAnimations() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        img.addEventListener('load', function() {
          this.style.opacity = '1';
          this.style.transform = 'scale(1)';
        });
      }
    });
  }

  // Add intersection observer for scroll-triggered animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.addEventListener('DOMContentLoaded', () => {
      const elementsToAnimate = document.querySelectorAll('.page__content h2, .page__content h3, .archive__item');
      elementsToAnimate.forEach(el => {
        observer.observe(el);
      });
    });
  }

})();
