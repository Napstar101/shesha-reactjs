import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider, UiProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericDetailsPage } from '../..';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { DetailsPageHandleRefType, IDetailsPageProps } from './detailsPage';
import { MemberResponse, useMembersGet } from '../../apis/members';
import { useState } from 'react';
import DetailsViewHeaderControls from '../detailsViewHeaderControls';
import { Tag } from 'antd';
import moment from 'moment';
import { createRef } from 'react';

export default {
  title: 'Components/CrudViews/DetailsView',
  component: GenericDetailsPage,
} as Meta;

const id = '6743d48e-d67f-48ab-a3a2-10a32d448e08';

const configurableFormProps = {
  id,
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

enum MembershipStatus {
  Active = 1,
  Suspended = 2,
  Cancelled = 3,
}

// Create a master template for mapping args to render the Button component
const Template: Story<IDetailsPageProps> = args => {
  const [data, setData] = useState<MemberResponse>();
  const pageRef = createRef<DetailsPageHandleRefType>();

  const getStatusColor = () => {
    switch (data) {
      case MembershipStatus.Active:
        return '#87d068';
      case MembershipStatus.Suspended:
        return 'orange';
      case MembershipStatus.Cancelled:
        return '#87d068';
      default:
        return '#2db7f5';
    }
  };

  const onRefresh = () => {
    pageRef?.current?.refresh();
  }

  const onDataLoaded = (model: any) => {
    setData(model);
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <UiProvider>
          <GenericDetailsPage
            {...args}
            ref={pageRef}
            title={data => `Membership Details: ${data?.name} ${data?.surname}`}
            id={id}
            fetcher={useMembersGet}
            formPath="/members/details"
            onDataLoaded={onDataLoaded}
            headerControls={(model: MemberResponse) => (
              <DetailsViewHeaderControls
                items={[
                  {
                    name: 'Date Registered',
                    value: model?.membershipStartDate ? moment(model?.membershipStartDate).format('lll') : null,
                    hide: !model?.membershipStartDate,
                  },
                  { name: 'Status', value: <Tag color={getStatusColor()}>{data?.membershipStatus?.item}</Tag> },
                ]}
              />
            )}
            toolbarItems={[
              {
                title: 'Edit',
                icon: <EditOutlined />,
                onClick: () => console.log('Clicked on configurable form'),
              },
              {
                title: 'Reload',
                icon: <ReloadOutlined />,
                onClick: onRefresh,
              },
            ]}
          />
        </UiProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = { ...configurableFormProps };

export const IndexPage = Template.bind({});
IndexPage.args = {
  backendUrl: backendUrl,
  formPath: '/indexTable',
};
