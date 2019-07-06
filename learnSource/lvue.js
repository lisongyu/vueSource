import Dep from "./dep";

function defineReactive(data,key,val){
    let dep=new Dep();//修改
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            dep.depend()
            return val
        },
        set:function(newVal){
            if(val===newVal){
                return
            }
            //新增
         dep.notify()
            val=newVal
        }
    })
}

