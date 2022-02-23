import React from 'react';
import { ModelConfigurator, Page } from '../../../components';
import { PageWithLayout } from '../../../interfaces';
import { MetadataDispatcherProvider } from '../../../providers';

export interface IEntityConfiguratorPageProps {
    id?: string;
}

const EntityConfiguratorPageInner: PageWithLayout<IEntityConfiguratorPageProps> = ({
    id,
}) => {
    return (
        <Page
            title="Entity Configuration"
            description=""
        //toolbarItems={toolbarItems}
        //backUrl={backUrl}
        //headerTagList={headerTagList}
        // loading={isFetchingData || loading}
        // breadcrumbItems={breadcrumbItems}
        // loadingText={loadingText}
        >
            {/* <ValidationErrors error={fetchError?.data} /> */}
            <MetadataDispatcherProvider>
                <ModelConfigurator id={id} />
            </MetadataDispatcherProvider>
        </Page>
    );
};

const EntityConfiguratorPage: PageWithLayout<IEntityConfiguratorPageProps> = ({
    id,
}) => {
    return (
        <Page
            title="Entity Configuration"
            description=""
        //toolbarItems={toolbarItems}
        //backUrl={backUrl}
        //headerTagList={headerTagList}
        // loading={isFetchingData || loading}
        // breadcrumbItems={breadcrumbItems}
        // loadingText={loadingText}
        >
            {/* <ValidationErrors error={fetchError?.data} /> */}
            <MetadataDispatcherProvider>
                <ModelConfigurator id={id} />
            </MetadataDispatcherProvider>
        </Page>
    );
};

export default EntityConfiguratorPage;
