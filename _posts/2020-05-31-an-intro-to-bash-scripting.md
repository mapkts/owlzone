---
layout: default
title: An Intro to Bash Scripting
date: May 31, 2020
tags: bash notes
categories: Bash
image: images/200531-bash.png
---

Bash is a Unix shell and command language written by Brain Fox. The name is an acronym for Bourne-Again Shell, a pun on the name of the Bourne shell that it replaces and the notion of being "born again". Bash scripts are widely used by system administrators, programmers, network engineers and anyone else who uses a Linux/Unix system regularly.

Here's the notes I had written while going through [bash scripting tutorials](https://ryanstutorials.net/bash-scripting-tutorial/). The entire notes is written as an bash
program, and is self-explanatory.

```bash
#!/bin/bash

# The first line defines the interpreter that should be used to run the rest of the lines.
# For Bash scripts it will be the path to Bash.

# Formatting is significant here. The shebang must be on the very first line, and there
# must be no spaces before the # or between the ! and the path to the interpreter.

# It's possible to leave out the shebang and still run the script but it is unwise.
# Always include the shebang (#!). It's the most reliable and covenient approach.



# VARIABLES

# 1. Setting a variable

# No quote is needed if a variable stores a single word.
# Note there is no space on either side of the `=` sign.
myvar=hello

# Using single quotes if we want to treat every character literally.
sqvar='hello world'

# And using double quotes if subsitition is needed.
dqvar="$myvar world"

# It's possible to take the output of a command or program and save it. (command substitution)
# To do this we place it within brackets, preceded by `$` sign.
nol=$( ls . | wc -l )

# Command substitution is nice and simple if the output of the command is a single word or line.
# If the output goes over several lines then the newlines are simply removed and all the output
# ends up on a single line.
FILEs=$( ls )

# 2. Reading a variable

# When reading or refering a variable we need to place a `$` sign before the variable name.
echo $myvar
echo $FILEs
echo There are $nol entries in current directory

# 3. Some sysntem preset variables

# $0 - The name of the Bash script.
# $1 - $9 - The first 9 command line arguments to the Bash script.
# $# - How many arguments were passed to the Bash script.
# $@ - All the arguments supplied to the Bash script.
# $? - The exit status of the most recently run process.
# $$ - The process ID of the current script.
# $USER - The username of the user running the script.
# $HOSTNAME - The hostname of the machine the script is running on.
# $SECONDS - The number of seconds since the script was started.
# $RANDOM - Returns a different random number each time is it referred to.
# $LINENO - Returns the current line number in the Bash script.

# 4. Exporting variables

# Variables are local to the process they were created in.
# We can export a *copy* of a variable to make them available to another process.
var1=foo
var2=bar
export var1



# USER INPUT

# 1. Ask the user for input

# Command `read` asks for input and save it inito a variable.
read var1
read var2 var3 var4

# Using the -p flag to specify a prompt and -s to make the input silent.
read -p 'Username: ' username
read -sp 'Password: ' password

# 2. Reading from stdin

# Each process gets it's STDIN, STDOUT and STDERR. And they are linked when piping
# or redirection is invoked.
#
# STDIN  - /proc/<processID>/fd/0
# STDOUT - /proc/<processID>/fd/1
# STDERR - /proc/<processID>/fd/2
#
# Some shortcuts to make our life easier.
#
# STDIN  - /dev/stdin  or /proc/self/fd/0
# STDOUT - /dev/stdout or /proc/self/fd/1
# STDERR - /dev/stderr or /proc/self/fd/1
cat /dev/stdin | cut -d' ' -f 2,3 | sort

# 3. Command Line Arguments

# Favoring command line arguments wherever possible.
# They are the most convenient for users as the data will be stored in their
# command history so they can easily return to it.

# For privacy-related data, such as login credentials, is not ideal to be stored
# in command histories. In these circumstances it's best to `read` the data during
# execution.

# If all the script is doing is processing data in a certain way then it is
# probably best to work with STDIN.



# Arithmetic

# 1. let <arithmetic expression>
let a=5+4 # 9
let "a = 5 + 4" # 9
let a++ # 10
let "a = 4 * 5" # 20
let "a = $1 + 30" # 30 + $1

# 2. expr item1 operator item2

# Similar to let but instead prints the answer.
expr 5 + 4
expr "5 + 4"
expr 5+4
expr 5 \* $1
expr 11 % 2
a=$( expr 10 - 3 )
echo $a # 7

# 3. $((expression))
a=$(( 4 + 5 )) # 9
a=$((3+5)) # 8
b=$(( a + 3 )) # 11
b=$(( $a + 4 )) # 12

# In some cases we don't need the preceding $
(( b++ )) # 13
(( b += 3 )) # 16

a=$(( 4 * 5 )) # 20

# 4. Length of a variable
a='Hello World'
echo ${#a} # 11

b=4953
echo ${#b} # 4



# CONTROL FLOW

# If
if [ $1 -gt 100 ]
then
  echo Hey that\'s a large number
fi

# Nested if statements
if [ $1 -gt 100 ]
then
  echo Hey that\'s a large number.

  if (( $1 % 2 == 0 ))
  then
    echo And is also an even number.
  fi
fi

# If else
if [ $# -eq 1 ]
then
  nl $1
else
  nl /dev/stdin
fi

# If elif else
if [ $1 -ge 18 ]
then
  echo You may go to the party.
elif [ $2 == 'yes' ]
then
  echo You may go to the party but be back before midnight.
else
  echo You may not go to the party.
fi

# Using && or || to specify mutiply conditions
if [ -r $1 ] && [ -s $1 ]
then
  echo This file is useful.
fi

# The square brackets ([]) in the `if` statement are actually a command test.
# See the man page for all possible operators but some of the most common ones
# are listed below.

#| Operator              | description                                                          |
#| ---                   | ---                                                                  |
#| ! EXPRESSION          | The EXPRESSION is false.                                             |
#| -n STRING             | The length of STRING is greater than zero.                           |
#| -z STRING             | The lengh of STRING is zero (ie it is empty).                        |
#| STRING1 = STRING2     | STRING1 is equal to STRING2                                          |
#| STRING1 != STRING2    | STRING1 is not equal to STRING2                                      |
#| INTEGER1 -eq INTEGER2 | INTEGER1 is numerically equal to INTEGER2                            |
#| INTEGER1 -gt INTEGER2 | INTEGER1 is numerically greater than INTEGER2                        |
#| INTEGER1 -lt INTEGER2 | INTEGER1 is numerically less than INTEGER2                           |
#| -d FILE               | FILE exists and is a directory.                                      |
#| -e FILE               | FILE exists.                                                         |
#| -r FILE               | FILE exists and the read permission is granted.                      |
#| -s FILE               | FILE exists and its size is greater than zero (ie. it is not empty). |
#| -w FILE               | FILE exists and the write permission is granted.                     |
#| -x FILE               | FILE exists and the execute permission is granted.                   |

# Case statement
case $1 in
  start) # if $1 is equal to `start` then
    echo starting
    ;; # end this clause with a `;;`
  stop)
    echo stoping
    ;;
  restart)
    echo restarting
    ;;
  *) # The * represents a catch all.
    echo don\'t know
    ;;
esac

# While loop
counter=1
while [ $counter -le 10 ]
do
  echo $counter
  ((counter++))
done

# Until loop (until the test becomes true)
counter=1
until [ $counter -gt 10 ]
do
  echo $counter
  ((counter++))
done

# For in loop
names='Stan Kyle Cartman'

for name in $names
do
  echo $name
done

# We can also use ranges.
for value in {1..5}
do
  echo $value
done
# And specify a step.
for value in {10..0..2}
do
  echo $value
done
# Wildcards are very useful when processing a set of files.
for value in $1/*.html
do
  cp $value $1/$( basename -s .html $value ).php
done

# Break and Continue

# Make a backup of files.
for value in $1/*
do
  used=$( df $1 | tail -1 | awk '{ print $5 }' | sed 's/%//' )
  if [ $used -gt 90 ]
  then
    echo Low disk space 1>&2
    break
  fi
  cp $value $1/backup/
done

for value in $1/*
do
  if [ ! -r $value ]
  then
    echo $value not readable 1>&2
    continue
  fi
  cp $value $1/backup/
done

# Select

# The `select` allows you to create a menu and present them on the screen
# with a number before each item.
names='Kyle Cartman Stan Quit'

PS3='Select character: '

select name in $names
do
  if [ $name == 'Quit' ]
  then
    break
  fi
  echo Hello $name
done

# A few points to note:
#
# 1. No error checking is done. If the user enters something other than a number
# or a number not corresponding to an item then var becomes null (empty)
#
# 2. If the user hits enter without entering any data then the list of options
# will be displayed again.
#
# 3. The loop will end when an EOF signal is entered or the break statement is issued.
#
# 4. You may change the system variable PS3 to change the prompt that is displayed.



# FUNCTIONS

print1 () {
  echo Hello $1
}

# or

print2 {
  echo Hello $1
}

print1 Mars
print2 Jupiter

# Return status
print_something () {
  echo Hello $1
  return 5
}

print_something Mars
print_something Jupiter
echo The previous function has a return value of $?

# Typically a return status of 0 indicates that everything went successfully.
# A non zero value indicates an error occurred.

# Variable Scope
#
# By default a variable is global.
# We may also create a variable as local.
var_change () {
  local var1='local 1'
  echo Inside function: var1 is $var1 : var2 is $var2
  var1='changed again'
  var2='2 changed again'
}
var1='global 1'
var2='global 2'
echo Before function call: var1 is $var1 : var2 is $var2
var_change
echo After function call: var1 is $var1 : var2 is $var2

# Always use local variables within functions. Use global variables as a last resort
# and consider if there is a better way to do it before using them.

# Overriding commands

# Create a wrapper around the command ls
ls () {
command ls -lh
}
ls
```