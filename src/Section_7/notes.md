# Component Lifecycle

## Creation
The following methods are only available upon creation of a given component
```
constructor()
componentWillMount()
componentDidMount()
render()
```
1) constructor(props) gets executed - default E6 class feature
    - if instantiated, then must call super(props) 
    - this is where to set up State
2) ComponentWillMount() - you don't really use this anymore 
    - this is used to update State, last-minute optimization
3) render() - gives idea to react on what to actually render
4) render child components - render understands to render every child component present
5) componentDidMount() - use this to check the web and see if there are given side effects
    - Don't update the state because that triggers a re-render

## Update (triggered by Parent)
The following is the component lifecycle for updating
1) componentWillReceiveProps(nextProps) - make sure to sync State to Props
    - Don't cause side-effects
2) shouldComponentUpdate(nextProps, nextState) - this has the ability to cancel the updating process
    - Here you decide whether to continue updating or not
3) componentWillUpdate(nextProps, nextState) - this may be a better place to sync State to Props
4) render() - here is where you prepare and structure JSX
5) render child components
6) componentDidUpdate() - Here you can cause side-effects - do not update the State here

## Update (triggered by Internal Change)
Unlike Update triggered by Parent, you do not need to initiate this lifecycle hook with componentWillReceiveProps()
1) shouldComponentUpdate(nextProps, nextState) - like before, here we decide whether to Countinue or not
2) componentWillUpdate() - Sync State to Props
3) render()
4) update child components props
5) componentDidUpdate()

These methods are similar to the ones above