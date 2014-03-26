---
layout: default
title: SPOJ problem 4 transform the expression
---

##{{ page.title }}

Transform the algebraic expression with brackets into RPN form (Reverse Polish Notation). Two-argument operators: +, -, *, /, ^ (priority from the lowest to the highest), brackets ( ). Operands: only letters: a,b,...,z. Assume that there is only one RPN form (no expressions like a*b*c).


###Input

t [the number of expressions <= 100]
expression [length <= 400]
[other expressions]

Text grouped in [ ] does not appear in the input file.

Output

The expressions in RPN form, one per line.



###Example
Input:
```
3
(a+(b*c))
((a+b)*(z+x))
((a+t)*((b+(a+c))^(c+d)))

Output:
abc*+
ab+zx+*
at+bac++cd+^*
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

	def trim(line):
	return line.rstrip('\n')

	def str_to_list(line):
	list = []

	for i in xrange(len(line)):
	    list.append(line[i])

	return list

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

#if __name__ == '__main__':
#while True:
#    group = sys.stdin.readline()
#    for i in xrange(int(group)):
#        line = sys.stdin.readline()
#        print 'transform before : ',line 
#        line = transform_line(line)
#        print 'transform after : ',line
       
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
	    line = palindrome(line,False)
	    print '+',line

file.close();

print 'duration is',time.time() - start
  
```

{{ page.date | date_to_string }}
