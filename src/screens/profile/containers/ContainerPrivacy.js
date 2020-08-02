import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'src/components';
import Container from 'src/containers/Container';
import {margin} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config';

const ContainerPrivacy = () => {
    const { t } = useTranslation();

    return (
        <ScrollView>
            <Container>
                <Text h2 medium style={styles.title}>
                    {t('common:text_privacy')}
                </Text>
                <Text h4 style={styles.titleList}>
                    {t('profile:text_privacy_title_1')}
                </Text>
                <Text colorSecondary style={styles.description}>
                    {t('profile:text_privacy_description_1')}
                </Text>
                <Text h4 style={styles.titleList}>
                    {t('profile:text_privacy_title_2')}
                </Text>
                <Text colorSecondary style={styles.description}>
                    {t('profile:text_privacy_description_2')}
                </Text>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: margin.big,
    },
    titleList: {
        marginBottom: margin.base + 4,
    },
    description: {
        marginBottom: 50,
        lineHeight: lineHeights.h4,
    },
});

export default ContainerPrivacy;
