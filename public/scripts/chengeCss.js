(function($) {
	$(document).ready(function() {
		$('table').each(function () {
			$('tr:even',this).addClass('alt');
		});
	});
})(jQuery);
