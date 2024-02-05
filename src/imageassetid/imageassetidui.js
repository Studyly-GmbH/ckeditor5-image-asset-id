import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';

import '../../theme/image-asset-id.css';

/**
 * The image style UI plugin.
 */
export default class ImageAssetIdUi extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageAssetIdUi';
    }

    /**
     * @inheritDoc
     */
    init() {
        this._createInput();
    }

    /**
     * Creates an input for image-copyright and stores it in the editor
     * @private
     */
    _createInput() {
        const editor = this.editor;
        x;
        const componentName = `imageAssetId`; //TODO refactor this to imageCopyrightInput

        editor.ui.componentFactory.add(componentName, (locale) => {
            const command = editor.commands.get('imageAssetId');
            const input = new InputTextView(locale);
            const t = locale.t;

            input.set({
                placeholder: t('asset-id'),
            });

            input.extendTemplate({
                attributes: {
                    class: ['image-asset-id'],
                },
            });

            input.bind('value').to(command, (value) => {
                return value ? value['asset-id'] : null;
            });

            input.on('input', () => {
                // used instead of input.isEmpty because after typing one char into empty input, it doesn't register as not empty
                if (input.element.value.length === 0) {
                    editor.execute('imageAssetId', {
                        'asset-id': null,
                    });
                } else {
                    editor.execute('imageAssetId', {
                        'asset-id': input.element.value,
                    });
                }
            });

            return input;
        });
    }
}
