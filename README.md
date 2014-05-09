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

##clone
Clones an object or array

###Parameters
input {Object,Array} - the input to clone  

**Returns** Object,Array 

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
> array = [1,2,3]
[ 1, 2, 3 ]
> newArray = w.clone(array)
[ 1, 2, 3 ]
> array === newArray
false
```
##omit
Returns a clone of the input object, minus the specified properties

###Parameters
object {Object} - the object to clone  
toOmit {string[]} - an array of property names to omit from the clone  

**Returns** Object 

###Example
```js
> w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
{ one: 1, three: 3 }
```
##escapeRegExp
escape special regular expression characters

##pluck
Plucks the value of the specified property from each object in the input array

###Parameters
arrayOfObjects {Object[]} - the input array of objects  
the {string} - property to pluck  

**Returns** Array 

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
##isNumber
Returns true if input is a number

##isPlainObject
Returns true if input type is `object` and not an Array

###Parameters
input {*} - the input to test  

**Returns** boolean 

###Example
```js
> w.isPlainObject(new Date())
true
> w.isPlainObject({ clive: "hater" })
true
> w.isPlainObject([ 0, 1 ])
false
```
##arrayify
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts null or undefined to an empty array

###Parameters
input {*} - the input value to convert to an array  

**Returns** Array 

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
##every
Returns true if the supplied iterator function returns true for every property in the object

###Parameters
object {Object} - the object to inspect  
iterator {function} - the iterator function to run against each key/value pair, the args are `(value, key)`.  

**Returns** Boolean 

###Example
```js
> function aboveTen(input){ return input > 10; }
undefined
> w.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> w.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
false
```
##each
Runs the iterator function against every key/value pair in the input object

###Parameters
object {Object} - the object to iterate  
callback {function} - the iterator function to run against each key/value pair, the args are `(value, key)`.  

##bytesToSize
Convert bytes to human-readable size

###Parameters
bytes {number} - the bytes value to convert  
precision {number} - number of decimal places *optional* *default=0*  

**Returns** string 

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
##getHomeDir
Cross-platform home directory retriever

##fill
Create a new string filled with the supplied character

###Parameters
fillWith {string} - the fill character  
len {number} - the length of the output string  

**Returns** string 

###Example
```js
> w.fill("a", 10)
'aaaaaaaaaa'
> w.fill("ab", 10)
'aaaaaaaaaa'
```
##padRight
Add padding to the right of a string

###Parameters
input {string} - the string to pad  
width {number} - the desired final width  
padWith {string} - the padding character *optional* *default=" "*  

**Returns** string 

###Example
```js
> w.padRight("clive", 1)
'clive'
> w.padRight("clive", 1, "-")
'clive'
> w.padRight("clive", 10, "-")
'clive-----'
```
##exists
returns true if a value, or nested object value exists in an array

###Parameters
array {Array} - the array to search  
value {*} - the value to search for  

**Returns** boolean 

###Example
```js
> w.exists([ 1, 2, 3 ], 2)
true
> w.exists([ { result: false }, { result: false } ], { result: true })
false
> w.exists([ { result: true }, { result: false } ], { result: true })
true
> w.exists([ { result: true }, { result: true } ], { result: true })
true
```
##without
Returns the input array, minus the specied values

###Parameters
array {Array} - the input array  
toRemove {*} - a single, or array of values to omit  

**Returns** Array 

###Example
```js
> w.without([ 1, 2, 3 ], 2)
[ 1, 3 ]
> w.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
```
##first
Returns the first object in the input array with `property` set to `value`.

###Parameters
objectArray {Object[]} - input array of objects  
prop {string} - property to inspect  
val {*} - desired value  

**Returns** Object,undefined 

###Example
```js
> w.first([{ product: "egg", stock: true }, { product: "chicken", stock: true }], "stock", true)
{ product: 'egg', stock: true }
> w.first([{ product: "egg", stock: true }, { product: "chicken", stock: true }], "stock", false)
undefined
```
##commonDir
commonDir returns the directory common to each path in the list

###Parameters
files {Array} - An array of file paths to inspect  

**Returns** string - A single path ending with the path separator, e.g. "/user/some/folder/"

###Example
```js
> files = fs.readdirSync(".").map(function(file){ return path.resolve(file); })
[ '/Users/Lloyd/Documents/75lb/wodge/.DS_Store',
  '/Users/Lloyd/Documents/75lb/wodge/.git',
  '/Users/Lloyd/Documents/75lb/wodge/.gitignore',
  '/Users/Lloyd/Documents/75lb/wodge/.jshintrc',
  '/Users/Lloyd/Documents/75lb/wodge/README.md',
  '/Users/Lloyd/Documents/75lb/wodge/lib',
  '/Users/Lloyd/Documents/75lb/wodge/node_modules',
  '/Users/Lloyd/Documents/75lb/wodge/package.json',
  '/Users/Lloyd/Documents/75lb/wodge/test' ]
> w.commonDir(files)
'/Users/Lloyd/Documents/75lb/wodge/'
```
##union
merge two arrays into a single array of unique values

##commonSequence
Returns the initial elements which both input arrays have in common

###Parameters
a {Array} - first array to compare  
b {Array} - second array to compare  

**Returns** Array 

###Example
```js
> w.commonSequence([1,2,3], [1,2,4])
[ 1, 2 ]
```
##escapeForJSON
strips special characters, making suitable for storage in a JS/JSON string

###Parameters
input {string} - the input  

**Returns** string 

###Example
```js
> w.escapeForJSON("hello\nthere")
'hello\\nthere'
```

