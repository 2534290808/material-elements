/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import getTheme from '../styles/getTheme';
import light from '../styles/themes/light';
import merge from 'lodash/merge'

const propTypes = {
    /**
    * If passed in, this component will render image.
    */
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    /**
    * If passed in, this component will render icon element inside avatar.
    */
    icon: PropTypes.string,
    /**
    * If passed in, this component will render an icon with this color.
    */
    iconColor: PropTypes.string,
    /**
    * If passed in, this component will render an icon with this size.
    */
    iconSize: PropTypes.number,
    /**
    * If passed in, this component will render text element inside avatar.
    */
    text: PropTypes.string,
    /**
    * It's just sugar for: style: { width: size, height: size, borderRadius: size / 2 }
    */
    size: PropTypes.number,
    /**
    * Inline style of avatar
    */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        content: Text.propTypes.style,
    }),
};
const defaultProps = {
    image: null,
    icon: null,
    iconColor: null,
    iconSize: null,
    text: null,
    size: 48,
    style: {},
};
function getStyles(props, theme) {
    const { avatar } = getTheme(theme);
    const { size } = props;

    const local = {};

    if (size) {
        local.container = {
            height: size,
            width: size,
            borderRadius: size / 2,
        };
    }

    return {
        container: [
            avatar.container,
            local.container,
            props.style.container,
        ],
        content: [
            avatar.content,
            local.content,
            props.style.content,
        ],
    };
}

class Avatar extends PureComponent {
    render() {
        const { image, icon, iconSize, iconColor, text } = this.props;

        let content = null;
        const { avatar, spacing } =merge(light,this.props.theme);
        const styles = getStyles(this.props, this.props.theme);

        if (icon) {
            const color = iconColor || StyleSheet.flatten(avatar.content).color;
            const size = iconSize || spacing.iconSize;
            content = <Icon name={icon} color={color} size={size} />;
        } else if (text) {
            content = <Text style={styles.content}>{text}</Text>;
        } else if (image) {
            content = image;
        }


        return (
            <View style={{ flexGrow: 1 }}>
                <View style={styles.container} >
                    {content}
                </View>
            </View>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
export default Avatar;
