import React from 'react';
import { FC } from 'react';
import { IConfigurableFormComponent } from '../../../../interfaces';
import { useMetadata } from '../../../../providers';
import { CodeEditor as BaseCodeEditor } from "../../../..";

export interface ICodeEditorProps extends IConfigurableFormComponent {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

// import type { IAceEditorProps } from 'react-ace';
// @ts-ignore
const testCodeItems: ICodeTreeLevel = {
    data: {
        value: 'data',
        caption: 'Current form fields',
        loaded: false,
        childs: {
            Person: {
                value: 'Person',
                caption: 'Current person',
                loaded: true,
                childs: {
                    Address: {
                        value: 'Address',
                        caption: 'Person Address',
                        loaded: false
                    },
                    FirstName: {
                        value: 'FirstName',
                        loaded: false
                    },
                    LastName: {
                        value: 'LastName',
                        loaded: false
                    },
                }
            }
        }
    }
};

export const CodeEditor: FC<ICodeEditorProps> = (props) => {
    const onChange = (value) => {
        if (props.onChange)
            props.onChange(value);
    }
    const meta = useMetadata(false);

    //const { editorProps = {}, ...restProps } = props;

    const editorProps = {
        shaMetadata: meta,
        shaTestData: testCodeItems,
    };

    return (
        <BaseCodeEditor
            name={props.id}
            placeholder={props.placeholder}
            mode="javascript"
            theme="monokai"

            //onLoad={onLoad}
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={props.value}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                autoScrollEditorIntoView: true,
                minLines: 3,
                maxLines: 100
            }}
            editorProps={editorProps}
        />
    );
}

export default CodeEditor;