/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import HeaderAccount from './HeaderAccount.react';
import getTheme from '../styles/getTheme'

const propTypes = {
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
};
const defaultProps = {
    image: null,
    backgroundColor: null,
    children: null,
    style: {},
};

function getStyles(props, context) {
    const { drawerHeader } = context.uiTheme;
    const { image } = props;

    const local = {};

    if (image) {
        local.contentContainer = {
            backgroundColor: null,
        };
    }

    return {
        container: [
            drawerHeader.container,
            props.style.container,
        ],
        contentContainer: [
            drawerHeader.contentContainer,
            props.style.contentContainer,
            local.contentContainer,
        ],
    };
}

class Header extends PureComponent {

    _getStyles=()=>{
        let props=this.props;
        const { drawerHeader } = getTheme(props.theme);

        const { image } = props;

        const local = {};

        if (image) {
            local.contentContainer = {
                backgroundColor: null,
            };
        }

        return {
            container: [
                drawerHeader.container,
                props.style.container,
            ],
            contentContainer: [
                drawerHeader.contentContainer,
                props.style.contentContainer,
                local.contentContainer,
            ],
        };

    }
    render() {
        const { image, children } = this.props;

        const styles = this._getStyles();
        const flatten = StyleSheet.flatten(styles.contentContainer);

        const content = (
            <View style={styles.contentContainer}>
                {children}
            </View>
        );

        if (image) {
            return (
                <View>
                    {React.cloneElement(image, { style: [{ height: flatten.height }] })}
                    <View style={[styles.container]}>
                        {content}
                    </View>
                </View>
            );
        }

        return content;
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

Header.Account = HeaderAccount;

export default Header;
