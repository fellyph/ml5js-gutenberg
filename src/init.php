<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Hook: editor assets.
function products_editor_assets() {
    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . '../build/index.asset.php');

	// Scripts.
	wp_register_script(
		'products-block-js', // Handle.
        plugins_url( 'build/index.js', dirname( __FILE__ ) ),
        $asset_file['dependencies'],
		$asset_file['version']
    );
    
    register_block_type( 'gutenberg-examples/products-block-js', array(
		'editor_script' => 'products-block-js',
	) );
}

add_action( 'init', 'products_editor_assets' );

// Hook: Front-end assets.
function frontend_assets() {
    wp_register_script(
		'product-frontend-js', // Handle.
        plugins_url( 'build/frontend.js', dirname( __FILE__ ) )
    );

	wp_enqueue_script('product-frontend-js');
    wp_enqueue_script('p5', '//cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js' );
    wp_enqueue_script('p5_dom', '//cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js' );
	wp_enqueue_script('ml5js', '//unpkg.com/ml5@0.3.1/dist/ml5.min.js' );
}
add_action( 'wp_enqueue_scripts', 'frontend_assets' );