function buildLiteral() {
  let parent = document.getElementById('literals');
  let obj = {
    id: 123,
    name: 'steve',
    email: 'steve@work.org',
  };
  //add to the prototype
  obj.constructor.prototype.someMethodBL = function () {
    //adding to Object.prototype
    console.log('called some method from inside buildLiteral');
  };
  parent.textContent = JSON.stringify(obj, null, 2);
  obj.someMethodBL();
}

function buildWithConstructor() {
  let parent = document.getElementById('constructors');
  // let obj = new Object();
  //with object literal
  let obj = new MyObj(123, 'steve', 'steve@work.org');
  MyObj.prototype.someMethodBWCon = function () {
    console.log('called some method from inside buildWithConstructor');
  };
  parent.textContent = JSON.stringify(obj, null, 2);
  obj.someMethodBWCon();
}

function MyObj(id, name, email) {
  this.id = id;
  this.name = name;
  this.email = email;
  // no need for return when called with new
}

function buildWithCreate() {
  let parent = document.getElementById('creates');
  //create wants property descriptors
  let obj = Object.create(Object.prototype, {
    id: {
      configurable: true,
      enumerable: true,
      value: 123,
    },
    name: {
      configurable: true,
      enumerable: true,
      value: 'steve',
    },
    email: {
      configurable: true,
      enumerable: true,
      value: 'steve@work.org',
    },
  });
  obj.constructor.prototype.someMethodBWCreate = function () {
    //adding to Object.prototype
    console.log('called some method from inside buildWithCreate');
  };
  parent.textContent = JSON.stringify(obj, null, 2);
  obj.someMethodBWCreate();
}

function buildWithClass() {
  let parent = document.getElementById('classes');
  let obj = new MyObjClass(123, 'steve', 'steve@work.org');
  MyObjClass.prototype.someMethodBWClass = function () {
    console.log('called some method from inside buildWithClass');
  };
  parent.textContent = JSON.stringify(obj, null, 2);
  obj.someMethodBWClass();
}

class MyObjClass extends Object {
  //must appear above the code that accesses the class, just like a variable declared with const or let
  //so.. this class must be above the IIFE that calls buildWithClass
  // extends Object means that MyObjClass objects will point to the Object.prototype
  constructor(id, name, email) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    // no need for return when class called with new
  }
}

(() => {
  //page has loaded
  buildLiteral();
  buildWithConstructor();
  buildWithCreate();
  buildWithClass();

  console.group('Object.prototype');
  for (let prop of Object.getOwnPropertyNames(Object.prototype)) {
    console.log(prop);
  }
  console.groupEnd('Object.prototype');
  console.group('MyObj.prototype');
  for (let prop of Object.getOwnPropertyNames(MyObj.prototype)) {
    console.log(prop);
  }
  console.groupEnd('MyObj.prototype');
  console.group('MyObjClass.prototype');
  for (let prop of Object.getOwnPropertyNames(MyObjClass.prototype)) {
    console.log(prop);
    // console.log(MyObjClass.prototype[prop]);
  }
  console.groupEnd('MyObjClass.prototype');
})();
