# Component Lifecycle

### Creation
The following methods are only available upon creation of a given component
```
constructor()
componentWillMount()
componentDidMount()
render()
```

### Process
1) constructor(props) gets executed - default E6 class feature
    - if instantiated, then must call super(props) 
    - this is where to set up State
2) ComponentWillMount() - you don't really use this anymore 
    - this is used to update State, last-minute optimization
3) render() - gives idea to react on what to actually render
4) render child components - render understands to render every child component present
5) componentDidMount() - use this to check the web and see if there are given side effects
    - Don't update the state because that triggers a re-render