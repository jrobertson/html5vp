var player;
var prevHighlight;
var time_pair;
var j = 0, k = 0; // j = a3 counter, and k = menu counter

function initData(){
  dynarexDataIsland.init();
  loadFunctionTimes();
  setEventListener();
}

function loadFunctionTimes(){
  obj = document.element("//object[@id='slides']")
  var a = obj.dynarex.records.map(function(item){ return item.get('time'); });

  a2 = a.inject([], function(r2,x2){
    r3 = o(2).times().inject([x2.to_f()],function(r,x){
      return r.concat(r.last().to_f() - 0.5)
    });
    return r2.concat(r3.reverse());
  });

  a2.push(o(a2.last().to_n() + 4));

  a3 = a.map().with_index().inject([], function(r,x){
    var i = x.last().to_s();
    r.push( {call: function() { motion_pause();   }});
    r.push( {call: function() { menu_highlight(k); k++; }});
    r.push( {call: function() { caption();        }});
    return r;
  });

  time_pair = a2.each_cons(2).to_a();
}

function setEventListener(){
    li = document.element('//ol/li[1]');
    player = document.getElementById('player');
    player.addEventListener('timeupdate', function(){
      var t = player.currentTime;

      if (time_pair.any_q() == true){

        var pair = time_pair.first();
        var x = pair.first().to_f(), y = pair.last().to_f();

        if (t >= x && t < y) {             
          time_pair.shift();
          a3.at(j).call();
          j++;
        }
      }

    }, true);
    /*player.addEventListener('ended', function(){alert('it is over');}, true);*/
}

function menuVisible(){
  document.element("//div[@id='caption']").set_attribute('class', 'hidden');
  document.element("//div[@id='menu']").set_attribute('class', '');
}

function highlight(obj){
  if (obj != nil) {
    obj.set_attribute('class','high')  
    if (typeof prevHighlight != 'undefined' && prevHighlight != nil) {
      prevHighlight.set_attribute('class',''); 
    }
    prevHighlight = obj;
  }
}

function motion_pause(i){ player.pause(); }

function menu_highlight(i) {
  var a = document.xpath('//ol/li');

  menuVisible();

  if (i >= 0) {
    highlight(a.at(i));
    location.href = '#a' + o(i + 1).to_s();
    player.pause();
  }

}

function caption(i){
  document.element("//div[@id='menu']").set_attribute('class', 'hidden');
  document.element("//div[@id='caption']").set_attribute('class', 'visible');
  player.pause();
}