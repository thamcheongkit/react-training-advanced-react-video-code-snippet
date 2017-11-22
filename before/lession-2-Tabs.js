import './index.css'
import React, { Component } from 'react'
import FaAutomobile from 'react-icons/lib/fa/automobile'
import FaBed from 'react-icons/lib/fa/bed'
import FaPlane from 'react-icons/lib/fa/plane'
import FaSpaceShuttle from 'react-icons/lib/fa/space-shuttle'
import * as text from './text'

class Tabs extends Component {
    
    state = {
        activeIndex: 0
    }

    selectTabIndex(activeIndex) {
        this.setState({ activeIndex })
    }

    renderTabs() {
        const { data, disabled } = this.props
        return data.map((tab, index) => {
            const isActive = this.state.activeIndex === index
            const isDisabled = disabled.includes(index)
            return (
                <div
                    key={index}
                    className={isDIsabled
                        ? 'tab disabled'
                        : isActive
                            ? 'tab active'
                            : 'tab'}
                    onClick={isDisabled ? null : () => this.selectecTabIndex(index)}
                >{tab.label}</div>
            )
        })
    }

    renderPanel() {
        const { data } = this.props
        const { activeIndex } = this.state
        return <div>{data[activeIndex].content}</div>
    }

    render() {
        const { tabsOnBottom } = this.props
        
        const tabs = (
            <div className="tabs">
                {this.renderTabs()}
            </div>
        )

        const panel = (
            <div className="tabs">
                {this.renderPanel()}
            </div>
        )

    }
}

class App extends Component {

    render() {
        const tabData = [
            { label: <FaAutomobile/>,
              content: text.cars
            },
            { label: <FaBed/>,
              content: text.hotels
            },
            { label: <FaPlane/>,
              content: text.flights
            },
            { label: <FaSpaceShuttle/>,
              content: text.space
            },
        ]

        return (
            <div id="app" className="blue-bg">
                <Tabs
                    data={tabData}
                    tabsOnBottom={true}
                    disabled={[ 1 ]}
                />
            </div>
        )
    }
}