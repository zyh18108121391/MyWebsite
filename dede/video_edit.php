<?php
require_once(dirname(__FILE__)."/config.php");
CheckPurview('a_Edit,a_AccEdit,a_MyEdit');
require_once(DEDEINC."/customfields.func.php");
require_once(DEDEADMIN."/inc/inc_archives_functions.php");
if(empty($dopost))
{
	$dopost = '';
}
if($dopost!='save')
{
	require_once(DEDEADMIN."/inc/inc_catalog_options.php");
	require_once(DEDEINC."/dedetag.class.php");
	$aid = ereg_replace("[^0-9]",'',$aid);
	$channelid="3";

	//读取归档信息
	$arcQuery = "Select
    #@__channeltype.typename as channelname,
    #@__arcrank.membername as rankname,
    #@__archives.*
    From #@__archives
    left join #@__channeltype on #@__channeltype.id=#@__archives.channel
    left join #@__arcrank on #@__arcrank.rank=#@__archives.arcrank
    where #@__archives.id='$aid'";
	$dsql->SetQuery($arcQuery);
	$arcRow = $dsql->GetOne($arcQuery);
	if(!is_array($arcRow))
	{
		ShowMsg("读取档案基本信息出错!","-1");
		exit();
	}
	$query = "Select * From `#@__channeltype` where id='".$arcRow['channel']."'";
	$cInfos = $dsql->GetOne($query);
	if(!is_array($cInfos))
	{
		ShowMsg("读取频道配置信息出错!","javascript:;");
		exit();
	}
	$addtable = $cInfos['addtable'];
	$addQuery = "Select * From `$addtable` where aid='$aid'";
	$addRow = $dsql->GetOne($addQuery);
	$newRowStart = 1;
	$nForm = '';

	//获取视频列表
	$viedolist = $addRow["videolist"];
	$list = explode('{li}',$viedolist);
	$playlist = '';
	$l = 0;
	for($i = 0;$i < count($list);$i++){
		$video = explode('{span}',$list[$i]);
		if(empty($video[0])) continue ;
		if(empty($video[1])) continue ;
		$l++;
		$playlist .="
	<input name=\"videoname[{$l}]\" type=\"text\" id=\"videoname{$l}\" value=\"{$video[0]}\" size=\"20\" />
	&nbsp;&nbsp;
	<input type=\"text\" id=\"videourl{$l}\" name=\"videourl[{$l}]\" value=\"{$video[1]}\" style=\"width:300px\"/>
	<input name=\"sel{$l}\" type=\"button\" id=\"sel{$l}\" value=\"选取\" onclick=\"SelectMedia('form1.videourl{$l}')\" class=\"inputbut\" /><br/>";
	}
	
	$channelid = $arcRow['channel'];
	$tags = GetTags($aid);
	include DedeInclude("templets/video_edit.htm");
	exit();
}
/*--------------------------------
function __save(){  }
-------------------------------*/
else if($dopost=='save')
{
	require_once(DEDEINC.'/image.func.php');
	require_once(DEDEINC.'/oxwindow.class.php');
	
	$flag = isset($flags) ? join(',',$flags) : '';
  if(empty($typeid2)) $typeid2 = 0;
	if(!isset($autokey)) $autokey = 0;
	if(!isset($remote)) $remote = 0;
	if(!isset($dellink)) $dellink = 0;
	if(!isset($autolitpic)) $autolitpic = 0;

	if($typeid==0)
	{
		ShowMsg("请指定文档的栏目！","-1");
		exit();
	}
	if(empty($channelid))
	{
		ShowMsg("文档为非指定的类型，请检查你发布内容的表单是否合法！","-1");
		exit();
	}
	if(!CheckChannel($typeid,$channelid))
	{
		ShowMsg("你所选择的栏目与当前模型不相符，请选择白色的选项！","-1");
		exit();
	}
	if(!TestPurview('a_Edit'))
	{
		if(TestPurview('a_AccEdit'))
		{
			CheckCatalog($typeid,"对不起，你没有操作栏目 {$typeid} 的文档权限！");
		}
		else
		{
			CheckArcAdmin($id,$cuserLogin->getUserID());
		}
	}

	//对保存的内容进行处理
	$pubdate = GetMkTime($pubdate);
	$senddate = time();
	$sortrank = AddDay($pubdate,$sortup);
	if($ishtml==0)
	{
		$ismake = -1;
	}
	else
	{
		$ismake = 0;
	}
	$title = cn_substrR($title,$cfg_title_maxlen);
	$shorttitle = cn_substrR($shorttitle,36);
	$color =  cn_substrR($color,7);
	$writer =  cn_substrR($writer,20);
	$source = cn_substrR($source,30);
	$description = cn_substrR($description,250);
	$keywords = cn_substrR($keywords,30);
	$filename = trim(cn_substrR($filename,40));
	if(!TestPurview('a_Check,a_AccCheck,a_MyCheck'))
	{
		$arcrank = -1;
	}
	$adminid = $cuserLogin->getUserID();

	//处理上传的缩略图
	if(empty($ddisremote))
	{
		$ddisremote = 0;
	}
	$litpic = GetDDImage('litpic',$picname,$ddisremote);

	
	//处理图片文档的自定义属性
	if($litpic!='' && !ereg('p',$flag))
	{
		$flag = ($flag=='' ? 'p' : $flag.',p');
	}
	if($redirecturl!='' && !ereg('j',$flag))
	{
		$flag = ($flag=='' ? 'j' : $flag.',j');
	}
	
//附加表信息
if(!isset($players)) $players = 0;
$videolist='';
for($i=1;$i<=count($videoname);$i++){
	if(empty($videoname[$i])) continue ;
	if(empty($videourl[$i])) continue ;
	$videolist .= "$videoname[$i]{span}$videourl[$i]{li}";
}
$plot = AnalyseHtmlBody($plot,$description,$litpic,$keywords,'htmltext');

	//更改主档案表
	$inQuery = "Update `#@__archives` set
	    typeid='$typeid',
	    typeid2='$typeid2',
	    sortrank='$sortrank',
	    flag='$flag',
	    ismake='$ismake',
	    arcrank='$arcrank',
	    money='$money',
	    title='$title',
	    color='$color',
	    source='$source',
	    writer='$writer',
	    litpic='$litpic',
	    pubdate='$pubdate',
	    description='$description',
	    keywords='$keywords',
	    shorttitle='$shorttitle',
	    filename='$filename'
	    where id='$id'; ";
	if(!$dsql->ExecuteNoneQuery($inQuery))
	{
		ShowMsg("更新数据库archives表时出错，请检查！","-1");
		exit();
	}



	//更新附加表
	$cts = $dsql->GetOne("Select addtable From `#@__channeltype` where id='$channelid' ");
	$addtable = trim($cts['addtable']);
	if($addtable!='')
	{
		$useip = GetIP();
		$inQuery = "update `$addtable`
	      set typeid ='$typeid',
	     videolist='$videolist',plot='$plot',Players='$players',language='$language',softrank='$softrank',
	      redirecturl='$redirecturl',
	      userip = '$useip'
	      where aid='$id';";
		if(!$dsql->ExecuteNoneQuery($inQuery))
		{
			ShowMsg("更新数据库附加表 addonsoft 时出错，请检查原因！","-1");
			exit();
		}
	}

	//生成HTML
	UpIndexKey($id,$arcrank,$typeid,$sortrank,$tags);
	$ID=$id;
	$arcUrl = MakeArt($id,true);
	if($arcUrl=="")
	{
		$arcUrl = $cfg_phpurl."/view.php?aid=$id";
	}

	//返回成功信息
	$msg = "
    　　请选择你的后续操作：
    <a href='video_add.php?cid=$typeid'><u>发布新视频</u></a>
    &nbsp;&nbsp;
    <a href='archives_do.php?aid=".$id."&dopost=editArchives'><u>继续编辑</u></a>
    &nbsp;&nbsp;
    <a href='$arcUrl' target='_blank'><u>查看视频</u></a>
    &nbsp;&nbsp;
    <a href='catalog_do.php?cid=$typeid&dopost=listArchives'><u>已发布视频管理</u></a>
    &nbsp;&nbsp;
    <a href='catalog_main.php'><u>网站栏目管理</u></a>
    ";
	$wintitle = "成功修改一个视频！";
	$wecome_info = "文章管理::修改视频";
	$win = new OxWindow();
	$win->AddTitle("成功修改视频：");
	$win->AddMsgItem($msg);
	$winform = $win->GetWindow("hand","&nbsp;",false);
	$win->Display();
}

?>