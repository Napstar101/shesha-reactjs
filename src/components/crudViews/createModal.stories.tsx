import React, { useState } from 'react';
import { GenericCreateModal, IGenericCreateModalProps } from '../..';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { useAreaCreate } from '../../apis/area';

// #region Storybook Metadata & Configuration

export default {
    title: 'Components/CrudViews/CreateModal',
    component: GenericCreateModal,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL;

// #endregion

// #region Base Mapping Template and Props

const BaseTemplate: Story<IGenericCreateModalProps> = props => {
    return (
        <ShaApplicationProvider backendUrl={backendUrl}>
            <AuthContainer layout>
                <>
                    <GenericCreateModal
                        title={props.title}
                        formPath={props.formPath}
                        updater={props.updater} />
                </>
            </AuthContainer>
        </ShaApplicationProvider>
    );
};

const baseProps: IGenericCreateModalProps = {
    title: "Create Entity",
    formPath: "/areas/create",
    updater: useAreaCreate,
};

export const Base = BaseTemplate.bind({});
Base.args = { ...baseProps };

// #endregion