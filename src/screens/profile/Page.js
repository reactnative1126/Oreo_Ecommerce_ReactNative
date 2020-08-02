import React from 'react';

import {compose} from 'recompose';
import {connect} from 'react-redux';

import {
    ScrollView,
} from 'react-native';
import {Header, ThemedView} from 'src/components';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';

import {defaultPropsData, getSingleData} from 'src/hoc/single-data';
import {withLoading} from 'src/hoc/loading';

import {languageSelector} from 'src/modules/common/selectors';
import merge from "lodash/merge";
import {changeColor, changeLineHeight} from "../../utils/text-html";
import TextHtml from "../../containers/TextHtml";
import Container from "../../containers/Container";

class Page extends React.PureComponent {
    render() {
        const {
            screenProps: {t, theme},
            data
        } = this.props;

        return (
            <ThemedView isFullView>
                <Header
                    leftComponent={<IconHeader/>}
                    centerComponent={<TextHeader title={unescape(data.title.rendered)}/>}
                />
                <ScrollView>
                    <Container>
                        <TextHtml value={data.content.rendered}
                                  style={merge(changeColor(theme.Text.secondary.color), changeLineHeight(28))}/>
                    </Container>
                </ScrollView>
            </ThemedView>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: languageSelector(state),
    };
};

const withReduce = connect(mapStateToProps);

export default compose(
    withReduce,
    defaultPropsData,
    getSingleData,
    withLoading,
)(Page);
