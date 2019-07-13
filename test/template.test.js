const assert = require("assert");
const {describe, it} = require("mocha");
const templateEngine = require('../build/template-engine.js');
it("template engine test element", function () {
    assert.strictEqual(templateEngine({
        block: "block",
        elem: "elem"
    }), '<div class="block__elem"></div>');
});
it("template engine test block", function () {
    assert.strictEqual(templateEngine({
        block: "block",
    }), '<div class="block"></div>');
});
it("template engine test block mods", function () {
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
it("template engine test element mods", function () {
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
it("template engine test mix block", function () {
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
it("template engine test one mix block", function () {
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
it("template engine test mix element", function () {
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
it("template engine test mix block with mods", function () {
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
it("template engine test mix element with mods", function () {
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
it("template engine test block with one child", function () {
    let html = templateEngine({
        block: "block",
        content: {
            block: "content-block-1"
        },
    });
    assert.strictEqual(html, '<div class="block"><div class="content-block-1"></div></div>');
});
it("template engine test block with one child", function () {
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
