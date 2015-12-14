// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    collections.defaultCompare = defaultCompare;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    /**
    * Joins all the properies of the object using the provided join string
    */
    function makeString(item, join) {
        if (join === void 0) { join = ","; }
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return item.toString();
        }
        else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    collections.makeString = makeString;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    collections.isFunction = isFunction;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction(compareFunction) {
        if (!collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    collections.reverseCompareFunction = reverseCompareFunction;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    collections.compareToEquals = compareToEquals;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    var arrays;
    (function (arrays) {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    var LinkedList = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function LinkedList() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        LinkedList.prototype.add = function (item, index) {
            if (collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            }
            else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
            else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            }
            else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };
        /**
        * Returns the first element in this list.
        * @return {*} the first element of the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.first = function () {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        };
        /**
        * Returns the last element in this list.
        * @return {*} the last element in the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.last = function () {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        };
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        LinkedList.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        LinkedList.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };
        /**
           * Returns true if this list contains the specified element.
           * <p>If the elements inside the list are
           * not comparable with the === operator a custom equals function should be
           * provided to perform searches, the function must receive two arguments and
           * return true if they are equal, false otherwise. Example:</p>
           *
           * <pre>
           * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
           * </pre>
           * @param {Object} item element to search for.
           * @param {function(Object,Object):boolean=} equalsFunction Optional
           * function used to check if two elements are equal.
           * @return {boolean} true if this list contains the specified element, false
           * otherwise.
           */
        LinkedList.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        LinkedList.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (this.nElements < 1 || collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };
        /**
         * Removes all of the elements from this list.
         */
        LinkedList.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        LinkedList.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || collections.defaultEquals;
            if (!(other instanceof collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };
        /**
        * @private
        */
        LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        LinkedList.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            }
            else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                }
                else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        LinkedList.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        LinkedList.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        LinkedList.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        LinkedList.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        LinkedList.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        LinkedList.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        /**
         * @private
         */
        LinkedList.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };
        /**
         * @private
         */
        LinkedList.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return LinkedList;
    })();
    collections.LinkedList = LinkedList; // End of linked list 
    var Dictionary = (function () {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        Dictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        Dictionary.prototype.containsKey = function (key) {
            return !collections.isUndefined(this.getValue(key));
        };
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    collections.Dictionary = Dictionary; // End of dictionary
    /**
     * This class is used by the LinkedDictionary Internally
     * Has to be a class, not an interface, because it needs to have
     * the 'unlink' function defined.
     */
    var LinkedDictionaryPair = (function () {
        function LinkedDictionaryPair(key, value) {
            this.key = key;
            this.value = value;
        }
        LinkedDictionaryPair.prototype.unlink = function () {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        };
        return LinkedDictionaryPair;
    })();
    var LinkedDictionary = (function (_super) {
        __extends(LinkedDictionary, _super);
        function LinkedDictionary(toStrFunction) {
            _super.call(this, toStrFunction);
            this.head = new LinkedDictionaryPair(null, null);
            this.tail = new LinkedDictionaryPair(null, null);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        /**
         * Inserts the new node to the 'tail' of the list, updating the
         * neighbors, and moving 'this.tail' (the End of List indicator) that
         * to the end.
         */
        LinkedDictionary.prototype.appendToTail = function (entry) {
            var lastNode = this.tail.prev;
            lastNode.next = entry;
            entry.prev = lastNode;
            entry.next = this.tail;
            this.tail.prev = entry;
        };
        /**
         * Retrieves a linked dictionary from the table internally
         */
        LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
            if (collections.isUndefined(key)) {
                return undefined;
            }
            var k = '$' + this.toStr(key);
            var pair = (this.table[k]);
            return pair;
        };
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        LinkedDictionary.prototype.getValue = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                return pair.value;
            }
            return undefined;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * Also, if a value is present for this key, the entry is removed from the
         * insertion ordering.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        LinkedDictionary.prototype.remove = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                _super.prototype.remove.call(this, key); // This will remove it from the table
                pair.unlink(); // This will unlink it from the chain
                return pair.value;
            }
            return undefined;
        };
        /**
        * Removes all mappings from this LinkedDictionary.
        * @this {collections.LinkedDictionary}
        */
        LinkedDictionary.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        };
        /**
         * Internal function used when updating an existing KeyValue pair.
         * It places the new value indexed by key into the table, but maintains
         * its place in the linked ordering.
         */
        LinkedDictionary.prototype.replace = function (oldPair, newPair) {
            var k = '$' + this.toStr(newPair.key);
            // set the new Pair's links to existingPair's links
            newPair.next = oldPair.next;
            newPair.prev = oldPair.prev;
            // Delete Existing Pair from the table, unlink it from chain.
            // As a result, the nElements gets decremented by this operation
            this.remove(oldPair.key);
            // Link new Pair in place of where oldPair was,
            // by pointing the old pair's neighbors to it.
            newPair.prev.next = newPair;
            newPair.next.prev = newPair;
            this.table[k] = newPair;
            // To make up for the fact that the number of elements was decremented,
            // We need to increase it by one.
            ++this.nElements;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * Updating of a key that already exists maintains its place in the
         * insertion order into the map.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        LinkedDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var existingPair = this.getLinkedDictionaryPair(key);
            var newPair = new LinkedDictionaryPair(key, value);
            var k = '$' + this.toStr(key);
            // If there is already an element for that key, we 
            // keep it's place in the LinkedList
            if (!collections.isUndefined(existingPair)) {
                this.replace(existingPair, newPair);
                return existingPair.value;
            }
            else {
                this.appendToTail(newPair);
                this.table[k] = newPair;
                ++this.nElements;
                return undefined;
            }
        };
        /**
         * Returns an array containing all of the keys in this LinkedDictionary, ordered
         * by insertion order.
         * @return {Array} an array containing all of the keys in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.keys = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(key);
            });
            return array;
        };
        /**
         * Returns an array containing all of the values in this LinkedDictionary, ordered by
         * insertion order.
         * @return {Array} an array containing all of the values in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.values = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(value);
            });
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this LinkedDictionary. It is done in the order of insertion
        * into the LinkedDictionary
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        LinkedDictionary.prototype.forEach = function (callback) {
            var crawlNode = this.head.next;
            while (crawlNode.next != null) {
                var ret = callback(crawlNode.key, crawlNode.value);
                if (ret === false) {
                    return;
                }
                crawlNode = crawlNode.next;
            }
        };
        return LinkedDictionary;
    })(Dictionary);
    collections.LinkedDictionary = LinkedDictionary; // End of LinkedDictionary
    // /**
    //  * Returns true if this dictionary is equal to the given dictionary.
    //  * Two dictionaries are equal if they contain the same mappings.
    //  * @param {collections.Dictionary} other the other dictionary.
    //  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
    //  * function used to check if two values are equal.
    //  * @return {boolean} true if this dictionary is equal to the given dictionary.
    //  */
    // collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
    // 	var eqF = valuesEqualFunction || collections.defaultEquals;
    // 	if(!(other instanceof collections.Dictionary)){
    // 		return false;
    // 	}
    // 	if(this.size() !== other.size()){
    // 		return false;
    // 	}
    // 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
    // }
    var MultiDictionary = (function () {
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
           *  return pet.name;
           * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
           *  return pet1.age===pet2.age;
           * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        /**
        * Returns an array holding the values to which this dictionary maps
        * the specified key.
        * Returns an empty array if this dictionary contains no mappings for this key.
        * @param {Object} key key whose associated values are to be returned.
        * @return {Array} an array holding the values to which this dictionary maps
        * the specified key.
        */
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (collections.isUndefined(values)) {
                return [];
            }
            return collections.arrays.copy(values);
        };
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        MultiDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        MultiDictionary.prototype.remove = function (key, value) {
            if (collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        };
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };
        /**
         * Removes all mappings from this dictionary.
         */
        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    })();
    collections.MultiDictionary = MultiDictionary; // end of multi dictionary 
    var Heap = (function () {
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function Heap(compareFunction) {
            /**
             * Array used to store the elements od the heap.
             * @type {Array.<Object>}
             * @private
             */
            this.data = [];
            this.compare = compareFunction || collections.defaultCompare;
        }
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        Heap.prototype.leftChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 1;
        };
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        Heap.prototype.rightChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 2;
        };
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        Heap.prototype.parentIndex = function (nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        };
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        Heap.prototype.minIndex = function (leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                }
                else {
                    return leftChild;
                }
            }
            else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                }
                else {
                    return rightChild;
                }
            }
        };
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        Heap.prototype.siftUp = function (index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        };
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        Heap.prototype.siftDown = function (nodeIndex) {
            //smaller child index
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        };
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        Heap.prototype.peek = function () {
            if (this.data.length > 0) {
                return this.data[0];
            }
            else {
                return undefined;
            }
        };
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        Heap.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        };
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        Heap.prototype.removeRoot = function () {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        };
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        Heap.prototype.contains = function (element) {
            var equF = collections.compareToEquals(this.compare);
            return collections.arrays.contains(this.data, element, equF);
        };
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        Heap.prototype.size = function () {
            return this.data.length;
        };
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        Heap.prototype.isEmpty = function () {
            return this.data.length <= 0;
        };
        /**
         * Removes all of the elements from this heap.
         */
        Heap.prototype.clear = function () {
            this.data.length = 0;
        };
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Heap.prototype.forEach = function (callback) {
            collections.arrays.forEach(this.data, callback);
        };
        return Heap;
    })();
    collections.Heap = Heap;
    var Stack = (function () {
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Stack() {
            this.list = new LinkedList();
        }
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.push = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.add = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.pop = function () {
            return this.list.removeElementAtIndex(0);
        };
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.peek = function () {
            return this.list.first();
        };
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        Stack.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        Stack.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        Stack.prototype.isEmpty = function () {
            return this.list.isEmpty();
        };
        /**
         * Removes all of the elements from this stack.
         */
        Stack.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Stack.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Stack;
    })();
    collections.Stack = Stack; // End of stack 
    var Queue = (function () {
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Queue() {
            this.list = new LinkedList();
        }
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.enqueue = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.add = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.dequeue = function () {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.peek = function () {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        };
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        Queue.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        Queue.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        Queue.prototype.isEmpty = function () {
            return this.list.size() <= 0;
        };
        /**
         * Removes all of the elements from this queue.
         */
        Queue.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Queue.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Queue;
    })();
    collections.Queue = Queue; // End of queue
    var PriorityQueue = (function () {
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function PriorityQueue(compareFunction) {
            this.heap = new Heap(collections.reverseCompareFunction(compareFunction));
        }
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.enqueue = function (element) {
            return this.heap.add(element);
        };
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.add = function (element) {
            return this.heap.add(element);
        };
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        PriorityQueue.prototype.dequeue = function () {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        PriorityQueue.prototype.peek = function () {
            return this.heap.peek();
        };
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        PriorityQueue.prototype.contains = function (element) {
            return this.heap.contains(element);
        };
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        PriorityQueue.prototype.isEmpty = function () {
            return this.heap.isEmpty();
        };
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        PriorityQueue.prototype.size = function () {
            return this.heap.size();
        };
        /**
         * Removes all of the elements from this priority queue.
         */
        PriorityQueue.prototype.clear = function () {
            this.heap.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        PriorityQueue.prototype.forEach = function (callback) {
            this.heap.forEach(callback);
        };
        return PriorityQueue;
    })();
    collections.PriorityQueue = PriorityQueue; // end of priority queue
    var Set = (function () {
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        function Set(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        Set.prototype.add = function (element) {
            if (this.contains(element) || collections.isUndefined(element)) {
                return false;
            }
            else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            }
            else {
                this.dictionary.remove(element);
                return true;
            }
        };
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        Set.prototype.size = function () {
            return this.dictionary.size();
        };
        /**
         * Removes all of the elements from this set.
         */
        Set.prototype.clear = function () {
            this.dictionary.clear();
        };
        /*
        * Provides a string representation for display
        */
        Set.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        return Set;
    })();
    collections.Set = Set; // end of Set
    var Bag = (function () {
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        function Bag(toStrFunction) {
            this.toStrF = toStrFunction || collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        /**
        * Adds nCopies of the specified object to this bag.
        * @param {Object} element element to add.
        * @param {number=} nCopies the number of copies to add, if this argument is
        * undefined 1 copy is added.
        * @return {boolean} true unless element is undefined.
        */
        Bag.prototype.add = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            }
            else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        };
        /**
        * Counts the number of copies of the specified object in this bag.
        * @param {Object} element the object to search for..
        * @return {number} the number of copies of the object, 0 if not found
        */
        Bag.prototype.count = function (element) {
            if (!this.contains(element)) {
                return 0;
            }
            else {
                return this.dictionary.getValue(element).copies;
            }
        };
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        Bag.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
        * Removes nCopies of the specified object to this bag.
        * If the number of copies to remove is greater than the actual number
        * of copies in the Bag, all copies are removed.
        * @param {Object} element element to remove.
        * @param {number=} nCopies the number of copies to remove, if this argument is
        * undefined 1 copy is removed.
        * @return {boolean} true if at least 1 element was removed.
        */
        Bag.prototype.remove = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                return false;
            }
            else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                }
                else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        };
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        Bag.prototype.toArray = function () {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        };
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        Bag.prototype.toSet = function () {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        };
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        Bag.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        Bag.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        Bag.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Removes all of the elements from this bag.
         */
        Bag.prototype.clear = function () {
            this.nElements = 0;
            this.dictionary.clear();
        };
        return Bag;
    })();
    collections.Bag = Bag; // End of bag 
    var BSTree = (function () {
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function BSTree(compareFunction) {
            this.root = null;
            this.compare = compareFunction || collections.defaultCompare;
            this.nElements = 0;
        }
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        BSTree.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        };
        /**
         * Removes all of the elements from this tree.
         */
        BSTree.prototype.clear = function () {
            this.root = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        BSTree.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        BSTree.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        BSTree.prototype.contains = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        };
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        BSTree.prototype.remove = function (element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.inorderTraversal = function (callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.preorderTraversal = function (callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.postorderTraversal = function (callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.levelTraversal = function (callback) {
            this.levelTraversalAux(this.root, callback);
        };
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.minimum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        };
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.maximum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        };
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        BSTree.prototype.forEach = function (callback) {
            this.inorderTraversal(callback);
        };
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        BSTree.prototype.toArray = function () {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        };
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        BSTree.prototype.height = function () {
            return this.heightAux(this.root);
        };
        /**
        * @private
        */
        BSTree.prototype.searchNode = function (node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                }
                else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.transplant = function (n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            }
            else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            }
            else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.removeNode = function (node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            }
            else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            }
            else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.levelTraversalAux = function (node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        };
        /**
        * @private
        */
        BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        };
        /**
        * @private
        */
        BSTree.prototype.minimumAux = function (node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.maximumAux = function (node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        };
        /**
          * @private
          */
        BSTree.prototype.heightAux = function (node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };
        /*
        * @private
        */
        BSTree.prototype.insertNode = function (node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                }
                else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                }
                else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                // tree is empty
                this.root = node;
            }
            else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            }
            else {
                parent.rightCh = node;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.createNode = function (element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        };
        return BSTree;
    })();
    collections.BSTree = BSTree; // end of BSTree
})(collections || (collections = {})); // End of module 

