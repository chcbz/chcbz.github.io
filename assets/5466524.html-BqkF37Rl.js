import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as a,c as l,f as d,b as i,d as n,e as c}from"./app-E1vXAF15.js";const v={},u={href:"http://jiaxy917.javaeye.com/blog/452157",target:"_blank",rel:"noopener noreferrer"};function o(m,e){const r=t("ExternalLinkIcon");return a(),l("div",null,[e[2]||(e[2]=d(`<p>在hibernate中，用criteria实现后台分页方法，不多说了直接看程序吧。</p><p>下面首先根据查询条件和每页记录数获得记录列表：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
  * 根据不同条件获取日志列表
  * @param inter 接口名称
  * @param firstResult 起始记录
  * @param maxResult  每页显示的最大记录数
  * @return
*/
public List&lt;UipInterfaceLog&gt; getUipInterfaceLogsByCondition (String inter,int firstResult, int maxResult) {
  List&lt;UipInterfaceLog&gt; result = null;
  Criteria criteria = this.getSession().createCriteria(UipInterfaceLog.class);
  criteria.add(Restrictions.like(&quot;inter&quot;, inter));
  criteria.setFirstResult(firstResult);
  criteria.setMaxResults(maxResult);
  result = criteria.list();
  return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，为了简洁，我把查询的其他条件去掉了，用的时候可以自己添加，另外在使用的时候把Object.class换成相应的实体就可以了。</p><p>下面是得到符合条件的记录总数</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
  * 根据条件得到记录总数
  * @param inter
*/
public int getUipInterfaceLogsByCondition (String inter) {
  List&lt;UipInterfaceLog&gt; result = null;
  Criteria criteria = this.getSession().createCriteria(Object.class);
  criteria.add(Restrictions.like(&quot;inter&quot;, inter));
// return criteria.list().size; 一定不能写成这样，如果这样写，随着数据库中记录的增多，每次创建的对象会越来越多，这个方法执行速度会越来越慢，最终会内存溢出导致系统崩溃。
  return ((Integer) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码就这么多，很容易看明白的。</p>`,7)),i("p",null,[e[1]||(e[1]=n("此文转自:",-1)),i("a",u,[e[0]||(e[0]=n("http://jiaxy917.javaeye.com/blog/452157",-1)),c(r)])])])}const g=s(v,[["render",o],["__file","5466524.html.vue"]]);export{g as default};
