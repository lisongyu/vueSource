class Myvue{
    //构造函数
    constructor(options){
       this.opts=options;

       this._data='';
       
        this.init()
        
           
    }
    init(){
        this.initState()

    }
    //初始化数据
    initState(){
       
        if(this.opts.data){
            this.initData()
        }

    }
    //初始化数据
    initData(){
        let data=this.opts.data;
           
            if(typeof(data)==='function'){
             
                this._data=data.call(this, this)
            }
             console.log(this._data);
           //编译页面
           this.compile(this.opts.el);

        

    }
    //将模板变量转化为数据
    compile(el){
        let element=document.querySelector(el);
        this.compileNode(element);
    }
    compileNode(element){
        let childNodes=element.childNodes;
        Array.from(childNodes).forEach((node,index)=>{
            if(node.nodeType==3){
                //如果为文本节点
                let nodeContent=node.textContent;
                let reg=/\{\{\s*(\S*)\s*\}\}/;
                if(reg.test(nodeContent)){
                    //文本内容赋值
                    node.textContent=this._data[RegExp.$1];
                  
                }

            }else if(node.nodeType==1){
                //标签 继续查找
                let attrs=node.attributes;

            }
            //判断循环出来的node是否还有子节点
            if(node.childNodes.length>0){
                this.compileNode(node);
            }
        })
        
    }


    //方法集合

}