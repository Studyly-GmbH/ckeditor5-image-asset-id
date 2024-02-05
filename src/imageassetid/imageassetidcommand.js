import Command from '@ckeditor/ckeditor5-core/src/command';
/**
 * The image resize command. Currently, it supports both the width and the height attributes.
 */
export default class ImageAssetIdCommand extends Command {
    constructor(editor) {
        super(editor);
        this.value = null;
    }

    init() {
        this.refresh();
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const imageUtils = this.editor.plugins.get('ImageUtils');
        const element =
            this.editor.model.document.selection.getSelectedElement();
        this.isEnabled = imageUtils.isImage(element);

        let copyrightNotice = this.getCopyrightNotice(element);

        if (copyrightNotice) {
            this.value = {
                'copyright-notice': copyrightNotice,
            };
        } else {
            this.value = null;
        }
    }

    getCopyrightNotice(element) {
        let copyright = null;
        if (element && element.hasAttribute('copyright-notice')) {
            copyright = element.getAttribute('copyright-notice');
        }
        return copyright;
    }

    /**
     * Executes the command.
     * @param {Object} options
     * @param {String|null} options['max-width'] The max-width of the image.
     */
    execute(options) {
        const model = this.editor.model;
        const imageElement = model.document.selection.getSelectedElement();

        model.change((writer) => {
            if (options['copyright-notice']) {
                writer.setAttribute(
                    'copyright-notice',
                    options['copyright-notice'],
                    imageElement
                );
            } else {
                writer.removeAttribute('copyright-notice', imageElement);
            }
        });

        this.refresh();
    }
}
