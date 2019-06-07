
				$(".dropdown dt a").on('click', function () {
					$(".dropdown dd ul").slideToggle('fast');
				});

				$(".dropdown dd ul li a").on('click', function () {
					$(".dropdown dd ul").hide();
				});

				function getSelectedValue(id) {
					return $("#" + id).find("dt a span.value").html();
				}

				$(document).bind('click', function (e) {
					var $clicked = $(e.target);
					if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
				});

				$('.mutliSelect input[type="checkbox"]').on('click', function () {
					var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
						title = $(this).val() + ",";

					if ($(this).is(':checked')) {
						var html = '<span title="' + title + '">' + title + '</span>';
						$('.multiSel').append(html);
						$(".hida").hide();
					} else {
						$('span[title="' + title + '"]').remove();
						var ret = $(".hida");
						$('.dropdown dt a').append(ret);
					}
				});


				$(function () {
					$('.dropdown-menu li').on('click', function (event) {
						var $checkbox = $(this).find('.checkbox');
						if (!$checkbox.length) {
							return;
						}
						var $input = $checkbox.find('input');
						var $icon = $checkbox.find('span.glyphicon');
						if ($input.is(':checked')) {
							$input.prop('checked', false);
							$icon.removeClass('glyphicon-check').addClass('glyphicon-unchecked')
						} else {
							$input.prop('checked', true);
							$icon.removeClass('glyphicon-unchecked').addClass('glyphicon-check')
						}
						return false;
					});
				});
