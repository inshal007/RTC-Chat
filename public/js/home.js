function setTheme(themename) {
    localStorage.setItem('theme', themename);
    document.documentElement.className = themename;


}
const ge = document.querySelector('.checkbox');
ge.addEventListener('click', (e) => {
    var x = document.getElementById('light');
    var y = document.getElementById('dark');
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        x.style.display = "flex";
        y.style.display = "none";

    } else {
        setTheme('theme-dark');
        x.style.display = "none";
        y.style.display = "flex";

    }

});

(function() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();