//# sourceMappingURL=collections.js.map



//# sourceMappingURL=Queryable.js.map



//# sourceMappingURL=Registry.js.map



//# sourceMappingURL=Repository.js.map

var sdmx;
(function (sdmx) {
    var SdmxIO = (function () {
        function SdmxIO() {
        }
        SdmxIO.getLocale = function () {
            return SdmxIO.LOCALE;
        };
        SdmxIO.isSanitiseNames = function () {
            return SdmxIO.SANITISE_NAMES;
        };
        SdmxIO.LOCALE = "en";
        SdmxIO.SANITISE_NAMES = false;
        return SdmxIO;
    })();
    sdmx.SdmxIO = SdmxIO;
})(sdmx || (sdmx = {}));

//# sourceMappingURL=SdmxIO.js.map

var xml;
(function (xml) {
    var anyURI = (function () {
        function anyURI(s) {
            this.s = null;
            this.s = s;
        }
        anyURI.prototype.getString = function () { return this.s; };
        anyURI.prototype.toString = function () { return this.s; };
        return anyURI;
    })();
    xml.anyURI = anyURI;
})(xml || (xml = {}));

//# sourceMappingURL=anyURI.js.map

/// <reference path="../moment.d.ts" />
var xml;
(function (xml) {
    var moment = require('moment');
    var DateTime = (function () {
        function DateTime(d) {
            this.baseString = null;
            this.date = null;
            this.date = d;
        }
        DateTime.prototype.getDate = function () {
            return this.date;
        };
        DateTime.fromString = function (s) {
            if (s == null || s == "") {
                return null;
            }
            var m = new moment(s, [DateTime.DF, DateTime.DF2]);
            var dt = new DateTime(m.toDate());
            dt.setBaseString(s);
            return dt;
        };
        DateTime.prototype.toString = function () {
            if (this.baseString != null)
                return this.baseString;
            return new moment(this.date).format(DateTime.DF);
        };
        DateTime.now = function () {
            return new DateTime(new moment().toDate());
        };
        DateTime.prototype.setBaseString = function (s) {
            this.baseString = s;
        };
        DateTime.prototype.getBaseString = function () {
            return this.baseString;
        };
        DateTime.DF = "yyyy-MM-dd'T'HH:mm:ssXXX";
        DateTime.DF2 = "yyyy-MM-dd'T'HH:mm:ss";
        return DateTime;
    })();
    xml.DateTime = DateTime;
})(xml || (xml = {}));

