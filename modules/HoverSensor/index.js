import { Component, cloneElement } from 'react';
import { h, noop } from '../util';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';
export class HoverSensor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isHover: false
        };
        this.onMouseEnter = (originalOnMouseEnter) => (event) => {
            (originalOnMouseEnter || noop)(event);
            this.setState({
                isHover: true
            });
        };
        this.onMouseLeave = (originalOnMouseLeave) => (event) => {
            (originalOnMouseLeave || noop)(event);
            this.setState({
                isHover: false
            });
        };
    }
    render() {
        const state = {
            ...this.state
        };
        let { bond } = this.props;
        if (bond) {
            if (typeof bond === 'boolean') {
                bond = 'bond';
            }
            state[bond] = {
                onMouseEnter: this.onMouseEnter(),
                onMouseLeave: this.onMouseLeave()
            };
            return renderProp(this.props, state);
        }
        else {
            const element = renderProp(this.props, state);
            return cloneElement(element, {
                onMouseEnter: this.onMouseEnter(element.props.onMouseEnter),
                onMouseLeave: this.onMouseLeave(element.props.onMouseLeave)
            });
        }
    }
}
const HoverSensorWithBond = (props) => h(HoverSensor, {
    bond: true,
    ...props
});
export const withHover = faccToHoc(HoverSensorWithBond, 'hover');
