<?php
//ϵͳ����Ϊά��״̬�ɷ���
require_once(dirname(__FILE__)."/../include/common.inc.php");
require_once(DEDEINC.'/arc.archives.class.php');
$t1 = ExecTime();
if(empty($okview)) $okview = '';
if(isset($arcID)) $aid = $arcID;
if(!isset($dopost)) $dopost = '';
$arcID = $aid = (isset($aid) && is_numeric($aid)) ? $aid : 0;
$play = $play = (isset($play) && is_numeric($play)) ? $play : 1;
$width =  660;
$height =  500;

if($aid==0) die(" Request Error! ");
$arc = new Archives($aid);
if($arc->IsError) ParamError();
$players = $arc->addTableRow['players'];

function play($players,$url)
{
	global $width,$height;
	  if($players=='flash'){
		$play ="<embed src=\"{$url}\"  type=\"application/x-shockwave-flash\" width=\"{$width}\" height=\"{$height}\"></embed>";
		return $play;
		exit();
	}else if($players=='media'){
		$play = "<object id=\"player\" height=\"{$height}\" width=\"{$width}\" classid=\"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6\"> 
			<param name=\"AutoStart\" VALUE=\"-1\"> 
			<param name=\"url\" value=\"{$url}\"> 
			<param name=\"PlayCount\" VALUE=\"1\"> 
			<param name=\"volume\" value=\"50\"> 
			<param name=\"mute\" value=\"0\"> 
			<param name=\"uiMode\" value=\"full\"> 
			<param name=\"windowlessVideo\" value=\"0\"> 
			<param name=\"fullScreen\" value=\"0\"> 
			<param name=\"enableErrorDialogs\" value=\"-1\"> 
			<embed SRC type=\"audio/x-pn-realaudio-plugin\" CONSOLE=\"Clip1\" CONTROLS=\"ImageWindow,controlpanel\" HEIGHT=\"{$height}\" WIDTH=\"{$width}\" AUTOSTART=\"true\"> 
			</object>";
		return $play;
		exit();
	}else if($players=='real'){
		$play = "
		<OBJECT ID=video1 CLASSID=\"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA\" HEIGHT={$height} WIDTH={$width}> 
			<param name=\"_ExtentX\" value=\"9313\"> 
			<param name=\"_ExtentY\" value=\"7620\"> 
			<param name=\"AUTOSTART\" value=\"1\"> 
			<param name=\"SHUFFLE\" value=\"0\"> 
			<param name=\"PREFETCH\" value=\"0\"> 
			<param name=\"NOLABELS\" value=\"0\"> 
			<param name=\"SRC\" value=\"{$url}\"> 
			<param name=\"CONTROLS\" value=\"ImageWindow,controlpanel\"> 
			<param name=\"CONSOLE\" value=\"Clip1\"> 
			<param name=\"LOOP\" value=\"0\"> 
			<param name=\"NUMLOOP\" value=\"0\"> 
			<param name=\"CENTER\" value=\"0\"> 
			<param name=\"MAINTAINASPECT\" value=\"0\"> 
			<param name=\"BACKGROUNDCOLOR\" value=\"#000000\">
			<embed SRC type=\"audio/x-pn-realaudio-plugin\" CONSOLE=\"Clip1\" CONTROLS=\"ImageWindow,controlpanel\" HEIGHT=\"{$height}\" WIDTH=\"{$width}\" AUTOSTART=\"true\"> 
			</OBJECT> ";
		return $play;
		exit();
	}else if($players=='flv'){
		$play = "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width=\"{$width}\" height=\"{$height}\">
<param name=\"movie\" value=\"play/flv.swf\"><param name=\"quality\" value=\"high\">
<param name=\"menu\" value=\"false\"><param name=\"wmode\" value=\"opaque\"><param name=\"allowFullScreen\" value=\"true\" />
<param name=\"FlashVars\" value=\"vcastr_file={$url}&vcastr_title=flv&IsAutoPlay=1\">
<embed src=\"play/flv.swf\" allowFullScreen=\"true\" FlashVars=\"vcastr_file={$url}&IsAutoPlay=1\" menu=\"false\" quality=\"high\" width=\"{$width}\" height=\"{$height}\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" /></object>";
		return $play;
		exit();
	}else if($players=='qvod'){
		$play = "<object classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF' HEIGHT={$height} WIDTH={$width} id='QvodPlayer' name='QvodPlayer' onError=if(window.confirm('�����Ȱ�װQvodPlayer���,Ȼ��ˢ�±�ҳ�ſ�����������.')){window.open('http://www.qvod.com/download.htm')}else{self.location='http://www.qvod.com/'}>
			<PARAM NAME='URL' VALUE='{$url}'>
			<PARAM NAME='Autoplay' VALUE='1'>
			</object>";
		return $play;
		exit();
}else if($players=='gvod'){
		$play = "<object classid='clsid:7040AE7C-D539-4ABB-BEA1-B5E58A3D2654' HEIGHT={$height} WIDTH={$width} id='GvodPlayer' name='GvodPlayer' onError=if(window.confirm('�����Ȱ�װѸ��GVOD ������,Ȼ��ˢ�±�ҳ�ſ�����������.')){window.open('http://gvod.down.xunlei.com/gvod/gvod.exe')}else{self.location='http://gvod.xunlei.com/'}>
			<PARAM NAME='URL' VALUE='{$url}'>
			<PARAM NAME='Autoplay' VALUE='1'>
			</object>";
		return $play;
		exit();
	}else if($players=='mp3'){
		$play = "<object id=\"player\" height=\"{$height}\" width=\"{$width}\" classid=\"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6\"> 
			<param name=\"AutoStart\" VALUE=\"-1\"> 
			<param name=\"url\" value=\"{$url}\"> 
			<param name=\"PlayCount\" VALUE=\"1\"> 
			<param name=\"volume\" value=\"50\"> 
			<param name=\"mute\" value=\"0\"> 
			<param name=\"uiMode\" value=\"full\"> 
			<param name=\"windowlessVideo\" value=\"0\"> 
			<param name=\"fullScreen\" value=\"0\"> 
			<param name=\"enableErrorDialogs\" value=\"-1\"> 
			<embed SRC type=\"audio/x-pn-realaudio-plugin\" CONSOLE=\"Clip1\" CONTROLS=\"ImageWindow,controlpanel\" HEIGHT=\"{$height}\" WIDTH=\"{$width}\" AUTOSTART=\"true\"> 
			</object>";
		return $play;
		exit();
}else if($players=='�ſ�'){
		$play = "<embed type=\"application/x-shockwave-flash\" src=\"http://player.youku.com/player.php/sid/{$url}/v.swf\" id=\"movie_player\" name=\"movie_player\" bgcolor=\"#FFFFFF\" quality=\"high\" allowfullscreen=\"true\" flashvars=\"isShowRelatedVideo=false&showAd=0&show_pre=1&show_next=1&isAutoPlay=true&isDebug=false&UserID=&winType=interior&playMovie=true&MMControl=false&MMout=false&RecordCode=1001,1002,1003,1004,1005,1006,2001,3001,3002,3003,3004,3005,3007,3008,9999\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" width=\"{$width}\" height=\"{$height}\">";
		return $play;
		exit();
}else if($players=='�Ѻ�'){
		$play = "<embed type=\"application/x-shockwave-flash\" src=\"http://tv.sohu.com/upload/swf/20101021/Main.swf?autoplay=true&vid={$url}\" width=\"{$width}\" height=\"{$height}\" type=\"application/x-shockwave-flash\" allowFullScreen=\"true\" allownetworking=\"internal\" allowscriptaccess=\"never\" wmode=\"opaque\">";
		return $play;
		exit();
}else if($players=='����'){
		$play = "<embed allowfullscreen=\"true\" src=\"http://video.sina.com.cn/deco/2008/1118/flvPlayer1218.swf?vid={$url}&clip_id=&imgurl=&auto=1&vblog=1&type=0&tabad=1\" quality=\"high\" bgcolor=\"#000\" width=\"{$width}\" height=\"{$height}\" name=\"player\" id=\"playerr\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\">";
		return $play;
		exit();	
}else if($players=='����'){
		$play = "<embed type=\"application/x-shockwave-flash\" src=\"http://img1.c0.ku6.cn/player/pV1.2.swf?ver=107&auto=1&type=v&vid={$url}\" width=\"{$width}\" height=\"{$height}\" type=\"application/x-shockwave-flash\" allowFullScreen=\"true\" allownetworking=\"internal\" allowscriptaccess=\"never\" wmode=\"opaque\">";
		return $play;
		exit();
}else if($players=='����'){
		$play = "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0\" width=\"{$width}\" height=\"{$height}\" id=\"flashplayer\"><param name=\"movie\" value=\"http://www.qiyi.com/player/{$url}/qiyi_player.swf\" /><param name=\"quality\" value=\"high\" /><param name=\"allowScriptAccess\" value=\"always\" /><param name=\"allowFullScreen\" value=\"true\" /><param name=\"flashvars\" value=\"vid={$url}\" /><embed src=\"http://www.qiyi.com/player/{$url}/qiyi_player.swf\" quality=\"high\" pluginspage=\"http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application/x-shockwave-flash\" width=\"{$width}\" height=\"{$height}\" allowScriptAccess=\"always\" allowFullScreen=\"true\" flashvars=\"vid={$url}\"></embed></object>";
		return $play;
		exit();
}else if($players=='����'){
		$play = "<object><param name=\"movie\" value=\"http://www.tudou.com/v/{$url}/&withRecommendList=false&autoPlay=true&videoClickNavigate=false&withSearchBar=false&withRecommendList=false/v.swf\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><param name=\"wmode\" value=\"opaque\"></param><embed src=\"http://www.tudou.com/v/{$url}/&withRecommendList=false&autoPlay=true&videoClickNavigate=false&withSearchBar=false&withRecommendList=false/v.swf\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" wmode=\"opaque\" width=\"{$width}\" height=\"{$height}\"></embed></object>";
		return $play;
		exit();
}else if($players=='�ٶ�Ӱ��'){	    
		$play = "<script language=\"javascript\">
var BdPlayer = new Array();
BdPlayer['time'] = 3;//������չʾʱ��(�����Ϊ0,����ݻ�������Զ����ƹ��չʾʱ��)
BdPlayer['width'] = $width;//���������
BdPlayer['height'] = $height;//�������߶�
BdPlayer['url'] = '$url';//��ǰ�������񲥷ŵ�ַ
BdPlayer['nextcacheurl'] = '';//��һ�����ŵ�ַ(û��������)
BdPlayer['lastwebpage'] = '';//��һ����ҳ��ַ(û��������)
BdPlayer['nextwebpage'] = '';//��һ����ҳ��ַ(û��������)
BdPlayer['buffer'] = 'http://www.uu57.com/plus/play/gg.htm';
BdPlayer['download'] = 'http://dl.client.baidu.com/BaiduPlayer/BaiduPlayer1.0.22.39.exe';//���������ص�ַ
</script>
		<script language=\"javascript\" src=\"http://player.baidu.com/lib/player.js\" charset=\"utf-8\"></script>";	
		return $play;
		exit();
}else if($players=='��Ѷ��Ƶ'){	    
		$play = "<embed allowfullscreen=\"true\" src=\"http://cache.tv.qq.com/qqplayerout.swf?vid={$url}\" quality=\"high\" bgcolor=\"#000\" width=\"{$width}\" height=\"{$height}\" name=\"playerr\" id=\"playerr\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\">";	
		return $play;
		exit();
		}
	
	
	}

$videolist = $arc->addTableRow['videolist'];
	if(empty($videolist)) {
		ShowMsg('�����б�Ϊ��!!!','');	
		exit();
	}
	$play= $play-1;
	$palylist = explode('{li}',$videolist);
	$video = explode('{span}',$palylist[$play]);    
	$vurl = $video[1];//��ǰ��ƵURL
        $vlanguage = $arc->addTableRow['language']; //���Եĵ��� 
		$vsoftrank = $arc->addTableRow['softrank'];//�ȼ��ĵ���
	$vname = $arc->Fields['title'].'-'.$video[0];//��ǰ��Ƶ����
	$vkeywords = $arc->Fields['keywords'];//��ǰ��Ƶ�ؼ���
        $vclick = $arc->Fields['click'];//��ǰ��Ƶ�ۿ���
        $vdescription = $arc->Fields['description'];//��ǰ��Ƶ���
	$vlitpic = $arc->Fields['litpic'];//��ǰ��Ƶ����ͼ

include_once(DEDETEMPLATE.'/plus/play.htm'); 



?>