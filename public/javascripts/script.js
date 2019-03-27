let addQuestion = document.querySelector('.btn-primary');
let addOption = document.querySelector('.btn-danger');
let questionCounter = 2;



addQuestion.addEventListener('click', (e) => {
  e.preventDefault();
  const questionMarkup = `<div class="form-group col-md-4"><label for="questionType">Question Type</label><select class="form-control" id="questionType" name="questionType"><option selected="true" value="1">Multiple Choice</option><option value="2">Short Answer</option></select></div>
  <div class="form-group"><label for="questionEntry">Question</label><input class="form-control" id="questionEntry" name="questionEntry" /></div>
  <div class="multipleChoice${questionCounter}">
  <div class="form-group"><input class="form-control" id="option${questionCounter}" name="option${questionCounter}" placeholder="enter option" /><input class="form-control" id="option${questionCounter}" name="option${questionCounter}" placeholder="enter option" /></div>
</div>
<div class="form-group"><button class="btn btn-danger" id="optionButton${questionCounter}" type="submit" data-index="${questionCounter}">Add Option</button></div>`;
  const newQuestion = document.querySelector('.questionArea');
  newQuestion.insertAdjacentHTML('beforeend', questionMarkup);

  let addOption = document.querySelector(`#optionButton${questionCounter}`);

  addOption.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(addOption);
    const index = addOption.dataset.index;
    const optionMarkup = `<input class="form-control" id="option${index}" name="option${index}" placeholder="enter option" />`;
    const newOption = document.querySelector(`.multipleChoice${index} .form-group`);
    newOption.insertAdjacentHTML('beforeend', optionMarkup);
  });
  questionCounter++
  

});

addOption.addEventListener('click', (e) => {
  e.preventDefault();
  const optionMarkup = `<input class="form-control" id="option1" name="option1" placeholder="enter option" />`;
  const newOption = document.querySelector('.multipleChoice1 .form-group');
  newOption.insertAdjacentHTML('beforeend', optionMarkup);
});

let questionType = document.querySelector('#questionType');
questionType.addEventListener('change', e => {
  if (questionType.value == 2) {
  document.querySelector('div.multipleChoice1').innerHTML = '';
  document.querySelector('div.multipleChoice1 + .form-group').innerHTML = '';
  } else {
    const mcMarkup = `<div class="multipleChoice1">
    <div class="form-group"><input class="form-control" id="option1" name="option1" placeholder="enter option" /><input class="form-control" id="option1" name="option1" placeholder="enter option" /></div>
  </div>
  <div class="form-group"><button class="btn btn-danger" id="optionButton1" type="submit" data-index="1">Add Option</button></div>`;
    const newOption = document.querySelector('.multipleChoice1');
    newOption.insertAdjacentHTML('beforeend', mcMarkup);
    
    let addOption = document.querySelector(`#optionButton1`);

    addOption.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(addOption);
      const index = addOption.dataset.index;
      const optionMarkup = `<input class="form-control" id="option${index}" name="option${index}" placeholder="enter option" />`;
      const newOption = document.querySelector(`.multipleChoice${index} .form-group`);
      newOption.insertAdjacentHTML('beforeend', optionMarkup);
    });
  

  }
  
});
