// JavaScript Document
<!--�ѱ�����Ϣ���͵�leancloud������-->
	Search();
	createCode();
	function Search(){	
		MessagesStr='';
		MessagesStr=MessagesStr+"<div id='Tips'><div style='text-align:center'> ��ܰ��ʾ��</div>@������������Բ�����(��bug���Ѿ������)<br>@���������ԣ�������������ȶ�Ա����Ȼ���������Ҳ������㹷�յģ������������Ұ�����~~��<br>@������ǩ�����϶�Ŷ~~���ֻ������⣩</div>";
		
		var Messages = AV.Object.extend("Messages");
		var query = new AV.Query(Messages);
		query.find({
        success: function(results) {
        //alert(results.length+'������');
       for (var i = 0; i < results.length; i++) {
       var object = results[i];
	   
	   MessagesStr=MessagesStr+"<div name='note' class='note'>";
	   
	   //������ɫ�ж� -ͷ
	   if(object.get('SelectColor')=="LightBlue"){
	   MessagesStr=MessagesStr+"<div class='nhead' style='background-image: url(./images/a5_1.gif);'>";
	   }
	   else{MessagesStr=MessagesStr+"<div class='nhead' style='background-image: url(./images/a1_1.gif);'>";}
	   //-------------
	   
	   //ʱ��time
	   MessagesStr=MessagesStr+object.createdAt.getFullYear()+'-'+eval(object.createdAt.getMonth()+1)+'-'+object.createdAt.getDate();//�·�Ҫ+1 �Ǵ�0��ʼ 
	   MessagesStr=MessagesStr+"</div>";
	   
	   
	    //������ɫ�ж� -��
	   if(object.get('SelectColor')=="LightBlue"){
	   MessagesStr=MessagesStr+"<div class='nbody' style='background-image: url(./images/a5_2.gif);'>";
	   }
	   else{MessagesStr=MessagesStr+"<div class='nbody' style='background-image: url(./images/a1_2.gif);'>";}
	   //-------------
	   //���Բ��� messages
	   MessagesStr=MessagesStr+object.get('message');
	   MessagesStr=MessagesStr+"</div>";
	   //---------------
	   
	    //������ɫ�ж� -β
	   if(object.get('SelectColor')=="LightBlue"){
	   MessagesStr=MessagesStr+"<div class='nfoot' style='background-image: url(./images/a5_3.gif);'>";
	   }
	   else{MessagesStr=MessagesStr+"<div class='nfoot' style='background-image: url(./images/a1_3.gif);'>";}
	   //����?��?
	   MessagesStr=MessagesStr+"<div class='moodpic'>";
	   MessagesStr=MessagesStr+"<img src=\'Expression/"+object.get('SelectExpression')+".png\'/>";
	   MessagesStr=MessagesStr+"</div>";
	   
	   //��������
	   MessagesStr=MessagesStr+"<div class='username'>";
	   MessagesStr=MessagesStr+'&'+object.get('name');
	   MessagesStr=MessagesStr+"</div>";
	   //��β
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
	//--��֤��------------------
	var code;
	var flag=false;
        function createCode() {
	  code = "";
            var codeLength = 4; //��֤��ĳ���
            var checkCode = document.getElementById("checkCode");
	//alert(checkCode);
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 				            //���к�ѡ�����֤����ַ�����ȻҲ���������ĵ�
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
                alert("��������֤�룡");
            }
            else if (inputCode.toUpperCase() != code.toUpperCase()) 
            {
                alert("��֤����������");
                createCode();
            }
            else 
            {
		flag=true;
            }        
        }  



	//---��ȡ���ݴ��浽������
	function SendMessage(){
		validateCode();
		if(flag){
		var name=document.getElementById('name').value;
		var message=document.getElementById('message').value;
		//��ȡ������ɫ----
		var  myselect=document.getElementById("selectionColor");
		var index=myselect.selectedIndex ;
		var SelectColor=myselect.options[index].value;
		//��ȡ����----
		var Exps = document.getElementsByName("Expression");
		for(var i=0;i<Exps.length;i++){
			if(Exps[i].checked) {
			var SelectExpression=Exps[i].value;
			}
		}
		//leancloud��
		var Messages = AV.Object.extend("Messages");
		var messages = new Messages();
		messages.set("name", name);
		messages.set("message", message);
		messages.set("SelectColor", SelectColor);
		messages.set("SelectExpression", SelectExpression);
		messages.save(null, {
 			 success: function(messages) {
 			  alert('���Գɹ���');
			  location.reload();
  			},
  			 error: function(messages, error) {
 		    
  		     alert('����ʧ��');
 		    }
		 });
		 
		}//if--------------
	}


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
 *���ĵ��������ʱ?
 */

function notes(){
    
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
    var baseOffsetTop = 200;
    
    //���������ֵ����λ��
    var maxHeight = 960-225;
    
    //���������ֵ�����λ��
    
    var maxWidth = 960-235;
    //��ִͣ��
   
  
	for(var i=0;i<notes.length;i++)
    {
     	  makeDraggable(notes[i]);
        
     	  //�������λ��
    	   notes[i].style.top = baseOffsetTop + GetRandomNum(0 , maxHeight);
    	   notes[i].style.left =baseOffsetLeft + GetRandomNum(0 ,maxWidth);
        
    	   //λ��ȷ������
   	    fadeIn(notes[i]);
      }
    
    //alert("2");
    
}