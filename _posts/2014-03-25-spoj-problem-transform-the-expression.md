---
layout: page
title: transform-the-expression-SPOJ-4
category: python
comments: true
---


```
Transform the algebraic expression with brackets into RPN form (Reverse Polish Notation). Two-argument operators: +, -, *, /, ^ (priority from the lowest to the highest), brackets ( ). Operands: only letters: a,b,...,z. Assume that there is only one RPN form (no expressions like a*b*c). 
```

### INPUT

t [the number of expressions <= 100]
expression [length <= 400]
[other expressions]

Text grouped in [ ] does not appear in the input file. 

### OUTPUT

The expressions in RPN form, one per line.

### Example

Input:
<pre>
3
(a+(b*c))
((a+b)*(z+x))
((a+t)*((b+(a+c))^(c+d)))
</pre>
Output:
<pre>
abc*+
ab+zx+*
at+bac++cd+^*
</pre>


{% highlight python %}
import sys
import time

def open_file(filename):
    try:
        return open(filename, 'r')
    except IOError:
        print "Error opening input file: ",filename
        sys.exit()


def transform_line(line):
    stack_symbol = []
    stack_ch = []
    for i in xrange(len(line)):
        if( line[i] >= 'a'
           and line[i] <= 'z'):
            stack_ch.append(line[i])
            if(i == len(line) - 1):
                s = stack_symbol.pop()
                c2 = stack_ch.pop()
                c1 = stack_ch.pop()
                stack_ch.append(c1 + c2 + s)
        elif(line[i] == ')'):
            s = stack_symbol.pop()
            c2 = stack_ch.pop()
            c1 = stack_ch.pop()
            stack_ch.append(c1 + c2 + s)
        elif(line[i] != '('):
            stack_symbol.append(line[i])

    return ''.join(stack_ch)

if __name__ == '__main__':
    file = open_file('test.txt')
    group = file.readline()
    start = time.time()
    for i in xrange(int(group)):
        line = file.readline()
        line = line.rstrip('\n')
        print 'transform before : ',line
        line = transform_line(line)
        print 'transform after : ',line

    file.close();

    print 'duration is',time.time() - start
{% endhighlight html %}

### 扯淡

思路：

总的想法是通过运算符栈和字符栈来解决问题。

入栈操作：将运算符和字符分别压入运算符栈和字符栈

出栈操作：运算符正常pop出栈，字符栈pop弹出两个字符，并且与新弹出的运算符合并成新的字符压入字符栈

遍历字符串，分别判断三种情况

* 当是字符时，字符进行入栈操作,这里有个特殊情况，当这个字符是最后一个字符时，进行完入栈操作后接着进行出栈操作

* 当字符为')'时，进行出栈操作

* 当字符为运算符时，运算符执行入栈操作

遍历而结束后运算符栈为空，而字符栈内剩一个，就是转换完后的字符串

{{ page.date | date_to_string }}
