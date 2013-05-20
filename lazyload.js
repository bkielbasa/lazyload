var lazy_loading = new function() {
  this.update = function() {
		lazy_loading.lazy_load_images();
		lazy_loading.lazy_load_youtube();
	},
	
    this.lazy_load_images = function() 
    {
    	jQuery.each(jQuery('a.lazyload'), function(index, image){
    		if (!lazy_loading.is_on_the_screen(image)) {
    			return;
    		}
    		
    		image = jQuery(image);
    		image.attr('src', image.attr('data-src'));
    	});
    },
    
    this.lazy_load_youtube = function()
    {
    	jQuery.each(jQuery('a.lazyload-youtube'), function(index, image){
    		if (!lazy_loading.is_on_the_screen(image)) {
    			return;
    		}
    		
    		var embedparms = jQuery(this).attr("href").split("?v=")[1].replace(/\&/,'?');
    		var emu = 'http://www.youtube.com/embed/'+embedparms;
    	    var youtube_id = embedparms.split("?")[0];
    		
    		var html = '<iframe width="" height="" src=' + emu + '  frameborder="0" allowfullscreen></iframe>';
    	    
    		jQuery(this).replaceWith(html);
    	});
    }
    
    this.is_on_the_screen = function(elem)
    {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();

        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
}

jQuery(document).ready(function(){
	jQuery(document).scroll(lazy_loading.update);
	lazy_loading.update();
});
