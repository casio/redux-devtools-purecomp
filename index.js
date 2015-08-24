import React, {Component} from 'react'
import {combineReducers, compose, createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {devTools} from 'redux-devtools'
import PureComponent from 'react-pure-render/component';

const SWITCH_LANG = 'switch_lang',
			UNRELATED = 'unrelated'

let prevState

const finalCreateWMiddleware = compose(
	// devTools(),
	createStore
)

const store = finalCreateWMiddleware(combineReducers({
				profile: (state={settings: {lang: 'en'}}, action) => {
					switch(action.type) {
						case SWITCH_LANG:
							return {...state, settings: {
								lang: state.settings.lang === 'en' ? 'de' : 'en'
							}}
						default:
							return state
					}
				},
				unrelated: (state=0, action) => {
					return action.type === UNRELATED ? state + 1 : state
				}
			}))

class SomeComponent extends PureComponent {
	render() {
		console.warn('###', 'RENDER SOME COMPONENT')
		const {someAttr} = this.props
		return <h1>Val:{someAttr.settings.lang}</h1>
	}
}

@connect((state) => {
	prevState && console.info('### Equal ref in @connect?', prevState.profile === state.profile)
	prevState = state
	return {
		profile: state.profile, 
		unrelated: state.unrelated
	}
})
class App extends Component {
	render() {
		const {profile, unrelated, dispatch} = this.props,
					switchlang = () => dispatch({type: SWITCH_LANG}),
					doSthUnrelated = () => dispatch({type: UNRELATED})
		return (
			<div>
				<SomeComponent someAttr={profile} />
				<button onClick={switchlang}>Switch lang</button>
				<button onClick={doSthUnrelated}>Unrelated action</button>
			</div>
		)
	}
}

class Main extends Component {
  render() {
  	return (<Provider store={store}>
  		{() => <App />}
  	</Provider>)
  }
}

React.render(<Main />, document.getElementById('root'))
