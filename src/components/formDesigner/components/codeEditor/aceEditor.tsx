import dynamic from "next/dynamic";
import React, { FC } from "react";
import type { IAceEditorProps } from 'react-ace';
import { Ace } from 'ace-builds';
import { metadataCodeCompleter } from './codeCompleter';

const aceBaseUrl = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict';

const AceEditorRenderer = dynamic(
    async () => {
        const reactAce = await import("react-ace");

        // prevent warning in console about misspelled props name.
        await import("ace-builds/src-noconflict/ext-language_tools");

        // import your theme/mode here. <AceEditor mode="javascript" theme="monokai" />
        await import("ace-builds/src-noconflict/mode-javascript");
        await import("ace-builds/src-noconflict/theme-monokai");

        // todo: embed Ace into the library or add a setting for baseUrl, by this way the developer is able to use cdn or local copy
        // as @Holgrabus commented you can paste these file into your /public folder.
        // You will have to set basePath and setModuleUrl accordingly.
        let ace = require("ace-builds/src-noconflict/ace");
        ace.config.set(
            "basePath",
            aceBaseUrl
        );
        ace.config.setModuleUrl(
            "ace/mode/javascript_worker",
            `${aceBaseUrl}/worker-javascript.js`
        );
        var langTools = ace.require("ace/ext/language_tools");
        /*
        var rhymeCompleter = {
            getCompletions: function (_editor, _session, _pos, prefix, callback) {
                if (prefix.length === 0) { callback(null, []); return }
                fetch("https://rhymebrain.com/talk?function=getRhymes&word=" + prefix, {

                })
                    .then(response => response.json())
                    .then(wordList => {
                        // wordList like [{"word":"flow","freq":24,"score":300,"flags":"bc","syllables":"1"}]
                        callback(null, wordList.map(function (ea) {
                            return { name: ea.word, value: ea.word, score: ea.score, meta: "rhyme" }
                        }));
                    });
            }
        }
        langTools.addCompleter(rhymeCompleter);
        */

        /*
        // data stub:
        const sqlTables = [
            { name: 'users', description: 'Users in the system' },
            { name: 'userGroups', description: 'User groups to which users belong' },
            { name: 'customers', description: 'Customer entries' },
            { name: 'companies', description: 'Legal entities of customers' },
            { name: 'loginLog', description: 'Log entries for user log-ins' },
            { name: 'products', description: 'Products offered in the system' },
            { name: 'productCategories', description: 'Different product categories' },
        ];

        const sqlTablesCompleter = {
            identifierRegexps: [/[a-zA-Z_0-9.$-u00A2-uFFFF]/],
            getCompletions: (
                _editor: Ace.Editor,
                _session: Ace.EditSession,
                _pos: Ace.Point,
                _prefix: string,
                callback: Ace.CompleterCallback
            ): void => {
                callback(
                    null,
                    sqlTables.map((table) => ({
                        caption: `${table.name}: ${table.description}`,
                        value: table.name,
                        meta: 'Table',
                    } as Ace.Completion))
                );
            },
        };
        langTools.addCompleter(sqlTablesCompleter);
        */

        langTools.addCompleter(metadataCodeCompleter);

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