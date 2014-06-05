[![view on npm](http://img.shields.io/npm/v/wodge.svg)](https://www.npmjs.org/package/wodge)
[![npm module downloads per month](http://img.shields.io/npm/dm/wodge.svg)](https://www.npmjs.org/package/wodge)
[![Build Status](https://travis-ci.org/75lb/wodge.svg?branch=master)](https://travis-ci.org/75lb/wodge)
[![Dependency Status](https://david-dm.org/75lb/wodge.svg)](https://david-dm.org/75lb/wodge)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-25/wodge/README.md?pixel)

[![browser support](https://ci.testling.com/75lb/wodge.png)](https://ci.testling.com/75lb/wodge)


#wodge
A collection of useful functions.

####Example
```js
var w = require("wodge");
```



**Contents**
* [symbol](#module_wodge.symbol)
* [extend(object)](#module_wodge.extend)
* [clone(input)](#module_wodge.clone)
* [omit(object, toOmit)](#module_wodge.omit)
* [escapeRegExp()](#module_wodge.escapeRegExp)
* [pluck(arrayOfObjects, the)](#module_wodge.pluck)
* [isNumber()](#module_wodge.isNumber)
* [isPlainObject(input)](#module_wodge.isPlainObject)
* [arrayify(input)](#module_wodge.arrayify)
* [every(object, iterator)](#module_wodge.every)
* [each(object, callback)](#module_wodge.each)
* [bytesToSize(bytes, [precision])](#module_wodge.bytesToSize)
* [getHomeDir()](#module_wodge.getHomeDir)
* [fill(fillWith, len)](#module_wodge.fill)
* [padRight(input, width, [padWith])](#module_wodge.padRight)
* [exists(array, value)](#module_wodge.exists)
* [queryFoundInObject()](#module_wodge.queryFoundInObject)
* [where()](#module_wodge.where)
* [findWhere()](#module_wodge.findWhere)
* [without(input, toRemove)](#module_wodge.without)
* [first(objectArray, prop, val)](#module_wodge.first)
* [commonDir(files)](#module_wodge.commonDir)
* [union()](#module_wodge.union)
* [commonSequence(a, b)](#module_wodge.commonSequence)
* [escapeForJSON(input)](#module_wodge.escapeForJSON)




<a name="module_wodge.symbol"></a>
###w.symbol
some cross platform symbols (`tick` and `cross`)





<a name="module_wodge.extend"></a>
###w.extend(object)
Merge a list of objects, left to right, into one.


- object `Object` a sequence of Object instances to be extended  




####Example
```js
> w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
{ one: 'one',
  three: 3,
  two: 2,
  four: 4 }
```



<a name="module_wodge.clone"></a>
###w.clone(input)
Clones an object or array


- input `Object | Array` the input to clone  


**Returns**: `Object | Array`

####Example
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



<a name="module_wodge.omit"></a>
###w.omit(object, toOmit)
Returns a clone of the input object, minus the specified properties


- object `Object` the object to clone  
- toOmit `string[]` an array of property names to omit from the clone  


**Returns**: `Object`

####Example
```js
> w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
{ one: 1, three: 3 }
```



<a name="module_wodge.escapeRegExp"></a>
###w.escapeRegExp()
escape special regular expression characters





####Example
```js
> w.escapeRegExp("(.*)");
'\\(\\.\\*\\)'
```



<a name="module_wodge.pluck"></a>
###w.pluck(arrayOfObjects, the)
Plucks the value of the specified property from each object in the input array


- arrayOfObjects `Object[]` the input array of objects  
- the `string` property to pluck  


**Returns**: `Array`

####Example
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



<a name="module_wodge.isNumber"></a>
###w.isNumber()
Returns true if input is a number





####Example
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



<a name="module_wodge.isPlainObject"></a>
###w.isPlainObject(input)
Returns true if input type is `object` and not an Array


- input `*` the input to test  


**Returns**: `boolean`

####Example
```js
> w.isPlainObject(new Date())
true
> w.isPlainObject({ clive: "hater" })
true
> w.isPlainObject([ 0, 1 ])
false
```



<a name="module_wodge.arrayify"></a>
###w.arrayify(input)
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts null or undefined to an empty array


- input `*` the input value to convert to an array  


**Returns**: `Array`

####Example
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



<a name="module_wodge.every"></a>
###w.every(object, iterator)
Returns true if the supplied iterator function returns true for every property in the object


- object `Object` the object to inspect  
- iterator `function` the iterator function to run against each key/value pair, the args are `(value, key)`.  


**Returns**: `Boolean`

####Example
```js
> function aboveTen(input){ return input > 10; }
undefined
> w.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> w.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
false
```



<a name="module_wodge.each"></a>
###w.each(object, callback)
Runs the iterator function against every key/value pair in the input object


- object `Object` the object to iterate  
- callback `function` the iterator function to run against each key/value pair, the args are `(value, key)`.  




####Example
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



<a name="module_wodge.bytesToSize"></a>
###w.bytesToSize(bytes, [precision])
Convert bytes to human-readable size


- bytes `number` the bytes value to convert  
- [precision] `number` number of decimal places  


**Returns**: `string`

####Example
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



<a name="module_wodge.getHomeDir"></a>
###w.getHomeDir()
Cross-platform home directory retriever





####Example
```js
> w.getHomeDir()
'/Users/Lloyd'
```



<a name="module_wodge.fill"></a>
###w.fill(fillWith, len)
Create a new string filled with the supplied character


- fillWith `string` the fill character  
- len `number` the length of the output string  


**Returns**: `string`

####Example
```js
> w.fill("a", 10)
'aaaaaaaaaa'
> w.fill("ab", 10)
'aaaaaaaaaa'
```



<a name="module_wodge.padRight"></a>
###w.padRight(input, width, [padWith])
Add padding to the right of a string


- input `string` the string to pad  
- width `number` the desired final width  
- [padWith] `string` the padding character  


**Returns**: `string`

####Example
```js
> w.padRight("clive", 1)
'clive'
> w.padRight("clive", 1, "-")
'clive'
> w.padRight("clive", 10, "-")
'clive-----'
```



<a name="module_wodge.exists"></a>
###w.exists(array, value)
returns true if a value, or nested object value exists in an array


- array `Array` the array to search  
- value `*` the value to search for  


**Returns**: `boolean`

####Example
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



<a name="module_wodge.queryFoundInObject"></a>
###w.queryFoundInObject()
docs todo








<a name="module_wodge.where"></a>
###w.where()
docs todo








<a name="module_wodge.findWhere"></a>
###w.findWhere()
docs todo








<a name="module_wodge.without"></a>
###w.without(input, toRemove)
If the input is an array, returns the input minus the specified values.
If the input is an object, it returns a clone of the object minus the specified properties.


- input `Array | Object` the input array or object  
- toRemove `*` a single, or array of values to omit  


**Returns**: `Array | Object`

####Example
```js
> w.without([ 1, 2, 3 ], 2)
[ 1, 3 ]
> w.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
```



<a name="module_wodge.first"></a>
###w.first(objectArray, prop, val)
Returns the first object in the input array with `property` set to `value`.


- objectArray `Object[]` input array of objects  
- prop `string` property to inspect  
- val `*` desired value  


**Returns**: `Object | undefined`

####Example
```js
> w.first([{ product: "egg", stock: true }, { product: "chicken", stock: true }], "stock", true)
{ product: 'egg', stock: true }
> w.first([{ product: "egg", stock: true }, { product: "chicken", stock: true }], "stock", false)
undefined
```



<a name="module_wodge.commonDir"></a>
###w.commonDir(files)
commonDir returns the directory common to each path in the list


- files `Array` An array of file paths to inspect  


**Returns**: `string` - - A single path ending with the path separator, e.g. "/user/some/folder/"

####Example
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



<a name="module_wodge.union"></a>
###w.union()
merge two arrays into a single array of unique values





####Example
```js
> var array1 = [ 1, 2 ], array2 = [ 2, 3 ];
undefined
> w.union(array1, array2)
[ 1, 2, 3 ]
> var array1 = [ { id: 1 }, { id: 2 } ], array2 = [ { id: 2 }, { id: 3 } ];
undefined
> w.union(array1, array2)
[ { id: 1 }, { id: 2 }, { id: 3 } ]
> var array2 = [ { id: 2, blah: true }, { id: 3 } ]
undefined
> w.union(array1, array2)
[ { id: 1 },
  { id: 2 },
  { id: 2, blah: true },
  { id: 3 } ]
> w.union(array1, array2, "id")
[ { id: 1 }, { id: 2 }, { id: 3 } ]
```



<a name="module_wodge.commonSequence"></a>
###w.commonSequence(a, b)
Returns the initial elements which both input arrays have in common


- a `Array` first array to compare  
- b `Array` second array to compare  


**Returns**: `Array`

####Example
```js
> w.commonSequence([1,2,3], [1,2,4])
[ 1, 2 ]
```



<a name="module_wodge.escapeForJSON"></a>
###w.escapeForJSON(input)
strips special characters, making suitable for storage in a JS/JSON string


- input `string` the input  


**Returns**: `string`

####Example
```js
> w.escapeForJSON("hello\nthere")
'hello\\nthere'
```