//# sourceMappingURL=DateTime.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var xml;
(function (xml) {
    var RegexXMLString = (function (_super) {
        __extends(RegexXMLString, _super);
        function RegexXMLString(s) {
            _super.call(this, s);
        }
        // Override Me
        RegexXMLString.prototype.getPatternArray = function () {
            return [];
        };
        return RegexXMLString;
    })(xml.XMLString);
    xml.RegexXMLString = RegexXMLString;
})(xml || (xml = {}));

//# sourceMappingURL=RegexXMLString.js.map

var xml;
(function (xml) {
    var XMLString = (function () {
        function XMLString(s) {
            this.value = null;
            this.value = s;
        }
        XMLString.prototype.getString = function () { return this.value; };
        XMLString.prototype.toString = function () {
            return this.value;
        };
        XMLString.prototype.equalsString = function (s) {
            return this.value == s;
        };
        return XMLString;
    })();
    xml.XMLString = XMLString;
})(xml || (xml = {}));

//# sourceMappingURL=XMLString.js.map

var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var AnnotableType = (function () {
            function AnnotableType(an) {
                this.annotations = an;
            }
            return AnnotableType;
        })();
        common.AnnotableType = AnnotableType;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=AnnotableType.js.map

var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var Annotation = (function () {
            function Annotation() {
                this.annotationTitle = "";
                this.annotationType = "";
                this.annotationUrl = "";
            }
            return Annotation;
        })();
        common.Annotation = Annotation;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Annotation.js.map

var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var Annotations = (function () {
            function Annotations() {
                this.annotations = null;
            }
            Annotations.prototype.getAnnotations = function () {
                return this.annotations;
            };
            Annotations.prototype.setAnnotations = function (a) {
                this.annotations = a;
            };
            return Annotations;
        })();
        common.Annotations = Annotations;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Annotations.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var Description = (function (_super) {
            __extends(Description, _super);
            function Description() {
                _super.apply(this, arguments);
            }
            return Description;
        })(common.TextType);
        common.Description = Description;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Description.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var Name = (function (_super) {
            __extends(Name, _super);
            function Name() {
                _super.apply(this, arguments);
            }
            return Name;
        })(common.TextType);
        common.Name = Name;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Name.js.map

var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var TextType = (function () {
            function TextType(lang, text) {
                this.text = "";
                this.lang = lang;
                this.text = text;
            }
            TextType.prototype.getLang = function () {
                return this.lang;
            };
            TextType.prototype.getText = function () {
                return this.text;
            };
            TextType.prototype.setText = function (s) {
                this.text = s;
            };
            TextType.prototype.setLang = function (s) {
                this.lang = s;
            };
            return TextType;
        })();
        common.TextType = TextType;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=TextType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="NestedID.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var IDType = (function (_super) {
            __extends(IDType, _super);
            function IDType(s) {
                _super.call(this, s);
                if (s == null) {
                    throw new Error("null IDType string");
                }
            }
            IDType.prototype.equalsID = function (id) {
                return false;
            };
            IDType.prototype.equalsString = function (id) {
                return false;
            };
            IDType.prototype.getPatternArray = function () {
                return [IDType.PATTERN];
            };
            IDType.PATTERN = "[A-z0-9_@$\\-]+";
            return IDType;
        })(commonreferences.NestedID);
        commonreferences.IDType = IDType;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=IDType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../xml/RegexXMLString.ts" />
/// <reference path="../commonreferences/IDType.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var NestedID = (function (_super) {
            __extends(NestedID, _super);
            function NestedID(s) {
                _super.call(this, s);
            }
            NestedID.prototype.getPatternArray = function () {
                return [NestedID.PATTERN];
            };
            NestedID.prototype.equalsNestedID = function (id) {
                if (_super.prototype.getString.call(this) == null)
                    return false;
                return _super.prototype.getString.call(this) == id.getString();
            };
            NestedID.prototype.equalsString = function (id) {
                return _super.prototype.equalsString.call(this, id);
            };
            NestedID.prototype.equalsID = function (id) {
                return _super.prototype.getString.call(this) == id.getString();
            };
            NestedID.prototype.asID = function () {
                return new commonreferences.IDType(_super.prototype.getString.call(this));
            };
            NestedID.PATTERN = "[A-z0-9_@$\\-]+(\\.[A-z0-9_@$\\-]+)*";
            return NestedID;
        })(xml.RegexXMLString);
        commonreferences.NestedID = NestedID;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=NestedID.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var NestedNCNameID = (function (_super) {
            __extends(NestedNCNameID, _super);
            function NestedNCNameID(s) {
                _super.call(this, s);
            }
            NestedNCNameID.prototype.getPatternArray = function () {
                return [NestedNCNameID.PATTERN];
            };
            NestedNCNameID.prototype.equalsNestedNCNameID = function (id) {
                return _super.prototype.getString.call(this) == id.getString();
            };
            NestedNCNameID.PATTERN = "[A-z][A-z0-9_\\-]*(\\.[A-z][A-z0-9_\\-]*)*";
            return NestedNCNameID;
        })(commonreferences.NestedID);
        commonreferences.NestedNCNameID = NestedNCNameID;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=NestedNCNameID.js.map

var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var Ref = (function () {
            function Ref(agencyId, id, vers, maintParent, mainVers, containId, loc, ob, pack) {
                this.agencyId = null;
                this.id = null;
                this.version = null;
                this.maintainedParentId = null;
                this.maintainedParentVersion = null;
                this.local = null;
                this.object = null;
                this.package = null;
                this.agencyId = agencyId;
                this.id = id;
                this.version = vers;
                this.maintainedParentId = maintParent;
                this.maintainedParentVersion = mainVers;
                this.local = loc;
                this.object = ob;
                this.package = pack;
            }
            Ref.prototype.getAgencyId = function () {
                return this.agencyId;
            };
            Ref.prototype.getId = function () {
                return this.id;
            };
            Ref.prototype.getVersion = function () {
                return this.version;
            };
            Ref.prototype.getMaintainableParentId = function () {
                return this.maintainedParentId;
            };
            Ref.prototype.getMaintainableParentVersion = function () {
                return this.maintainedParentVersion;
            };
            Ref.prototype.getRefClass = function () {
                return this.object;
            };
            Ref.prototype.getPack = function () {
                return this.package;
            };
            Ref.prototype.setAgencyId = function (a) {
                this.agencyId = a;
            };
            Ref.prototype.setId = function (id) {
                this.id = id;
            };
            Ref.prototype.setVersion = function (v) {
                this.version = v;
            };
            Ref.prototype.setMaintainableParentId = function (id) {
                this.maintainedParentId = id;
            };
            Ref.prototype.setMaintainableParentVersion = function (v) {
                this.maintainedParentVersion = v;
            };
            Ref.prototype.setRefClass = function (ob) {
                this.object = ob;
            };
            Ref.prototype.setPackage = function (p) {
                this.package = p;
            };
            return Ref;
        })();
        commonreferences.Ref = Ref;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Ref.js.map

