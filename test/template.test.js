const assert = require("assert");
const {describe, it} = require("mocha");
const templateEngine = require('../build/template-engine.js');
it("test element", function () {
    assert.strictEqual(templateEngine({
        block: "block",
        elem: "elem"
    }), '<div class="block__elem"></div>');
});
it("test block", function () {
    assert.strictEqual(templateEngine({
        block: "block",
    }), '<div class="block"></div>');
});
it("test block mods", function () {
    assert.strictEqual(templateEngine({
        block: "block",
        mods: {
            'mod-1': "val-1",
            'mod-2': "val-2"
        },
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
    }), '<div class="block block_mod-1_val-1 block_mod-2_val-2"></div>');
});
it("test element mods", function () {
    let html = templateEngine({
        block: "block",
        elem: "elem",
        mods: {
            'mod-1': "val-1",
            'mod-2': "val-2"
        },
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
    });
    assert.strictEqual(html, '<div class="block__elem block__elem_mod-3_val-3 block__elem_mod-4_val-4"></div>');
});
it("test mix block", function () {
    let html = templateEngine({
        block: "block",
        elem: "elem",
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
        mix: [
            {
                block: "mix-block-1",
            },
        ]
    });
    assert.strictEqual(html, '<div class="block__elem block__elem_mod-3_val-3 block__elem_mod-4_val-4 mix-block-1"></div>');
});
it("test one mix block", function () {
    let html = templateEngine({
        block: "block",
        elem: "elem",
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
        mix: {
            block: "mix-block-1",
        }
    });
    assert.strictEqual(html, '<div class="block__elem block__elem_mod-3_val-3 block__elem_mod-4_val-4 mix-block-1"></div>');
});
it("test mix element", function () {
    let html = templateEngine({
        block: "block",
        elem: "elem",
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
        mix: [
            {
                block: "mix-block-2",
                elem: "mix-elem-2"
            },
        ]
    });
    assert.strictEqual(html, '<div class="block__elem block__elem_mod-3_val-3 block__elem_mod-4_val-4 mix-block-2__mix-elem-2"></div>');
});
it("test mix block with mods", function () {
    let html = templateEngine({
        block: "block",
        elem: "elem",
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
        mix: [
            {
                block: "mix-block-3",
                mods: {
                    'mix-mod-3-1': "mix-val-3-1",
                    'mix-mod-3-2': "mix-val-3-2"
                },
                elemMods: {
                    'mix-mod-3-3': "mix-val-3-3",
                    'mix-mod-3-4': "mix-val-3-4"
                },
            },
        ]
    });
    assert.strictEqual(html, '<div class="block__elem block__elem_mod-3_val-3 block__elem_mod-4_val-4 mix-block-3 mix-block-3_mix-mod-3-1_mix-val-3-1 mix-block-3_mix-mod-3-2_mix-val-3-2"></div>');
});
it("test mix element with mods", function () {
    let html = templateEngine({
        block: "block",
        elem: "elem",
        elemMods: {
            'mod-3': "val-3",
            'mod-4': "val-4"
        },
        mix: [
            {
                block: "mix-block-4",
                elem: "mix-elem-4",
                mods: {
                    'mix-mod-4-1': "mix-val-4-1",
                    'mix-mod-4-2': "mix-val-4-2"
                },
                elemMods: {
                    'mix-mod-4-3': "mix-val-4-3",
                    'mix-mod-4-4': "mix-val-4-4"
                },
            }
        ]
    });
    assert.strictEqual(html, '<div class="block__elem block__elem_mod-3_val-3 block__elem_mod-4_val-4 mix-block-4__mix-elem-4 mix-block-4__mix-elem-4_mix-mod-4-3_mix-val-4-3 mix-block-4__mix-elem-4_mix-mod-4-4_mix-val-4-4"></div>');
});
it("test block with one child", function () {
    let html = templateEngine({
        block: "block",
        content: {
            block: "content-block-1"
        },
    });
    assert.strictEqual(html, '<div class="block"><div class="content-block-1"></div></div>');
});
it("test block with one child", function () {
    let html = templateEngine({
        block: "block",
        content: [
            {
                block: "content-block-1"
            },
            {
                block: "content-block-2"
            }
        ],
    });
    assert.strictEqual(html, '<div class="block"><div class="content-block-1"></div><div class="content-block-2"></div></div>');
});
it("test content html", function () {
    let html = templateEngine({
        block: "block",
        content: {
            html:'<div>&copy; 2019</div>'
        },
    });
    assert.strictEqual(html, '<div class="block"><div>&copy; 2019</div></div>');
});
it("test content string", function () {
    let html = templateEngine({
        block: "block",
        content: [
            {block: 'sub-block-1'},
            {block: 'sub-block-2', content:'content-sub-block-2'},
            'content-block-2'
        ],
    });
    assert.strictEqual(html, '<div class="block"><div class="sub-block-1"></div><div class="sub-block-2">content-sub-block-2</div>content-block-2</div>');
});
it("test attrs", function () {
    let html = templateEngine({
        block: "block",
        attrs: {
            class: 'otherClassName',
            attribute:'attr-val'
        },
    });
    assert.strictEqual(html, '<div class="otherClassName block" attribute="attr-val"></div>');
});
it("test cls", function () {
    let html = templateEngine({
        block: "block",
        cls: 'subClass1 subClass2',
    });
    assert.strictEqual(html, '<div class="subClass1 subClass2 block"></div>');
});
it("test tag false", function () {
    let html = templateEngine({
        tag: false,
        attrs: {
            class: 'otherClassName',
            attribute:'attr-val'
        },
        content: 'start'
    });
    assert.strictEqual(html, 'start');
});
