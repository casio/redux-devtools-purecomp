## How to reproduce

```
$ npm i
$ npm start
```

Open http://localhost:3000 and a browser console.

Now, clicks on 'Unrelated action' btn cause console warnings like `### RENDER SOME COMPONENT` triggered in `SomeComponent.render`.

This component however is a `PureComponent` and should not re-render on actions unrelated to its assigned state.

Commenting out `devTools()` middleware in `index.js#L13` restores the pure behavior, but of course, ehem, renders devTools a bit useless : )