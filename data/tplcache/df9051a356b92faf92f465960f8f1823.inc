<li><span style="float:right; margin-right:5px; color:#CCCCCC">[field:pubdate function=MyDate('Y-m-d',@me)/]</span>
					<a href="[field:arcurl /]">[field:title /]...</a>
					</li>
					
				</ul>
			</div>
		</div>
		<div id="Video">
		<div id="header">
			<span id="head_left">��Ƶ-VIDEO</span>
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
			
			<span id="head_left">���-PHOTO</span>
			{dede:type typeid='43'}
			<span id="head_right"><a href="[field:typeurl /]">MORE+</a></span>
			{/dede:type}
			</div>		
<!--����ͼƬ start-->
<DIV class=rollphotos>
<DIV class=blk_29>
<DIV class=LeftBotton id=LeftArr></DIV>
<DIV class=Cont id=ISL_Cont_1><!-- ͼƬ�б� begin -->

	{dede:arclist row=10 typeid='45' orderby=pubdate type='image' imgwidth='124' imgheight='84'}
	<DIV class=box><A class=imgBorder href="[field:arcurl/]" target=_blank>[field:image/]</A> <P><A href="[field:arcurl/]" target=_blank>[field:title/]</A></P>
	</DIV>

<!-- ͼƬ�б� end --></DIV>
<DIV class=RightBotton id=RightArr></DIV></DIV>
<SCRIPT language=javascript type=text/javascript>
		<!--//--><![CDATA[//><!--
		var scrollPic_02 = new ScrollPic();
		scrollPic_02.scrollContId   = "ISL_Cont_1";
		scrollPic_02.arrLeftId      = "LeftArr";//���ͷID
		scrollPic_02.arrRightId     = "RightArr"; //�Ҽ�ͷID
		scrollPic_02.frameWidth     = 908;//��ʾ�����
		scrollPic_02.pageWidth      = 160; //��ҳ����
		scrollPic_02.speed          = 50; //�ƶ��ٶ�(���룬ԽСԽ��)
		scrollPic_02.space          = 10; //ÿ���ƶ�����(��λpx��Խ��Խ��)
		scrollPic_02.autoPlay       = true; //�Զ�����
		scrollPic_02.autoPlayTime   = 3; //�Զ����ż��ʱ��(��)
		scrollPic_02.initialize(); //��ʼ��
		//--><!]]>
	</SCRIPT>
	</DIV>
	<!--����ͼƬ end-->
					
		</div>
  	</div><!--content end-->
	
{dede:include filename="footer.html"