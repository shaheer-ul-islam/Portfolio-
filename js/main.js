/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters with enhanced interactions
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    const container = isotopeItem.querySelector('.isotope-container');
    
    let initIsotope;
    imagesLoaded(container, function() {
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
        transitionDuration: '0.6s',
        stagger: 30,
        hiddenStyle: {
          opacity: 0,
          transform: 'scale(0.8)'
        },
        visibleStyle: {
          opacity: 1,
          transform: 'scale(1)'
        }
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters, index) {
      // Add keyboard navigation
      filters.setAttribute('tabindex', '0');
      filters.setAttribute('role', 'button');
      filters.setAttribute('aria-label', `Filter by ${filters.textContent.trim()}`);
      
      // Keyboard support
      filters.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const allFilters = Array.from(isotopeItem.querySelectorAll('.isotope-filters li'));
          const currentIndex = allFilters.indexOf(this);
          let nextIndex;
          
          if (e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % allFilters.length;
          } else {
            nextIndex = (currentIndex - 1 + allFilters.length) % allFilters.length;
          }
          
          allFilters[nextIndex].focus();
        }
      });
      
      filters.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Don't do anything if already active
        if (this.classList.contains('filter-active')) {
          return;
        }

        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);

        // Remove active class from all filters
        isotopeItem.querySelectorAll('.isotope-filters .filter-active').forEach(activeFilter => {
          activeFilter.classList.remove('filter-active');
        });
        
        // Add active class to clicked filter
        this.classList.add('filter-active');

        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Add filtering class to container
        container.classList.add('filtering');
        
        // Animate items out
        const allItems = container.querySelectorAll('.isotope-item');
        allItems.forEach(item => {
          if (!item.matches(filterValue) && filterValue !== '*') {
            item.classList.add('filtering-out');
          } else if (filterValue === '*') {
            // Show all items
            item.classList.remove('filtering-out');
            item.classList.add('filtering-in');
          }
        });

            // Arrange isotope after a short delay
        setTimeout(() => {
          if (initIsotope) {
            initIsotope.arrange({
              filter: filterValue
            });
            
            // Animate items in
            setTimeout(() => {
              const visibleItems = container.querySelectorAll('.isotope-item:not(.isotope-item-hidden)');
              visibleItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                  item.classList.add('filtering-in');
                  item.style.opacity = '1';
                  item.style.transform = 'scale(1) translateY(0)';
                }, index * 50);
              });
              
              container.classList.remove('filtering');
              
              // Remove filtering classes
              allItems.forEach(item => {
                item.classList.remove('filtering-out', 'filtering-in');
              });
            }, 100);
          }
        }, 200);

        // Reinitialize AOS if available
        if (typeof aosInit === 'function') {
          setTimeout(() => {
            aosInit();
          }, 800);
        }
      }, false);
    });
  });

  /**
   * Enhanced Portfolio Item Interactions
   */
  document.querySelectorAll('.portfolio-item').forEach(function(item, index) {
    // Add counter badge
    const counter = document.createElement('div');
    counter.className = 'portfolio-item-counter';
    counter.textContent = (index + 1).toString().padStart(2, '0');
    item.appendChild(counter);

    // Add tooltip
    const title = item.querySelector('.portfolio-info h4');
    if (title) {
      const tooltip = document.createElement('div');
      tooltip.className = 'portfolio-item-tooltip';
      tooltip.textContent = title.textContent;
      item.appendChild(tooltip);
    }

    // Add parallax effect on mouse move
    item.addEventListener('mousemove', function(e) {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      const image = item.querySelector('.portfolio-image');
      if (image) {
        image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
      }

      // Move counter badge slightly
      counter.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    });

    item.addEventListener('mouseleave', function() {
      const image = item.querySelector('.portfolio-image');
      if (image) {
        image.style.transform = 'scale(1.1) translate(0, 0)';
      }
      counter.style.transform = 'translate(0, 0)';
    });

    // Add click ripple effect
    item.addEventListener('click', function(e) {
      if (e.target.closest('.preview-link') || e.target.closest('.details-link')) {
        return;
      }
      
      const ripple = document.createElement('span');
      const rect = item.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      item.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Add keyboard navigation support
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const detailsLink = item.querySelector('.details-link');
        if (detailsLink) {
          detailsLink.click();
        }
      }
    });

    // Add focus styles
    item.addEventListener('focus', function() {
      item.style.outline = '2px solid var(--accent-color)';
      item.style.outlineOffset = '4px';
    });

    item.addEventListener('blur', function() {
      item.style.outline = 'none';
    });
  });

  /**
   * Animate portfolio items on scroll
   */
  const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animated');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.portfolio-item').forEach(item => {
    portfolioObserver.observe(item);
  });

  /**
   * Enhanced filter button interactions
   */
  document.querySelectorAll('.portfolio-filters li').forEach(filter => {
    // Add hover sound effect (visual feedback)
    filter.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });

    // Add active state animation
    filter.addEventListener('click', function() {
      // Create click effect
      const icon = this.querySelector('.filter-icon');
      if (icon) {
        icon.style.transform = 'scale(1.4) rotate(360deg)';
        setTimeout(() => {
          icon.style.transform = '';
        }, 400);
      }
    });
  });

  /**
   * Add hover sound effect (optional - can be removed if not needed)
   */
  document.querySelectorAll('.portfolio-item').forEach(item => {
    let hoverTimeout;
    item.addEventListener('mouseenter', function() {
      hoverTimeout = setTimeout(() => {
        // Visual feedback only - no sound
        item.style.transition = 'all 0.3s ease';
      }, 50);
    });

    item.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimeout);
    });
  });

  /**
   * Add smooth scroll to portfolio section
   */
  document.querySelectorAll('a[href="#portfolio"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const portfolioSection = document.querySelector('#portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Enhanced Service Cards Interactions
   */
  document.querySelectorAll('.service-item').forEach(function(serviceItem, index) {
    // Add parallax effect on mouse move
    serviceItem.addEventListener('mousemove', function(e) {
      const rect = serviceItem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      
      const iconWrapper = serviceItem.querySelector('.service-icon-wrapper');
      if (iconWrapper) {
        iconWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });

    serviceItem.addEventListener('mouseleave', function() {
      const iconWrapper = serviceItem.querySelector('.service-icon-wrapper');
      if (iconWrapper) {
        iconWrapper.style.transform = 'translate(0, 0)';
      }
    });

    // Add click ripple effect
    serviceItem.addEventListener('click', function(e) {
      if (e.target.closest('.stretched-link')) {
        return;
      }
      
      const ripple = document.createElement('span');
      const rect = serviceItem.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(5, 99, 187, 0.2)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'serviceRipple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '10';
      ripple.classList.add('service-item-ripple');
      
      serviceItem.style.position = 'relative';
      serviceItem.style.overflow = 'hidden';
      serviceItem.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Add keyboard navigation
    serviceItem.setAttribute('tabindex', '0');
    serviceItem.setAttribute('role', 'button');
    
    serviceItem.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = serviceItem.querySelector('.stretched-link');
        if (link) {
          link.click();
        }
      }
    });

    // Add focus styles
    serviceItem.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--accent-color)';
      this.style.outlineOffset = '4px';
    });

    serviceItem.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });

  /**
   * Animate service items on scroll
   */
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animated');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.service-item').forEach(item => {
    serviceObserver.observe(item);
  });

  /**
   * Add smooth scroll to services section
   */
  document.querySelectorAll('a[href="#services"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const servicesSection = document.querySelector('#services');
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();