/*
 *�����϶�������Դ��http://www.newxing.com/Tech/WebDevelop/JavaScript/472.html
 *�ڴ˸�лԭ���ߣ�ת����������Դ
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
 * ������ת�ؼ�ʹ��,����ע����Ȩ����
 */
function fadeIn(elem, speed, opacity){
        //�ײ㹲��
    var iBase = {
        Id: function(name){
            return document.getElementById(name);
        },
		//����Ԫ��͸����,͸����ֵ��IE�����,��0~100
        SetOpacity: function(ev, v){
            ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
        }
    }
    
       speed = speed || 20;
        opacity = opacity || 100;
      //��ʾԪ��,����Ԫ��ֵΪ0͸����(���ɼ�)
        elem.style.display = 'block';
        iBase.SetOpacity(elem, 0);
       //��ʼ��͸���ȱ仯ֵΪ0
       var val = 0;
      //ѭ����͸��ֵ��5����,������Ч��
      (function(){
          iBase.SetOpacity(elem, val);
            val += 5;
           if (val <= opacity) {
               setTimeout(arguments.callee, speed)
            }
        })();
   }

/*
 *���������
 */
function GetRandomNum(Min,Max)
{   
    var Range = Max - Min;   
    var Rand = Math.random();   
    return(Min + Math.round(Rand * Range));   
} 

/*
 *���ĵ��������ʱ�������������г�ʼ��
 */
window.onload = function() {
    
    //ȡ�����е�note��������
    var notes=document.getElementsByName("note");
    
    //��ʱnote���ڲ���СΪ49����߲�Ϊ49+note����
    pageMaxNotes=49+notes.length;
    
    //�õ���ʱ�ĵ����
    var bodyWidthMain = document.body.offsetWidth;
    
    //��Ϊ���������϶������������body������λ����������main
    //���ҿ��body��main�Ĳ�ֵ
    var baseOffsetLeft = (bodyWidthMain-960)/2;
    
    //���¸߶�body��main�Ĳ�ֵ
    var baseOffsetTop = 0;
    
    //���������ֵ����λ��
    var maxHeight = 960-225;
    
    //���������ֵ�����λ��
    
    var maxWidth = 960-235;
        
    for(var i=0;i<notes.length;i++)
    {
        makeDraggable(notes[i]);
        
        //�������λ��
        notes[i].style.top = baseOffsetTop + GetRandomNum(0 , maxHeight);
        notes[i].style.left =baseOffsetLeft + GetRandomNum(0 ,maxWidth);
        
        //λ��ȷ������
        fadeIn(notes[i]);
    }
}