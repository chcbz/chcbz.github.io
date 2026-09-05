import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as a,c as l,f as o,b as i,d as t,e as d}from"./app-E1vXAF15.js";const c={},u={href:"http://jiaxy917.javaeye.com/blog/452157",target:"_blank",rel:"noopener noreferrer"};function m(v,e){const n=s("ExternalLinkIcon");return a(),l("div",null,[e[2]||(e[2]=o(`<p>In hibernate, use criteria to implement the background paging method, let&#39;s not talk about it and just look at the program.</p><p>The following first obtains the list of records according to the query conditions and the number of records per page:</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
   * Get the log list according to different conditions
   * @param inter interface name
   * @param firstResult start record
   * @param maxResult The maximum number of records displayed per page
   * @return
*/
public List&lt;UipInterfaceLog&gt; getUipInterfaceLogsByCondition (String inter, int firstResult, int maxResult) {
   List&lt;UipInterfaceLog&gt; result = null;
   Criteria criteria = this.getSession().createCriteria(UipInterfaceLog.class);
   criteria.add(Restrictions.like(&quot;inter&quot;, inter));
   criteria. setFirstResult(firstResult);
   criteria. setMaxResults(maxResult);
   result = criteria. list();
   return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here, for the sake of brevity, I removed the other conditions of the query, you can add it yourself when you use it, and you can replace Object.class with the corresponding entity when you use it.</p><p>The following is the total number of records that meet the conditions</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
   * Get the total number of records according to the condition
   * @param inter
*/
public int getUipInterfaceLogsByCondition (String inter) {
   List&lt;UipInterfaceLog&gt; result = null;
   Criteria criteria = this. getSession(). createCriteria(Object. class);
   criteria.add(Restrictions.like(&quot;inter&quot;, inter));
// return criteria.list().size; must not be written like this, if written like this, as the number of records in the database increases, more and more objects will be created each time, and the execution speed of this method will become slower and slower, eventually It will cause memory overflow and cause the system to crash.
   return ((Integer) criteria. setProjection(Projections. rowCount()). uniqueResult()). intValue();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are so many codes, it is easy to understand.</p>`,7)),i("p",null,[e[1]||(e[1]=t("This article is transferred from: ",-1)),i("a",u,[e[0]||(e[0]=t("http://jiaxy917.javaeye.com/blog/452157",-1)),d(n)])])])}const f=r(c,[["render",m],["__file","5466524.html.vue"]]);export{f as default};
