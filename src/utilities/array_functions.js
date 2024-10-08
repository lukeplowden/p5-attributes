/**
 * @module Data
 * @submodule Array Functions
 * @for p5
 * @requires core
 */

function arrayFunctions(p5, fn){
  /**
   * Adds a value to the end of an array. Extends the length of
   * the array by one. Maps to Array.push().
   *
   * @method append
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push">array.push(value)</a> instead.
   * @param {Array} array Array to append
   * @param {Any} value to be added to the Array
   * @return {Array} the array that was appended to
   * @example
   * <div class='norender'><code>
   * function setup() {
   *   let myArray = ['Mango', 'Apple', 'Papaya'];
   *   print(myArray); // ['Mango', 'Apple', 'Papaya']
   *
   *   append(myArray, 'Peach');
   *   print(myArray); // ['Mango', 'Apple', 'Papaya', 'Peach']
   * }
   * </code></div>
   */
  fn.append = function (array, value) {
    array.push(value);
    return array;
  };

  /**
   * Copies an array (or part of an array) to another array. The src array is
   * copied to the dst array, beginning at the position specified by
   * srcPosition and into the position specified by dstPosition. The number of
   * elements to copy is determined by length. Note that copying values
   * overwrites existing values in the destination array. To append values
   * instead of overwriting them, use <a href="#/p5/concat">concat()</a>.
   *
   * The simplified version with only two arguments, arrayCopy(src, dst),
   * copies an entire array to another of the same size. It is equivalent to
   * arrayCopy(src, 0, dst, 0, src.length).
   *
   * Using this function is far more efficient for copying array data than
   * iterating through a for() loop and copying each element individually.
   *
   * @method arrayCopy
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin">arr1.copyWithin(arr2)</a> instead.
   * @param {Array}  src           the source Array
   * @param {Integer} srcPosition  starting position in the source Array
   * @param {Array}  dst           the destination Array
   * @param {Integer} dstPosition   starting position in the destination Array
   * @param {Integer} length        number of Array elements to be copied
   *
   * @example
   * <div class='norender'><code>
   * let src = ['A', 'B', 'C'];
   * let dst = [1, 2, 3];
   * let srcPosition = 1;
   * let dstPosition = 0;
   * let length = 2;
   *
   * print(src); // ['A', 'B', 'C']
   * print(dst); // [ 1 ,  2 ,  3 ]
   *
   * arrayCopy(src, srcPosition, dst, dstPosition, length);
   * print(dst); // ['B', 'C', 3]
   * </code></div>
   */
  /**
   * @method arrayCopy
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin">arr1.copyWithin(arr2)</a> instead.
   * @param {Array}  src
   * @param {Array}  dst
   * @param {Integer} [length]
   */
  fn.arrayCopy = function (src, srcPosition, dst, dstPosition, length) {
    // the index to begin splicing from dst array
    let start;
    let end;

    if (typeof length !== 'undefined') {
      end = Math.min(length, src.length);
      start = dstPosition;
      src = src.slice(srcPosition, end + srcPosition);
    } else {
      if (typeof dst !== 'undefined') {
        // src, dst, length
        // rename  so we don't get confused
        end = dst;
        end = Math.min(end, src.length);
      } else {
        // src, dst
        end = src.length;
      }

      start = 0;
      // rename  so we don't get confused
      dst = srcPosition;
      src = src.slice(0, end);
    }

    // Since we are not returning the array and JavaScript is pass by reference
    // we must modify the actual values of the array
    // instead of reassigning arrays
    Array.prototype.splice.apply(dst, [start, end].concat(src));
  };

  /**
   * Concatenates two arrays, maps to Array.concat(). Does not modify the
   * input arrays.
   *
   * @method concat
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">arr1.concat(arr2)</a> instead.
   * @param {Array} a first Array to concatenate
   * @param {Array} b second Array to concatenate
   * @return {Array} concatenated array
   *
   * @example
   * <div class = 'norender'><code>
   * function setup() {
   *   let arr1 = ['A', 'B', 'C'];
   *   let arr2 = [1, 2, 3];
   *
   *   print(arr1); // ['A','B','C']
   *   print(arr2); // [1,2,3]
   *
   *   let arr3 = concat(arr1, arr2);
   *
   *   print(arr1); // ['A','B','C']
   *   print(arr2); // [1, 2, 3]
   *   print(arr3); // ['A','B','C', 1, 2, 3]
   * }
   * </code></div>
   */
  fn.concat = (list0, list1) => list0.concat(list1);

  /**
   * Reverses the order of an array, maps to Array.reverse()
   *
   * @method reverse
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">array.reverse()</a> instead.
   * @param {Array} list Array to reverse
   * @return {Array} the reversed list
   * @example
   * <div class='norender'><code>
   * function setup() {
   *   let myArray = ['A', 'B', 'C'];
   *   print(myArray); // ['A','B','C']
   *
   *   reverse(myArray);
   *   print(myArray); // ['C','B','A']
   * }
   * </code></div>
   */
  fn.reverse = list => list.reverse();

  /**
   * Decreases an array by one element and returns the shortened array,
   * maps to Array.pop().
   *
   * @method shorten
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop">array.pop()</a> instead.
   * @param  {Array} list Array to shorten
   * @return {Array} shortened Array
   * @example
   * <div class = 'norender'><code>
   * function setup() {
   *   let myArray = ['A', 'B', 'C'];
   *   print(myArray); // ['A', 'B', 'C']
   *   let newArray = shorten(myArray);
   *   print(myArray); // ['A','B','C']
   *   print(newArray); // ['A','B']
   * }
   * </code></div>
   */
  fn.shorten = function (list) {
    list.pop();
    return list;
  };

  /**
   * Shuffles the elements of an array.
   *
   * The first parameter, `array`, is the array to be shuffled. For example,
   * calling `shuffle(myArray)` will shuffle the elements of `myArray`. By
   * default, the original array won’t be modified. Instead, a copy will be
   * created, shuffled, and returned.
   *
   * The second parameter, `modify`, is optional. If `true` is passed, as in
   * `shuffle(myArray, true)`, then the array will be shuffled in place without
   * making a copy.
   *
   * @method shuffle
   * @param  {Array} array array to shuffle.
   * @param  {Boolean} [bool] if `true`, shuffle the original array in place. Defaults to `false`.
   * @return {Array} shuffled array.
   *
   * @example
   * <div>
   * <code>
   * function setup() {
   *   createCanvas(100, 100);
   *
   *   background(200);
   *
   *   // Create an array of colors.
   *   let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
   *
   *   // Create a shuffled copy of the array.
   *   let shuffledColors = shuffle(colors);
   *
   *   // Draw  a row of circles using the original array.
   *   for (let i = 0; i < colors.length; i += 1) {
   *     // Calculate the x-coordinate.
   *     let x = (i + 1) * 12.5;
   *
   *     // Style the circle.
   *     let c = colors[i];
   *     fill(c);
   *
   *     // Draw the circle.
   *     circle(x, 33, 10);
   *   }
   *
   *   // Draw  a row of circles using the original array.
   *   for (let i = 0; i < shuffledColors.length; i += 1) {
   *     // Calculate the x-coordinate.
   *     let x = (i + 1) * 12.5;
   *
   *     // Style the circle.
   *     let c = shuffledColors[i];
   *     fill(c);
   *
   *     // Draw the circle.
   *     circle(x, 67, 10);
   *   }
   *
   *   describe(
   *     'Two rows of circles on a gray background. The top row follows the color sequence ROYGBIV. The bottom row has all the same colors but they are shuffled.'
   *   );
   * }
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function setup() {
   *   createCanvas(100, 100);
   *
   *   background(200);
   *
   *   // Create an array of colors.
   *   let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
   *
   *   // Shuffle the array.
   *   shuffle(colors, true);
   *
   *   // Draw  a row of circles using the original array.
   *   for (let i = 0; i < colors.length; i += 1) {
   *     // Calculate the x-coordinate.
   *     let x = (i + 1) * 12.5;
   *
   *     // Style the circle.
   *     let c = colors[i];
   *     fill(c);
   *
   *     // Draw the circle.
   *     circle(x, 50, 10);
   *   }
   *
   *   describe(
   *     'A row of colorful circles on a gray background. Their sequence changes each time the sketch runs.'
   *   );
   * }
   * </code>
   * </div>
   */
  fn.shuffle = function (arr, bool) {
    const isView = ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(arr);
    arr = bool || isView ? arr : arr.slice();

    let rnd,
      tmp,
      idx = arr.length;
    while (idx > 1) {
      rnd = (this.random(0, 1) * idx) | 0;

      tmp = arr[--idx];
      arr[idx] = arr[rnd];
      arr[rnd] = tmp;
    }

    return arr;
  };

  /**
   * Sorts an array of numbers from smallest to largest, or puts an array of
   * words in alphabetical order. The original array is not modified; a
   * re-ordered array is returned. The count parameter states the number of
   * elements to sort. For example, if there are 12 elements in an array and
   * count is set to 5, only the first 5 elements in the array will be sorted.
   *
   * @method sort
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">array.sort()</a> instead.
   * @param {Array} list Array to sort
   * @param {Integer} [count] number of elements to sort, starting from 0
   * @return {Array} the sorted list
   *
   * @example
   * <div class = 'norender'><code>
   * function setup() {
   *   let words = ['banana', 'apple', 'pear', 'lime'];
   *   print(words); // ['banana', 'apple', 'pear', 'lime']
   *   let count = 4; // length of array
   *
   *   words = sort(words, count);
   *   print(words); // ['apple', 'banana', 'lime', 'pear']
   * }
   * </code></div>
   * <div class = 'norender'><code>
   * function setup() {
   *   let numbers = [2, 6, 1, 5, 14, 9, 8, 12];
   *   print(numbers); // [2, 6, 1, 5, 14, 9, 8, 12]
   *   let count = 5; // Less than the length of the array
   *
   *   numbers = sort(numbers, count);
   *   print(numbers); // [1,2,5,6,14,9,8,12]
   * }
   * </code></div>
   */
  fn.sort = function (list, count) {
    let arr = count ? list.slice(0, Math.min(count, list.length)) : list;
    const rest = count ? list.slice(Math.min(count, list.length)) : [];
    if (typeof arr[0] === 'string') {
      arr = arr.sort();
    } else {
      arr = arr.sort((a, b) => a - b);
    }
    return arr.concat(rest);
  };

  /**
   * Inserts a value or an array of values into an existing array. The first
   * parameter specifies the initial array to be modified, and the second
   * parameter defines the data to be inserted. The third parameter is an index
   * value which specifies the array position from which to insert data.
   * (Remember that array index numbering starts at zero, so the first position
   * is 0, the second position is 1, and so on.)
   *
   * @method splice
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice">array.splice()</a> instead.
   * @param {Array}  list Array to splice into
   * @param {Any}    value value to be spliced in
   * @param {Integer} position in the array from which to insert data
   * @return {Array} the list
   *
   * @example
   * <div class = 'norender'><code>
   * function setup() {
   *   let myArray = [0, 1, 2, 3, 4];
   *   let insArray = ['A', 'B', 'C'];
   *   print(myArray); // [0, 1, 2, 3, 4]
   *   print(insArray); // ['A','B','C']
   *
   *   splice(myArray, insArray, 3);
   *   print(myArray); // [0,1,2,'A','B','C',3,4]
   * }
   * </code></div>
   */
  fn.splice = function (list, value, index) {
    // note that splice returns spliced elements and not an array
    Array.prototype.splice.apply(list, [index, 0].concat(value));

    return list;
  };

  /**
   * Extracts an array of elements from an existing array. The list parameter
   * defines the array from which the elements will be copied, and the start
   * and count parameters specify which elements to extract. If no count is
   * given, elements will be extracted from the start to the end of the array.
   * When specifying the start, remember that the first array element is 0.
   * This function does not change the source array.
   *
   * @method subset
   * @deprecated Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">array.slice()</a> instead.
   * @param  {Array}  list    Array to extract from
   * @param  {Integer} start   position to begin
   * @param  {Integer} [count] number of values to extract
   * @return {Array}          Array of extracted elements
   *
   * @example
   * <div class = 'norender'><code>
   * function setup() {
   *   let myArray = [1, 2, 3, 4, 5];
   *   print(myArray); // [1, 2, 3, 4, 5]
   *
   *   let sub1 = subset(myArray, 0, 3);
   *   let sub2 = subset(myArray, 2, 2);
   *   print(sub1); // [1,2,3]
   *   print(sub2); // [3,4]
   * }
   * </code></div>
   */
  fn.subset = function (list, start, count) {
    if (typeof count !== 'undefined') {
      return list.slice(start, start + count);
    } else {
      return list.slice(start, list.length);
    }
  };
}

export default arrayFunctions;

if(typeof p5 !== 'undefined'){
  arrayFunctions(p5, p5.prototype);
}
