# Livi18n.js [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/chrisenytc/livi18n.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

A JavaScript Library for Livi18n

## Maintainer

[Christopher EnyTC](https://github.com/chrisenytc)

Node Version: [Livi18n](https://github.com/chrisenytc/livi18n)

## Instalation

`bower install livi18n`

## Get Started

Install dependencies

`sudo npm install && bower install`

Build Project

`grunt`

Run Tests

Open `SpecRunner.html` in your browser and test with jasmine

## Documentation

#### .init(domain, filenames, cb)

Parameter: `domain` 
Type: `String` 
Example: `http://localhost`

Parameter: `filenames` 
Type: `Array` 
Example: `['messages']`

Parameter: `fn` 
Type: `Function` 
Example: `function(translate, pluralize){};`

Verify the given parameters.

```javascript
// So the middleware init call should look like:
livi18n.init('http://yourdomain', ['required', 'languagefiles'], function(translate, pluralize){
    var name = translate({key: 'messages.welcome'});
    console.log(name);
});
```
It is necessary to define the `domain` and the `require language files`
where livi18n finds the i18n resource files.

#### .require(fn)

Parameter: `fn` 
Type: `Function` 
Example: `function(translate, pluralize){};`

If you need to use the functions of translation and pluralization of livi18n outside the scope of the `init()` function, 
you will need to use the method `require()`.

```javascript
// So the require call should look like:
livi18n.require(function(translate, pluralize){
  //jQuery integration
  $('#test').livi18nT({enableOptions: true});
  //Native API
  console.log(translate({key: 'messages.welcome'}));
});
```

#### .t(data)

Parameter: `data` 
Type: `JSON Object` 
Example: `{key: '', options: {}, defaultValue: ''};`


Provide translate method for use in requests and views

How to use this method
```javascript
livi18n.t({key: 'languageFilename.path.to.value', options: {}, defaultValue: 'Test'});
```
`Key:` The first value of the `key` separated by `.` is the name of the language file where the message,
the second value is the path to the chosen message. Example: `{key: 'messages.welcome'}` // 'Welcome to Livi18n'

`options:` The `options` attribute receives an object with the names of the elements to be changed in the value of the message.

MessageExample: `Hi, :name.`
Example: `{name: 'Princess Livia'}` // 'Hi, Princess Livia.'

`defaultValue:` If the chosen message is not found, the value passed in `defaultValue`
will be used as the default value of the message. Example: `Test Value` // 'Test Value'

#### .p(data)

Parameter: `data` 
Type: `JSON Object` 
Example: `{key: '', options: {}, value: 14, defaultValue: ''};`


Provide pluralize method for use in requests and views

How to use this method
```javascript
livi18n.p({key: 'languageFilename.path.to.value', options: {}, value: 10, defaultValue: 'Test'});
```

`Key:` The first value of the `key` separated by `.` is the name of the language file where the message,
the second value is the path to the chosen message. Example: `{key: 'messages.pluralized'}` // 'Livia have 4 The Vampire Diaries Books!'

`options:` The `options` attribute receives an object with the names of the elements to be changed in the value of the message.

MessageExample: `Hi, :name.`
Example: `{name: 'Princess Livia'}` // 'Hi, Princess Livia.'

`value:` The `value` attribute is a value used in the method to pluralize a chosen message, 
if the value passed is greater than 1, the first value of the message will be returned, if greater than 1, 
the second value of the message will be returned and pluralize a chosen message.

MessageExample: `:name have :&: The Vampire Diaries Book||:name have :&: The Vampire Diaries Books`
Example: `livi18n.p({key: 'messages.pluralized', options: {name: 'Livia'}, value: 4}); // 'Livia have 4 The Vampire Diaries Books!'`

Info: The `:&:` is a constant that takes the value that was passed in the method.

Info: The `||` is the separator that separates the message for be pluralized.

`defaultValue:` If the chosen message is not found, the value passed in `defaultValue`
will be used as the default value of the message. Example: `'Test Value'` // 'Test Value'

### jQuery Integration


Provide a jQuery Integration

How to use this integration
```javascript
$('elem').livi18nT(options);
		//or
$('elem').livi18nT(options);
```
`enableOptions:` If 'enableOptions' is enabled, 
the data of the chosen element will be used as an option for the method.

Example: `$('elem').livi18nT({enabledOptions: true});`

Element Usage: To use the option `enableOptions`, you will need to define in your html elements,
data attributes to be used by the method. 

#### Available attributes

`data-livi18n:` The first value of the `data-livi18n` separated by `.` is the name of the language file where the message,
the second value is the path to the chosen message. 

Example: `data-livi18n="messages.welcome"`

`data-options` The `options` attribute receives an object with the names of the elements to be changed in the value of the message.

Example: `data-options='{"name": "Princess Livia"}'`

`data-value:` The 'value' attribute is a value used in the method to pluralize a chosen message, 
if the value passed is greater than 1, the first value of the message will be returned, if greater than 1, 
the second value of the message will be returned and pluralize a chosen message.

Example: `data-value="4"`

`data-default-value:` If the chosen message is not found, the value passed in `defaultValue`
will be used as the default value of the message. 

Example: `data-default-value="Test"`


#### $('elem').livi18nT(options)

Parameter: `options` 
Type: `JSON Object` 
Example: `{enableOptions: true, key: '', options: {}, defaultValue: ''};`

```javascript
$('elem').livi18nT({enableOptions: true});
```

#### $('elem').livi18nP(options)

Parameter: `options` 
Type: `JSON Object` 
Example: `{enableOptions: true, key: '', options: {}, value: 14, defaultValue: ''};`

```javascript
$('elem').livi18nP({key: '', options: {}, value: 14, defaultValue: ''});
```

### Angular Integration


Provide a AngularJS Integration

**Required Configuration**

Define required scripts

```html
<script src="/angular.min.js"></script>
<script src="/livi18n/livi18n.js"></script>
<script src="/livi18n/ngLivi18n.js"></script>
```

Define Angular module and require ngLivi18n module

```javascript
window.app = angular.module('livi18nApp', ['ngLivi18n']);
```
Initialize AngularJS

```javascript
window.bootstrap = function() {
    angular.bootstrap(document, ['livi18nApp']);
};

window.init = function() {
    window.bootstrap();
};

$(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash == "#_=_") window.location.hash = "";

    //Then init the app
    livi18n.init('http://localhost:3000', ['messages'], function(translate, pluralize){
        var name = translate({key: 'messages.welcome'});
        console.log(name);
        //Init angular
        window.init();
    });
});
```

Create controller and use Angular integration

```javascript
var demoCtrl = function($scope, $livi18n) {
    $scope.livi18ndemo = $livi18n.t(options);
        // or
    $scope.livi18ndemo = $livi18n.p(options);
};
```


#### $livi18n.t(options)

Parameter: `options` 
Type: `JSON Object` 
Example: `{enableOptions: true, key: '', options: {}, defaultValue: ''};`

```javascript
$scope.livi18ndemo = $livi18n.t({enableOptions: true, key: '', options: {}, defaultValue: ''});
```

#### $livi18n.p(options)

Parameter: `options` 
Type: `JSON Object` 
Example: `{enableOptions: true, key: '', options: {}, value: 14, defaultValue: ''};`

```javascript
$scope.livi18ndemo = $livi18n.p({enableOptions: true, key: '', options: {}, value: 14, defaultValue: ''});
```

## Node Documentation

See full documentation on [Livi18n](https://github.com/chrisenytc/livi18n)

## License

The MIT License (MIT)

Copyright (c) 2013 Christopher EnyTC

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
