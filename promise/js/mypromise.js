//我自己书写的promise源码
class MyPromise {
  //三种状态
  static PENDING = 'PENDING';
  static RESOLVED = 'RESOLVED';
  static REJECTED = 'REJECTED';

  constructor(handler) {
    //首先判断是不是方法 handler
    if (typeof handler !== 'function') {
      throw new TypeError('Promise resolver undefined is not a function')
    };

    //设置两个数组进行收集数据
    //定义收集解决数组
    this.resolvedQueues = [];
    //定义收集拒绝数组
    this.rejectedQueues = [];
    this.static = MyPromise.PENDING

    //定义所传的值
    this.value = ""
    //方法调用 1.resolved,2rejected方法
    handler(this._resolved.bind(this), this._rejected.bind(this));


  }
  //定义 resolved方法
  _resolved(value) {
    //采用微任务
    //一个监听
    window.addEventListener('message', () => {
      //数据触发
      //如果状态不为pending
      if (this.static !== 'PENDING') {
        return
      }
      this.static = MyPromise.RESOLVED
      this.value = value
      let handler;
      while (handler = this.resolvedQueues.shift()) {
        handler(value)
      }
    })

    //一个触发
    window.postMessage('')
  }

  _rejected(value) {
    //采用微任务
    //一个监听
    window.addEventListener('message', () => {
      //数据触发
      //如果状态不为pending
      if (this.static !== 'PENDING') {
        return
      }
      this.static = MyPromise.REJECTED
      this.value = value
      let handler;
      while (handler = this.rejectedQueues.shift()) {
        handler(value)
      }
    })
    //一个触发
    window.postMessage('')
  }

  //数据收集
  then(reslovedHandler, rejectedHandler) {
    //要实现 then.then的使用 需要返回MyPromise，因为只有MyPromise才有then方法
    return new MyPromise((resolve, reject) => {
      //val 为reslove的值
      function newResolveHandler(val) {
        //返回值，传入下一个
        if (typeof reslovedHandler === 'function') {
          let result = reslovedHandler(val);
          //如果是promise实例
          if (result instanceof MyPromise) {
            //调用then方法
            result.then(resolve, reject)

          } else {
            resolve(result)
          }

        } else {
          resolve(val)
        }

      }

      function newRejectedHandler(val) {

        if (typeof rejectedHandler === 'function') {
          let result = rejectedHandler(val);


          if (result instanceof MyPromise) {
            //调用then方法
            result.then(undefined, reject)

          } else {
            reject(result)
          }
        } else {
          reject(val)
        }

      }

      //将解决处理完函数进行调用
      this.resolvedQueues.push(newResolveHandler);
      //将拒绝完函数进行调用
      this.rejectedQueues.push(newRejectedHandler);

    })


  }

  //catch使用
  catch (rejectedHandler) {
    this.then(undefined, rejectedHandler)

  }
  static resolve(val) {
    return new MyPromise(resolve => {
      resolve(val)
    })

  }

  static reject(val) {
    return new MyPromise((undefined, reject) => {
      reject(val)
    })

  }
  //全部promise结束执行
  static all(iterator) {
    let len = iterator.length;
    let i = 0;
    let vals = [];
    return new MyPromise((resolve, reject) => {
      iterator.forEach(it => {
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

  static race(iterator) {

    return new MyPromise((resolve, reject) => {
      iterator.forEach(it => {
        it.then(val => {
          resolve(val)

        }).catch(err => {
          reject(err)
        })
      })

    })


  }



}