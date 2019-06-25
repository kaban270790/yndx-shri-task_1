module.exports = class Attribute {
    /**
     * @param {string} name
     * @param {string} value
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.name + "=\"" + this.value + "\"";
    }
    static factory(attrs = {}) {
        return Object.keys(attrs).reduce((list, name) => {
            list.push(new this(name, attrs[name]));
            return list;
        }, []);
    }
};