/// <reference path="../../xml/anyURI.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var Reference = (function () {
            function Reference(ref, urn) {
                this.pack = null;
                this.clazz = null;
                this.agency = null;
                this.maintainedParentId = null;
                this.maintainedParentVersion = null;
                this.version = null;
                this.containedIds = null;
                this.objectId = null;
                this.ref = ref;
                this.urn = urn;
                if (this.ref != null) {
                    //try {
                    this.pack = ref.getPack();
                    this.clazz = ref.getRefClass();
                    this.agency = ref.getAgencyId();
                    this.objectId = ref.getId();
                    this.maintainedParentId = ref.getMaintainableParentId();
                    this.maintainedParentVersion = ref.getMaintainableParentVersion();
                    this.version = ref.getVersion();
                }
                else {
                    this.parse();
                }
                if (this.urn == null) {
                    try {
                        //if (this.getAgencyId() != null) {
                        this.produce();
                    }
                    catch (Error) {
                    }
                }
            }
            /**
             * @return the ref
             */
            Reference.prototype.getRef = function () {
                return this.ref;
            };
            /**
             * @param ref the ref to set
             */
            Reference.prototype.setRef = function (ref) {
                this.ref = ref;
            };
            /**
             * @return the urn
             */
            Reference.prototype.getUrn = function () {
                return this.urn;
            };
            /**
             * @param urn the urn to set
             */
            Reference.prototype.setUrn = function (urn) {
                this.urn = urn;
            };
            /**
             * @return the pack
             */
            Reference.prototype.getPack = function () {
                return this.pack;
            };
            /**
             * @return the clazz
             */
            Reference.prototype.getRefClass = function () {
                return this.clazz;
            };
            /**
             * @return the clazz
             */
            Reference.prototype.getClazz = function () {
                return this.clazz;
            };
            /**
             * @return the agency
             */
            Reference.prototype.getAgencyId = function () {
                return this.agency;
            };
            /**
             * @return the maintainedObjectId
             */
            Reference.prototype.getMaintainableParentId = function () {
                return this.maintainedParentId;
            };
            /**
             * @return the maintainedObjectVersion
             */
            Reference.prototype.getVersion = function () {
                return this.version;
            };
            /**
             * @return the objectId
             */
            Reference.prototype.getId = function () {
                return this.objectId;
            };
            Reference.prototype.getContainedObjectIds = function () {
                return this.containedIds;
            };
            /**
             * @return the maintainedParentVersion
             */
            Reference.prototype.getMaintainedParentVersion = function () {
                return this.maintainedParentVersion;
            };
            //public IDType getMainID() {
            //    if( this.maintainedParentId==null ) return objectId!=null?objectId.asID():null;
            //    else return maintainedParentId;
            //}
            Reference.prototype.dump = function () {
            };
            Reference.prototype.toString = function () {
                var s = "";
                return s;
            };
            Reference.prototype.parse = function () {
            };
            Reference.prototype.produce = function () {
            };
            return Reference;
        })();
        commonreferences.Reference = Reference;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Reference.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../xml/RegexXMLString.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var Version = (function (_super) {
            __extends(Version, _super);
            function Version(s) {
                _super.call(this, s);
            }
            Version.prototype.getPatternArray = function () {
                return [Version.PATTERN];
            };
            Version.prototype.equalsVersion = function (id) {
                return _super.prototype.getString.call(this) == id.getString();
            };
            Version.prototype.equals = function (id) {
                return _super.prototype.getString.call(this) == id;
            };
            Version.prototype.compareTo = function (o) {
                if (!(o instanceof Version))
                    return -1;
                var a1 = parseFloat(o.toString());
                var a2 = parseFloat(toString());
                return a1 > a2 ? 1 : a1 < a2 ? -1 : 0;
            };
            Version.PATTERN = "[0-9]+(\\.[0-9]+)*";
            Version.ONE = new Version("1.0");
            return Version;
        })(xml.RegexXMLString);
        commonreferences.Version = Version;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Version.js.map

