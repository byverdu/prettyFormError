# prettyFormError

By default all major browsers have their own CSS styles for the error messages shown when a form is submitted and some of the fields are empty or with a wrong value.

With this jQuery plugin you can show identical styles for the errors in all major browsers.

In order to have a custom look for the bubbles across all supporting browsers the only option is to suppress the default bubble and implement your own.

[Try it @ https://byverdu.github.io/prettyFormError/](https://byverdu.github.io/prettyFormError/)

### Good to know

The `required` attribute is a must in all the elements that you need to validate.

When you have to validate a group of `<input type="radio" name="group-1">` they must have the same attribute `name`

The `select` element needs to have an empty `option` element as the first element so it can get an error if none of the other options are selected

Within HTML5 you can add an extra layer of validation by using the appropiate value for the `type` attribute used in the `input` [tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input).

Using the required attribute for a group of check boxes fails because when you submit the form the error message pops up for the unchecked boxes.

To solve this issue you need to add/remove the `required` attribute programmatically. This plugin provides an option that lets you pass the problem.

[Google knows everything, checkbox issue](https://www.google.co.uk/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=required+attribute+multiple+checkbox)

This is how your error messages will look after using this plugin.

<p align="center">
  <img src="https://github.com/byverdu/prettyFormError/raw/master/docs/media/default_theme.png" alt="demo image" width="250">
  <img src="https://github.com/byverdu/prettyFormError/raw/master/docs/media/black_theme.png" alt="demo image" width="250">
  <img src="https://github.com/byverdu/prettyFormError/raw/master/docs/media/white_theme.png" alt="demo image" width="250">
</p>

### Dependencies
`jQuery` or not :smile:

# How to use the plugin

You will only need `prettyFormError.min.js` and `prettyFormError.min.css`.

You can grab them on unpkg CDN and use it like this:

```xml
<link rel="stylesheet" href="https://unpkg.com/pretty-form-error@latest_version/dist/prettyFormError.css" media="screen">
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="https://unpkg.com/pretty-form-error@latest_version/dist/prettyFormError.min.js"></script>  
```

or found them under `/dist/**` folder and use it like this:

```xml
<link rel="stylesheet" href="prettyFormError.min.css" media="screen">
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="prettyFormError.min.js"></script>  
```

or use npm to install the plugin and require the module within your project.

```javascript
const prerttyError = require( 'pretty-form-error' );

prettyFormError( 'form', {options});
```

It is really simple to use it, just select your form with plain JS or jQuery and call the prettyFormError method.

```js
// plain Js
prettyFormError('myFormSelector', optionalOpts);

// jQuery version
$('myFormSelector').prettyFormError(optionalOpts);
```


# Plugin Options.

The plugin is initialized with the following default options:

```javascript
{
  multiCheckbox: {
    enabled: false
  },
  classError: 'prettyFormError',
  positionMethod: 'after',
  elementError: 'div',
  callToAction: 'button',
  focusErrorOnClick: true,
  fadeOutError: {
    fadeOut: false
  }
}
```
#### multiCheckbox[Object]
Use this option if you need to validate a group of checkboxes.
`disabled by default!!`

```javascript
{
    multiCheckbox: {
      enabled: true,
      selector: '.commonClassForGroup'
    }
}
```
```xml
<p>Best topping ever</p>

<label for="pineapple">Pineapple:</label>
  <input required class="commonClassForGroup" type="checkbox" value="pineapple">

<label for="ham">Ham:</label>
  <input required class="commonClassForGroup" type="checkbox" value="ham">

<label for="olives">Olives:</label>
  <input required class="commonClassForGroup" type="checkbox" value="olives">
```

#### classError[String]
Name for the css class used for the error messages. The default one is `prettyFormError` but you could also use `prettyFormError-black` or `prettyFormError-white`

#### positionMethod[String]
Where do you want to display the error, `after` or `before` the errored input.

#### elementError[String]
HTML element that you want to use for wrap the errors.

#### callToAction[String]
HTML selector used to submit the form.

#### focusErrorOnClick[Boolean]
Use `false` if you want to disable this otpion.

#### fadeOutError[Object]
By default the error message will persist on the screen, if you want to fadeout the error enable this option.

`timer` is in miliseconds. 

```javascript
{
  fadeOutError: {
    fadeOut: true,
    timer: [Number]
  }
}
```
