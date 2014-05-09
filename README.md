[![view on npm](http://img.shields.io/npm/v/wodge.svg)](https://www.npmjs.org/package/wodge)
![npm module downloads per month](http://img.shields.io/npm/dm/wodge.svg)
[![Dependency Status](https://david-dm.org/75lb/wodge.svg)](https://david-dm.org/75lb/wodge)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-25/wodge/README.md?pixel)

[![browser support](https://ci.testling.com/75lb/wodge.png)](https://ci.testling.com/75lb/wodge)

#wodge
A collection of useful functions.

#API Documentation
Generated jsdoc documentation.

##extend
Merge a list of objects, left to right, into one.

###Parameters
object {Object} - a sequence of Object instances to be extended  

###Example
```js
> w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
{ one: 'one',
  three: 3,
  two: 2,
  four: 4 }
```
##clone
Creates a new object, copying the properties from the input object

###Parameters
input {Object} - the object to clone  

###Example
```js
> date = new Date()
Fri May 09 2014 13:54:34 GMT+0200 (CEST)
> w.clone(date)
{}  // a Date instance doensn't own any properties
> date.clive = "hater"
'hater'
> w.clone(date)
{ clive: 'hater' }
```
**Returns** Object 

##omit
Returns a clone of the input object, minus the specified properties

###Parameters
object {Object} - the object to clone  
toOmit {string[]} - an array of property names to omit from the clone  

###Example
```js
> w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
{ one: 1, three: 3 }
```
**Returns** Object 

##escapeRegExp
escape special regular expression characters

###Example
```js
> w.escapeRegExp("(.*)");
'\\(\\.\\*\\)'
```
##pluck
Plucks the value of the specified property from each object in the input array

###Parameters
arrayOfObjects {Object[]} - the input array of objects  
the {string} - property to pluck  

###Example
```js
> var data = [
...     {one: 1, two: 2},
...     {two: "two"},
...     {one: "one", two: "zwei"},
... ];
undefined
> w.pluck(data, "one");
[ 1, 'one' ]
> w.pluck(data, "two");
[ 2, 'two', 'zwei' ]
> w.pluck(data, "one", "two");
[ 1, 'two', 'one' ]
```
**Returns** Array 

##isNumber
Returns true if input is a number

###Example
```js
> w.isNumber(0)
true
> w.isNumber(1)
true
> w.isNumber(1.1)
true
> w.isNumber(0xff)
true
> w.isNumber(0644)
true
> w.isNumber(6.2e5)
true
> w.isNumber(a)
false
> w.isNumber(NaN)
false
> w.isNumber(Infinity)
false
```
##isPlainObject
Returns true if input type is `object` and not an Array

###Parameters
input {*} - the input to test  

###Example
```js
> w.isPlainObject(new Date())
true
> w.isPlainObject({ clive: "hater" })
true
> w.isPlainObject([ 0, 1 ])
false
```
**Returns** boolean 

##arrayify
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts null or undefined to an empty array

###Parameters
input {*} - the input value to convert to an array  

###Example
```js
> w.arrayify(null)
[]
> w.arrayify(0)
[ 0 ]
> w.arrayify([ 1, 2 ])
[ 1, 2 ]
> function f(){ return w.arrayify(arguments); }
undefined
> f(1,2,3)
[ 1, 2, 3 ]
```
**Returns** Array 

##every
Returns true if the supplied iterator function returns true for every property in the object

###Parameters
object {Object} - the object to inspect  
iterator {function} - the iterator function to run against each key/value pair, the args are `(value, key)`.  

###Example
```js
> function aboveTen(input){ return input > 10; }
undefined
> w.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> w.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
false
```
**Returns** Boolean 

##each
Runs the iterator function against every key/value pair in the input object

###Parameters
object {Object} - the object to iterate  
callback {function} - the iterator function to run against each key/value pair, the args are `(value, key)`.  

###Example
```js
> var total = 0;
undefined
> function addToTotal(n){ total += n; }
undefined
> w.each({ eggs: 3, celery: 2, carrots: 1 }, addToTotal)
undefined
> total
6
```
##bytesToSize
Convert bytes to human-readable size

###Parameters
bytes {number} - the bytes value to convert  
precision {number} - number of decimal places *optional* *default=0*  

###Example
```js
> w.bytesToSize(10000)
'10 KB'
> w.bytesToSize(10000, 1)
'9.8 KB'
> w.bytesToSize(10000, 2)
'9.77 KB'
> w.bytesToSize(10000, 3)
'9.766 KB'
```
**Returns** string 

##getHomeDir
Cross-platform home directory retriever

###Example
```js
> w.getHomeDir()
'/Users/Lloyd'
```
##fill
Create a new string filled with the supplied character

###Parameters
fillWith {string} - the fill character  
len {number} - the length of the output string  

###Example
```js
> w.fill("a", 10)
'aaaaaaaaaa'
> w.fill("ab", 10)
'aaaaaaaaaa'
```
**Returns** string 

##padRight
Add padding to the right of a string

###Parameters
input {string} - the string to pad  
width {number} - the desired final width  
padWith {string} - the padding character *optional* *default=" "*  

###Example
```js
> w.padRight("clive", 1)
'clive'
> w.padRight("clive", 1, "-")
'clive'
> w.padRight("clive", 10, "-")
'clive-----'
```
**Returns** string 

##exists
###Example
```js
exists([ 1, 2, 3 ], 2)             // true
exists([
    { result: false, number: 1 },
    { result: false, number: 2 }
], { result: true })               // false
```
##first
Works on an array of objects. Returns the first object with `property` set to `value`.

##commonDir
commonDir returns the directory common to each path in the list

###Parameters
files {Array} - An array of file paths to inspect  

**Returns** string - A single path ending with the path separator, e.g. "/user/some/folder/"


