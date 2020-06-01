import co from "../index";

describe("co(gen, args)", () => {
  test("should pass the rest of the arguments", function () {
    return co(function* (num, str, arr, obj, fun) {
      expect(num).toBe(42);
      expect(str).toEqual("forty-two");
      expect(arr[0]).toBe(42);
      expect(obj.value).toBe(42);
      expect(fun instanceof Function)
    }, 42, "forty-two", [42], { value: 42 }, function () { });
  })
});

describe("co(* -> yield [])", () => {
  test("should aggregate several promises", () => {
    co(function* () {
      const a = 1;
      const b = 2;
      const c = 3;

      const res = yield [a, b, c];
      expect(3).toBe(res.length);
      expect(res[0]).toBe(1);
      expect(res[1]).toBe(2);
      expect(res[2]).toBe(3);
    });
  })

  test("should noop with no args", () => {
    co(function* () {
      const res = yield [];
      expect(0).toBe(res.length);
    });
  });

  test("should support an array of generators", () => {
    co(function* () {
      const val = yield [function* () { return 1 }()]
      expect(val).toEqual([1]);
    })
  });
})
describe("co.call(this)", () => {
  const ctx = {
    some: "thing"
  };
  test("should pass the context", () => {
    return co.call(ctx, function* (this: any) {
      expect(this).toEqual(ctx);
    });
  })
});

function sleep(ms: number) {
  return function (done: (...args: any[]) => void) {
    setTimeout(done, ms);
  }
}

function* work() {
  yield sleep(50);
  return "yay";
}

describe("co(fn*)", () => {
  describe("with a generator function", () => {
    test("should wrap with co()", () => {
      return co(function* () {
        const a = yield work;
        const b = yield work;
        const c = yield work;

        expect("yay").toEqual(a);
        expect("yay").toEqual(b);
        expect("yay").toEqual(c);

        const res = yield [work, work, work];
        expect(["yay", "yay", "yay"]).toStrictEqual(res);
      });
    })

    test("should catch errors", () => {
      return co(function* () {
        yield function* () {
          throw new Error("boom");
        };
      }).then(() => {
        throw new Error("wtf")
      }, (err) => {
        expect(err.message).toEqual("boom");
      });
    });
  });
});

describe("co(* -> yield {})", function () {
  class Pet {
    public something = function () { };
    constructor(public name: string) {

    }
  }
  test("should aggregate several promises", function () {
    return co(function* () {
      const a = 1;
      const b = 2;
      const c = 3;

      const res = yield {
        a: a,
        b: b,
        c: c
      };

      expect(3).toBe(Object.keys(res).length);
      expect(1).toBe(res.a);
      expect(2).toBe(res.b);
      expect(3).toBe(res.c);
    });
  })

  test("should noop with no args", function () {
    return co(function* () {
      const res = yield {};
      expect(0).toBe(Object.keys(res).length);
    });
  })

  test("should ignore non-thunkable properties", function () {
    
    co(function* () {
      const foo = {
        name: { first: "tobi" },
        age: 2,
        address: "adcde",
        tobi: new Pet("tobi"),
        now: new Date(),
        falsey: false,
        nully: null,
        undefiney: undefined,
      };
      const res = yield foo;

      expect("tobi").toEqual(res.name.first);
      expect(2).toBe(res.age);
      expect("tobi").toBe(res.tobi.name);
      expect(foo.now).toEqual(res.now);
      expect(foo.falsey).toBeFalsy();
      expect(foo.nully).toBeNull();
      expect(foo.undefiney).toBeUndefined();
      expect(res.address).toEqual("adcde");
    });
  })

  test("should preserve key order", function () {
    function timedThunk(time: number) {
      return function (cb: (...args: any[]) => void) {
        setTimeout(cb, time);
      }
    }

    return co(function* () {
      const before = {
        sun: timedThunk(30),
        rain: timedThunk(20),
        moon: timedThunk(10)
      };

      const after = yield before;

      const orderBefore = Object.keys(before).join(",");
      const orderAfter = Object.keys(after).join(",");
      expect(orderBefore).toEqual(orderAfter);
    });
  })
})

describe("co(* -> yield <promise>", function () {
  function getPromise(val: any, err?: any) {
    return new Promise(function (resolve, reject) {
      if (err) reject(err);
      else resolve(val);
    });
  }
  describe("with one promise yield", function () {
    test("should work", function () {
      return co(function* () {
        const a = yield getPromise(1);
        expect(1).toEqual(a);
      });
    })
  })

  describe("with several promise yields", function () {
    test("should work", function () {
      return co(function* () {
        const a = yield getPromise(1);
        const b = yield getPromise(2);
        const c = yield getPromise(3);

        expect([1, 2, 3]).toStrictEqual([a, b, c]);
      });
    })
  })

  describe("when a promise is rejected", function () {
    test("should throw and resume", function () {
      let error: any;

      return co(function* () {
        try {
          yield getPromise(1, new Error("boom"));
        } catch (err) {
          error = err;
        }

        expect("boom").toEqual(error.message);
        const ret = yield getPromise(1);
        expect(1).toBe(ret);
      });
    })
  })

  describe("when yielding a non-standard promise-like", function () {
    it("should return a real Promise", function () {
      expect(co(function* () {
        yield { then: function () { } };
      }) instanceof Promise);
    });
  })
})
function get(val: any, err?: any, error?: any) {
  return function (done: any) {
    if (error) throw error;
    setTimeout(function () {
      done(err, val);
    }, 10);
  }
}