var sdmx;
(function (sdmx) {
    var message;
    (function (message) {
        var DataMessageType = (function () {
            function DataMessageType() {
            }
            return DataMessageType;
        })();
        message.DataMessageType = DataMessageType;
    })(message = sdmx.message || (sdmx.message = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=DataMessage.js.map

var sdmx;
(function (sdmx) {
    var message;
    (function (message) {
        var DataQuery = (function () {
            function DataQuery() {
            }
            return DataQuery;
        })();
        message.DataQuery = DataQuery;
    })(message = sdmx.message || (sdmx.message = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=DataQuery.js.map

var sdmx;
(function (sdmx) {
    var message;
    (function (message) {
        var StructureType = (function () {
            function StructureType(struct) {
                this.struct = struct;
            }
            // Registry
            StructureType.prototype.listDataflows = function () {
                return null;
            };
            StructureType.prototype.clear = function () {
            };
            StructureType.prototype.load = function (struct) {
            };
            StructureType.prototype.unload = function (struct) {
            };
            StructureType.prototype.findDataStructure = function (ref) {
                return null;
            };
            StructureType.prototype.findDataflow = function (ref) {
                return null;
            };
            StructureType.prototype.findCode = function (ref) {
                return null;
            };
            StructureType.prototype.findCodelist = function (ref) {
                return null;
            };
            StructureType.prototype.findItemType = function (item) {
                return null;
            };
            StructureType.prototype.findConcept = function (ref) {
                return null;
            };
            StructureType.prototype.findConceptScheme = function (ref) {
                return null;
            };
            StructureType.prototype.searchDataStructure = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchDataflow = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchCodelist = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchItemType = function (item) {
                return new Array();
            };
            StructureType.prototype.searchConcept = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchConceptScheme = function (ref) {
                return new Array();
            };
            StructureType.prototype.save = function () {
            };
            return StructureType;
        })();
        message.StructureType = StructureType;
    })(message = sdmx.message || (sdmx.message = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=StructureType.js.map

/**
 *	<xs:simpleType name="ObjectTypeCodelistType">
*		<xs:annotation>
*			<xs:documentation>ObjectTypeCodelistType provides an enumeration of all objects outside of the base infomration model class. This includes some abstract object types such as Organsiation and Constraint.</xs:documentation>
*		</xs:annotation>
*		<xs:restriction base="xs:string">
*			<xs:enumeration value="Any"/>
*			<xs:enumeration value="Agency"/>
*			<xs:enumeration value="AgencyScheme"/>
*			<xs:enumeration value="AttachmentConstraint"/>
*			<xs:enumeration value="Attribute"/>
*			<xs:enumeration value="AttributeDescriptor"/>
*			<xs:enumeration value="Categorisation"/>
*			<xs:enumeration value="Category"/>
*			<xs:enumeration value="CategorySchemeMap"/>
*			<xs:enumeration value="CategoryScheme"/>
*			<xs:enumeration value="Code"/>
*			<xs:enumeration value="CodeMap"/>
*			<xs:enumeration value="Codelist"/>
*			<xs:enumeration value="CodelistMap"/>
*			<xs:enumeration value="ComponentMap"/>
*			<xs:enumeration value="Concept"/>
*			<xs:enumeration value="ConceptMap"/>
*			<xs:enumeration value="ConceptScheme"/>
*			<xs:enumeration value="ConceptSchemeMap"/>
*			<xs:enumeration value="Constraint"/>
*			<xs:enumeration value="ConstraintTarget"/>
*			<xs:enumeration value="ContentConstraint"/>
*			<xs:enumeration value="Dataflow"/>
*			<xs:enumeration value="DataConsumer"/>
*			<xs:enumeration value="DataConsumerScheme"/>
*			<xs:enumeration value="DataProvider"/>
*			<xs:enumeration value="DataProviderScheme"/>
*			<xs:enumeration value="DataSetTarget"/>
*			<xs:enumeration value="DataStructure"/>
*			<xs:enumeration value="Dimension"/>
*			<xs:enumeration value="DimensionDescriptor"/>
*			<xs:enumeration value="DimensionDescriptorValuesTarget"/>
*			<xs:enumeration value="GroupDimensionDescriptor"/>
*			<xs:enumeration value="HierarchicalCode"/>
*			<xs:enumeration value="HierarchicalCodelist"/>
*			<xs:enumeration value="Hierarchy"/>
*			<xs:enumeration value="HybridCodelistMap"/>
*			<xs:enumeration value="HybridCodeMap"/>
*			<xs:enumeration value="IdentifiableObjectTarget"/>
*			<xs:enumeration value="Level"/>
*			<xs:enumeration value="MeasureDescriptor"/>
*			<xs:enumeration value="MeasureDimension"/>
*			<xs:enumeration value="Metadataflow"/>
*			<xs:enumeration value="MetadataAttribute"/>
*			<xs:enumeration value="MetadataSet"/>
*			<xs:enumeration value="MetadataStructure"/>
*			<xs:enumeration value="MetadataTarget"/>
*			<xs:enumeration value="Organisation"/>
*			<xs:enumeration value="OrganisationMap"/>
*			<xs:enumeration value="OrganisationScheme"/>
*			<xs:enumeration value="OrganisationSchemeMap"/>
*			<xs:enumeration value="OrganisationUnit"/>
*			<xs:enumeration value="OrganisationUnitScheme"/>
*			<xs:enumeration value="PrimaryMeasure"/>
*			<xs:enumeration value="Process"/>
*			<xs:enumeration value="ProcessStep"/>
*			<xs:enumeration value="ProvisionAgreement"/>
*			<xs:enumeration value="ReportingCategory"/>
*			<xs:enumeration value="ReportingCategoryMap"/>
*			<xs:enumeration value="ReportingTaxonomy"/>
*			<xs:enumeration value="ReportingTaxonomyMap"/>
*			<xs:enumeration value="ReportingYearStartDay"/>
*			<xs:enumeration value="ReportPeriodTarget"/>
*			<xs:enumeration value="ReportStructure"/>
*			<xs:enumeration value="StructureMap"/>
*			<xs:enumeration value="StructureSet"/>
*			<xs:enumeration value="TimeDimension"/>
*			<xs:enumeration value="Transition"/>
*		</xs:restriction>
*	</xs:simpleType>
*
 * @author James
 */
/**
 *  This file is part of SdmxSax.
 *
 *   SdmxSax is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 
 *   SdmxSax is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with SdmxSax.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  Copyright James Gardner 2014
 */
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var type;
        (function (type) {
            var ObjectTypeCodelistType = (function () {
                function ObjectTypeCodelistType(s) {
                    // Instance
                    this.target = null;
                    this.index = -1;
                    var contains = false;
                    for (var i = 0; i < ObjectTypeCodelistType.STRING_ENUM.length; i++) {
                        if (ObjectTypeCodelistType.STRING_ENUM[i] == s) {
                            contains = true;
                        }
                    }
                    if (!contains)
                        throw new Error(s + " is not a valid CodeTypeCodelistType");
                    this.target = s;
                    this.index = ObjectTypeCodelistType.STRING_ENUM.indexOf(s);
                }
                // Utility
                ObjectTypeCodelistType.add = function (s) {
                    var b = new ObjectTypeCodelistType(s);
                    ObjectTypeCodelistType.ENUM.push(b);
                    return b;
                };
                ObjectTypeCodelistType.addString = function (s) {
                    ObjectTypeCodelistType.STRING_ENUM.push(s);
                    return s;
                };
                ObjectTypeCodelistType.fromString = function (s) {
                    for (var i = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                        if (ObjectTypeCodelistType.ENUM[i].target == s)
                            return ObjectTypeCodelistType.ENUM[i];
                    }
                    return null;
                };
                ObjectTypeCodelistType.fromStringWithException = function (s) {
                    for (var i = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                        if (ObjectTypeCodelistType.ENUM[i].target == s)
                            return ObjectTypeCodelistType.ENUM[i];
                    }
                    throw new Error("Value:" + s + " not found in enumeration! - ObjectypeCodelistType");
                };
                ObjectTypeCodelistType.prototype.toString = function () { return this.target; };
                ObjectTypeCodelistType.prototype.toInt = function () {
                    return this.index;
                };
                ObjectTypeCodelistType.ENUM = new Array();
                ObjectTypeCodelistType.STRING_ENUM = new Array();
                ObjectTypeCodelistType.TARGET_ANY = ObjectTypeCodelistType.addString("Any");
                ObjectTypeCodelistType.TARGET_AGENCY = ObjectTypeCodelistType.addString("Agency");
                ObjectTypeCodelistType.TARGET_AGENCYSCHEME = ObjectTypeCodelistType.addString("AgencyScheme");
                ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT = ObjectTypeCodelistType.addString("AttachmentConstraint");
                ObjectTypeCodelistType.TARGET_ATTRIBUTE = ObjectTypeCodelistType.addString("Attribute");
                ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR = ObjectTypeCodelistType.addString("AttributeDescriptor");
                ObjectTypeCodelistType.TARGET_CATEGORISATION = ObjectTypeCodelistType.addString("Categorisation");
                ObjectTypeCodelistType.TARGET_CATEGORY = ObjectTypeCodelistType.addString("Category");
                ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP = ObjectTypeCodelistType.addString("CategorySchemeMap");
                ObjectTypeCodelistType.TARGET_CATEGORYSCHEME = ObjectTypeCodelistType.addString("CategoryScheme");
                ObjectTypeCodelistType.TARGET_CODE = ObjectTypeCodelistType.addString("Code");
                ObjectTypeCodelistType.TARGET_CODEMAP = ObjectTypeCodelistType.addString("CodeMap");
                ObjectTypeCodelistType.TARGET_CODELIST = ObjectTypeCodelistType.addString("Codelist");
                ObjectTypeCodelistType.TARGET_CODELISTMAP = ObjectTypeCodelistType.addString("CodelistMap");
                ObjectTypeCodelistType.TARGET_COMPONENTMAP = ObjectTypeCodelistType.addString("ComponentMap");
                ObjectTypeCodelistType.TARGET_CONCEPT = ObjectTypeCodelistType.addString("Concept");
                ObjectTypeCodelistType.TARGET_CONCEPTMAP = ObjectTypeCodelistType.addString("ConceptMap");
                ObjectTypeCodelistType.TARGET_CONCEPTSCHEME = ObjectTypeCodelistType.addString("ConceptScheme");
                ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP = ObjectTypeCodelistType.addString("ConceptSchemeMap");
                ObjectTypeCodelistType.TARGET_CONSTRAINT = ObjectTypeCodelistType.addString("Constraint");
                ObjectTypeCodelistType.TARGET_CONSTRAINTARGET = ObjectTypeCodelistType.addString("ConstraintTarget");
                ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT = ObjectTypeCodelistType.addString("ContentConstraint");
                ObjectTypeCodelistType.TARGET_DATAFLOW = ObjectTypeCodelistType.addString("Dataflow");
                ObjectTypeCodelistType.TARGET_DATACONSUMER = ObjectTypeCodelistType.addString("DataConsumer");
                ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME = ObjectTypeCodelistType.addString("DataConsumerScheme");
                ObjectTypeCodelistType.TARGET_DATAPROVIDER = ObjectTypeCodelistType.addString("DataProvider");
                ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME = ObjectTypeCodelistType.addString("DataProviderScheme");
                ObjectTypeCodelistType.TARGET_DATASETTARGET = ObjectTypeCodelistType.addString("DataSetTarget");
                ObjectTypeCodelistType.TARGET_DATASTRUCTURE = ObjectTypeCodelistType.addString("DataStructure");
                ObjectTypeCodelistType.TARGET_DIMENSION = ObjectTypeCodelistType.addString("Dimension");
                ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR = ObjectTypeCodelistType.addString("DimensionDescriptor");
                ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET = ObjectTypeCodelistType.addString("DimensionDescriptorValuesTarget");
                ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR = ObjectTypeCodelistType.addString("GroupDimensionDescriptor");
                ObjectTypeCodelistType.TARGET_HIERARCHICALCODE = ObjectTypeCodelistType.addString("HierarchicalCode");
                ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST = ObjectTypeCodelistType.addString("HierarchicalCodelist");
                ObjectTypeCodelistType.TARGET_HIERARCHY = ObjectTypeCodelistType.addString("Hierarchy");
                ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP = ObjectTypeCodelistType.addString("HybridCodelistMap");
                ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP = ObjectTypeCodelistType.addString("HybridCodeMap");
                ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET = ObjectTypeCodelistType.addString("IdentifiableObjectTarget");
                ObjectTypeCodelistType.TARGET_LEVEL = ObjectTypeCodelistType.addString("Level");
                ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR = ObjectTypeCodelistType.addString("MeasureDescriptor");
                ObjectTypeCodelistType.TARGET_MEASUREDIMENSION = ObjectTypeCodelistType.addString("MeasureDimension");
                ObjectTypeCodelistType.TARGET_METADATAFLOW = ObjectTypeCodelistType.addString("Metadataflow");
                ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE = ObjectTypeCodelistType.addString("MetadataAttribute");
                ObjectTypeCodelistType.TARGET_METADATASET = ObjectTypeCodelistType.addString("MetadataSet");
                ObjectTypeCodelistType.TARGET_METADATASTRUCTURE = ObjectTypeCodelistType.addString("MetadataStructure");
                ObjectTypeCodelistType.TARGET_METADATATARGET = ObjectTypeCodelistType.addString("MetadataTarget");
                ObjectTypeCodelistType.TARGET_ORGANISATION = ObjectTypeCodelistType.addString("Organisation");
                ObjectTypeCodelistType.TARGET_ORGANISATIONMAP = ObjectTypeCodelistType.addString("OrganisationMap");
                ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME = ObjectTypeCodelistType.addString("OrganisationScheme");
                ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP = ObjectTypeCodelistType.addString("OrganisationSchemeMap");
                ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT = ObjectTypeCodelistType.addString("OrganisationUnit");
                ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME = ObjectTypeCodelistType.addString("OrganisationUnitScheme");
                ObjectTypeCodelistType.TARGET_PRIMARYMEASURE = ObjectTypeCodelistType.addString("PrimaryMeasure");
                ObjectTypeCodelistType.TARGET_PROCESS = ObjectTypeCodelistType.addString("Process");
                ObjectTypeCodelistType.TARGET_PROCESSSTEP = ObjectTypeCodelistType.addString("ProcessStep");
                ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT = ObjectTypeCodelistType.addString("ProvisionAgreement");
                ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY = ObjectTypeCodelistType.addString("ReportingCategory");
                ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP = ObjectTypeCodelistType.addString("ReportingCategoryMap");
                ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY = ObjectTypeCodelistType.addString("ReportingTaxonomy");
                ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP = ObjectTypeCodelistType.addString("ReportingTaxonomyMap");
                ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY = ObjectTypeCodelistType.addString("ReportingYearStartDay");
                ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET = ObjectTypeCodelistType.addString("ReportPeriodTarget");
                ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE = ObjectTypeCodelistType.addString("ReportStructure");
                ObjectTypeCodelistType.TARGET_STRUCTUREMAP = ObjectTypeCodelistType.addString("StructureMap");
                ObjectTypeCodelistType.TARGET_STRUCTURESET = ObjectTypeCodelistType.addString("StructureSet");
                ObjectTypeCodelistType.TARGET_TIMEDIMENSION = ObjectTypeCodelistType.addString("TimeDimension");
                ObjectTypeCodelistType.TARGET_TRANSITION = ObjectTypeCodelistType.addString("Transition");
                ObjectTypeCodelistType.ANY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ANY);
                ObjectTypeCodelistType.AGENCY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCY);
                ObjectTypeCodelistType.AGENCYSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCYSCHEME);
                ObjectTypeCodelistType.ATTACHMENTCONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT);
                ObjectTypeCodelistType.ATTRIBUTE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTE);
                ObjectTypeCodelistType.ATTRIBUTEDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR);
                ObjectTypeCodelistType.CATEGORISATION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORISATION);
                ObjectTypeCodelistType.CATEGORY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORY);
                ObjectTypeCodelistType.CATEGORYSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP);
                ObjectTypeCodelistType.CATEGORYSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEME);
                ObjectTypeCodelistType.CODE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
                ObjectTypeCodelistType.CODEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
                ObjectTypeCodelistType.CODELIST = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELIST);
                ObjectTypeCodelistType.CODELISTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELISTMAP);
                ObjectTypeCodelistType.COMPONENTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_COMPONENTMAP);
                ObjectTypeCodelistType.CONCEPT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPT);
                ObjectTypeCodelistType.CONCEPTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTMAP);
                ObjectTypeCodelistType.CONCEPTSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEME);
                ObjectTypeCodelistType.CONCEPTSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP);
                ObjectTypeCodelistType.CONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINT);
                ObjectTypeCodelistType.CONSTRAINTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINTARGET);
                ObjectTypeCodelistType.CONTENTCONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT);
                ObjectTypeCodelistType.DATAFLOW = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAFLOW);
                ObjectTypeCodelistType.DATACONSUMER = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMER);
                ObjectTypeCodelistType.DATACONSUMERSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME);
                ObjectTypeCodelistType.DATAPROVIDER = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDER);
                ObjectTypeCodelistType.DATAPROVIDERSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME);
                ObjectTypeCodelistType.DATASETTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASETTARGET);
                ObjectTypeCodelistType.DATASTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASTRUCTURE);
                ObjectTypeCodelistType.DIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSION);
                ObjectTypeCodelistType.DIMENSIONDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR);
                ObjectTypeCodelistType.DIMENSIONDESCRIPTORVALUESTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET);
                ObjectTypeCodelistType.GROUPDIMENSIONDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR);
                ObjectTypeCodelistType.HIERARCHICALCODE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODE);
                ObjectTypeCodelistType.HIERARCHICALCODELIST = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST);
                ObjectTypeCodelistType.HIERARCHY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHY);
                ObjectTypeCodelistType.HYBRIDCODELISTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP);
                ObjectTypeCodelistType.HYBRIDCODEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP);
                ObjectTypeCodelistType.IDENTIFIABLEOBJECTTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET);
                ObjectTypeCodelistType.LEVEL = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_LEVEL);
                ObjectTypeCodelistType.MEASUREDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR);
                ObjectTypeCodelistType.MEASUREDIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDIMENSION);
                ObjectTypeCodelistType.METADATAFLOW = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAFLOW);
                ObjectTypeCodelistType.METADATAATTRIBUTE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE);
                ObjectTypeCodelistType.METADATASET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASET);
                ObjectTypeCodelistType.METADATASTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASTRUCTURE);
                ObjectTypeCodelistType.METADATATARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATATARGET);
                ObjectTypeCodelistType.ORGANISATION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATION);
                ObjectTypeCodelistType.ORGANISATIONMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONMAP);
                ObjectTypeCodelistType.ORGANISATIONSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME);
                ObjectTypeCodelistType.ORGANISATIONSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP);
                ObjectTypeCodelistType.ORGANISATIONUNIT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT);
                ObjectTypeCodelistType.ORGANISATIONUNITSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME);
                ObjectTypeCodelistType.PRIMARYMEASURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PRIMARYMEASURE);
                ObjectTypeCodelistType.PROCESS = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESS);
                ObjectTypeCodelistType.PROCESSSTEP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESSSTEP);
                ObjectTypeCodelistType.PROVISIONAGREEMENT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT);
                ObjectTypeCodelistType.REPORTINGCATEGORY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY);
                ObjectTypeCodelistType.REPORTINGCATEGORYMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP);
                ObjectTypeCodelistType.REPORTINGTAXONOMY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY);
                ObjectTypeCodelistType.REPORTINGTAXONOMYMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP);
                ObjectTypeCodelistType.REPORTINGYEARSTARTDAY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY);
                ObjectTypeCodelistType.REPORTPERIODTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET);
                ObjectTypeCodelistType.REPORTSTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE);
                ObjectTypeCodelistType.STRUCTUREMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTUREMAP);
                ObjectTypeCodelistType.STRUCTURESET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTURESET);
                ObjectTypeCodelistType.TIMEDIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TIMEDIMENSION);
                ObjectTypeCodelistType.TRANSITION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TRANSITION);
                ObjectTypeCodelistType.INT_ANY = 0;
                ObjectTypeCodelistType.INT_AGENCY = 1;
                ObjectTypeCodelistType.INT_AGENCYSCHEME = 2;
                ObjectTypeCodelistType.INT_ATTACHMENTCONSTRAINT = 3;
                ObjectTypeCodelistType.INT_ATTRIBUTE = 4;
                ObjectTypeCodelistType.INT_ATTRIBUTEDESCRIPTOR = 5;
                ObjectTypeCodelistType.INT_CATEGORISATION = 6;
                ObjectTypeCodelistType.INT_CATEGORY = 7;
                ObjectTypeCodelistType.INT_CATEGORYSCHEMEMAP = 8;
                ObjectTypeCodelistType.INT_CATEGORYSCHEME = 9;
                ObjectTypeCodelistType.INT_CODE = 10;
                ObjectTypeCodelistType.INT_CODEMAP = 11;
                ObjectTypeCodelistType.INT_CODELIST = 12;
                ObjectTypeCodelistType.INT_CODELISTMAP = 13;
                ObjectTypeCodelistType.INT_COMPONENTMAP = 14;
                ObjectTypeCodelistType.INT_CONCEPT = 15;
                ObjectTypeCodelistType.INT_CONCEPTMAP = 16;
                ObjectTypeCodelistType.INT_CONCEPTSCHEME = 17;
                ObjectTypeCodelistType.INT_CONCEPTSCHEMEMAP = 18;
                ObjectTypeCodelistType.INT_CONSTRAINT = 19;
                ObjectTypeCodelistType.INT_CONSTRAINTARGET = 20;
                ObjectTypeCodelistType.INT_CONTENTCONSTRAINT = 21;
                ObjectTypeCodelistType.INT_DATAFLOW = 22;
                ObjectTypeCodelistType.INT_DATACONSUMER = 23;
                ObjectTypeCodelistType.INT_DATACONSUMERSCHEME = 24;
                ObjectTypeCodelistType.INT_DATAPROVIDER = 25;
                ObjectTypeCodelistType.INT_DATAPROVIDERSCHEME = 26;
                ObjectTypeCodelistType.INT_DATASETTARGET = 27;
                ObjectTypeCodelistType.INT_DATASTRUCTURE = 28;
                ObjectTypeCodelistType.INT_DIMENSION = 29;
                ObjectTypeCodelistType.INT_DIMENSIONDESCRIPTOR = 30;
                ObjectTypeCodelistType.INT_DIMENSIONDESCRIPTORVALUESTARGET = 31;
                ObjectTypeCodelistType.INT_GROUPDIMENSIONDESCRIPTOR = 32;
                ObjectTypeCodelistType.INT_HIERARCHICALCODE = 33;
                ObjectTypeCodelistType.INT_HIERARCHICALCODELIST = 34;
                ObjectTypeCodelistType.INT_HIERARCHY = 35;
                ObjectTypeCodelistType.INT_HYBRIDCODELISTMAP = 36;
                ObjectTypeCodelistType.INT_HYBRIDCODEMAP = 37;
                ObjectTypeCodelistType.INT_IDENTIFIABLEOBJECTTARGET = 38;
                ObjectTypeCodelistType.INT_LEVEL = 39;
                ObjectTypeCodelistType.INT_MEASUREDESCRIPTOR = 40;
                ObjectTypeCodelistType.INT_MEASUREDIMENSION = 41;
                ObjectTypeCodelistType.INT_METADATAFLOW = 42;
                ObjectTypeCodelistType.INT_METADATAATTRIBUTE = 43;
                ObjectTypeCodelistType.INT_METADATASET = 44;
                ObjectTypeCodelistType.INT_METADATASTRUCTURE = 45;
                ObjectTypeCodelistType.INT_METADATATARGET = 46;
                ObjectTypeCodelistType.INT_ORGANISATION = 47;
                ObjectTypeCodelistType.INT_ORGANISATIONMAP = 48;
                ObjectTypeCodelistType.INT_ORGANISATIONSCHEME = 49;
                ObjectTypeCodelistType.INT_ORGANISATIONSCHEMEMAP = 50;
                ObjectTypeCodelistType.INT_ORGANISATIONUNIT = 51;
                ObjectTypeCodelistType.INT_ORGANISATIONUNITSCHEME = 52;
                ObjectTypeCodelistType.INT_PRIMARYMEASURE = 53;
                ObjectTypeCodelistType.INT_PROCESS = 54;
                ObjectTypeCodelistType.INT_PROCESSSTEP = 55;
                ObjectTypeCodelistType.INT_PROVISIONAGREEMENT = 56;
                ObjectTypeCodelistType.INT_REPORTINGCATEGORY = 57;
                ObjectTypeCodelistType.INT_REPORTINGCATEGORYMAP = 58;
                ObjectTypeCodelistType.INT_REPORTINGTAXONOMY = 59;
                ObjectTypeCodelistType.INT_REPORTINGTAXONOMYMAP = 60;
                ObjectTypeCodelistType.INT_REPORTINGYEARSTARTDAY = 61;
                ObjectTypeCodelistType.INT_REPORTPERIODTARGET = 62;
                ObjectTypeCodelistType.INT_REPORTSTRUCTURE = 63;
                ObjectTypeCodelistType.INT_STRUCTUREMAP = 64;
                ObjectTypeCodelistType.INT_STRUCTURESET = 65;
                ObjectTypeCodelistType.INT_TIMEDIMENSION = 66;
                ObjectTypeCodelistType.INT_TRANSITION = 67;
                return ObjectTypeCodelistType;
            })();
            type.ObjectTypeCodelistType = ObjectTypeCodelistType;
        })(type = commonreferences.type || (commonreferences.type = {}));
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ObjectTypeCodelistType.js.map

