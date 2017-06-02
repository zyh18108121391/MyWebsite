<dl class="tbox">
        <dt><strong><a href="{dede:field name='typeurl'/}">{dede:field name='typename'/}</a></strong><span class="more"><a href="{dede:field name='typeurl'/}">¸ü¶à...</a></span></dt>
        <dd>
          <ul class="e6">
          {dede:arclist row='3' type='image.'}
           <li><a href="[field:arcurl/]" title="[field:title function='html2text(@me)' /]"><img src="[field:litpic/]" alt="[field:title function='html2text(@me)'/]"/></a></li>
		{/dede:arclist}
          </ul>
          <ul class="c2 ico3">
          {dede:arclist titlelen='60' row='8'}
            <li><a href="[field:arcurl /]">[field:title /]</a></li>
			{/dede:arclist}
          </ul>
        </dd>
      </dl>