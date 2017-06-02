/*
 *下面拖动代码来源于http://www.newxing.com/Tech/WebDevelop/JavaScript/472.html
 *在此感谢原作者，转载请声明来源
 *@author @ken @1039110278
 */
Number.prototype.NaN0=function(){return isNaN(this)?0:this;}
var iMouseDown  = false;
var dragObject  = null;
var curTarget   = null;
var pageMaxNotes=50;

function makeDraggable(item){
    if(!item) return;
    item.onmousedown = function(ev){
        dragObject  = this;
        mouseOffset = getMouseOffset(this, ev);
        return false;
    }
}

function getMouseOffset(target, ev){
    ev = ev || window.event;

    var docPos    = getPosition(target);
    var mousePos  = mouseCoords(ev);
    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
    var left = 0;
    var top  = 0;
    while (e.offsetParent){
        left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
        top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
        e     = e.offsetParent;
    }

    left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
    top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);

    return {x:left, y:top};

}

function mouseCoords(ev){
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop  - document.body.clientTop
    };
}

function mouseDown(ev){
    ev         = ev || window.event;
    var target = ev.target || ev.srcElement;

    if(target.onmousedown || target.getAttribute('DragObj')){
        return false;
    }
}

function mouseUp(ev){

    dragObject = null;

    iMouseDown = false;
}

function mouseMove(ev){
    ev         = ev || window.event;

    /*
    We are setting target to whatever item the mouse is currently on

    Firefox uses event.target here, MSIE uses event.srcElement
    */
    var target   = ev.target || ev.srcElement;
    var mousePos = mouseCoords(ev);
    

    if(dragObject){
        dragObject.style.position = 'absolute';
        dragObject.style.top      = mousePos.y - mouseOffset.y;
        dragObject.style.left     = mousePos.x - mouseOffset.x;
        if(dragObject.style.zIndex!=pageMaxNotes)
        {
            pageMaxNotes++;
            dragObject.style.zIndex=pageMaxNotes;
        }
    }

    // track the current mouse state so we can compare against it next time
    lMouseState = iMouseDown;

    // this prevents items on the page from being highlighted while dragging
    if(curTarget || dragObject) return false;
}

document.onmousemove = mouseMove;
document.onmousedown = mouseDown;
document.onmouseup   = mouseUp;

/**
 * @author Mr.Think
 * @author blog http://mrthink.net/
 * @2011.01.27
 * 可自由转载及使用,但请注明版权归属
 */
function fadeIn(elem, speed, opacity){
        //底层共用
    var iBase = {
        Id: function(name){
            return document.getElementById(name);
        },
		//设置元素透明度,透明度值按IE规则计,即0~100
        SetOpacity: function(ev, v){
            ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
        }
    }
    
       speed = speed || 20;
        opacity = opacity || 100;
      //显示元素,并将元素值为0透明度(不可见)
        elem.style.display = 'block';
        iBase.SetOpacity(elem, 0);
       //初始化透明度变化值为0
       var val = 0;
      //循环将透明值以5递增,即淡入效果
      (function(){
          iBase.SetOpacity(elem, val);
            val += 5;
           if (val <= opacity) {
               setTimeout(arguments.callee, speed)
            }
        })();
   }

/*
 *生成随机数
 */
function GetRandomNum(Min,Max)
{   
    var Range = Max - Min;   
    var Rand = Math.random();   
    return(Min + Math.round(Rand * Range));   
} 

/*
 *当文档加载完毕时将对留言条进行初始化
 */
window.onload = function() {
    
    //取得所有的note类留言条
    var notes=document.getElementsByName("note");
    
    //此时note所在层最小为49，最高层为49+note数量
    pageMaxNotes=49+notes.length;
    
    //得到此时文档宽度
    var bodyWidthMain = document.body.offsetWidth;
    
    //因为留言条的拖动是相对于整个body，而定位是相对于这个main
    //左右宽度body与main的差值
    var baseOffsetLeft = (bodyWidthMain-960)/2;
    
    //上下高度body与main的差值
    var baseOffsetTop = 0;
    
    //留言条出现的最低位置
    var maxHeight = 960-225;
    
    //留言条出现的最右位置
    
    var maxWidth = 960-235;
        
    for(var i=0;i<notes.length;i++)
    {
        makeDraggable(notes[i]);
        
        //随机出现位置
        notes[i].style.top = baseOffsetTop + GetRandomNum(0 , maxHeight);
        notes[i].style.left =baseOffsetLeft + GetRandomNum(0 ,maxWidth);
        
        //位置确定后淡入
        fadeIn(notes[i]);
    }
}