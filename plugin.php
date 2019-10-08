<?php
/**
 * Plugin Name: Product classifier
 * Author: Fellyph
 * Version: 1.0.0
 */
 
function loadMyBlock() {
  wp_enqueue_script(
    'product-classifier',
    plugin_dir_url(__FILE__) . 'test-block.js',
    array('wp-blocks','wp-editor'),
    true
  );
}
  
add_action('enqueue_block_editor_assets', 'loadMyBlock');