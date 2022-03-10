import React from 'react';
import { QuickView, IQuickViewProps } from '../..';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { Button } from 'antd';

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
                        formPath={props.formPath}
                        displayPropertyName={props.displayPropertyName}
                        formValues={{ membershipNumber: "00000000" }}>
                        <Button type="primary">Hover me</Button>
                    </QuickView>
                </>
            </AuthContainer>
        </ShaApplicationProvider>
    );
};

const baseProps: IQuickViewProps = {
    title: "Hello",
    formPath: "/members/details",
    displayPropertyName: "DisplayName"
};

export const Base = BaseTemplate.bind({});
Base.args = { ...baseProps };

// #endregion