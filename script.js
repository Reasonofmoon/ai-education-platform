// Show Consultation Form
function showConsultationForm() {
  document.getElementById('consultationForm').classList.remove('hidden');
}

// Close Consultation Form
function closeConsultationForm() {
  document.getElementById('consultationForm').classList.add('hidden');
}

// Handle Form Submission
function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Form validation (simple example)
  if (!name || !email || !message) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  // Simulate form submission (e.g., to a backend API)
  console.log('Form submitted:', { name, email, message });

  // Show success message
  alert('문의가 성공적으로 제출되었습니다. 곧 연락드리겠습니다!');

  // Reset form
  document.getElementById('consultationSubmit').reset();

  // Close form
  closeConsultationForm();
}

// Add smooth scroll behavior for internal links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add hover effect for cards (optional)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  });
});

// Add animation for CTA button (optional)
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseenter', () => {
  ctaButton.style.transform = 'scale(1.05)';
});
ctaButton.addEventListener('mouseleave', () => {
  ctaButton.style.transform = 'scale(1)';
});

// Close form when clicking outside (optional)
document.getElementById('consultationForm').addEventListener('click', (e) => {
  if (e.target === document.getElementById('consultationForm')) {
    closeConsultationForm();
  }
});

// 애니메이션 컨트롤러
class AnimationController {
  constructor() {
    this.animationQueue = [];
    this.isAnimating = false;
  }

  addToQueue(element, animationClass, delay = 0) {
    this.animationQueue.push({ element, animationClass, delay });
    if (!this.isAnimating) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.isAnimating = true;
    while (this.animationQueue.length > 0) {
      const { element, animationClass, delay } = this.animationQueue.shift();
      await this.animate(element, animationClass, delay);
    }
    this.isAnimating = false;
  }

  animate(element, animationClass, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        element.classList.add(animationClass);
        element.addEventListener('animationend', () => resolve(), { once: true });
      }, delay);
    });
  }
}

// 코드 하이라이팅 효과
class CodeHighlighter {
  constructor(codeBlocks) {
    this.codeBlocks = codeBlocks;
    this.init();
  }

  init() {
    this.codeBlocks.forEach(block => {
      this.highlightSyntax(block);
      this.addLineNumbers(block);
    });
  }

  highlightSyntax(block) {
    const code = block.textContent;
    // 간단한 구문 강조 로직
    const highlighted = code
      .replace(/const|let|var/g, '<span class="keyword">$&</span>')
      .replace(/function/g, '<span class="function">$&</span>')
      .replace(/"[^"]*"/g, '<span class="string">$&</span>');
    block.innerHTML = highlighted;
  }

  addLineNumbers(block) {
    const lines = block.innerHTML.split('\n');
    block.innerHTML = lines
      .map((line, i) => `<span class="line-number">${i + 1}</span>${line}`)
      .join('\n');
  }
}

// UI 인터랙션 매니저
class UIManager {
  constructor() {
    this.animationController = new AnimationController();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // 스크롤 기반 애니메이션
    this.initScrollAnimations();
    
    // 폼 제출 핸들링
    const form = document.getElementById('consultationSubmit');
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    // 카드 호버 효과
    this.initCardHoverEffects();
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animationController.addToQueue(
              entry.target,
              'fade-in',
              entry.target.dataset.delay || 0
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.card, .section-title, .phase')
      .forEach(el => observer.observe(el));
  }

  // ... existing functions ...
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UIManager();
  const codeHighlighter = new CodeHighlighter(
    document.querySelectorAll('.code-block')
  );
});