describe("co(* -> yield fn(done))", function () {
  describe("with no yields", function () {
    it("should work", function () {
      return co(function* () { });
    })
  })

  describe("with one yield", function () {
    it("should work", function () {
      return co(function* () {
        const a = yield get(1);
        expect([1]).toStrictEqual(a);
      });
    })
  })

  describe("with several yields", function () {
    it("should work", function () {
      return co(function* () {
        const a = yield get(1);
        const b = yield get(2);
        const c = yield get(3);
        expect([[1], [2], [3]]).toStrictEqual([a, b, c]);
      });
    })
  })

  describe("with many arguments", function () {
    it("should return an array", function () {
      function exec(cmd: any) {
        return function (done: any) {
          done(null, "stdout", "stderr");
        }
      }

      return co(function* () {
        const out = yield exec("something");
       expect(["stdout", "stderr"]).toStrictEqual(out);
      });
    })
  })

  describe("when the function throws", function () {
    it("should be caught", function () {
      return co(function* () {
        try {
          const a = yield get(1, null, new Error("boom"));
        } catch (err) {
          expect("boom").toEqual(err.message);
        }
      });
    })
  })

  describe("when an error is passed then thrown", function () {
    it("should only catch the first error only", function () {
      return co(function* () {
        yield function (done: any) {
          done(new Error("first"));
          throw new Error("second");
        }
      }).then(function () {
        throw new Error("wtf")
      }, function (err) {
        expect("first").toEqual(err.message);
      });
    })
  })

  describe("when an error is passed", function () {
    it("should throw and resume", function () {
      let error: any;

      return co(function* () {
        try {
          yield get(1, new Error("boom"));
        } catch (err) {
          error = err;
        }

        expect("boom").toEqual(error.message);
        const ret = yield get(1);
        expect([1]).toStrictEqual(ret);
      });
    })
  })

  describe("with nested co()s", function () {
    it("should work", function () {
      const hit: any[] = [];

      return co(function* () {
        const a = yield get(1);
        const b = yield get(2);
        const c = yield get(3);
        hit.push("one");

        expect([[1], [2], [3]]).toStrictEqual([a, b, c])

        yield co(function* () {
          hit.push("two");
          const a = yield get(1);
          const b = yield get(2);
          const c = yield get(3);

          expect([[1], [2], [3]]).toStrictEqual([a, b, c])

          yield co(function* () {
            hit.push("three");
            const a = yield get(1);
            const b = yield get(2);
            const c = yield get(3);

            expect([[1], [2], [3]]).toStrictEqual([a, b, c])
          });
        });

        yield co(function* () {
          hit.push("four");
          const a = yield get(1);
          const b = yield get(2);
          const c = yield get(3);

          expect([[1], [2], [3]]).toStrictEqual([a, b, c])
        });

        expect(["one", "two", "three", "four"]).toStrictEqual(hit);
      });
    })
  })

  describe("return values", function () {
    describe("with a callback", function () {
      it("should be passed", function () {
        return co(function* () {
          return [
            yield get(1),
            yield get(2),
            yield get(3)
          ];
        }).then(function (res) {
          expect([[1], [2], [3]]).toStrictEqual(res);
        });
      })
    })

    describe("when nested", function () {
      it("should return the value", function () {
        return co(function* () {
          const other = yield co(function* () {
            return [
              yield get(4),
              yield get(5),
              yield get(6)
            ]
          });

          return [
            yield get(1),
            yield get(2),
            yield get(3)
          ].concat(other);
        }).then(function (res) {
          expect([[1], [2], [3], [4], [5], [6]]).toStrictEqual(res);
        });
      })
    })
  })

  describe("with errors", function () {
    it("should throw", function () {
      const errors: any[] = [];

      return co(function* () {
        try {
          const a = yield get(1, new Error("foo"));
        } catch (err) {
          errors.push(err.message);
        }

        try {
          const a = yield get(1, new Error("bar"));
        } catch (err) {
          errors.push(err.message);
        }

        expect(["foo", "bar"]).toStrictEqual(errors);
      });
    })

    it("should catch errors on .send()", function () {
      const errors: any[] = [];

      return co(function* () {
        try {
          const a = yield get(1, null, new Error("foo"));
        } catch (err) {
          errors.push(err.message);
        }

        try {
          const a = yield get(1, null, new Error("bar"));
        } catch (err) {
          errors.push(err.message);
        }

        expect(["foo", "bar"]).toStrictEqual(errors);
      });
    })

    it("should pass future errors to the callback", function () {
      return co(function* () {
        yield get(1);
        yield get(2, null, new Error("fail"));
        yield get(3);
      }).catch(function (err) {
        expect("fail").toEqual(err.message);
      });
    })

    it("should pass immediate errors to the callback", function () {
      return co(function* () {
        yield get(1);
        yield get(2, new Error("fail"));
        yield get(3);
      }).catch(function (err) {
        expect("fail").toEqual(err.message);
      });
    })

    it("should catch errors on the first invocation", function () {
      return co(function* () {
        throw new Error("fail");
      }).catch(function (err) {
        expect("fail").toEqual(err.message);
      });
    })
  })
})