var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var type;
        (function (type) {
            var PackageTypeCodelistType = (function () {
                function PackageTypeCodelistType(s) {
                    // Instance
                    this.target = null;
                    var contains = false;
                    for (var i = 0; i < PackageTypeCodelistType.STRING_ENUM.length; i++) {
                        if (PackageTypeCodelistType.STRING_ENUM[i] == s) {
                            contains = true;
                        }
                    }
                    if (!contains)
                        throw new Error(s + " is not a valid CodeTypeCodelistType");
                    this.target = s;
                }
                // Utility
                PackageTypeCodelistType.add = function (s) {
                    var b = new PackageTypeCodelistType(s);
                    PackageTypeCodelistType.ENUM.push(b);
                    return b;
                };
                PackageTypeCodelistType.addString = function (s) {
                    PackageTypeCodelistType.STRING_ENUM.push(s);
                    return s;
                };
                PackageTypeCodelistType.fromString = function (s) {
                    for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                        if (PackageTypeCodelistType.ENUM[i].target == s)
                            return PackageTypeCodelistType.ENUM[i];
                    }
                    return null;
                };
                PackageTypeCodelistType.fromStringWithException = function (s) {
                    for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                        if (PackageTypeCodelistType.ENUM[i].target == s)
                            return PackageTypeCodelistType.ENUM[i];
                    }
                    throw new Error("Value:" + s + " not found in PackageTypeCodelistType enumeration!");
                };
                PackageTypeCodelistType.prototype.toString = function () { return this.target; };
                PackageTypeCodelistType.ENUM = new Array();
                PackageTypeCodelistType.STRING_ENUM = new Array();
                PackageTypeCodelistType.TARGET_BASE = PackageTypeCodelistType.addString("base");
                PackageTypeCodelistType.TARGET_DATASTRUCTURE = PackageTypeCodelistType.addString("datastructure");
                PackageTypeCodelistType.TARGET_METADATASTRUCTURE = PackageTypeCodelistType.addString("metadatastructure");
                PackageTypeCodelistType.TARGET_PROCESS = PackageTypeCodelistType.addString("process");
                PackageTypeCodelistType.TARGET_REGISTRY = PackageTypeCodelistType.addString("registry");
                PackageTypeCodelistType.TARGET_MAPPING = PackageTypeCodelistType.addString("mapping");
                PackageTypeCodelistType.TARGET_CODELIST = PackageTypeCodelistType.addString("codelist");
                PackageTypeCodelistType.TARGET_CATEGORYSCHEME = PackageTypeCodelistType.addString("categoryscheme");
                PackageTypeCodelistType.TARGET_CONCEPTSCHEME = PackageTypeCodelistType.addString("conceptscheme");
                PackageTypeCodelistType.BASE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_BASE);
                PackageTypeCodelistType.DATASTRUCTURE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_DATASTRUCTURE);
                PackageTypeCodelistType.METADATASTRUCTURE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_METADATASTRUCTURE);
                PackageTypeCodelistType.PROCESS = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_PROCESS);
                PackageTypeCodelistType.REGISTRY = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_REGISTRY);
                PackageTypeCodelistType.MAPPING = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_MAPPING);
                PackageTypeCodelistType.CODELIST = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CODELIST);
                PackageTypeCodelistType.CATEGORYSCHEME = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CATEGORYSCHEME);
                PackageTypeCodelistType.CONCEPTSCHEME = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CONCEPTSCHEME);
                return PackageTypeCodelistType;
            })();
            type.PackageTypeCodelistType = PackageTypeCodelistType;
        })(type = commonreferences.type || (commonreferences.type = {}));
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=PackageTypeCodelistType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../base/ItemSchemeType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var code;
        (function (code) {
            var CodelistType = (function (_super) {
                __extends(CodelistType, _super);
                function CodelistType() {
                    _super.apply(this, arguments);
                }
                return CodelistType;
            })(sdmx.structure.base.ItemSchemeType);
            code.CodelistType = CodelistType;
        })(code = structure.code || (structure.code = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=CodelistType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../base/ItemType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var code;
        (function (code) {
            var CodeType = (function (_super) {
                __extends(CodeType, _super);
                function CodeType() {
                    _super.apply(this, arguments);
                }
                return CodeType;
            })(sdmx.structure.base.ItemType);
            code.CodeType = CodeType;
        })(code = structure.code || (structure.code = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=CodeType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var concept;
        (function (concept) {
            var ConceptSchemeType = (function (_super) {
                __extends(ConceptSchemeType, _super);
                function ConceptSchemeType() {
                    _super.apply(this, arguments);
                }
                return ConceptSchemeType;
            })(sdmx.structure.base.ItemSchemeType);
            concept.ConceptSchemeType = ConceptSchemeType;
        })(concept = structure.concept || (structure.concept = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ConceptSchemeType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../base/ItemType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var concept;
        (function (concept) {
            var ConceptType = (function (_super) {
                __extends(ConceptType, _super);
                function ConceptType() {
                    _super.apply(this, arguments);
                }
                return ConceptType;
            })(sdmx.structure.base.ItemType);
            concept.ConceptType = ConceptType;
        })(concept = structure.concept || (structure.concept = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ConceptType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../common/AnnotableType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var IdentifiableType = (function (_super) {
                __extends(IdentifiableType, _super);
                function IdentifiableType(an, id, urn, uri) {
                    _super.call(this, an);
                    this.id = id;
                    this.urn = urn;
                    this.uri = uri;
                }
                IdentifiableType.prototype.getId = function () { return this.id; };
                IdentifiableType.prototype.getURN = function () { return this.urn; };
                IdentifiableType.prototype.getURI = function () { return this.uri; };
                IdentifiableType.prototype.setId = function (id) {
                    this.id = id;
                };
                IdentifiableType.prototype.setURN = function (urn) {
                    this.urn = urn;
                };
                IdentifiableType.prototype.setURI = function (uri) {
                    this.uri = uri;
                };
                IdentifiableType.prototype.identifiesMeId = function (oid) {
                    if (this.id.equalsID(oid))
                        return true;
                    else
                        return false;
                };
                IdentifiableType.prototype.identifiesMeString = function (oid) {
                    if (this.id.equalsString(oid))
                        return true;
                    else
                        return false;
                };
                IdentifiableType.prototype.identifiesMeNestedId = function (oid) {
                    if (oid.equalsString(this.id.getString()))
                        return true;
                    else
                        return false;
                };
                return IdentifiableType;
            })(sdmx.common.AnnotableType);
            base.IdentifiableType = IdentifiableType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=IdentifiableType.js.map

var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var ItemSchemeType = (function () {
                function ItemSchemeType() {
                    this.items = new Array();
                    this.partial = false;
                }
                /**
                 * @return the items
                 */
                ItemSchemeType.prototype.getItems = function () {
                    return this.items;
                };
                /**
                 * @param items the items to set
                 */
                ItemSchemeType.prototype.setItems = function (itms) {
                    this.items = itms;
                };
                /**
                 * @return the partial
                 */
                ItemSchemeType.prototype.isPartial = function () {
                    return this.partial;
                };
                /**
                 * @param partial the partial to set
                 */
                ItemSchemeType.prototype.setPartial = function (partial) {
                    this.partial = partial;
                };
                ItemSchemeType.prototype.getItem = function (i) {
                    return this.items[i];
                };
                ItemSchemeType.prototype.setItem = function (i, it) {
                    this.items[i] = it;
                };
                ItemSchemeType.prototype.removeItem = function (it) {
                    this.items.splice(this.items.indexOf(it), 1);
                };
                ItemSchemeType.prototype.addItem = function (it) {
                    this.items.push(it);
                };
                ItemSchemeType.prototype.size = function () {
                    return this.items.length;
                };
                ItemSchemeType.prototype.findItemString = function (s) {
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].identifiesMeString(s))
                            return this.items[i];
                    }
                    return null;
                };
                ItemSchemeType.prototype.findItemId = function (s) {
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].identifiesMeId(s))
                            return this.items[i];
                    }
                    return null;
                };
                ItemSchemeType.prototype.findItemNestedId = function (s) {
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].identifiesMeNestedId(s))
                            return this.items[i];
                    }
                    return null;
                };
                ItemSchemeType.prototype.findSubItemsString = function (s) {
                    return this.findSubItemsId(new sdmx.commonreferences.IDType(s));
                };
                ItemSchemeType.prototype.findSubItemsId = function (id) {
                    var result = new Array();
                    if (id == null) {
                        for (var i = 0; i < this.items.length; i++) {
                            var item = this.items[i];
                            if (item.getParent() == null) {
                                result.push(item);
                            }
                        }
                        return result;
                    }
                    else {
                        for (var i = 0; i < this.items.length; i++) {
                            var item = this.items[i];
                            if (item.getParent().getId().equalsID(id)) {
                                result.push(item);
                            }
                        }
                        return result;
                    }
                };
                return ItemSchemeType;
            })();
            base.ItemSchemeType = ItemSchemeType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ItemSchemeType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../collections.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var ItemType = (function (_super) {
                __extends(ItemType, _super);
                function ItemType() {
                    _super.apply(this, arguments);
                    this.parent = null;
                    this.items = new collections.LinkedList();
                }
                /**
                 * @return the parent
                 */
                ItemType.prototype.getParent = function () {
                    return this.parent;
                };
                /**
                 * @param parent the parent to set
                 */
                ItemType.prototype.setParent = function (parent) {
                    this.parent = parent;
                };
                /**
                 * @return the items
                 */
                ItemType.prototype.getItems = function () {
                    return this.items;
                };
                /**
                 * @param items the items to set
                 */
                ItemType.prototype.setItems = function (items) {
                    this.items = items;
                };
                ItemType.prototype.getItem = function (i) {
                    return this.items[i];
                };
                ItemType.prototype.setItem = function (i, it) {
                    this.items[i] = it;
                };
                ItemType.prototype.removeItem = function (it) {
                    this.items.remove(it);
                };
                ItemType.prototype.addItem = function (it) {
                    this.items.add(it);
                };
                ItemType.prototype.size = function () {
                    return this.items.size();
                };
                ItemType.prototype.findItemString = function (s) {
                    for (var i = 0; i < this.items.size(); i++) {
                        if (this.items.elementAtIndex(i).identifiesMeString(s))
                            return this.items.elementAtIndex(i);
                    }
                    return null;
                };
                ItemType.prototype.findItem = function (id) {
                    for (var i = 0; i < this.items.size(); i++) {
                        if (this.items.elementAtIndex(i).identifiesMeId(id))
                            return this.items.elementAtIndex(i);
                    }
                    return null;
                };
                return ItemType;
            })(base.NameableType);
            base.ItemType = ItemType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ItemType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../common/AnnotableType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var NameableType = (function (_super) {
                __extends(NameableType, _super);
                function NameableType() {
                    _super.apply(this, arguments);
                    this.names = null;
                    this.descriptions = null;
                }
                /**
                 * @return the names
                 */
                NameableType.prototype.getNames = function () {
                    return this.names;
                };
                /**
                 * @param names the names to set
                 */
                NameableType.prototype.setNames = function (names1) {
                    this.names = names1;
                };
                /**
                 * @return the descriptions
                 */
                NameableType.prototype.getDescriptions = function () {
                    return this.descriptions;
                };
                /**
                 * @param descriptions the descriptions to set
                 */
                NameableType.prototype.setDescriptions = function (descriptions) {
                    this.descriptions = descriptions;
                };
                NameableType.prototype.findName = function (lang) {
                    if (this.names == null) {
                        return null;
                    }
                    var def = null;
                    for (var i = 0; i < this.names.length; i++) {
                        if (lang != null && lang == this.names[i].getLang()) {
                            return this.names[i];
                        }
                        if (this.names[i].getLang() == null) {
                            def = this.names[i];
                        }
                    }
                    if (def == null && "en" != lang) {
                        def = this.findName("en");
                    }
                    return def;
                };
                NameableType.prototype.findDescription = function (lang) {
                    if (this.descriptions == null) {
                        return null;
                    }
                    var def = null;
                    for (var i = 0; i < this.descriptions.length; i++) {
                        if (lang != null && lang == this.descriptions[i].getLang()) {
                            return this.descriptions[i];
                        }
                        if (this.descriptions[i].getLang() == null) {
                            def = this.descriptions[i];
                        }
                    }
                    if (def == null && "en" != lang) {
                        def = this.findDescription("en");
                    }
                    return def;
                };
                NameableType.prototype.toString = function () {
                    var loc = sdmx.SdmxIO.getLocale();
                    var name = this.findName(loc);
                    if (name != null) {
                        return name.toString();
                    }
                    var desc = this.findDescription(loc);
                    if (desc != null) {
                        return desc.getText();
                    }
                    return "NameableType";
                };
                NameableType.prototype.getName = function () {
                    if (sdmx.SdmxIO.isSanitiseNames()) {
                        return NameableType.sanitise(NameableType.toString(this));
                    }
                    else {
                        return NameableType.toString(this);
                    }
                };
                NameableType.toString = function (named) {
                    var loc = sdmx.SdmxIO.getLocale();
                    if (named == null) {
                        return "";
                    }
                    var desc = named.findDescription(loc);
                    if (desc == null) {
                        var name = named.findName(loc);
                        if (name == null) {
                            return named.getId().toString();
                        }
                        return name.getText();
                    }
                    return desc.getText();
                };
                NameableType.toStringWithLocale = function (named, loc) {
                    //if (concept.equals("FREQ")) {
                    //    ItemType code2 = getCode();
                    //    System.out.println("FREQ Code=" + code2);
                    //}
                    if (named == null) {
                        return "";
                    }
                    var name = named.findName(loc);
                    if (name == null) {
                        var desc = named.findDescription(loc);
                        if (desc == null) {
                            return named.getId().toString();
                        }
                        return desc.getText();
                    }
                    return name.getText();
                };
                NameableType.toIDString = function (named) {
                    return named.getId().toString();
                };
                NameableType.sanitise = function (s) {
                    if (s.indexOf("'") != -1) {
                        s = s.replace("'", "&apos;");
                    }
                    if (s.indexOf("\"") != -1) {
                        s = s.replace("\"", "&quot;");
                    }
                    return s;
                };
                return NameableType;
            })(base.IdentifiableType);
            base.NameableType = NameableType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=NameableType.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../common/AnnotableType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var VersionableType = (function (_super) {
                __extends(VersionableType, _super);
                function VersionableType() {
                    _super.apply(this, arguments);
                    this.version = sdmx.commonreferences.Version.ONE;
                    this.validFrom = null;
                    this.validTo = null;
                }
                ;
                return VersionableType;
            })(base.NameableType);
            base.VersionableType = VersionableType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=VersionableType.js.map

var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var dataflow;
        (function (dataflow) {
            var Dataflow = (function () {
                function Dataflow() {
                }
                return Dataflow;
            })();
            dataflow.Dataflow = Dataflow;
        })(dataflow = structure.dataflow || (structure.dataflow = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Dataflow.js.map

var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var datastructure;
        (function (datastructure) {
            var DataStructure = (function () {
                function DataStructure() {
                }
                return DataStructure;
            })();
            datastructure.DataStructure = DataStructure;
        })(datastructure = structure.datastructure || (structure.datastructure = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=DataStructure.js.map

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//# sourceMappingURL=Sdmx20StructureParser.js.map
