(function () {
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
                let classList = target.querySelector('.onoffswitch__switcher').classList;
                classList.toggle('onoffswitch__switcher_status_on');
                classList.toggle('onoffswitch__switcher_status_off');

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
(function () {
    document.body.addEventListener('click', function (e) {
        let {target} = e;

        while (target !== this) {
            if (target.classList.contains('e-accordion__short')) {
                let parent = target.closest('.e-accordion');
                parent.querySelectorAll('.e-accordion__more').forEach((node) => {
                    node.classList.toggle('history__hide');
                    node.classList.toggle('history__show');
                });
                break;
            }
            target = target.parentNode;
        }
    })
})();
