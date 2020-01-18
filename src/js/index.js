
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	TextControl
} from '@wordpress/components';

registerBlockType( 'gutenberg-examples/products-block-js', {
	title: __( 'Product classifier' ),
	icon: 'camera',
	category: 'common',
	keywords: [
		__( 'Machine learning' ),
		__( 'Product classifier' ),
		__( 'ML5.js' ),
	],
	attributes: {
		modelURL: {
			type: 'string',
			default: 'https://teachablemachine.withgoogle.com/models/04E46ktU/'
		}
	},
	edit: ({ attributes, setAttributes}) => {
		const { modelURL } = attributes;

		return (
			<div>
				<h2>{ __( 'Import Model' ) }</h2>
				<TextControl
					value={ modelURL }
					onChange={ ( newModel ) => {
						setAttributes( { modelURL: newModel } );
					} }
					label={ __( 'Add here the model url' ) } />
			</div>
		);
	},

	save: (attributes) => {
		const {modelURL} = attributes;
		return (
			<div className="product-classifier" data-url={modelURL}></div>
		);
	},
} );