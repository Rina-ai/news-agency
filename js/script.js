$(document).ready(function(){
	const SAIT_FIXER = 'http://data.fixer.io/api/latest',  
		KEY_API = '4f29b79cca06eb7cd6d859f5cd49141c', 
		currencyEl = $('.js-currency'),
		dateTimeHeaderUp = $('.js-black-bar'),
		dateTimeHeaderDown = $('.js-header-info'),
		burgerBtn = $('.js-menu-btn'),
		body = $('body');

	$(body).removeClass('no-js');

//курс вылют
	$.get(SAIT_FIXER, {'access_key': KEY_API}, function(response){
		const USD = (response.rates.USD),
			RUB = (response.rates.RUB),
			EUR = (response.rates.EUR),

			dollar = (RUB/USD).toFixed(2),
			euro = (RUB/EUR).toFixed(2);

		if (dollar && euro) {
			$('.js-USD').remove();
			$('.js-EUR').remove();

			currencyEl.append(` 
				<table class="currency-table">
					<tbody>
						<tr class="USD js-USD">
							<td class="currency-td icon-USD">USD</td>
							<td class="currency-td">${dollar}</td>
						</tr>
						
						<tr class="EUR js-EUR">
							<td class="currency-td icon-EUR">EUR</td>
							<td class="currency-td">${euro}</td>
						</tr>
					</tbody>
				</table>
			`);
		}
	});

//дата и время
	const tzoffset = (new Date()).getTimezoneOffset() * 60000, 
		atrDateTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8),
		dateTime = new Date().toLocaleString('ru', {month:'numeric', day:'numeric', year:'numeric', hour: 'numeric', minute: 'numeric'}).split(', ').reverse().join(' '),
 		date = new Date().toLocaleString('ru', {month:'long', day:'numeric', weekday: 'short'}).split(', ').reverse().join(', '),
 		time = new Date().toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});
		
 		dateTimeHeaderUp.append(`
     		<time class="datetime js-datetime" datetime="${atrDateTime}">
   				${dateTime}
    		</time>`
     	);

 		dateTimeHeaderDown.prepend(` 
			<time class="date js-date" datetime="${atrDateTime}">${date}
				<span class="time">${time}</span> 
			</time>
		`);

// меню бургер
	$(burgerBtn).on('click', function(e){
		e.preventDefault();
		$(this).closest('.js-menu').toggleClass('menu-open');

		if ($(this).attr('aria-label') === 'Открыть меню-бургер') {
			($(this).attr('aria-label', 'Закрыть меню-бургер'))
		}
		else 
			($(this).attr('aria-label', 'Открыть меню-бургер'))
	});
});