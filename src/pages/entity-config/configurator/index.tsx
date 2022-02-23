import React from 'react';
import { ModelConfigurator, Page } from '../../../components';
import { PageWithLayout } from '../../../interfaces';
import { MetadataDispatcherProvider } from '../../../providers';

export interface IEntityConfiguratorPageProps {
    id?: string;
}

const EntityConfiguratorPage: PageWithLayout<IEntityConfiguratorPageProps> = ({
    id,
}) => {
    return (
        <Page
            title="Entity Configuration"
            description=""
        >
            <MetadataDispatcherProvider>
                <ModelConfigurator id={id} />
            </MetadataDispatcherProvider>
        </Page>
    );
};

export default EntityConfiguratorPage;
