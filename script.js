const galleryScroll = document.querySelector(".gallery-scroll");
let isScrolling = false;
let currentIndex = 0;
const scrollAmount = 300; // Distance for each slide (can be adjusted)

// Function to move to the next image
function nextSlide() {
  currentIndex++;
  // If the index is out of bounds, reset it to 0 (loop)
  if (currentIndex >= galleryScroll.children.length) {
    currentIndex = 0;
  }
  galleryScroll.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
}

// Detect when the user scrolls to the gallery section
const gallerySection = document.getElementById('gallery');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start the slideshow when the gallery section comes into view
      isScrolling = true;
      setInterval(nextSlide, 3000); // Change slide every 3 seconds
      observer.unobserve(gallerySection); // Stop observing once it's in view
    }
  });
}, { threshold: 0.5 });

observer.observe(gallerySection);

// Function to handle infinite scrolling manually (for looping back to start)
galleryScroll.addEventListener('transitionend', () => {
  const scrollWidth = galleryScroll.scrollWidth;
  const clientWidth = galleryScroll.clientWidth;
  const scrollLeft = galleryScroll.scrollLeft;

  // If the user has reached the end, scroll back to the beginning
  if (scrollLeft + clientWidth >= scrollWidth) {
    galleryScroll.scrollLeft = 0;
  }

  // If the user has scrolled to the start, move to the last image
  if (scrollLeft <= 0) {
    galleryScroll.scrollLeft = scrollWidth - clientWidth;
  }
});




