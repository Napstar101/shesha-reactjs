import { Ace } from 'ace-builds';

/**
 * Gets token at current cursor posistion. Returns null if none
 */
function getCurrentToken(editor) {
    try {
        var pos = editor.getSelectionRange().end;
        return editor.session.getTokenAt(pos.row, pos.column);
    }
    catch (ex) {
        console.error(ex);
    }
}

export interface ICodeTreeItem {
    value: string;
    caption?: string;
    loaded: boolean;

    childs?: ICodeTreeLevel;
}

export interface ICodeTreeLevel {
    [key: string]: ICodeTreeItem;
}
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

const treeLevel2Completions = (level: ICodeTreeLevel, prefix: string = ''): Ace.Completion[] => {
    const completions: Ace.Completion[] = [];
    for (let key in level) {
        const item = level[key];
        completions.push({
            caption: prefix + item.value,
            value: prefix + item.value,
            meta: item.caption,
            score: 1,
        });
    }

    return completions;
}

export const metadataCodeCompleter = {
    identifierRegexps: [/[a-zA-Z_0-9.$-u00A2-uFFFF]/],
    getCompletions: (
        editor: Ace.Editor,
        _session: Ace.EditSession,
        _pos: Ace.Point,
        prefix: string,
        callback: Ace.CompleterCallback
    ): void => {
        const token = getCurrentToken(editor);
        console.log({ _prefix: prefix, token });

        if (prefix && prefix.endsWith('.')) {
            const parts = prefix.split('.');
            let currentLevel: ICodeTreeLevel = testCodeItems;

            let currentItem: ICodeTreeItem = null;
            do {
                const part = parts.shift();
                if (part === '' && parts.length == 0)
                    break;
                currentItem = currentLevel
                    ? currentLevel[part]
                    : null;
                if (currentItem)
                    currentLevel = currentItem.childs;
                // todo: load if chlids are not loaded yet
            } while (parts.length > 0 && currentItem)

            if (Boolean(currentLevel) && parts.length == 0) {
                const completions = treeLevel2Completions(currentLevel, prefix);

                console.log({ completions });
                callback(null, completions);
            }
        } else {
            const completions = treeLevel2Completions(testCodeItems);
            callback(null, completions);
        }
    },
};

export default metadataCodeCompleter;