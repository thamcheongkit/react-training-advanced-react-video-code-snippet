import './index.css'
import React from 'react'
import createMediaListener from './createMediaListener'
import { Galaxy, Trees, Earth } from ".screens"
import { CSsTransitionGroup } from "react-transition-group"
import { CSSTransition } from '../../../.cache/typescript/2.6/node_modules/@types/react-transition-group';

const withMedia = (queries) => (Comp) => {
    const media = createMediaListener(queries)

    return class WithMedia extends React.Component {
        state = {
            media: media.getState()
        }

        componentDidMount() {
            media.listen(media => this.setState({ media }))
        }

        componentWillUnmount() {
            media.dispose()
        }

        render() {
            return <Comp {...this.state}/>
        }
    }
}

class App extends React.Component {

    render() {
        const { media } = this.props

        return (
            <CSsTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {media.big ? (
                    <Galaxy key="galaxy"/>
                ) : media.tiny ? (
                    <Trees key="trees"/>
                ) : (
                    <Earth key="earth"/>
                )}
            </CSsTransitionGroup>
        )
    }
}

const AppWithMedia = withMedia({
    big: '(min-width: 1000px)',
    tiny: '(max-width: 600px)'
})(App)

export default AppWithMedia
