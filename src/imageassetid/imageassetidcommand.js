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

        let assetId = this.getImageAssetId(element);

        if (assetId) {
            this.value = {
                'asset-id': assetId,
            };
        } else {
            this.value = null;
        }
    }

    getImageAssetId(element) {
        let assetId = null;
        if (element && element.hasAttribute('asset-id')) {
            assetId = element.getAttribute('asset-id');
        }
        return assetId;
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
            if (options['asset-id']) {
                writer.setAttribute(
                    'asset-id',
                    options['asset-id'],
                    imageElement
                );
            } else {
                writer.removeAttribute('asset-id', imageElement);
            }
        });

        this.refresh();
    }
}
