// Email/Phone selection

var button__selectors = document.querySelectorAll('.button__selector');
var form__fields = document.querySelectorAll('.field--single');
var form__fields_inputs = document.querySelectorAll('.field--single input');
var field__errors = document.querySelectorAll('.field__error');
var form__submit__button = document.querySelector('.form__submit');
var loading__icon = document.querySelector('.loading__icon');
var form__submit__info = document.querySelector('.form__submit__info');

//Function to select form
function select__form(el, form, msg__error) {
  button__selectors.forEach((btn) => {
    btn.removeAttribute('active');
  });
  el.setAttribute('active', '');

  field = document.querySelector(form);
  var input = document.querySelector(form + ' input');

  form__fields.forEach((field) => {
    field.classList.add('remove');
  });

  form__fields_inputs.forEach((field) => {
    field.removeAttribute('required');
  });

  field.classList.remove('remove');
  field.setAttribute('active', '');
  input.setAttribute('required', '');

  field__errors.forEach((error) => {
    error.classList.add('remove');
  });

  msg__err = document.querySelector(msg__error);
  msg__err.classList.remove('remove');
}

//Form validation
var bouncer = new Bouncer('[data-validate]', {
  disableSubmit: true,
});

var form__valid = null;

//Form submit
document.getElementById('form').addEventListener('submit', function (e) {
  var active__field__input = document.querySelector(
    '.field--single[active] input'
  );

  var main__field__valid =
    bouncer.validate(active__field__input) == undefined ? 0 : 1;

  if (bouncer.validateAll(this).length + main__field__valid == 0) {
    //No errors
    loading__icon.classList.remove('invisible');
    setTimeout(function () {
      loading__icon.classList.add('invisible');
      form__submit__info.classList.remove(
        'form__submit__info--success',
        'form__submit__info--fail',
        'remove'
      );
      try {
        //API call
        form__submit__info.classList.add('form__submit__info--success');
        form__submit__info.innerHTML = 'You have been registered';
      } catch (error) {
        //Error handling
        console.log(error);
        form__submit__info.classList.add('form__submit__info--fail');
        form__submit__info.innerHTML = 'Registration failed';
      }
    }, 3000);
  }
});
