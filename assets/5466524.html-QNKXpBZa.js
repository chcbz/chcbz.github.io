import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as t,c as a,b as e,d as i,e as l,f as c}from"./app-5ZyUDSyM.js";const d={},v=c(`<p>在hibernate中，用criteria实现后台分页方法，不多说了直接看程序吧。</p><p>下面首先根据查询条件和每页记录数获得记录列表：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码就这么多，很容易看明白的。</p>`,7),u={href:"http://jiaxy917.javaeye.com/blog/452157",target:"_blank",rel:"noopener noreferrer"};function o(m,b){const n=s("ExternalLinkIcon");return t(),a("div",null,[v,e("p",null,[i("此文转自:"),e("a",u,[i("http://jiaxy917.javaeye.com/blog/452157"),l(n)])])])}const f=r(d,[["render",o],["__file","5466524.html.vue"]]);export{f as default};
