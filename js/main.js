(() => {
  //page has loaded
  buildLiteral();
  buildWithConstructor();
  buildWithCreate();
  buildWithClass();
})();

function buildLiteral() {
  let parent = document.getElementById('literals');
  let obj = {
    id: 123,
    name: 'steve',
    email: 'steve@work.org',
  };
  parent.textContent = JSON.stringify(obj, null, 2);
}

function buildWithConstructor() {
  let parent = document.getElementById('constructors');
}

function buildWithCreate() {
  let parent = document.getElementById('creates');
}

function buildWithClass() {
  let parent = document.getElementById('classes');
}
