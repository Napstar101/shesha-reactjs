import React from 'react';
import { QuickView, IQuickViewProps } from '../..';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { Button } from 'antd';
import { usePersonTestGet } from '../../apis/personTest';

// #region Storybook Metadata & Configuration

export default {
    title: 'Components/QuickView',
    component: QuickView,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL;

// #endregion

// #region Base Mapping Template and Props

const BaseTemplate: Story<IQuickViewProps> = props => {
    return (
        <ShaApplicationProvider backendUrl={backendUrl}>
            <AuthContainer layout>
                <>
                    <QuickView
                        title={props.title}
                        displayFormPath={props.displayFormPath}
                        displayPropertyName={props.displayPropertyName}
                        getDetailsUrl={props.getDetailsUrl}
                        entityId={props.entityId}
                        fetcher={props.fetcher}>
                        <Button type="primary">Hover me</Button>
                    </QuickView>
                </>
            </AuthContainer>
        </ShaApplicationProvider>
    );
};

const baseProps: IQuickViewProps = {
    title: "Hello",
    displayFormPath: "/members/details",
    displayPropertyName: "DisplayName",
    getDetailsUrl: "/members",
    entityId: "433eb018-3976-4d93-b02c-4eb1e1b852e4",
    fetcher: usePersonTestGet
};

export const Base = BaseTemplate.bind({});
Base.args = { ...baseProps };

// #endregion