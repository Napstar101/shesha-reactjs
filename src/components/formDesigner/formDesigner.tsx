import React, { FC, useState } from 'react';
import { SidebarContainer } from '../../components';
import { Row, Col } from 'antd';
import { FormDto } from '../../apis/form';
import Toolbox from './toolbox';
import FormDesignerToolbar from './formDesignerToolbar';
import ComponentPropertiesPanel from './componentPropertiesPanel';
import ComponentPropertiesTitle from './componentPropertiesTitle';
import { useForm } from '../../providers/form';
import { ConfigurableFormRenderer } from '../../components';
import { FormDesignerHeader } from './formDesignerHeader';
import { MetadataProvider } from '../../providers';
import ConditionalWrap from '../conditionalWrapper';

export interface IFormDesignerProps {
  model?: FormDto;
}

export const FormDesigner: FC<IFormDesignerProps> = ({ }) => {
  const [widgetsOpen, setWidgetOpen] = useState(true);
  const [fieldPropertiesOpen, setFieldPropertiesOpen] = useState(true);

  const toggleWidgetSidebar = () => setWidgetOpen(widget => !widget);

  const toggleFieldPropertiesSidebar = () => setFieldPropertiesOpen(prop => !prop);

  const [formValues, setFormValues] = useState({});
  const { isDebug, formSettings } = useForm();

  return (
    <div className="sha-form-designer">
      <ConditionalWrap
        condition={Boolean(formSettings.modelType)}
        wrap={content => (
          <MetadataProvider
            id='designer'
            modelType={formSettings.modelType}
          >
            {content}
          </MetadataProvider>
        )}
      >
        <SidebarContainer
          leftSidebarProps={{
            open: widgetsOpen,
            onOpen: toggleWidgetSidebar,
            onClose: toggleWidgetSidebar,
            title: 'Builder Widgets',
            content: () => <Toolbox></Toolbox>,
            placeholder: 'Builder Widgets',
          }}
          rightSidebarProps={{
            open: fieldPropertiesOpen,
            onOpen: toggleFieldPropertiesSidebar,
            onClose: toggleFieldPropertiesSidebar,
            title: () => <ComponentPropertiesTitle />,
            content: () => <ComponentPropertiesPanel />,
            placeholder: 'Properties',
          }}
          header={() => <FormDesignerToolbar />}
        >
          <FormDesignerHeader />
          <ConfigurableFormRenderer
            onValuesChange={(_changedValues, allvalues) => {
              setFormValues(allvalues);
            }}
          >
            {isDebug && (
              <>
                <Row>
                  <Col span={24}>
                    <pre>{JSON.stringify(formValues)}</pre>
                  </Col>
                </Row>
              </>
            )}
          </ConfigurableFormRenderer>
        </SidebarContainer>
      </ConditionalWrap>
    </div>
  );
};

export default FormDesigner;
