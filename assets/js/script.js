// 粒子系统配置
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#412868', '#b094c4', '#6b46c1', '#a855f7']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 3,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#b094c4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 导航栏交互增强
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setupActiveLinks();
    }

    bindEvents() {
        // 移动端菜单切换
        this.navToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // 导航链接点击
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });

        // 滚动事件
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');

        // 动画效果
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');

        const spans = this.navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const targetSection = document.querySelector(href);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // 关闭移动端菜单
        this.closeMobileMenu();
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;

        // 导航栏背景变化
        if (scrollTop > 50) {
            this.navbar.style.background = 'rgba(15, 6, 25, 0.98)';
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            this.navbar.style.background = 'rgba(15, 6, 25, 0.95)';
            this.navbar.style.backdropFilter = 'blur(15px)';
        }

        // 高亮当前section
        this.highlightCurrentSection();
    }

    setupActiveLinks() {
        // 初始化时设置首页为激活状态
        this.navLinks[0].classList.add('active');
    }

    highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollTop = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// 增强型滚动动画
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createObserver();
        this.setupAnimatedElements();
        this.setupCounterAnimations();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // 特殊动画处理
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, this.observerOptions);
    }

    setupAnimatedElements() {
        const animatedElements = document.querySelectorAll(`
            .mission-card,
            .service-card,
            .value-card,
            .pillar,
            .contact-item,
            .section-header,
            .partner-logo,
            .industry-item,
            .team-member
        `);

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
            this.observer.observe(el);
        });

        // 特殊动画元素
        const specialElements = document.querySelectorAll('.hero-text, .hero-visual');
        specialElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 1s ease-out 0.3s';

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 500);
        });
    }

    setupCounterAnimations() {
        // 为数字计数器添加动画（如果有的话）
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.classList.add('counter');
            this.observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// 企业级表单处理
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.submitBtn = document.querySelector('.btn-submit');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });

            // 实时验证
            this.setupRealTimeValidation();
        }
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // 移除之前的错误状态
        this.clearFieldError(field);

        // 必填验证
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // 邮箱验证
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // 显示错误
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';

        let errorEl = field.parentNode.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 5px;
                animation: fadeIn 0.3s ease;
            `;
            field.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';

        const errorEl = field.parentNode.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // 验证所有字段
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            this.showMessage('Please correct the errors above', 'error');
        }
    }

    async submitForm() {
        // 显示加载状态
        this.setSubmitLoading(true);

        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 获取表单数据
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            this.showMessage('Thank you! Your assessment request has been submitted successfully. We will contact you within 24 hours.', 'success');
            this.form.reset();

            // 清除所有错误状态
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => this.clearFieldError(input));

        } catch (error) {
            console.error('Submission error:', error);
            this.showMessage('There was an error submitting your request. Please try again later.', 'error');
        } finally {
            this.setSubmitLoading(false);
        }
    }

    setSubmitLoading(loading) {
        const btnText = this.submitBtn.querySelector('span');

        if (loading) {
            this.submitBtn.disabled = true;
            btnText.textContent = 'Submitting...';
            this.submitBtn.style.opacity = '0.7';
        } else {
            this.submitBtn.disabled = false;
            btnText.textContent = 'Schedule Assessment';
            this.submitBtn.style.opacity = '1';
        }
    }

    showMessage(message, type) {
        // 移除现有消息
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            ${type === 'success' ?
                'background: linear-gradient(135deg, #10b981, #059669);' :
                'background: linear-gradient(135deg, #ef4444, #dc2626);'
            }
        `;

        document.body.appendChild(messageEl);

        // 显示动画
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);

        // 自动移除
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 5000);
    }
}

// 性能优化类
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
        this.setupPreloadHints();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    optimizeAnimations() {
        // 减少非活跃标签页的动画
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('[style*="animation"]');
            animations.forEach(el => {
                if (document.hidden) {
                    el.style.animationPlayState = 'paused';
                } else {
                    el.style.animationPlayState = 'running';
                }
            });
        });

        // 根据设备性能调整动画
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }
    }

    setupPreloadHints() {
        // 预加载关键资源
        const criticalImages = [
            // 在这里添加关键图片路径
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// 主题管理器
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        this.loadThemePreference();
        this.setupThemeToggle();
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme(savedTheme);
        }
    }

    setupThemeToggle() {
        // 可选：添加主题切换按钮
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--gradient-primary);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-glow);
            display: none; /* 默认隐藏，可根据需要启用 */
        `;

        toggleBtn.addEventListener('click', () => {
            this.toggleTheme();
        });

        document.body.appendChild(toggleBtn);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.style.setProperty('--bg-darker', '#f8fafc');
            document.documentElement.style.setProperty('--bg-dark', '#f1f5f9');
            document.documentElement.style.setProperty('--text-light', '#1e293b');
            document.documentElement.style.setProperty('--text-gray', '#475569');
        } else {
            // 恢复默认深色主题
            document.documentElement.style.removeProperty('--bg-darker');
            document.documentElement.style.removeProperty('--bg-dark');
            document.documentElement.style.removeProperty('--text-light');
            document.documentElement.style.removeProperty('--text-gray');
        }
    }
}

// 加载管理器
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        this.createLoader();
        this.setupLoadingComplete();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">ClothoEngine</div>
                <div class="loader-subtitle">Enterprise AI Solutions</div>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-darker);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;

        const style = document.createElement('style');
        style.textContent = `
            .loader-content {
                text-align: center;
            }
            .loader-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(176, 148, 196, 0.3);
                border-top: 3px solid var(--primary-light);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            .loader-text {
                font-size: 2rem;
                font-weight: 700;
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 8px;
            }
            .loader-subtitle {
                font-size: 1rem;
                color: var(--text-gray);
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(loader);

        this.loader = loader;
    }

    setupLoadingComplete() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoader();
            }, 1000);
        });
    }

    hideLoader() {
        if (this.loader) {
            this.loader.style.opacity = '0';
            setTimeout(() => {
                this.loader.remove();
            }, 500);
        }
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 显示加载器
    new LoadingManager();

    // 初始化粒子系统
    setTimeout(initParticles, 200);

    // 初始化所有组件
    new Navigation();
    new ScrollAnimations();
    new ContactForm();
    new PerformanceOptimizer();
    new ThemeManager();

    // 添加平滑滚动到顶部按钮
    createScrollToTopButton();
});

// 滚动到顶部按钮
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--gradient-primary);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-glow);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    `;

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollBtn);

    // 监听滚动显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
}

// 添加全局CSS动画类
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .slide-up {
        animation: slideUp 0.6s ease-out;
    }

    /* 优化的选择状态 */
    *::selection {
        background: var(--primary-light);
        color: var(--bg-darker);
    }

    /* 更好的焦点指示器 */
    *:focus {
        outline: 2px solid var(--primary-light);
        outline-offset: 2px;
    }

    button:focus,
    input:focus,
    textarea:focus,
    select:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(176, 148, 196, 0.3);
    }
`;

document.head.appendChild(globalStyles);

// 错误处理和性能监控
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);

    // 可选：发送错误到分析服务
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;

            console.log(`页面加载时间: ${loadTime}ms`);

            // 可选：发送性能数据到分析服务
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    name: 'load',
                    value: Math.round(loadTime)
                });
            }
        }, 0);
    });
}

// 导出全局函数供外部使用
window.KesuozhAI = {
    scrollToSection: (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },

    showNotification: (message, type = 'info') => {
        const contactForm = new ContactForm();
        contactForm.showMessage(message, type);
    }
};