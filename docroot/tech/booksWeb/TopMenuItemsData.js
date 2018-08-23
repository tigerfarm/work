/*
 * Note, the CourseModuleData.js list MUST match the same list and order as in CourseList.js
 * 
 */
aCounter=1;
modOrder=new Array();
modOrderHref=new Array();
modOrderHrefPrev=new Array();
modOrderHrefNext=new Array();

modOrder[aCounter]="intro";
modNum_intro=aCounter;aCounter++;
modOrder[aCounter]="css4";
modNum_css4=aCounter;aCounter++;
modOrder[aCounter]="JavaScript";
modNum_JavaScript=aCounter;aCounter++;

aCounter=1;

modOrderHrefNext[aCounter]='<a href="../'+modOrder[aCounter+1]+'/index.html" target="_parent">Next Module</a> &rArr;';
aCounter++;
modOrderHrefPrev[aCounter]='&lArr; <a href="../'+modOrder[aCounter-1]+'/index.html" target="_parent">Previous</a>';
modOrderHrefNext[aCounter]='<a href="../'+modOrder[aCounter+1]+'/index.html" target="_parent">Next Module</a> &rArr;';
aCounter++;
modOrderHrefPrev[aCounter]='&lArr; <a href="../'+modOrder[aCounter-1]+'/index.html" target="_parent">Previous</a>';
modOrderHrefNext[aCounter]='<a href="../'+modOrder[aCounter+1]+'/index.html" target="_parent">Next Module</a> &rArr;';
aCounter++;

// eof
