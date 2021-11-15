import dynamic from "next/dynamic";
import React, { FC } from "react";
import type { IAceEditorProps } from 'react-ace';

const aceBaseUrl = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict';

const AceEditorRenderer = dynamic(
    async () => {
        const reactAce = await import("react-ace");

        // prevent warning in console about misspelled props name.
        await import("ace-builds/src-noconflict/ext-language_tools");

        // import your theme/mode here. <AceEditor mode="javascript" theme="solarized_dark" />
        await import("ace-builds/src-noconflict/mode-javascript");
        await import("ace-builds/src-noconflict/theme-solarized_dark");

        // todo: embed Ace into the library or add a setting for baseUrl, by this way the developer is able to use cdn or local copy
        // as @Holgrabus commented you can paste these file into your /public folder.
        // You will have to set basePath and setModuleUrl accordingly.
        let ace = require("ace-builds/src-min-noconflict/ace");
        ace.config.set(
            "basePath",
            aceBaseUrl
        );
        ace.config.setModuleUrl(
            "ace/mode/javascript_worker",
            `${aceBaseUrl}/worker-javascript.js`
        );

        return reactAce;
    },
    {
        ssr: false // react-ace doesn't support server side rendering as it uses the window object.
    }
);


export const AceEditor: FC<IAceEditorProps> = (props) => {
    return (
        <AceEditorRenderer
            {...props}
        />
    );
}

export default AceEditor;