---
layout: default
title: transform the expression (SPOJ 5)
---

##{{ page.title }}

Transform the algebraic expression with brackets into RPN form (Reverse Polish Notation). Two-argument operators: +, -, *, /, ^ (priority from the lowest to the highest), brackets ( ). Operands: only letters: a,b,...,z. Assume that there is only one RPN form (no expressions like a*b*c). 

###INPUT

t [the number of expressions <= 100]
expression [length <= 400]
[other expressions]

Text grouped in [ ] does not appear in the input file. 

###OUTPUT

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
    start = time.time()
    for i in xrange(int(group)):
        line = file.readline()
        line = line.rstrip('\n')
        print 'transform before : ',line
        line = transform_line(line)
        print 'transform after : ',line

    file.close();

    print 'duration is',time.time() - start
```

{{ page.date | date_to_string }}
