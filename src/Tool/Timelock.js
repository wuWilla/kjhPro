
class TimeLock{
    /**
     * 为函数添加一个时间锁，fn函数在调用成功后的 Time 时间长度内不会调用成功
     * @param{function} fn加锁的函数
     * @param{number} time时间长度
     * */
    addLock(fn,time){
        let oldTime = 0;
        return(...arg) => {
            const newTime = Date.now();
            if(newTime - oldTime >= time){
                oldTime = newTime;
                console.log(arg);
                fn();
            }
        };
    }
}
export default new TimeLock();
