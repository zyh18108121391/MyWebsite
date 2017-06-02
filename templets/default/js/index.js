// JavaScript Document
<!--把表单的信息发送到leancloud服务器-->
	Search();
	createCode();
	function Search(){	
		MessagesStr='';
		MessagesStr=MessagesStr+"<div id='Tips'><div style='text-align:center'> 温馨提示：</div>@如果看不到留言不可能(这bug我已经解决！)<br>@请文明留言，做个优秀的少先队员！不然过来，看我不打死你狗日的（哈哈！来打我啊啊啊~~）<br>@留言信签可以拖动哦~~（手机党除外）</div>";
		
		var Messages = AV.Object.extend("Messages");
		var query = new AV.Query(Messages);
		query.find({
        success: function(results) {
        //alert(results.length+'条留言');
       for (var i = 0; i < results.length; i++) {
       var object = results[i];
	   
	   MessagesStr=MessagesStr+"<div name='note' class='note'>";
	   
	   //背景颜色判断 -头
	   if(object.get('SelectColor')=="LightBlue"){
	   MessagesStr=MessagesStr+"<div class='nhead' style='background-image: url(./images/a5_1.gif);'>";
	   }
	   else{MessagesStr=MessagesStr+"<div class='nhead' style='background-image: url(./images/a1_1.gif);'>";}
	   //-------------
	   
	   //时间time
	   MessagesStr=MessagesStr+object.createdAt.getFullYear()+'-'+eval(object.createdAt.getMonth()+1)+'-'+object.createdAt.getDate();//月份要+1 是从0开始 
	   MessagesStr=MessagesStr+"</div>";
	   
	   
	    //背景颜色判断 -中
	   if(object.get('SelectColor')=="LightBlue"){
	   MessagesStr=MessagesStr+"<div class='nbody' style='background-image: url(./images/a5_2.gif);'>";
	   }
	   else{MessagesStr=MessagesStr+"<div class='nbody' style='background-image: url(./images/a1_2.gif);'>";}
	   //-------------
	   //留言部分 messages
	   MessagesStr=MessagesStr+object.get('message');
	   MessagesStr=MessagesStr+"</div>";
	   //---------------
	   
	    //背景颜色判断 -尾
	   if(object.get('SelectColor')=="LightBlue"){
	   MessagesStr=MessagesStr+"<div class='nfoot' style='background-image: url(./images/a5_3.gif);'>";
	   }
	   else{MessagesStr=MessagesStr+"<div class='nfoot' style='background-image: url(./images/a1_3.gif);'>";}
	   //表情?糠?
	   MessagesStr=MessagesStr+"<div class='moodpic'>";
	   MessagesStr=MessagesStr+"<img src=\'Expression/"+object.get('SelectExpression')+".png\'/>";
	   MessagesStr=MessagesStr+"</div>";
	   
	   //姓名部分
	   MessagesStr=MessagesStr+"<div class='username'>";
	   MessagesStr=MessagesStr+'&'+object.get('name');
	   MessagesStr=MessagesStr+"</div>";
	   //结尾
	   MessagesStr=MessagesStr+"</div>";
	   MessagesStr=MessagesStr+"</div>";
	   //alert(MessagesStr);
       //alert(object.id + ' - ' + object.createdAt.getFullYear());	   
       }	   
	   document.getElementById("Messages").innerHTML=MessagesStr;
	   notes();
	   // alert("1");
      },
       error: function(error) {
       alert("Error: " + error.code + " " + error.message);
      }
    });			
   }
	//--验证码------------------
	var code;
	var flag=false;
        function createCode() {
	  code = "";
            var codeLength = 4; //验证码的长度
            var checkCode = document.getElementById("checkCode");
	//alert(checkCode);
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 				            //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++) 
            {
                var charNum = Math.floor(Math.random() * 52);
                code += codeChars[charNum];
            }
            if (checkCode) 
            {
		//alert(code);
                checkCode.className = "code";			
                checkCode.innerHTML = code;
            }
        }
        function validateCode() 
        {
            var inputCode = document.getElementById("inputCode").value;
            if (inputCode.length <= 0) 
            {
                alert("请输入验证码！");
            }
            else if (inputCode.toUpperCase() != code.toUpperCase()) 
            {
                alert("验证码输入有误！");
                createCode();
            }
            else 
            {
		flag=true;
            }        
        }  



	//---获取数据储存到服务器
	function SendMessage(){
		validateCode();
		if(flag){
		var name=document.getElementById('name').value;
		var message=document.getElementById('message').value;
		//获取背景颜色----
		var  myselect=document.getElementById("selectionColor");
		var index=myselect.selectedIndex ;
		var SelectColor=myselect.options[index].value;
		//获取表情----
		var Exps = document.getElementsByName("Expression");
		for(var i=0;i<Exps.length;i++){
			if(Exps[i].checked) {
			var SelectExpression=Exps[i].value;
			}
		}
		//leancloud端
		var Messages = AV.Object.extend("Messages");
		var messages = new Messages();
		messages.set("name", name);
		messages.set("message", message);
		messages.set("SelectColor", SelectColor);
		messages.set("SelectExpression", SelectExpression);
		messages.save(null, {
 			 success: function(messages) {
 			  alert('留言成功！');
			  location.reload();
  			},
  			 error: function(messages, error) {
 		    
  		     alert('留言失败');
 		    }
		 });
		 
		}//if--------------
	}


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
 *当文档加载完毕时?
 */

function notes(){
    
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
    var baseOffsetTop = 200;
    
    //留言条出现的最低位置
    var maxHeight = 960-225;
    
    //留言条出现的最右位置
    
    var maxWidth = 960-235;
    //暂停执行
   
  
	for(var i=0;i<notes.length;i++)
    {
     	  makeDraggable(notes[i]);
        
     	  //随机出现位置
    	   notes[i].style.top = baseOffsetTop + GetRandomNum(0 , maxHeight);
    	   notes[i].style.left =baseOffsetLeft + GetRandomNum(0 ,maxWidth);
        
    	   //位置确定后淡入
   	    fadeIn(notes[i]);
      }
    
    //alert("2");
    
}