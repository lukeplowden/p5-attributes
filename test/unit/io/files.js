import p5 from '../../../src/app.js';
import { testWithDownload } from '../../js/p5_helpers';

suite('Files', function() {
  var myp5;

  beforeAll(function() {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
      };
    });
  });

  afterAll(function() {
    myp5.remove();
  });

  // httpDo
  suite('httpDo()', function() {
    test('should be a function', function() {
      assert.ok(myp5.httpDo);
      assert.isFunction(myp5.httpDo);
    });

    test('should work when provided with just a path', function() {
      return new Promise(function(resolve, reject) {
        myp5.httpDo('unit/assets/sentences.txt', resolve, reject);
      }).then(function(data) {
        assert.ok(data);
        assert.isString(data);
      });
    });

    test('should accept method parameter', function() {
      return new Promise(function(resolve, reject) {
        myp5.httpDo('unit/assets/sentences.txt', 'GET', resolve, reject);
      }).then(function(data) {
        assert.ok(data);
        assert.isString(data);
      });
    });

    test('should accept type parameter', function() {
      return new Promise(function(resolve, reject) {
        myp5.httpDo('unit/assets/array.json', 'text', resolve, reject);
      }).then(function(data) {
        assert.ok(data);
        assert.isString(data);
      });
    });

    test('should accept method and type parameter together', function() {
      return new Promise(function(resolve, reject) {
        myp5.httpDo('unit/assets/array.json', 'GET', 'text', resolve, reject);
      }).then(function(data) {
        assert.ok(data);
        assert.isString(data);
      });
    });

    test.todo('should pass error object to error callback function', function() {
      return new Promise(function(resolve, reject) {
        myp5.httpDo(
          'unit/assets/sen.txt',
          function(data) {
            console.log(data);
            reject('Incorrectly succeeded.');
          },
          resolve
        );
      }).then(function(err) {
        assert.isFalse(err.ok, 'err.ok is false');
        assert.equal(err.status, 404, 'Error status is 404');
      });
    });

    test('should return a promise', function() {
      var promise = myp5.httpDo('unit/assets/sentences.txt');
      assert.instanceOf(promise, Promise);
      return promise.then(function(data) {
        assert.ok(data);
        assert.isString(data);
      });
    });

    test('should return a promise that rejects on error', function() {
      return new Promise(function(resolve, reject) {
        var promise = myp5.httpDo('404file');
        assert.instanceOf(promise, Promise);
        promise.then(function(data) {
          reject(new Error('promise resolved.'));
        });
        resolve(
          promise.catch(function(error) {
            assert.instanceOf(error, Error);
          })
        );
      });
    });
  });

  // saveStrings()
  suite('p5.prototype.saveStrings', function() {
    test('should be a function', function() {
      assert.ok(myp5.saveStrings);
      assert.typeOf(myp5.saveStrings, 'function');
    });

    testWithDownload(
      'should download a file with expected contents',
      async function(blobContainer) {
        let strings = ['some', 'words'];

        myp5.saveStrings(strings, 'myfile');

        let myBlob = blobContainer.blob;
        let text = await myBlob.text();
        // Each element on a separate line with a trailing line-break
        assert.strictEqual(text, strings.join('\n') + '\n');
      },
      true
    );

    testWithDownload(
      'should download a file with expected contents with CRLF',
      async function(blobContainer) {
        let strings = ['some', 'words'];

        myp5.saveStrings(strings, 'myfile', 'txt', true);
        let myBlob = blobContainer.blob;
        let text = await myBlob.text();
        // Each element on a separate line with a trailing CRLF
        assert.strictEqual(text, strings.join('\r\n') + '\r\n');
      },
      true
    );
  });

  // saveJSON()
  suite('p5.prototype.saveJSON', function() {
    test('should be a function', function() {
      assert.ok(myp5.saveJSON);
      assert.typeOf(myp5.saveJSON, 'function');
    });

    testWithDownload(
      'should download a file with expected contents',
      async function(blobContainer) {
        let myObj = { hi: 'hello' };

        myp5.saveJSON(myObj, 'myfile');
        let myBlob = blobContainer.blob;
        let text = await myBlob.text();
        let json = JSON.parse(text);
        // Each element on a separate line with a trailing line-break
        assert.deepEqual(myObj, json);
      },
      true // asyncFn = true
    );
  });

  // writeFile()
  suite('p5.prototype.writeFile', function() {
    test('should be a function', function() {
      assert.ok(myp5.writeFile);
      assert.typeOf(myp5.writeFile, 'function');
    });
    testWithDownload(
      'should download a file with expected contents (text)',
      async function(blobContainer) {
        let myArray = ['hello', 'hi'];

        myp5.writeFile(myArray, 'myfile');
        let myBlob = blobContainer.blob;
        let text = await myBlob.text();
        assert.strictEqual(text, myArray.join(''));
      },
      true // asyncFn = true
    );
  });

  // downloadFile()
  suite('p5.prototype.downloadFile', function() {
    test('should be a function', function() {
      assert.ok(myp5.writeFile);
      assert.typeOf(myp5.writeFile, 'function');
    });
    testWithDownload(
      'should download a file with expected contents',
      async function(blobContainer) {
        let myArray = ['hello', 'hi'];
        let inBlob = new Blob(myArray);
        myp5.downloadFile(inBlob, 'myfile');
        let myBlob = blobContainer.blob;
        let text = await myBlob.text();
        assert.strictEqual(text, myArray.join(''));
      },
      true // asyncFn = true
    );
  });

  // save()
  suite('p5.prototype.save', function() {
    suite('saving images', function() {
      let waitForBlob = async function(blc) {
        let sleep = function(ms) {
          return new Promise(r => setTimeout(r, ms));
        };
        while (!blc.blob) {
          await sleep(5);
        }
      };
      beforeAll(function() {
        myp5.createCanvas(20, 20);
        myp5.background(255, 0, 0);
      });

      test('should be a function', function() {
        assert.ok(myp5.save);
        assert.typeOf(myp5.save, 'function');
      });

      testWithDownload(
        'should download a png file',
        async function(blobContainer) {
          myp5.save();
          await waitForBlob(blobContainer);
          let myBlob = blobContainer.blob;
          assert.strictEqual(myBlob.type, 'image/png');

          blobContainer.blob = null;
          let gb = myp5.createGraphics(100, 100);
          myp5.save(gb);
          await waitForBlob(blobContainer);
          myBlob = blobContainer.blob;
          assert.strictEqual(myBlob.type, 'image/png');
        },
        true
      );

      testWithDownload(
        'should download a jpg file',
        async function(blobContainer) {
          myp5.save('filename.jpg');
          await waitForBlob(blobContainer);
          let myBlob = blobContainer.blob;
          assert.strictEqual(myBlob.type, 'image/jpeg');

          blobContainer.blob = null;
          let gb = myp5.createGraphics(100, 100);
          myp5.save(gb, 'filename.jpg');
          await waitForBlob(blobContainer);
          myBlob = blobContainer.blob;
          assert.strictEqual(myBlob.type, 'image/jpeg');
        },
        true
      );
    });

    suite('saving strings and json', function() {
      testWithDownload(
        'should download a text file',
        async function(blobContainer) {
          let myStrings = ['aaa', 'bbb'];
          myp5.save(myStrings, 'filename');
          let myBlob = blobContainer.blob;
          let text = await myBlob.text();
          assert.strictEqual(text, myStrings.join('\n') + '\n');
        },
        true
      );

      testWithDownload(
        'should download a json file',
        async function(blobContainer) {
          let myObj = { hi: 'hello' };
          myp5.save(myObj, 'filename.json');
          let myBlob = blobContainer.blob;
          let text = await myBlob.text();
          let outObj = JSON.parse(text);
          assert.deepEqual(outObj, myObj);
        },
        true
      );
    });
  });
});
