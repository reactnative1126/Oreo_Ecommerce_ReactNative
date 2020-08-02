import React from 'react';

import {connect} from 'react-redux';
import {StatusBar} from 'react-native';
import {ThemedView} from 'src/components';
import GetStartSwiper from 'src/containers/GetStartSwiper';
import GetStartVideo from 'src/containers/GetStartVideo';

import {closeGettingStarted} from 'src/modules/common/actions';
import {routerMainSelector} from 'src/modules/common/selectors';

const ENABLE_VIDEO = false;

class GetStartScreen extends React.Component {
    handleGettingStarted = () => {
        const {navigation, router, handleCloseGettingStarted} = this.props;
        handleCloseGettingStarted();
        navigation.navigate(router)
    };

    render() {
        const {
            screenProps: {t},
        } = this.props;
        return (
            <ThemedView isFullView>
                <StatusBar hidden/>
                {
                    ENABLE_VIDEO ?
                        <GetStartVideo handleGettingStarted={this.handleGettingStarted}/> :
                        <GetStartSwiper handleGettingStarted={this.handleGettingStarted}/>
                }
            </ThemedView>
        );
    }
}

const mapStateToProps = state => {
    return {
        router: routerMainSelector(state),
    };
};

const mapDispatchToProps = {
    handleCloseGettingStarted: closeGettingStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetStartScreen);
