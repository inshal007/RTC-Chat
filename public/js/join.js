document.querySelector('.sign-btn').addEventListener('click', () => {
    var x = document.getElementById('register');
    x.style.display = 'none';
    var y = document.getElementById('login');
    y.style.display = 'flex';
})
document.querySelector('.login-btn').addEventListener('click', () => {
    var y = document.getElementById('login');
    y.style.display = 'none';
    var x = document.getElementById('register');
    x.style.display = "flex";
})