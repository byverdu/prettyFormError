# prettyError

By default all major browsers have their own CSS styles for the error messages shown when a form is submitted and some of the fields are empty or with a wrong value.

With this jQuery plugin you can show identical styles for the errors in all major browsers.

In order to have a custom look for the bubbles across all supporting browsers the only option is to suppress the default bubble and implement your own.

[Try it @ https://byverdu.github.io/prettyError/](https://byverdu.github.io/prettyError/)

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
  <img src="/docs/demo.png" alt="demo image" width="500">
</p>

### Dependencies
`jQuery` :smile:

# How to use the plugin
> All compiled files can be found under `/dist/**`

You will need `prettyError.min.js` and `prettyError.min.css`

It is really simple, just get select your form with jQuery and call the prettyError method.

`$('myFormSelector').prettyError();`

# Plugin Options.

The plugin is initialized with the following default options:

```javascript
{
  multiCheckbox: {
    enabled: false
  },
  classError: 'prettyError',
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
Name for the css class used for the error messages.

#### positionMethod[String]
JQuery method used for positioning the error, `.after()` or `.before()`.

#### elementError[String]
HTML element that you want to use for wrap the errors.

#### callToAction[String]
HTML selector used to submit the form.

#### focusErrorOnClick[Boolean]
Use `false` if you want to disable this otpion.

#### fadeOutError[Object]
By default the error message will persist on the screen, if you want to fadeout the error enable this option.

`fadeOutOpts` accepts same options than the default `fadeOut()` [jQuery method](http://api.jquery.com/fadeout/)

```javascript
{
  fadeOutError: {
    fadeOut: true,
    fadeOutOpts: [string, number or Object]
  }
}
```

## ToDo

1. [ ] Add more ways to display the error messages.
1. [ ] Add more styles / themes
