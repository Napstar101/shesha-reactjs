import React from 'react';
import { FC } from 'react';
import { IConfigurableFormComponent } from '../../../../interfaces';
import AceEditor from "./aceEditor";

export interface ICodeEditorProps extends IConfigurableFormComponent {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const CodeEditor: FC<ICodeEditorProps> = (props) => {
    const onChange = (value) => {
        if (props.onChange)
            props.onChange(value);
    }
    return (
        <AceEditor
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
            }} />
    );
}

export default CodeEditor;