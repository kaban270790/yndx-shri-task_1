const Tag = require('./Tag.js');

module.exports = function (bemjson) {
    return factoryTag(bemjson).toString();
};
/**
 * @param {JSON} bemjson
 * @return {module.Tag|*}
 */
const factoryTag = function (bemjson) {
    let tag = new Tag(bemjson.tag);
    let attrs = bemjson.attrs || {};
    let classNames = (attrs.class ? [attrs.class] : []).concat(factoryBemClassNames(bemjson));
    if (classNames.length > 0) {
        attrs.class = classNames.join(' ');
    }
    tag.setAttrs(factoryAttr(attrs));
    (bemjson.content || []).map((bemjson) => {
        tag.addContent(factoryTag(bemjson));
    });
    return tag;
};

/**
 * @param {object}attrs
 * @returns {string[]}
 */
const factoryAttr = function (attrs = {}) {
    return Object.keys(attrs).reduce((list, name) => {
        list.push(name + "=\"" + attrs[name] + "\"");
        return list;
    }, []);
};
/**
 * @param {object}blockData
 * @returns {string[]}
 */
const factoryBemClassNames = function (blockData) {
    let classNames = [];
    if (!blockData.block) {
        return classNames;
    }
    let mods = blockData.mods || {};
    let element = blockData.elem || null;
    if (element) {
        mods = blockData.elemMods || {};
    }
    classNames.push(createClassName(blockData.block, element));
    classNames = Object.keys(mods).reduce((list, name) => {
        list.push(createClassName(blockData.block, element, name, mods[name]));
        return list;
    }, classNames);

    let mix = blockData.mix || [];
    classNames = mix.reduce((list, blockData) => {
        return list.concat(factoryBemClassNames(blockData));
    }, classNames);

    return classNames;
};
/**
 * @param {string} block
 * @param {string | null} element
 * @param {string | null} modifier
 * @param {string | null} modifierValue
 * @return {string}
 */
const createClassName = function (block, element = null, modifier = null, modifierValue = null) {
    let className = block;
    if (element) {
        className += '__' + element;
    }
    if (modifierValue) {
        className += '_' + modifier;
        if (modifierValue && modifierValue !== true) {
            className += '_' + modifierValue;
        }
    }
    return className;
};
