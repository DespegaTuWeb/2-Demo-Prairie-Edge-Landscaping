/* Prairie Edge Landscaping Interactive Elements */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. BEFORE/AFTER IMAGE COMPARE SLIDER
  // ==========================================
  const slider = document.getElementById('yard-slider');
  const afterImage = document.getElementById('after-image');
  const handle = document.getElementById('slider-handle');

  if (slider && afterImage && handle) {
    let isResizing = false;

    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const position = clientX - rect.left;
      let percentage = (position / rect.width) * 100;

      // Restrict percentage bounds
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      // Update positions
      afterImage.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    // Touch events for mobile responsiveness
    const onStart = () => { isResizing = true; };
    const onEnd = () => { isResizing = false; };
    const onMove = (e) => {
      if (!isResizing) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    };

    handle.addEventListener('mousedown', onStart);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('mousemove', onMove);

    handle.addEventListener('touchstart', onStart);
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchmove', onMove);

    // Initial position trigger to split 50/50 on load
    afterImage.style.width = '50%';
    handle.style.left = '50%';
  }

  // ==========================================
  // 2. TESTIMONIAL ROTATOR
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-item');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  const slideCount = slides.length;

  if (slideCount > 1) {
    const showTestimonial = (index) => {
      // Loop slide indices
      if (index >= slideCount) currentSlide = 0;
      else if (index < 0) currentSlide = slideCount - 1;
      else currentSlide = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        resetAutoPlay();
      });
    });

    // Auto rotate every 6 seconds
    let autoPlayTimer = setInterval(() => {
      showTestimonial(currentSlide + 1);
    }, 6000);

    const resetAutoPlay = () => {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        showTestimonial(currentSlide + 1);
      }, 6000);
    };
  }

  // ==========================================
  // 3. CONTACT FORM SUBMISSION
  // ==========================================
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        btn.disabled = false;
        btn.textContent = originalText;
      }, 1000);
    });
  }
});
