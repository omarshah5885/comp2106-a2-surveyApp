let addQuestion = document.querySelector('.btn-primary');
let addOption = document.querySelector('.btn-danger');
let questionCounter = 2; // starts at 2 b/c question 1 is already shown on create survey view. this will incremented


addQuestion.addEventListener('click', (e) => {
  e.preventDefault();
  const questionMarkup = `
  <div class="form-group col-md-4">
    <label for="questionType${questionCounter}">Question Type</label>
    <select class="form-control" id="questionType${questionCounter}" name="questionType" data-index="${questionCounter}">
      <option selected="true" value="1">Multiple Choice</option>
      <option value="2">Short Answer</option>
    </select>
  </div>
  <div class="form-group">
    <label for="questionEntry">Question</label>
    <input class="form-control" id="questionEntry" name="questionEntry" />
  </div>
  <div class="multipleChoice${questionCounter}">
    <div class="form-group">
      <input class="form-control" id="option${questionCounter}" name="option${questionCounter}" placeholder="enter option" />
      <input class="form-control" id="option${questionCounter}" name="option${questionCounter}" placeholder="enter option" />
    </div>
  </div>
  <div class="form-group">
    <button class="btn btn-danger" id="optionButton${questionCounter}" type="submit" data-index="${questionCounter}">Add Option</button>
  </div>`;
  // adding html markup as last child to the question area in the create view
  const newQuestion = document.querySelector('.questionArea');
  newQuestion.insertAdjacentHTML('beforeend', questionMarkup);

  // target the add option button for the new set of multiple choice questions added
  let addOption = document.querySelector(`#optionButton${questionCounter}`);

  addOption.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(addOption);
    // in order to ensure the option created matches the correct m/c question, i created an index based on the data-index attribute
    const index = addOption.dataset.index;
    const optionMarkup = `<input class="form-control" id="option${index}" name="option${index}" placeholder="enter option" />`;
    // add that option as last child of the multipchoice form group
    const newOption = document.querySelector(`.multipleChoice${index} .form-group`);
    newOption.insertAdjacentHTML('beforeend', optionMarkup);
  });

  // target the dropdown for type of question user will want, either m/c or shortanswer
  let questionType = document.querySelector(`#questionType${questionCounter}`);
  // on a change event, insert the relevant html markup e.g., giving user m/c options or an empty area for shortanswer
  questionType.addEventListener('change', e => {
    // set the same index for each option, ensuring they don't increment w/ the addition of a new question
    const index = questionType.dataset.index;
    // if user selects option 2 (representing short answer), then replace html w/ blank
    if (questionType.value == 2) {
    document.querySelector(`div.multipleChoice${index}`).innerHTML = ``;
    document.querySelector(`div.multipleChoice${index} + .form-group`).innerHTML = '';
    } else { // otherwise, re-add the m/c markup
      const mcMarkup = `
      <div class="multipleChoice${index}">
        <div class="form-group">
          <input class="form-control" id="option${index}" name="option${index}" placeholder="enter option" />
          <input class="form-control" id="option${index}" name="option${index}" placeholder="enter option" />
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-danger" id="optionButton${index}" type="submit" data-index="${index}">Add Option</button>
      </div>`;

      // add mcMarkup on change of dropdown to the mc designated area
      const mcArea = document.querySelector(`.multipleChoice${index}`);
      mcArea.insertAdjacentHTML('beforeend', mcMarkup);
      
      // target the add option button for mc questions w/ the same index
      let addOption = document.querySelector(`#optionButton${index}`);
  
      addOption.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(addOption);
        const index = addOption.dataset.index;
        const optionMarkup = `<input class="form-control" id="option${index}" name="option${index}" placeholder="enter option" />`;
        const newOption = document.querySelector(`.multipleChoice${index} .form-group`);
        newOption.insertAdjacentHTML('beforeend', optionMarkup);
      });
    } // end else
  }); // end dropdown change event listener

  // increment the counter after question is added
  questionCounter++;
});

// add click event to the html markup that appears onload of create survey 
addOption.addEventListener('click', (e) => {
  e.preventDefault();
  const optionMarkup = `<input class="form-control" id="option1" name="option1" placeholder="enter option" />`;
  const newOption = document.querySelector('.multipleChoice1 .form-group');
  newOption.insertAdjacentHTML('beforeend', optionMarkup);
});

// add change event to dropdown of the content that appears onload of create survey 
let questionType = document.querySelector('#questionType');
questionType.addEventListener('change', e => {
  if (questionType.value == 2) {
  document.querySelector('div.multipleChoice1').innerHTML = ``;
  document.querySelector('div.multipleChoice1 + .form-group').innerHTML = '';
  } else {
    const mcMarkup = `
    <div class="multipleChoice1">
      <div class="form-group">
        <input class="form-control" id="option1" name="option1" placeholder="enter option" />
        <input class="form-control" id="option1" name="option1" placeholder="enter option" />
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-danger" id="optionButton1" type="submit" data-index="1">Add Option</button>
    </div>`;

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
  } // end else
}); // end change event listener for onload content 
