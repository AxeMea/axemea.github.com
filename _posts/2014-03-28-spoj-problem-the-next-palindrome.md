---
layout: default
title: the-next-palindrome-SPOJ-5
category: python
comments: true
---

##{{ page.title }}

A positive integer is called a palindrome if its representation in the decimal system is the same when read from left to right and from right to left. For a given positive integer K of not more than 1000000 digits, write the value of the smallest palindrome larger than K to output. Numbers are always displayed without leading zeros.

###INPUT

The first line contains integer t, the number of test cases. Integers K are given in the next t lines.

###OUTPUT

For each K, output the smallest palindrome larger than K.

###Example

Input:

```
2
808
2133

Output:
818
2222
```

###Code
```python
# -*- coding: utf-8 -*-   
import sys
import time
import math

def open_file(filename):
    try:
        return open(filename, 'r')
    except IOError:
        print "Error opening input file: ",filename
        sys.exit()

#去除空格
def trim(line):
    return line.rstrip('\n')

#将字符串换转成list
def str_to_list(line):
    list = []

    for i in xrange(len(line)):
        list.append(line[i])

    return list

#补零
def fill_zero(line):
    print 'fill_zero'
    lists = str_to_list(line)
    l = len(lists)
    middle = int(math.ceil(l/2.0))
    s = False

    for i in xrange(middle):
        front = middle - i - 1
        end =  l - front - 1
        if(lists[front] <= lists[end] and int(lists[front]) >= 0 and int(lists[front]) < 9 and not s):
            lists[front] = str(int(lists[front]) + 1)
            lists[end] = lists[front]
            s = True
        elif(s):
            lists[end] = lists[front]
        else:
            lists[i] = '0'

    return ''.join(lists)



#预处理，先处理掉如99999这样最高位需要进位的数字
def pre_palindrome(line):
    _list = str_to_list(line)
    s = False

    for i in xrange(len(_list)):
        if(_list[i] != '9'):
            s = True

    if(s):
        return line
    else:
        return str(int(line) + 1)

#主函数递归
def palindrome(line):
    print 'palindromes'
    _list = str_to_list(line)
    s = False
    l = len(_list)
    middle = int(math.ceil(l / 2.0))

    for i in xrange(middle - 1,-1,-1):
        if(i != l - i -1):
            if(int(_list[i]) > int(_list[l - i  -1])):
                s = True
            
        _list[l - i  - 1] = _list[i]


    if(s):
        return ''.join(_list)
    else:
        return fill_zero(line)

  
'''if __name__ == '__main__':
    while True:
        group = sys.stdin.readline()
        for i in xrange(int(group)):
            line = sys.stdin.readline()
            print 'transform before : ',line 
            line = transform_line(line)
            print 'transform after : ',line
            '''
            
if __name__ == '__main__':
    file = open_file('test.txt')
    group = file.readline()
    group = trim(group)
    start = time.time()
    for i in xrange(int(group)):
        line = file.readline()
        line = trim(line)
        print '-',line
        line = pre_palindrome(line)
        line = palindrome(line)
        print '+',line

    file.close();

    print 'duration is',time.time() - start
  

        


```

###扯淡

思路

* 对输入值进行预处理，过滤掉需要最高位进位的数字，比如99,999,9999等

* 通过循环，将前面的数，赋值给后面，设置标志位，如果发现，前面各位上的数，都比后面的数小，则执行fill_zero方法，称之为补零方法，以219993为case来说，它的前面各位就比后面小，那么开始补零，从中间开始，为9，而9再增1，就要进位了，就直接赋值为0，然后比较第三位的9和第五位的9，相等，并且第三位的9如果再增1也要进位，则直接赋值为0，比较第二位的1和第六位的9，1还可以自增，就将其自增，当有一位数字自增后，数字肯定比以前大了，而且是最小的，所以，之后的比较位置，直接将前面的数字赋值给后面即可。

{{ page.date | date_to_string }}
