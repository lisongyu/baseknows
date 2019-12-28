//用类去定义KPromise
class KPromise {
  //定义静态属性 进行中，已解决，已拒绝
  static PENDING = 'PENDING';
  static RESOLVED = 'RESOLVED';
  static REJECTED = 'REJECTED';
  //构造器 
  constructor(handler) {
    //判断是否是方法
    if (typeof handler != 'function') {
      throw new TypeError('Promise resolver undefined is not a function')
    }
    //定义收集解决数组
    this.resolvedQueues = [];
    //定义收集拒绝数组
    this.rejectedQueues = [];
    //定义传值
    this.value;
    //定义状态
    this.status = KPromise.PENDING;
    //调用handler方法，集中包括reslove及reject方法
    handler(this._reslove.bind(this), this._reject.bind(this))
  }
  _reslove(val) {
    //微任务存储方法
    window.addEventListener('message', _ => {
      //如果不相等为pending ,直接return 
      if (this.status != KPromise.PENDING) {
        return;
      }
      //设置为解决状态
      this.status = KPromise.RESOLVED;
      this.value = val;
      let handler;
      //对解决队列数据进行遍历
      while (handler = this.resolvedQueues.shift()) {
        handler(this.value)
      }

    })
    //触发收集
    window.postMessage('')


  }
  _reject(val) {
    //拒绝收集
    window.addEventListener('message', _ => {
      if (this.status != KPromise.PENDING) {
        return;
      }
      this.value = val;
      this.status = KPromise.REJECTED;

      let handler;
      while (handler = this.rejectedQueues.shift()) {
        handler(this.value)
      }

    })
    window.postMessage('')
  }
  //每个promise都会使用promise方法
  then(reslovedHandler, rejectedHandler) {
    // 事件 
  
    return new KPromise((resolve, reject) => {
      function newResolveHandler(val) {
        if (typeof reslovedHandler === 'function') {

          let result = reslovedHandler(val);
          if (result instanceof KPromise) {

            result.then(resolve, reject);
          } else {
          
            resolve(result);
          }
        } else {

          resolve(val);
        }



      }

      function newRejectHandler(val) {
        if (typeof rejectedHandler === 'function') {
          let result = rejectedHandler(val);
          if (result instanceof KPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        } else {
          reject(val);
        }

      }
      this.resolvedQueues.push(newResolveHandler);
      this.rejectedQueues.push(newRejectHandler)

    })
  }
  catch (rejectedHandler) {
    return this.then(undefined, rejectedHandler);

  }

  //静态方法
  static resolve(val) {
    return new KPromise(resolve => {
      resolve(val)
    })

  }
  static reject(val) {

    return new KPromise((resolve, reject) => {
      reject(val)
    })

  }
  //实现静态方法all
  static all(iterator) {
    let len = iterator.length;
    let i = 0;
    let vals = [];
    return new KPromise((resolve, reject) => {
      iterator.forEach(it => {
        it.then(val => {
          i++;
          vals.push(val);
          if (i == len) {
            resolve(vals)
          }
        }).catch(e => {
          reject(e)
        })
      })
    })
  }
  //race方法实现
  static race(iterator) {
    return new KPromise((resolve, reject) => {
      iterator.forEach(it => {
        it.then(val => {
         
            resolve(val)
          
        }).catch(e => {
          reject(e)
        })
      })
      
    })
  }

  

}