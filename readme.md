Pluri -  A Language of Languages (Alpha)
===================


Pluri is an experimental, synchronous, indented and dynamically evaluated language built on top of javascript.

Example
-------
  Hello World in Pluri:

    "create" {
        print
        "javascript" {
            console.log(input);
            this.done('');
        }
    }
    
    "print" {
        Hello World!
    }
      
    

Instalation
------------
For command line:

```cmd
    npm install -g pluri
```    

For your node project:

```cmd
    npm install pluri
```

For browser:

Embed the pluri-web.js file from Pluri repository in your code:

```html
    <script src="pluri-web.js"></script>
```

Pluri will be available through a **global variable** (require/amd support will happen in the future).  

Usage
-----

**Command Line:**

 1. Create a separated folder for your project
 2. Create your file with .pluri extension
 3. Run the following command in your terminal:

    pluri filename.pluri

**NodeJS:**
Call Pluri in your code by requiring it, and provide the **file contents(as a string)** to executeString()

```javascript
    var Pluri = require('pluri');
    Pluri.interpreter().executeString(fileContents);
```

    
**Browser:**

```javascript
    Pluri.interpreter().executeString(programContents);
```


How it works
------------
**Pluri modules are the smallest unit in the language**. They have the following characteristics:   

**Synchronous Execution:** The next module will only be executed after the current one is finished (If you've seen the new Ecma Script specification, think of the functionality as the same as **async/await**).

 **Requires Indentation:** To properly parse your program, Pluri requires that you use indentation of 4 spaces (or tab) for the input of your modules.

**inputs and outputs are Strings:** That's because strings offer compatibility anywhere. You can communicate with outside processes, servers and other levels of abstractions without having to convert objects.

A Pluri module can take **three types of inputs**:

 - **Response:** It's the output from the last module executed. This allows you to chain structures in a functional programming pattern.

 - **Input:** This is the input from inside the module's curly brackets.

 - **Parent Input:** Similar to input, but refers to the parent of that module.

**For example:**

    "log" {
        Hello World!
    }

That code will make Pluri look for the module named log, and when it's loaded, it will be called with the String "Hello World!".


Of course, you can also create your custom modules. For that, you just have to call the "create" module:

    "create" {
        say hello world
       "javascript" {
           alert('Hello World!')
           this.done('said hello world');
       }    
    }

and you can also call Pluri modules inside Pluri Modules

    "create" {
        say hello world
       "log" {
           Hello World
       }    
    }

    "say hello world" {

    }

Pluri modules are very independent, they're essentially languages by themselves. That means that, when using a module, you should make sure that it implements its own security.



----------


Pros
-------------

 - Easily configurable, can support nested languages.
 - Interpreting is configurable. 
 - Simple syntax.

----------


Cons
-------------------

 - Still alpha, very slow (compared to Javascript) .
 - Modules have much more responsability than functions when parsing inputs (they're all strings, and can contain unexpected/malicious data).