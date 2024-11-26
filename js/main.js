(() => {
  //page has loaded
  buildLiteral();
  buildWithConstructor();
  buildWithCreate();
  buildWithClass();
})();

function buildLiteral() {
  let parent = document.getElementById('literals');
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
