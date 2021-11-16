import dynamic from "next/dynamic";
import React, { FC } from "react";
import type { IAceEditorProps } from 'react-ace';
import { useMetadata } from "../../../../providers";
import { metadataCodeCompleter } from './codeCompleter';

const aceBaseUrl = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict';

export interface ICodeEditorProps extends IAceEditorProps {

}

const AceEditorNoSsr = dynamic(
    async () => {
        const reactAce = await import("react-ace");

        console.log('configure ace');

        // prevent warning in console about misspelled props name.
        await import("ace-builds/src-noconflict/ext-language_tools");

        // import your theme/mode here. <AceEditor mode="javascript" theme="monokai" />
        await import("ace-builds/src-noconflict/mode-javascript");
        await import("ace-builds/src-noconflict/theme-monokai");

        let ace = require("ace-builds/src-noconflict/ace");
        ace.config.set(
            "basePath",
            aceBaseUrl
        );
        ace.config.setModuleUrl(
            "ace/mode/javascript_worker",
            `${aceBaseUrl}/worker-javascript.js`
        );

        // register completer
        var langTools = ace.require("ace/ext/language_tools");

        langTools.addCompleter(metadataCodeCompleter);

        return reactAce;
    },
    {
        ssr: false // react-ace doesn't support server side rendering as it uses the window object.
    }
);

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
export const AceEditor: FC<IAceEditorProps> = (props) => {
    const meta = useMetadata(false);

    const { editorProps = {}, ...restProps } = props;

    const newEditorProps = { 
        ...editorProps, 
        shaMetadata: meta,
        shaTestData: testCodeItems,
    };

    return (
        <AceEditorNoSsr
            {...restProps}
            editorProps={newEditorProps}
        />
    );
}

export default AceEditor;