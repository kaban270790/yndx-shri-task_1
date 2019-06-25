(function () {
    document.body.addEventListener('click', function (e) {
        let {target} = e;
        const classesHiddenElements = [
            '.history__description',
            '.history__actions',
        ];

        while (target !== this) {
            if (target.classList.contains('e-accordion__short')) {
                let parent = target.closest('.e-accordion');
                parent.querySelectorAll(classesHiddenElements.join(',')).forEach((node) => {
                    node.classList.toggle('e-accordion__hidden');
                });
                break;
            }
            target = target.parentNode;
        }
    })
})();
