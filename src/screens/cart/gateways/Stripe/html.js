const input = "input[type='text'], input[type='email'], input[type='tel']";
export default `
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <script src="https://js.stripe.com/v3/"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap" rel="stylesheet">
    <script>
      INJECT_DATA
      var stripe = Stripe(window.PUBLISHABLE_KEY || 'pk_test_6pRNASCoBOKtIshFeQd4XMUh');
      function registerElements(elements, exampleName) {
        var formClass = '.' + exampleName;
        var example = document.querySelector(formClass);
        var form = example.querySelector('form');
        var resetButton = example.querySelector('a.reset');
        var error = form.querySelector('.error');
        var errorMessage = error.querySelector('.message');
        function enableInputs() {
          Array.prototype.forEach.call(
            form.querySelectorAll(${input}),
            function(input) {
              input.removeAttribute('disabled');
            },
          );
        }
        function disableInputs() {
          Array.prototype.forEach.call(
            form.querySelectorAll(${input}),
            function(input) {
              input.setAttribute('disabled', 'true');
            },
          );
        }
        function triggerBrowserValidation() {
          // The only way to trigger HTML5 form validation UI is to fake a user submit
          // event.
          var submit = document.createElement('input');
          submit.type = 'submit';
          submit.style.display = 'none';
          form.appendChild(submit);
          submit.click();
          submit.remove();
        }
        // Listen for errors from each Element, and show error messages in the UI.
        var savedErrors = {};
        elements.forEach(function(element, idx) {
          element.on('change', function(event) {
            if (event.error) {
              error.classList.add('visible');
              savedErrors[idx] = event.error.message;
              errorMessage.innerText = event.error.message;
            } else {
              savedErrors[idx] = null;
              // Loop over the saved errors and find the first one, if any.
              var nextError = Object.keys(savedErrors)
                .sort()
                .reduce(function(maybeFoundError, key) {
                  return maybeFoundError || savedErrors[key];
                }, null);
              if (nextError) {
                // Now that they've fixed the current error, show another one.
                errorMessage.innerText = nextError;
              } else {
                // The user fixed the last error; no more errors.
                error.classList.remove('visible');
              }
            }
          });
        });
        // Listen on the form's 'submit' handler...
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          // Trigger HTML5 validation UI on the form if any of the inputs fail
          // validation.
          var plainInputsValid = true;
          Array.prototype.forEach.call(form.querySelectorAll('input'), function(
            input,
          ) {
            if (input.checkValidity && !input.checkValidity()) {
              plainInputsValid = false;
              return;
            }
          });
          if (!plainInputsValid) {
            triggerBrowserValidation();
            return;
          }
          // Show a loading screen...
          example.classList.add('submitting');
          // Disable all inputs.
          disableInputs();
          // Gather additional customer data we may have collected in our form.
          var name = form.querySelector('#' + exampleName + '-name');
          var address1 = form.querySelector('#' + exampleName + '-address');
          var city = form.querySelector('#' + exampleName + '-city');
          var state = form.querySelector('#' + exampleName + '-state');
          var zip = form.querySelector('#' + exampleName + '-zip');
          var additionalData = {
            name: name ? name.value : undefined,
            address_line1: address1 ? address1.value : undefined,
            address_city: city ? city.value : undefined,
            address_state: state ? state.value : undefined,
            address_zip: zip ? zip.value : undefined,
          };
          // Use Stripe.js to create a token. We only need to pass in one Element
          // from the Element group in order to create a token. We can also pass
          // in the additional customer data we collected in our form.
          // stripe.createToken(elements[0], additionalData).then(function(result) {
          //   // Stop loading!
          //   example.classList.remove('submitting');
          
          //   if (result.token) {
          //     // If we received a token, show the token ID.
          //     //example.querySelector('.token').innerText = result.token.id;
          //     example.classList.add('submitted');
          //     postMessage(result.token.id);
          //     window.ReactNativeWebView.postMessage();
          //   } else {
          //     // Otherwise, un-disable inputs.
          //     enableInputs();
          //   }
          // });
          
          stripe.createSource(elements[0], {
            type: 'card',
            owner: additionalData,
          }).then(function(result) {
            // Stop loading!
            example.classList.remove('submitting');
            
            if (result.error) {
              enableInputs();
              alert(result.error.message);
            }
           
            if (result.source) {
              example.classList.add('submitted');
              window.ReactNativeWebView.postMessage(result.source.id);
            } else {
              enableInputs();
            }
          });
          
        });
        // resetButton.addEventListener('click', function(e) {
        //   e.preventDefault();
        //   // Resetting the form (instead of setting the value to \`''\` for each input)
        //   // helps us clear webkit autofill styles.
        //   form.reset();
        //   // Clear each Element.
        //   elements.forEach(function(element) {
        //     element.clear();
        //   });
        //   // Reset error state as well.
        //   error.classList.remove('visible');
        //   // Resetting the form does not un-disable inputs, so we need to do it separately:
        //   enableInputs();
        //   example.classList.remove('submitted');
        // });
      }
    </script>
    <style>
        body{
          margin:0;
          overflow: hidden;
        }
        /** Page-specific styles */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
        
          to {
            transform: rotate(1turn);
          }
        }
        
        @keyframes void-animation-out {
          0%,
          to {
            opacity: 1;
          }
        }
    
        main > .container-lg .example.submitted form,
        main > .container-lg .example.submitting form {
            opacity: 0;
            transform: scale(0.9);
            pointer-events: none;
        }
        main > .container-lg .example.submitted .success,
        main > .container-lg .example.submitting .success {
            pointer-events: all;
        }
        main > .container-lg .example.submitting .success .icon {
            opacity: 1;
        }
        main > .container-lg .example.submitted .success > * {
            opacity: 1;
            transform: none !important;
        }
        main > .container-lg .example.submitted .success > :nth-child(2) {
            transition-delay: 0.1s;
        }
        main > .container-lg .example.submitted .success > :nth-child(3) {
            transition-delay: 0.2s;
        }
        main > .container-lg .example.submitted .success > :nth-child(4) {
            transition-delay: 0.3s;
        }
        main > .container-lg .example.submitted .success .icon .border,
        main > .container-lg .example.submitted .success .icon .checkmark {
            opacity: 1;
            stroke-dashoffset: 0 !important;
        }
        main > .container-lg .example * {
            margin: 0;
            padding: 0;
        }
        main > .container-lg .example .caption {
            display: flex;
            justify-content: space-between;
            position: absolute;
            width: 100%;
            top: 100%;
            left: 0;
            padding: 15px 10px 0;
            color: #aab7c4;
            font-family: "Poppins", sans-serif;
            font-size: 15px;
            font-weight: 500;
        }
        main > .container-lg .example .caption * {
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
        }
        main > .container-lg .example .caption .no-charge {
            color: #cfd7df;
            margin-right: 10px;
        }
        main > .container-lg .example .caption a.source {
            text-align: right;
            color: inherit;
            transition: color 0.1s ease-in-out;
            margin-left: 10px;
        }
        main > .container-lg .example .caption a.source:hover {
            color: #6772e5;
        }
        main > .container-lg .example .caption a.source:active {
            color: #43458b;
        }
        main > .container-lg .example .caption a.source svg {
            margin-right: 10px;
        }
        main > .container-lg .example .caption a.source svg path {
            fill: currentColor;
        }
        main > .container-lg .example form input::-webkit-input-placeholder {
            opacity: 1;
        }
        main > .container-lg .example form input::-moz-placeholder {
            opacity: 1;
        }
        main > .container-lg .example form input:-ms-input-placeholder {
            opacity: 1;
        }
        main > .container-lg .example .error {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            align-items: center;
            width: 100%;
            top: 100%;
            margin-top: 20px;
            left: 0;
            padding:0;
            font-size: 13px !important;
            opacity: 0;
            transform: translateY(10px);
            transition-property: opacity, transform;
            transition-duration: 0.35s;
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        main > .container-lg .example .error.visible {
            opacity: 1;
            transform: none;
        }
        main > .container-lg .example .error .message {
            font-size: inherit;
        }
        main > .container-lg .example .error svg {
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-top: -1px;
            margin-right: 10px;
        }
        main > .container-lg .example .success {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: center;
            justify-content: center;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            padding: 0px;
            text-align: center;
            pointer-events: none;
            overflow: hidden;
        }
        @media (min-width: 670px) {
            main > .container-lg .example .success {
                padding: 00px;
            }
        }
        main > .container-lg .example .success > * {
            transition-property: opacity, transform;
            transition-duration: 0.35s;
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
            opacity: 0;
            transform: translateY(50px);
        }
        main > .container-lg .example .success .icon {
            margin: 15px 0 30px;
            transform: translateY(70px) scale(0.75);
        }
        main > .container-lg .example .success .icon svg {
            will-change: transform;
        }
        main > .container-lg .example .success .icon .border {
            stroke-dasharray: 251;
            stroke-dashoffset: 62.75;
            transform-origin: 50% 50%;
            transition: stroke-dashoffset 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
            animation: spin 1s linear infinite;
        }
        main > .container-lg .example .success .icon .checkmark {
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
            transition: stroke-dashoffset 0.35s cubic-bezier(0.165, 0.84, 0.44, 1) 0.35s;
        }
        main > .container-lg .example .success .title {
            font-size: 17px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        main > .container-lg .example .success .message {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 25px;
            line-height: 1.6em;
        }
        main > .container-lg .example .success .message span {
            font-size: inherit;
        }
        main > .container-lg .example .success .reset:active {
            transition-duration: 0.15s;
            transition-delay: 0s;
            opacity: 0.65;
        }
        main > .container-lg .example .success .reset svg {
            will-change: transform;
        }
        .example.example2 {
            background-color: #fff;
        }
        .example.example2 * {
            font-family: Poppins;
            font-size: 15px;
            font-weight: 400;
        }
        .example.example2-dark {
            background-color: #383838 !important;
        }
        .example.example2 .row {
            display: -ms-flexbox;
            display: flex;
            margin: 0 5px 12px;
        }
        .example.example2 .field {
            position: relative;
            width: 100%;
           display: flex;
            margin: 0 10px;
            cursor: text;
        }
        .example.example2 .field.half-width {
            width: 50%;
        }
        .example.example2 .field.quarter-width {
            width: calc(25% - 10px);
        }
        .example.example2 .baseline {
            position: absolute;
            width: 100%;
            height: 1px;
            left: 0;
            bottom: 0;
            background-color: #E9ECEF;
            transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: none;
        }
        .example.example2 label {
            position: absolute;
            left: 8px;
            bottom: 11px;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transform-origin: 0 50%;
            cursor: text;
            background: #fff;
            padding: 0 8px;
            transition-property: color, transform;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
            width: calc(100% - 55px);
            pointer-events: none;
            z-index: 0;
        }
        .example.example2-dark label {
            background-color: #383838 !important;
        }
        .example.example2 .input {
            width: 100%;
            color: #000;
            background-color: transparent;
            border:1px solid #E9ECEF;
            height: 44px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding: 0 8px;
        }
        .example.example2-dark .input {
           border-color: #777;
           color: #fff;
        }
        .example.example2 .input > div{
          width: 100%;
        }
        .example.example2 .input::-webkit-input-placeholder {
            color: transparent;
            transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .example.example2 .input::-moz-placeholder {
            color: transparent;
            transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .example.example2 .input:-ms-input-placeholder {
            color: transparent;
            transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .example.example2 .input.StripeElement {
            
            /* opacity: 0;
            transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            will-change: opacity; */
        }
        .example.example2 .input.focused,
        .example.example2 .input:not(.empty) {
            opacity: 1;
        }
        .example.example2 .input.focused::-webkit-input-placeholder,
        .example.example2 .input:not(.empty)::-webkit-input-placeholder {
            color: #cfd7df;
        }
        .example.example2 .input.focused::-moz-placeholder,
        .example.example2 .input:not(.empty)::-moz-placeholder {
            color: #cfd7df;
        }
        .example.example2 .input.focused:-ms-input-placeholder,
        .example.example2 .input:not(.empty):-ms-input-placeholder {
            color: #cfd7df;
        }
        .example.example2 .input.focused + label,
        .example.example2 .input:not(.empty) + label {
            color: #aab7c4;
            transform: scale(0.8) translateY(-29px) translateX(-6px);
            cursor: default;
            width: auto;
        }
        .example.example2 .input.focused + label {
            color: #999999;
        }
        .example.example2 .input.invalid + label {
            color: #ffa27b;
        }
        .example.example2 .input.invalid{
            border-color: #ffa27b;
        }
        .example.example2 .input.focused + label + .baseline {
            background-color: #24b47e;
        }
        .example.example2 .input.focused.invalid {
            border-color: #e25950;
        }
        .example.example2 input, .example.example2 button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
            border-style: none;
        }
        .example.example2 input:-webkit-autofill {
            -webkit-text-fill-color: #e39f48;
            transition: background-color 100000000s;
            -webkit-animation: 1ms void-animation-out;
        }
        .example.example2 .StripeElement--webkit-autofill {
            background: transparent !important;
        }
        .example.example2 input, .example.example2 button {
            -webkit-animation: 1ms void-animation-out;
        }
        .example.example2 button {
            display: block;
            width: calc(100% - 30px);
            height: 40px;
            margin: 26px 15px 0;
            background-color: #6435C9;
            border-radius: 4px;
            color: #fff;
            font-weight: 500;
            cursor: pointer;
        }
        .example.example2 .error svg {
            margin-top: 0 !important;
        }
        .example.example2 .error svg .base {
            fill: #e25950;
        }
        .example.example2 .error svg .glyph {
            fill: #fff;
        }
        .example.example2 .error .message {
            color: #e25950;
        }
        .example.example2 .success .icon .border {
            stroke: #000;
        }
        .example.example2 .success .icon .checkmark {
            stroke: #24b47e;
        }
        .example.example2 .success .title {
            color: #32325d;
            font-size: 16px !important;
        }
        .example.example2 .success .message {
            color: #8898aa;
            font-size: 13px !important;
        }
        .example.example2 .success .reset path {
            fill: #24b47e;
        }
        .mt-12{
          margin-top: 12px !important;
        }
    </style>
</head>

<body>
<div class="globalContent">
    <main>
        <section class="container-lg">
            <!--Example 2-->
            <div class="cell example example2" id="example-2">
                <form>
                    <div class="row">
                        <div class="field mt-12">
                            <div id="example2-card-number" class="input empty"></div>
                            <label for="example2-card-number" data-tid="elements_examples.form.card_number_label">Card
                                number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field half-width">
                            <div id="example2-card-expiry" class="input empty"></div>
                            <label for="example2-card-expiry" data-tid="elements_examples.form.card_expiry_label">Expiration</label>
                        </div>
                        <div class="field half-width">
                            <div id="example2-card-cvc" class="input empty"></div>
                            <label for="example2-card-cvc" data-tid="elements_examples.form.card_cvc_label">CVC</label>
                        </div>
                    </div>
                    <button type="submit" data-tid="elements_examples.form.pay_button">Payment</button>
                    <div class="error" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                            <path class="base" fill="#000"
                                  d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
                            <path class="glyph" fill="#FFF"
                                  d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
                        </svg>
                        <span class="message"></span></div>
                </form>
                <div class="success">
                    <div class="icon">
                        <svg width="84px" height="84px" viewBox="0 0 84 84" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <circle class="border" cx="42" cy="42" r="40" stroke-linecap="round" stroke-width="4"
                                    stroke="#000" fill="none"></circle>
                            <path class="checkmark" stroke-linecap="round" stroke-linejoin="round"
                                  d="M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338" stroke-width="4"
                                  stroke="#000" fill="none"></path>
                        </svg>
                    </div>
                    <h3 class="title" data-tid="elements_examples.success.title">Payment successful</h3>
                </div>
            </div>
        </section>
    </main>
</div>
<script>
  (function() {
    'use strict';
    
    var theme_type = window.THEME_TYPE || 'light';
    
    if (theme_type === 'dark') {
      document.getElementById('example-2').className += ' example2-dark';
    }
    
    var elements = stripe.elements({
      fonts: [{
        cssSrc: 'https://fonts.googleapis.com/css?family=Poppins',
      }],
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use \`locale: 'auto'\` instead.
      locale: 'auto',
    });
    // Floating labels
    var inputs = document.querySelectorAll('.cell.example.example2 .input');
    Array.prototype.forEach.call(inputs, function(input) {
      input.addEventListener('focus', function() {
        input.classList.add('focused');
      });
      input.addEventListener('blur', function() {
        input.classList.remove('focused');
      });
      input.addEventListener('keyup', function() {
        if (input.value.length === 0) {
          input.classList.add('empty');
        } else {
          input.classList.remove('empty');
        }
      });
    });
    var elementStyles = {
      base: {
        color: '#000',
        fontWeight: 400,
        fontFamily: 'Poppins',
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#fff',
        },
        ':-webkit-autofill': {
          color: '#e39f48',
        },
      },
      invalid: {
        color: '##E60023',
        '::placeholder': {
          color: '#FFCCA5',
        },
      },
    };
    var elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };
    var cardNumber = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardNumber.mount('#example2-card-number');
    var cardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardExpiry.mount('#example2-card-expiry');
    var cardCvc = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardCvc.mount('#example2-card-cvc');
    registerElements([cardNumber, cardExpiry, cardCvc], 'example2');
  })();
</script>
</body>

</html>
`;
