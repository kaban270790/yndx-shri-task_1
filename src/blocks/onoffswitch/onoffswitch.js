(function () {
    if (!document || !document.body) {
        return;
    }
    const themeClasses = [
        'theme_color_project-default',
        'theme_color_project-brand',
        'theme_color_project-inverse',
        'theme_color_project-warning',
        'theme_color_megafon-brand',
    ];

    document.body.addEventListener('click', function (e) {
        let {target} = e;

        while (target !== this) {
            if (target.classList.contains('onoffswitch')) {
                let classList = target.querySelector('.onoffswitch__button').classList;
                classList.toggle('onoffswitch__button_status_on');
                classList.toggle('onoffswitch__button_status_off');

                let theme = target.closest('.theme');
                toggleTheme(theme);

                break;
            }
            target = target.parentNode;
        }
    });

    /**
     * @param {Element} theme
     */
    function toggleTheme(theme) {
        const currentThemeIndex = getCurrentIndexTheme(theme);
        theme.classList.remove(themeClasses[currentThemeIndex]);
        theme.classList.add(getNextTheme(currentThemeIndex));
    }

    /**
     * @param {Element} theme
     * @return {number}
     */
    let getCurrentIndexTheme = function (theme) {
        let className = '';
        theme.classList.forEach((item) => {
            if (item.match(/^theme_color_[a-z0-9\-]{1,}$/i)) {
                className = item;
            }
        });
        return themeClasses.indexOf(className);
    };
    /**
     * @param {number} currentIndex
     * @return {string}
     */
    let getNextTheme = function (currentIndex) {
        currentIndex++;
        if (currentIndex >= themeClasses.length) {
            currentIndex = 0;
        }
        return themeClasses[currentIndex];
    }
})();
