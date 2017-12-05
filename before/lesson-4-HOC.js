import './index.css'
import React from 'react'
import createMediaListener from './createMediaListener'
import { Galaxy, Trees, Earth } from ".screens"
import { CSsTransitionGroup } from "react-transition-group"
import { CSSTransition } from '../../../.cache/typescript/2.6/node_modules/@types/react-transition-group';

const media = createMediaListener({
    big: '(min-width: 1000px)',
    tiny: '(max-width: 600px)'
})

class App extends React.Component {
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
        const { media } = this.state

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

export default App