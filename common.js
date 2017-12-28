/**
 * Created by Administrator on 2017/8/26.
 */
/**
 * 通过id获取元素
 * @param id  输入需要获取的元素的id
 * @returns {Element} 返回当前id对应的元素
 */
function getId(id){
    return document.getElementById(id);
}


/**
 * 由于IE8不支持nextElementSibling拿到下一个元素节点，所以需要做兼容处理
 * @param ele  需要得到下一个元素节点的当前元素
 * @returns {*} 该元素的下一个元素节点（即标签元素）
 */
function getNextElement(ele){
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }else{
        var node = ele.nextSibling;
        while(node.nodeType != 1){
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * 由于IE8不支持previousElementSibling拿到上一个元素节点，所以需要做兼容处理
 * @param ele 需要拿到上一个元素节点的当前元素
 * @returns {*} 该元素的上一个元素节点（即标签元素）
 */
function getPreviousElement(ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }else{
        var node = ele.previousSibling;
        while(node.nodeType != 1){
            node = node.previousSibling;
        }
        return node;
    }
}

//因为每一个浏览器获取页面的scrollTop和scrollLeft的方式不一样，所以要做兼容处理
//获取页面的scrollTop、scrollLeft的值封装函数
function getPageScroll(){
    return {
        scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft :  window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

//获取页面的clientWidth和clientHeight，不同的浏览器获取的方式不一样，所以要做兼容处理。
function getPageClient(){
    return {
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight || 0,
    }
}

/**
 * 缓动动画
 * @param obj 需要此动画效果的元素
 * @param attrs 该元素需要动画效果出现的属性，json形式
 * @param fn 回调函数，在该动画效果执行完毕后执行的函数
 */
function animateSlow(obj,attrs,fn){
    clearInterval(obj.timerID);
    obj.timerID = setInterval(function () {
        var flag = true;
        for(var key in attrs){
            if(key == "opacity") {
                var currentLeft = getComputedStyle(obj, null)[key]*100;
                var step = (attrs[key]*100 - currentLeft) / 3;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                currentLeft += step;
                obj.style[key] = currentLeft/100;
                if (currentLeft/100 != attrs[key]) {
                    flag = false;
                }
            }else if(key == "zIndex"){
                obj.style[key] = attrs[key];
            }else{
                var currentLeft =parseInt(getComputedStyle(obj,null)[key]);
                var step = (attrs[key] - currentLeft)/10;
                step = step > 0? Math.ceil(step):Math.floor(step);
                currentLeft += step;
                obj.style[key] = currentLeft + "px";
                if(currentLeft != attrs[key]){
                    flag = false;
                }
            }
        }
        if(flag){
            clearInterval(obj.timerID);
            fn();
        }
    },1)
}

/**
 * 匀速动画效果
 * @param obj 需要设置匀速动画效果的元素
 * @param target 每次动画的距离（移动单位）
 */
function animate(obj,target,fn) {
    clearInterval(obj.timerID);
    obj.timerID = setInterval(function () {
        var currentLeft = obj.offsetLeft;
        var step = currentLeft > target ? -value: value;
        if (Math.abs(currentLeft - target) > Math.abs(step)) {
            currentLeft += step;
            obj.style.left = currentLeft + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timerID);
            fn();
        }
    }, 1);
}

/**
 * 匀速动画效果(垂直方向)
 * @param obj 需要设置匀速动画效果的元素
 * @param target 每次动画的距离（移动单位）
 */
function animateV(obj,target,fn) {
    clearInterval(obj.timerID);
    obj.timerID = setInterval(function () {
        var currentTop = obj.offsetTop;
        var step = currentTop > target ? -2 : 2;
        if (Math.abs(currentTop - target) > Math.abs(step)) {
            currentTop += step;
            obj.style.top = currentTop + "px";
        } else {
            obj.style.top = target + "px";
            clearInterval(obj.timerID);
            fn();
        }
    },7);
}

//3.获取元素样式的值， 做封装
function getStyle(obj,attr){
    //能力检测
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        //如果到了这里，就表示此时的浏览器是谷歌和火狐。不支持currentStyle，但是支持getComputedStyle
        return window.getComputedStyle(obj,null)[attr];
    }
}