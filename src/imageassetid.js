import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageAssetIdEditing from './imageassetid/imageassetidediting';
import ImageAssetIdUi from './imageassetid/imageassetidui';

export default class ImageAssetId extends Plugin {
    static get requires() {
        return [ImageAssetIdEditing, ImageAssetIdUi];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageAssetId';
    }
}
