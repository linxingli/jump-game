/**
 * Created by Administrator on 2017/8/26.
 */
/**
 * ͨ��id��ȡԪ��
 * @param id  ������Ҫ��ȡ��Ԫ�ص�id
 * @returns {Element} ���ص�ǰid��Ӧ��Ԫ��
 */
function getId(id){
    return document.getElementById(id);
}


/**
 * ����IE8��֧��nextElementSibling�õ���һ��Ԫ�ؽڵ㣬������Ҫ�����ݴ���
 * @param ele  ��Ҫ�õ���һ��Ԫ�ؽڵ�ĵ�ǰԪ��
 * @returns {*} ��Ԫ�ص���һ��Ԫ�ؽڵ㣨����ǩԪ�أ�
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
 * ����IE8��֧��previousElementSibling�õ���һ��Ԫ�ؽڵ㣬������Ҫ�����ݴ���
 * @param ele ��Ҫ�õ���һ��Ԫ�ؽڵ�ĵ�ǰԪ��
 * @returns {*} ��Ԫ�ص���һ��Ԫ�ؽڵ㣨����ǩԪ�أ�
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

//��Ϊÿһ���������ȡҳ���scrollTop��scrollLeft�ķ�ʽ��һ��������Ҫ�����ݴ���
//��ȡҳ���scrollTop��scrollLeft��ֵ��װ����
function getPageScroll(){
    return {
        scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft :  window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

//��ȡҳ���clientWidth��clientHeight����ͬ���������ȡ�ķ�ʽ��һ��������Ҫ�����ݴ���
function getPageClient(){
    return {
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight || 0,
    }
}

/**
 * ��������
 * @param obj ��Ҫ�˶���Ч����Ԫ��
 * @param attrs ��Ԫ����Ҫ����Ч�����ֵ����ԣ�json��ʽ
 * @param fn �ص��������ڸö���Ч��ִ����Ϻ�ִ�еĺ���
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
 * ���ٶ���Ч��
 * @param obj ��Ҫ�������ٶ���Ч����Ԫ��
 * @param target ÿ�ζ����ľ��루�ƶ���λ��
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
 * ���ٶ���Ч��(��ֱ����)
 * @param obj ��Ҫ�������ٶ���Ч����Ԫ��
 * @param target ÿ�ζ����ľ��루�ƶ���λ��
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

//3.��ȡԪ����ʽ��ֵ�� ����װ
function getStyle(obj,attr){
    //�������
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        //�����������ͱ�ʾ��ʱ��������ǹȸ�ͻ������֧��currentStyle������֧��getComputedStyle
        return window.getComputedStyle(obj,null)[attr];
    }
}