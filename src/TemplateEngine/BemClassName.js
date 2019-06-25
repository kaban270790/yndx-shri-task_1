module.exports = class BemClassName {
    /**
     * @param {string} block
     * @param {string | null} element
     * @param {string | null} modifier
     * @param {string | null} modifierValue
     */
    constructor(block, element = null, modifier = null, modifierValue = null) {
        this.block = block;
        this.element = element;
        this.modifier = modifier;
        this.modifierValue = modifierValue;
    }

    /**
     * @return {string}
     */
    toString() {
        let className = this.block;
        if (this.element) {
            className += '__' + this.element;
        }
        if (this.modifierValue) {
            className += '_' + this.modifier;
            if (this.modifierValue && this.modifierValue !== true) {
                className += '_' + this.modifierValue;
            }
        }
        return className;
    }

    /**
     * @param blockData
     * @return {this[]}
     */
    static factory(blockData) {
        let classNames = [];
        if (!blockData.block) {
            return classNames;
        }
        let mods = blockData.mods || {};
        let element = blockData.elem || null;
        classNames.push(new this(blockData.block, element));
        classNames = Object.keys(mods).reduce((list, name) => {
            list.push(new this(blockData.block, element, name, mods[name]));
            return list;
        }, classNames);

        let mix = blockData.mix || [];
        classNames = mix.reduce((list, blockData) => {
            return list.concat(this.factory(blockData));
        }, classNames);

        return classNames;
    }
};