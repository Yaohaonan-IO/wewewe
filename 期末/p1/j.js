// 全局页面切换函数（确保导航栏能调用）
window.switchPage = function(pageId) {
    // 1. 隐藏所有page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    // 2. 显示目标page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    // 3. 更新导航栏激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.href.includes(pageId)) {
            item.classList.add('active');
        }
    });
    // 4. 滚动到顶部
    window.scrollTo(0, 0);
};

// 登录验证
function validateForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    let valid = true;

    if (username.length < 4) {
        document.getElementById('usernameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }

    if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
    return valid;
}

// 退出登录
window.logout = function() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('username');
    document.getElementById('profileUsername').textContent = '未登录';
    switchPage('homePage');
};

// 页面加载完成初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化首页
    switchPage('homePage');

    // 登录按钮事件
    const loginBtn = document.getElementById('submitLogin');
    if (loginBtn) {
        loginBtn.onclick = function() {
            if (validateForm()) {
                const username = document.getElementById('username').value.trim();
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('username', username);
                document.getElementById('profileUsername').textContent = username;
                switchPage('profilePage');
            }
        };
    }

    // 轮播图逻辑
    let currentIndex = 0;
    const bannerWrapper = document.querySelector('.banner-wrapper');
    const dots = document.querySelectorAll('.banner-dot');
    const total = dots.length;

    function changeBanner(index) {
        currentIndex = index;
        bannerWrapper.style.transform = `translateX(-${index * 33.333}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    // 自动轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % total;
        changeBanner(currentIndex);
    }, 3000);

    // 点击圆点切换
    dots.forEach((dot, i) => {
        dot.onclick = () => changeBanner(i);
    });

    // 恢复登录状态
    if (localStorage.getItem('isLogin') === 'true') {
        document.getElementById('profileUsername').textContent = localStorage.getItem('username') || '未登录';
    }
});