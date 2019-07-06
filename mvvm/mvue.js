class Mvue{
    constructor(options){
        this.options=options;
        this._data=options.data;
        new compile(options.el)
    }

}