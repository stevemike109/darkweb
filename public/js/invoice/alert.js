auth.onAuthStateChanged(user => {
	"use strict";
	var toast = localStorage.getItem('banktotal');
	let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
	var toastbitcoin = '';
	ws.onmessage = (event) => {
		let stockObject = JSON.parse(event.data);
		toastbitcoin = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
	}



    var i = -1;
	var $toastlast;

	var getMessage = function() {
        if(localStorage.getItem('acc-balance')) {
			var toast2 = localStorage.getItem('acc-balance');
			if(toast2 > toast) {
				for (var i = 0; i < items.length; i++) {
					var msgs = [`
						Your account balance of $${localStorage.getItem('acc-balance')} is enough to complete the download.
						<hr class="to-hr">
						Deposit an extra $100 that will be left in your account to purchase bank logs later on.
					`];
					i++;
					if (i === msgs.length) {
						i = 0;
					}
					return msgs[i];
				}
			} else {
				for (var i = 0; i < items.length; i++) {
					var msgs = [`
						Your account balance of $${localStorage.getItem('acc-balance')} is insufficient to complete the download.
						<hr class="to-hr">
						Top up your account balance on the deposit page and use the funds 
						in your account to purchase bank logs on this darkweb store.
					`];
					i++;
					if (i === msgs.length) {
						i = 0;
					}
					return msgs[i];
				}
			}
        } else {
            for (var i = 0; i < items.length; i++) {
                var msgs = [`
                    Your account balance of $0 is insufficient to complete the download.
                    <hr class="to-hr">
                    Top up your account balance on the deposit page and use the funds 
                    in your account to purchase bank logs on this darkweb store.
                `];
                i++;
                if (i === msgs.length) {
                    i = 0;
                }
                return msgs[i];
            }
        }
	};

	var toastbut = document.getElementById('anon-check');

	$(toastbut).click(function() {
		var shortCutFunction = 'success';
		var msg = '';
		var title = '';
		toastr.options = {
			closeButton: true,
			debug: false,
			newestOnTop: true,
			progressBar: true,
			positionClass: 'toast-top-full-width',
			preventDuplicates: true,
			onclick: null
		};
		if (!msg) {
			msg = getMessage();
		}
		var $toast = toastr[shortCutFunction](msg, title);
		$toastlast = $toast;
	});

});