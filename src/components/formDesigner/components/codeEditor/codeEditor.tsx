import React, { useMemo } from 'react';
import { FC } from 'react';
import { IConfigurableFormComponent } from '../../../../interfaces';
import { useMetadata } from '../../../../providers';
import { CodeEditor as BaseCodeEditor } from "../../../..";
import { ICodeTreeLevel } from '../../../codeEditor/codeCompleter';
import { IPropertyMetadata } from '../../../../interfaces/metadata';

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
    const meta = useMetadata(false);

    //const { editorProps = {}, ...restProps } = props;

    const metaItems = useMemo<ICodeTreeLevel>(() => {
        if (!Boolean(meta?.metadata))
            return null;

        const propsToLevel = (properties: IPropertyMetadata[]): ICodeTreeLevel => {
            const result: ICodeTreeLevel = {};
            properties.forEach(p => {
                result[p.path] = {
                    value: p.path,
                    caption: p.label,
                    loaded: true,
                }
            });
            return result;
        }

        const metaTree: ICodeTreeLevel = {
            data: {
                value: 'data',
                caption: meta.metadata.name,
                loaded: true,
                childs: propsToLevel(meta.metadata.properties),
            }
        };
        return metaTree;
    }, [meta]);

    const editorProps = {
        shaMetadata: metaItems,
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