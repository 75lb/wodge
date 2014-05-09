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
Returns a copy of the input object

###Parameters
input {Object} - the object to clone  

###Example
```js
> a = new Date()
Fri May 09 2014 13:54:34 GMT+0200 (CEST)
> w.clone(a)
{}  // a Date instance doensn't own any properties
> a.clive = "hater"
'hater'
> w.clone(a)
{ clive: 'hater' }
```
**Returns** Object 

##omit
Returns a clone of the input object, minus the specified properties

###Parameters
input {Object} - the object to clone  
toOmit {string[]} - an array of property names to omit from the clone  

###Example
```js
w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
// { one: 1, three: 3 }
```
**Returns** Object 

##escapeRegExp
escape special regular expression characters

###Example
```js
w.escapeRegExp("(.*)"); 
// '\\(\\.\\*\\)'
```
##pluck
Plucks the value of the specified property from each object in the input array

###Parameters
arrayOfObjects {Object[]} - the input array of objects  
the {string} - property to pluck  

###Example
```js
var data = [
    {one: 1, two: 2},
    {two: "two"},
    {one: "one", two: "zwei"},
];

w.pluck(data, "one");
// [ 1, "one" ]

w.pluck(data, "two");
// [ 2, "two", "zwei" ]

w.pluck(data, "one", "two");
// [ 1, "two", "one" ]
```
**Returns** Array 

##isNumber
Returns true if input is a number

##isPlainObject
Returns true if input is an object (not an Array)

##arrayify
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts null or undefined to an empty array

###Parameters
input {*} - the input value to convert to an array  

**Returns** Array 

##every
Returns true if the supplied iterator function returns true for every property in the object

###Parameters
object {Object} - the object to inspect  
iterator {function} - the iterator function to run against each key/value pair, the args are `(value, key)`.  

**Returns** Boolean 

##each
Runs the iterator function against every key/value pair in the input object

###Parameters
object {Object} - the object to iterate  
callback {function} - the iterator function to run against each key/value pair, the args are `(value, key)`.  

##bytesToSize
Convert bytes to human-readable size

###Parameters
bytes {number} - the bytes value to convert  
precision {number} - number of decimal places  

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


