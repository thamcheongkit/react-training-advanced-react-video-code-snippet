import './index.css'
import React, { Component } from 'react'
import FaAutomobile from 'react-icons/lib/fa/automobile'
import FaBed from 'react-icons/lib/fa/bed'
import FaPlane from 'react-icons/lib/fa/plane'
import FaSpaceShuttle from 'react-icons/lib/fa/space-shuttle'
import * as text from './text'
import * as PropTypes from 'prop-types'

class Tabs extends Component {

    static childContextTypes = {
        activeIndex: PropTypes.number.isRequired,
        onSelectTab: PropTypes.func.isRequired
    }
    
    state = {
        activeIndex: 0
    }

    getChildContext() {
        return {
            activeIndex: this.state.activeIndex,
            onSelectTab: this.selectTabIndex
        }
    }

    selectTabIndex = (activeIndex) => {
        this.setState({ activeIndex })
    }

    render() {
        return (
            <div className="Tabs">
                {this.props.children}
            </div>
        )
    }

}

class TabList extends Component {
    static contextTypes = {
        activeIndex: PropTypes.number.isRequired,
        onSelectTab: PropTypes.func.isRequired
    }

    render() {
        const { activeIndex } = this.context
        const children =  React.Children.map(
            this.props.children,
            (child, index) => {
                return React.cloneElement(child, {
                    isActive: index === activeIndex,
                    onSelect: () => this.context.onSelectTab(index)
                })
            }
        )
        return (
            <div className="tabs">
                {children}
            </div>
        )
    }
}

class Tab extends Component {
    render() {
        const { isActive, isDisabled, onSelect } = this.props
        return (
            <div
                className={isDisabled
                    ? 'tab disabled'
                    : isActive
                        ? 'tab active'
                        : 'tab'}
                onClick={isDisabled ? null : () => onSelect}
            />{this.props.children}</div>
        )
    }
}

class TabPanels extends Component {

    static contextTypes = {
        activeIndex: PropTypes.number.isRequired
    }

    render() {
        const { children } = this.props
        const { activeIndex } = this.context
        return (
            <div className="panels">
                {children[activeIndex]}
            </div>
        )
    }
}

class TabPanel extends Component {
    render() {
        return this.props.children
    }
}

class DataTabs extends Component {
    render() {
        const { data } = this.props
        return (
            <Tabs>
                <TabList>
                    {data.map(tab => 
                        (<Tab>{tab.label}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {data.map(tab => 
                        (<Tab>{tab.content}</Tab>
                    ))}
                </TabPanels>
            </Tabs>
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
                <DataTabs data={tabData}/>
            </div>
        )
    }
}

// <Tabs>
// <TabList>
//     <Tab><FaAutomobile/></Tab>
//     <Tab><FaBed/></Tab>
//     <Tab><FaPlane/></Tab>
//     <Tab><FaSpaceShuttle/></Tab>
// </TabList>
// <TabPanels>
//     <TabPanel>{text.cars}</TabPanel>
//     <TabPanel>{text.hotels}</TabPanel>
//     <TabPanel>{text.flights}</TabPanel>
//     <TabPanel>{text.cars}</TabPanel>
// </TabPanels>
// </Tabs>