
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'gutenberg-examples/products-block-js', {
	title: __( 'Product classifier' ),
	icon: 'camera',
	category: 'common',
	keywords: [
		__( 'Machine learning' ),
		__( 'Product classifier' ),
		__( 'ML5.js' ),
	],

	edit: () => {
		return (
			<div>
				<h2>{ __( 'Product classifier' ) }</h2>
			</div>
		);
	},

	save: () => {
		return (
			<div className="product-classifier"></div>
		);
	},
} );s