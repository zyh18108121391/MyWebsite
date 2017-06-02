<li><span style="float:right; margin-right:5px; color:#CCCCCC">[field:pubdate function=MyDate('Y-m-d',@me)/]</span>
					<a href="[field:arcurl /]">[field:title /]...</a>
					</li>
					
				</ul>
			</div>
		</div>
		<div id="Video">
		<div id="header">
			<span id="head_left">视频-VIDEO</span>
			{dede:type typeid='44'}
			<span id="head_right"><a href="[field:typeurl /]">MORE+</a></span>
			{/dede:type}
			</div>
		<div id="video_content">
		<embed src="http://www.tudou.com/a/Lqfme5hSolM/&bid=05&iid=132329576&rpid=438682365&resourceId=438682365_05_05_99/v.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="100%" height="225px"></embed>
		</div>
		</div>
		</div>
		
		<div id="Photos">
			<div id="header">
			
			<span id="head_left">相册-PHOTO</span>
			{dede:type typeid='43'}
			<span id="head_right"><a href="[field:typeurl /]">MORE+</a></span>
			{/dede:type}
			</div>		
<!--滚动图片 start-->
<DIV class=rollphotos>
<DIV class=blk_29>
<DIV class=LeftBotton id=LeftArr></DIV>
<DIV class=Cont id=ISL_Cont_1><!-- 图片列表 begin -->

	{dede:arclist row=10 typeid='45' orderby=pubdate type='image' imgwidth='124' imgheight='84'}
	<DIV class=box><A class=imgBorder href="[field:arcurl/]" target=_blank>[field:image/]</A> <P><A href="[field:arcurl/]" target=_blank>[field:title/]</A></P>
	</DIV>

<!-- 图片列表 end --></DIV>
<DIV class=RightBotton id=RightArr></DIV></DIV>
<SCRIPT language=javascript type=text/javascript>
		<!--//--><![CDATA[//><!--
		var scrollPic_02 = new ScrollPic();
		scrollPic_02.scrollContId   = "ISL_Cont_1";
		scrollPic_02.arrLeftId      = "LeftArr";//左箭头ID
		scrollPic_02.arrRightId     = "RightArr"; //右箭头ID
		scrollPic_02.frameWidth     = 908;//显示框宽度
		scrollPic_02.pageWidth      = 160; //翻页宽度
		scrollPic_02.speed          = 50; //移动速度(毫秒，越小越快)
		scrollPic_02.space          = 10; //每次移动像素(单位px，越大越快)
		scrollPic_02.autoPlay       = true; //自动播放
		scrollPic_02.autoPlayTime   = 3; //自动播放间隔时间(秒)
		scrollPic_02.initialize(); //初始化
		//--><!]]>
	</SCRIPT>
	</DIV>
	<!--滚动图片 end-->
					
		</div>
  	</div><!--content end-->
	
{dede:include filename="footer.html"