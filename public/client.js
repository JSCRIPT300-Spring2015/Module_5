$(function () {

	'use strict';

    /*
     * QUESTION:  I wanted to add underscore here in order to use
     * _.sortBy to display trucks in alpha order, but I got the 
     * RefError 'require is not defined'.  What am I doing wrong?
     *
     * var _ = require('underscore');    
     */
    
	var foodTypes = [];

	$.get('/trucks', function (truckList) {

        /*
         * This is where I wanted to sort but couldn't get
         * my require statement above to work
         *
         *  // Sort truckList, case-insensitive (from stackoverflow)
         *  truckList = _.sortBy(truckList, function (i) { return i.name.toLowerCase(); });
         */
        
		var list = [];
		if (truckList) {
			truckList.forEach(function (truck) {
				list.push('<li><li><span class="delete_link" data-truck="' + truck._id + '">X</span><a href="/trucks/' + truck._id + '">' + truck.name + '</a></li>');
			});
			$('.trucks-list').append(list);
		}
	});

	$('form').on('submit', function (e) {

		e.preventDefault();
		var $form = $(this);
console.log(foodTypes);
		var truckData = {
			name: $('[name=name]').val(),
			foodType: foodTypes,
			schedule: getSchedule(),
			description: $('[name=description]').val(),
			payment: getPaymentTypes(),
			website: $('[name=website]').val(),
			Facebook: $('[name=Facebook]').val(),
			Twitter: $('[name=Twitter]').val()
		};

        $.ajax({
			method: 'POST',
			url: '/trucks',
			data: truckData
		})
		.done(function (truck) {
			var list = [];
			list.push('<li><span class="delete_link" data-truck="' + truck._id + '">X</span><a href="/trucks/' + truck._id + '">' + truck.name + '</a></li>');
			$('.trucks-list').append(list);
			$form.trigger('reset');
		});
	});

	function getPaymentTypes() {
		var types = [];

		$('[name=payment]').each(function () {
			if (this.checked) {
				types.push(this.value);
			}
		});

		return types;
	}

	function getSchedule() {
		var schedule = [];

		$('[name=schedule]').each(function () {
			if (this.checked) {
				schedule.push(this.value);
			}
		});

		return schedule;
	}

	function addFoodType(type) {

		foodTypes.push(type);
		$('.foodType-list').append('<li>' + type + '</li>');
		$('[name=type]').val('');
	}

	$('[name=type').on('keypress', function (e) {
		if (e.which === 13) {
			e.preventDefault();
			addFoodType($(this).val());
		}
	});

	$('#addFoodType').on('click', function (e) {
		var foodType = $('[name=type]').val();

		addFoodType(foodType);
	});

	$('#clearFoodTypes').on('click', function (e) {
		$('.foodType-list').empty();
	});

	$('.trucks-list').on('click', '[data-truck]', function (e) {
		if (!confirm('Remove food truck?')) {
			return false;
		}
		var $target = $(e.currentTarget);

		$.ajax({
			method: 'DELETE',
			url: '/trucks/' + $target.data('truck'),
		})
		.done(function () {
			$target.closest('li').remove();
		});
	});
});