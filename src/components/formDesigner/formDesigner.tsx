import React, { FC, useEffect, useState, Suspense } from 'react';
import { SidebarContainer } from '../../components';
import { Row, Col, Form } from 'antd';
import { FormDto } from '../../apis/form';
import Toolbox from './toolbox';
import FormDesignerToolbar from './formDesignerToolbar';
import ComponentPropertiesPanel from './componentPropertiesPanel';
import ComponentPropertiesTitle from './componentPropertiesTitle';
import { useForm } from '../../providers/form';
import { ConfigurableFormRenderer } from '../../components';
import { FormDesignerHeader } from './formDesignerHeader';
import { Skeleton } from 'antd';

const DynamicJsonView = React.lazy(() => import('react-json-view'));
const JsonView = props => {
  return (
    <Suspense fallback={<Skeleton loading={true}></Skeleton>}>
      <DynamicJsonView {...props}></DynamicJsonView>
    </Suspense>
  );
};

export interface IFormDesignerProps {
  model?: FormDto;
}

export const FormDesigner: FC<IFormDesignerProps> = ({}) => {
  const [widgetsOpen, setWidgetOpen] = useState(true);
  const [fieldPropertiesOpen, setFieldPropertiesOpen] = useState(true);

  const toggleWidgetSidebar = () => setWidgetOpen(widget => !widget);

  const toggleFieldPropertiesSidebar = () => setFieldPropertiesOpen(prop => !prop);

  const [formValues, setFormValues] = useState({});
  const { isDebug, actions } = useForm();

  const [propertiesForm] = Form.useForm(); // todo: review usage of this form
  const { selectedComponentId } = useForm();
  useEffect(() => {
    propertiesForm.resetFields();
  }, [selectedComponentId]);

  return (
    <div className="sha-form-designer">
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
          title: () => <ComponentPropertiesTitle form={propertiesForm}></ComponentPropertiesTitle>,
          content: () => <ComponentPropertiesPanel form={propertiesForm}></ComponentPropertiesPanel>,
          placeholder: 'Properties',
        }}
        header={() => <FormDesignerToolbar></FormDesignerToolbar>}
      >
        <FormDesignerHeader></FormDesignerHeader>
        <ConfigurableFormRenderer
          onValuesChange={(_changedValues, allvalues) => {
            setFormValues(allvalues);
          }}
        >
          {isDebug && (
            <>
              <Row>
                <Col span={24}>
                  <JsonView src={actions}></JsonView>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <JsonView src={formValues}></JsonView>
                </Col>
              </Row>
            </>
          )}
        </ConfigurableFormRenderer>
      </SidebarContainer>
    </div>
  );
};

export default FormDesigner;
