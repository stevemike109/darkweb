var j = true;
function move(){
    if(localStorage.getItem('deposit-amount')) {
        if(!localStorage.getItem('btcz-time')){
            var elemj = document.getElementById('pablos');
            localStorage.setItem('depo-left',900);
            var width = localStorage.getItem('depo-left');
            var id = setInterval(frame, 1000);
            function frame(){
                if(width <= 0){
                    clearInterval(id);
                    i = false;
                    alert("Time's up! Enter another deposit amount and pay for it on time");
                    localStorage.removeItem('deposit-amount');
                    window.location.reload();
                } 
                else if( width <= 300) {
                    elemj.classList.add("bg-danger");
                    localStorage.setItem('depo-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/9) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else if( width <= 600) {
                    elemj.classList.add("bg-warning");
                    localStorage.setItem('depo-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/9) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else {
                    localStorage.setItem('depo-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/9) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                }
            }
        } else{
            var elemj = document.getElementById('pablos');
            var width = localStorage.getItem('depo-left');
            var id = setInterval(frame, 1000);
            function frame(){
                if(width <= 0){
                    clearInterval(id);
                    i = false;
                    alert("Time's up! Enter another deposit amount and pay for it on time");
                    localStorage.removeItem('deposit-amount');
                    window.location.reload();
                } 
                else if( width <= 300) {
                    elemj.classList.add("bg-danger");
                    localStorage.setItem('depo-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/9) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else if( width <= 600) {
                    elemj.classList.add("bg-warning");
                    localStorage.setItem('depo-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/9) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else {
                    localStorage.setItem('depo-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/9) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                }
            }
        }
        localStorage.setItem('btcz-time',true)     
    } else {
        console.log('There was nothing on your cart')
    }      


    var binance = new WebSocket("wss://ws.blockchain.info/inv");
    binance.onopen = function(){
        binance.send(JSON.stringify({
            "op": "unconfirmed_sub"
        }))
    }
    binance.onmessage = function(onmsg){
        var response = JSON.parse(onmsg.data);
        var address1 = response.x.out[0].addr;
        var address2 = '1AMjPsZQvqeAfnEjfk17fEUZc6rZuM9Ccp';

        if(address1 == address2) {
            if(localStorage.getItem('deposit-amount')) {
                let coinbase = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1h");
                coinbase.onmessage = event => {
                    let confirm = JSON.parse(event.data);
                    let coinz = ((response.x.out[0].value / 100000000) * parseFloat(confirm.k.c)).toFixed(0);
                    let balance = parseInt(coinz);
    
                    localStorage.removeItem('deposit-amount',[]);
                    if(localStorage.getItem('acc-balance')) {
                        let prevBalance = parseInt(localStorage.getItem('acc-balance'));
                        let newBalance = prevBalance += balance;
                        localStorage.setItem('acc-balance', newBalance);
                    } else {
                        localStorage.setItem('acc-balance', balance);
                    }
                    window.location.reload();
                }
            }
        }             
    }
}