//VERSION ONE - use an object literal
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
    console.log(this);
    console.log(this.constructor); // Object()
    console.log(this.constructor.name); // Object
    console.log(typeof this); // object
    console.log(this.toString()); // [object Object]
  };
  parent.textContent = JSON.stringify(obj, null, 2);
  obj.someMethodBL();
}

//VERSION TWO use `new` to call a function to build the object
function buildWithConstructor() {
  let parent = document.getElementById('constructors');
  // let obj = new Object();
  //with object literal
  let obj = new MyObj(123, 'steve', 'steve@work.org');
  MyObj.prototype.someMethodBWCon = function () {
    console.log('called some method from inside buildWithConstructor');
    console.log(this);
    console.log(this.constructor); // MyObj()
    console.log(this.constructor.name); // MyObj
    console.log(typeof this); //object
    console.log(this.toString()); // [object Object]
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

//VERSION THREE - use the Object.create method added in ES5
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
    console.log(this);
    console.log(this.constructor); // Object()
    console.log(this.constructor.name); // Object
    console.log(typeof this); // object
    console.log(this.toString()); // [object Object]
  };
  parent.textContent = JSON.stringify(obj, null, 2);
  obj.someMethodBWCreate();
}

//VERSION FOUR - Use JS Class syntax added in ES6
function buildWithClass() {
  let parent = document.getElementById('classes');
  let obj = new MyObjClass(123, 'steve', 'steve@work.org');
  MyObjClass.prototype.someMethodBWClass = function () {
    console.log('called some method from inside buildWithClass');
    console.log(this);
    console.log(this.constructor); // MyObjClass()
    console.log(this.constructor.name); // MyObjClass
    console.log(typeof this); // object
    console.log(this.toString()); // [object Object]
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

//WHEN PAGE LOADS RUN THE FOLLOWING
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
    console.log(prop); // name of the property
    // console.log(MyObjClass.prototype[prop]); //the actual property
  }
  console.groupEnd('MyObjClass.prototype');

  console.log(MyObj.prototype === Object.prototype); //false
  console.log(MyObj.prototype.__proto__ === Object.prototype); //true
  //REMEMBER. FUNCTIONS have a prototype prop BUT OBJECTS have a __proto__ prop
  console.log(MyObjClass.prototype === Object.prototype); //false
  console.log(MyObjClass.prototype.__proto__ === Object.prototype); //true
})();
