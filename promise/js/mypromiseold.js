 //创建 class myPromise
 class MyPromise {

   //定义静态属性 进行中，已解决，已拒绝
   static PENDING = 'PENDING';
   static RESOLVED = 'RESOLVED';
   static REJECTED = 'REJECTED';
   constructor(handler) {
     //判断是不是fn
     if (typeof handler != 'function') {
       throw new TypeError('Promise resolver undefined is not a function')
     }
     //如果是fn,进行后续操作
     this.resolvedQueues = [] //定义收集方法
     this.rejectedQueues = []
     this.val = '';
     this.status = MyPromise.PENDING;

     //方法调用
     handler(this._resolved.bind(this), this._rejected.bind(this));
   }
   _resolved(val) {
     //注册及触发
     window.addEventListener('message', () => {
       //设置状态
       //当其已经改变
       if (this.status != MyPromise.PENDING) {
         return false;
       }
       this.status = MyPromise.RESOLVED;
       this.val = val;

       //while方法的使用

       let handler;
       while (handler = this.resolvedQueues.shift()) {
         handler(this.val)
       }
     })

     window.postMessage('')


   }
   _rejected(val) {
     //注册及触发

     //箭头函数
     window.addEventListener('message', () => {
       //设置状态
       //当其已经改变
       if (this.status != MyPromise.PENDING) {
         return false;
       }
       this.status = MyPromise.REJECTED;
       this.val = val;
       //while方法的使用
       let handler;
       while (handler = this.rejectedQueues.shift()) {
         handler(this.val)
       }
     })
     window.postMessage('')
   }

   then(reslovedHandler, rejectedHandler) {
     return new MyPromise((resolve, reject) => {
       function newResolveHandler(val) {

         if (typeof reslovedHandler == 'function') {

           let result = reslovedHandler(val);

           if (result instanceof MyPromise) {
             result.then(resolve, reject);
           } else {
             resolve(result)
           }
         } else {
           resolve(val)
         }
       }

       function newRejectHandler(val) {

         if (typeof rejectedHandler == 'function') {
           let result = rejectedHandler(val);

           if (result instanceof MyPromise) {

             result.then((resolve, reject))

           } else {
             reject(result)
           }
         } else {
           reject(val)
         }

       }


       //收集数据

       this.resolvedQueues.push(newResolveHandler)
       this.rejectedQueues.push(newRejectHandler)

     })
   }
   catch (rejectedHandler) {

     return this.then(undefined, rejectedHandler)
   }

   static resolve(val) {
     return new MyPromise(resolve => {
       resolve(val)
     })
     
   }
   //拒绝方法调用
   static reject(val) {
    return new MyPromise((resolve,reject) => {
      reject(val)
    }) 
   }

   static all(iterator) {
     const len = iterator.length;
     let i = 0;
     let vals = [];
     //所有成功才reslove,只有一个reject就是reject
     return new MyPromise((resolve, reject) => {
       iterator.forEach(it => {
         //成功
         it.then(val => {
           vals.push(val);
           i++;
           if (i == len) {
             resolve(vals)
           }
         }).catch(err => {
          reject(err)
        })
      })
       
     })
   }

   //race方法
   static race(iterator) {

    return new MyPromise((resolve, reject) => {
      iterator.forEach(it => {
        //成功
        it.then(val => {
         
            resolve(val)
          
        }).catch(err => {
         reject(err)
       })
     })
      
    })
     
   }
 }