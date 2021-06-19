import React, { useEffect } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider, UiProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericDetailsPage } from '../..';
import { EditOutlined } from '@ant-design/icons';
import { IDetailsPageProps } from './detailsPage';
import { MemberResponse, useMembersGet } from '../../apis/members';
import { useState } from 'react';
import DetailsViewHeaderControls from '../detailsViewHeaderControls';
import { Tag } from 'antd';
import moment from 'moment';

export default {
  title: 'Components/CrudViews/DetailsView',
  component: GenericDetailsPage,
} as Meta;

const id = '26f7507e-efa3-49eb-aa0c-775668f49370';

const configurableFormProps = {
  id,
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IDetailsPageProps> = args => {
  const [] = useState('');
  const { refetch } = useMembersGet({ lazy: true, queryParams: { id } });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <UiProvider>
          <GenericDetailsPage
            {...args}
            title={data => `Membership Details: ${data?.name} ${data?.surname}`}
            id={id}
            fetcher={useMembersGet}
            formPath="/members/details"
            headerControls={(model: MemberResponse) => (
              <DetailsViewHeaderControls
                items={[
                  {
                    name: 'Date Registered',
                    value: model?.membershipStartDate ? moment(model?.membershipStartDate).format('lll') : null,
                    hide: !model?.membershipStartDate,
                  },
                  { name: 'Status', value: <Tag color="#108ee9">Active</Tag> },
                ]}
              />
            )}
            toolbarItems={[
              {
                title: 'Edit',
                icon: <EditOutlined />,
                onClick: () => console.log('Clicked on configurable form'),
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
