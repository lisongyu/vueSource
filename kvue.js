class Kvue{
    constructor(options){
          this.$options=options;
          this._data=options.data;
          //数据劫持
          this.observer(this._data);
          this.compile(options.el);

    }
    observer(data){
        Object.keys(data).forEach(key=>{
            let value=data[key];
            let dep=new Dep();
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    if(Dep.target){
                        dep.addSub(Dep.target)
                    }
                    return value;
                },
                set(newValue){
                    console.log("set",newValue);
                    if(newValue==value){
                        return 
                    }
                    value=newValue;
                    dep.notify(newValue);
                }


            })
        })
    }
    compile(el){
       let element=document.querySelector(el);
      this.compileNode(element)

    }
    compileNode(element){

        let childNodes=element.childNodes;
        Array.from(childNodes).forEach((node,index)=>{
             if(node.nodeType==3){
                 //文本
                 let nodeContent=node.textContent;
                 let reg=/\{\{\s*(\S*)\s*\}\}/;
                 if(reg.test(nodeContent)){
                    node.textContent=this._data[RegExp.$1];
                    new Watcher(this,RegExp.$1,newValue=>{
                                node.textContent=newValue;
                    });
                 }
             }else if(node.nodeType==1){
                 //标签
                 //继续查找
                 let attrs=node.attributes;
                 //console.log(attrs);
                 Array.from(attrs).forEach(attr=>{
                     //console.log(attr)
                     let attrName=attr.name;
                     let attrValue=attr.value;
                     if(attrName.indexOf("k-")==0){
                         attrName=attrName.substr(2);
                         console.log(attrName);
                         if(attrName=="model"){
                             node.value=this._data[attrValue];


                         }
                         node.addEventListener('input',e=>{
                             //console.log(e.target.value);
                            this._data[attrValue]=e.target.value
                         });
                         new Watcher(this,attrValue,newValue=>{
                            node.value=newValue;
                        });

                     }

                 })

                
             }
                //判断循环出来的node是否还有子节点
            if(node.childNodes.length>0){
                this.compileNode(node)

            }
        });
     

    }

}


class Dep{
    constructor(){
        this.subs=[];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    notify(newValue){
      
        this.subs.forEach(v=>{
            v.update(newValue)//更新
        })
    }
}

class Watcher{
    constructor(vm,exp,cb){
        Dep.target=this;
        vm._data[exp];
        this.cb=cb;
        Dep.target=null
    }
    update(newValue){
        console.log('更新了',newValue);
        this.cb(newValue)
    }
}