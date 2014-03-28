---
layout: default
title: the-next-palindrome-SPOJ-5
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

    for i in xrange(middle):
        front = middle - i - 1
        end =  middle + i - 1
        if(lists[front] <= lists[end] and int(lists[front]) >= 0 and int(lists[front]) < 9):
            lists[front] = str(int(lists[front]) + 1)
            for j in xrange(front + 1,end + 1):
                lists[j] = '0'
            break

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
def palindrome(line,s1):
    print 'palindromes'
    _list = str_to_list(line)
    s = False
    l = len(_list)
    middle = int(math.ceil(l / 2.0))

    for i in xrange(middle - 1,-1,-1):
        if(i != l - i -1):
            if(not s1 and int(_list[i]) > int(_list[l - i  -1])):
                s = True

            if(s1 and int(_list[i]) >= int(_list[l - i  -1])):
                s= True
            
        _list[l - i  - 1] = _list[i]


    if(s):
        return ''.join(_list)
    else:
        return palindrome(fill_zero(line),True)
            
if __name__ == '__main__':
    file = open_file('test.txt')
    group = file.readline()
    group = trim(group)
    start = time.time()
    for i in xrange(int(group)):
        line = file.readline()
        line = trim(line)
        print 'before:',line
        line = pre_palindrome(line)
        line = palindrome(line,False)
        print 'after:',line

    file.close();

    print 'duration is',time.time() - start
  

        

```

{{ page.date | date_to_string }}
