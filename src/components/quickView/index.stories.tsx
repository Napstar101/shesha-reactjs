import React from 'react';
import { QuickView, IQuickViewProps } from '../..';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';

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
                        id={props.id}
                        formPath={props.formPath} />
                </>
            </AuthContainer>
        </ShaApplicationProvider>
    );
};

const baseProps: IQuickViewProps = {
    title: "Hello",
    id: "4575f878-8ff1-4d8f-8532-e35b62c4fe33",
    formPath: "/members/details"
};

export const Base = BaseTemplate.bind({});
Base.args = { ...baseProps };

// #endregion