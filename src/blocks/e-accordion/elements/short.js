(function () {
    document.body.addEventListener('click', function (e) {
        let {target} = e;

        while (target !== this) {
            if (target.classList.contains('e-accordion__short')) {
                let parent = target.closest('.e-accordion');
                parent.querySelectorAll('.e-accordion__more').forEach((node) => {
                    node.classList.toggle('e-accordion__more_hide');
                });
                break;
            }
            target = target.parentNode;
        }
    })
})();
