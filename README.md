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
w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
// { one: "one", two: 2, three: 3, four: 4 }
```
##clone
Returns a copy of the input object

###Parameters
input {Object} - the object to clone

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
w.escapeRegExp("(.*)"); // => '\\(\\.\\*\\)'
```
##pluck
return the first existing property

##arrayify
Either:

- puts a single scalar in an array
- converts array-like object to a real array
- converts null or undefined to an empty array

##getHomeDir
Cross-platform home directory retriever

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

**Returns** string - A single path ending with the path separator, e.g. &quot;/user/some/folder/&quot;


