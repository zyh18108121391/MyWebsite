(function(){
var p = {
url:location.href,
showcount:'1',/*�Ƿ���ʾ��������,��ʾ��'1'������ʾ��'0' */
desc:'',/*Ĭ�Ϸ�������(��ѡ)*/
summary:'',/*����ժҪ(��ѡ)*/
title:'',/*�������(��ѡ)*/
site:'',/*������Դ �磺��Ѷ��(��ѡ)*/
pics:'', /*����ͼƬ��·��(��ѡ)*/
style:'102',
width:145,
height:30
};
var s = [];
for(var i in p){
s.push(i + '=' + encodeURIComponent(p[i]||''));
}
document.write(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">����</a>'].join(''));
})();