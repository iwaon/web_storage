/*
 * save to web storage when form data changes
 * read from web storage when form is loaded
 */

$(function () {
	// save to web storage when form data changes
	$('#form_inquiry input:text, #form_inquiry textarea').on('input', function (e) {
		let name = $(this).attr('name')
		if (!name) {
			return true
		}
		let val = $(this).val()
		console.log('input event - ' + $(this).prop('tagName') + ', ' + name + ', ' + val)
		localStorage.setItem(name, val)
	});

	$("#form_inquiry input:radio").on('change', function (e) {
		let name = $(this).attr('name')
		if (!name) {
			return true
		}
		let val = $(this).val()
		console.log('change event - ' + $(this).prop('tagName') + ', ' + name + ', ' + val)
		localStorage.setItem(name, val)
	});

	$('#form_inquiry input:checkbox').on('change', function (e) {
		let name = $(this).attr('name')
		if (!name) {
			return
		}
		let val = $('#form_inquiry input:checkbox[name="' + name + '"]:checked').map(function () {
			return $(this).val();
		}).get();
		let data = JSON.stringify(val)
		console.log('change event - ' + $(this).prop('tagName') + ', ' + name + ', ' + val + ', ' + data)
		localStorage.setItem(name, data)
	});

	// read from web storage when form is loaded
	for (key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			// console.log("key", key)
			let elem = $('#form_inquiry [name="' + key + '"]')
			if (elem.length == 0) {
				continue
			}

			let val = localStorage.getItem(key)
			if (!val) {
				continue
			}

			switch (elem.prop('tagName')) {
				case 'INPUT':
					switch (elem.prop('type')) {
						case 'text':
						case 'hidden':
							console.log('set - ' + elem.prop('tagName') + ', ' + elem.prop('type') + ', ' + key + ', ' + val)
							$('#form_inquiry input[name="' + key + '"]').val(val)
							break
						case 'radio':
							console.log('set - ' + elem.prop('tagName') + ', ' + elem.prop('type') + ', ' + key + ', ' + [val])
							$('#form_inquiry input[name="' + key + '"]').val([val])
							// a key that needs to triggers a change event
							if (key == "Q2-1") {
								$('input[name=Q2-1]:checked').change()
							}
							break
						case 'checkbox':
							let parsedVal = JSON.parse(val)
							console.log('set - ' + elem.prop('tagName') + ', ' + elem.prop('type') + ', ' + key + ', ' + parsedVal)
							$('#form_inquiry input[name="' + key + '"]').val(parsedVal)
							break
						default:
							console.log('no set - ' + elem.prop('tagName') + ', ' + elem.prop('type') + ', ' + key + ', ' + val)
							continue
					}
					break
				case 'TEXTAREA':
					console.log('set - ' + elem.prop('tagName') + ', ' + key + ', ' + val)
					$('#form_inquiry textarea[name="' + key + '"]').val(val)
					break
				default:
					continue
			}
		}
	}
});
