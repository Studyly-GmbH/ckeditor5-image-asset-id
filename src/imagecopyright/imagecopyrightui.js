import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InputTextView from "@ckeditor/ckeditor5-ui/src/inputtext/inputtextview";

import '../../theme/image-copyright.css';

/**
 * The image style UI plugin.
 */
export default class ImageCopyrightUi extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageCopyrightUi';
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
        const componentName = `imageCopyright`; //TODO refactor this to imageCopyrightInput

        editor.ui.componentFactory.add( componentName, locale => {
            const command = editor.commands.get( 'imageCopyright' );
            const input = new InputTextView( locale );
            const t = locale.t;

            input.set( {
                placeholder: t('copyright'),
            } );

            input.extendTemplate({
                attributes: {
                    class: [
                        'image-copyright-input'
                    ]
                }
            })

            input.bind( 'value' ).to( command, (value) => {
                return value ? value['copyright-notice'] : null;
            } );

            input.on('input', () => {
                // used instead of input.isEmpty because after typing one char into empty input, it doesn't register as not empty
                if (input.element.value.length === 0) {
                    editor.execute( 'imageCopyright', {
                        'copyright-notice': null
                    });
                } else {
                    editor.execute('imageCopyright', {
                        'copyright-notice': input.element.value
                    });
                }
            } );

            return input;
        } );
    }
}
