firebase.auth().onAuthStateChanged(function(user){
  if(user){
      //user is signed in
  }else{
      window.location.assign("index.html");
  }
});

/*function waitTime(){
  var delayInMilliseconds = 2000;
  setTimeout(function() {
    con();
  }, delayInMilliseconds);
}*/

function logout(){
    //window.location.replace("index.html");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        Cookies.remove('name');
        Cookies.remove('position');
        alert("Signed Out");
        window.location.assign("index.html");

      }).catch((error) => {
        // An error happened.
        alert(error);
      });
  }

 /*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


  var adminId;
  var adminName;
  var position;

  function getUserId(){
    console.log("user id");
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          console.log("2");
          adminId = user.uid;
          console.log(adminId);
          resolve(user.uid);
        }
        else{
          console.log(error);
        }
      })
    })
  }
  
  function getUserDetails(){
    console.log("user details");
    return new Promise((resolve, reject) => {
        console.log(adminId);
        var adminNameC = Cookies.get('name');
        var positionC = Cookies.get('position');
        if(typeof adminNameC != "undefined" || typeof positionC != "undefined"){
          console.log("cokkies present");
          adminName = adminNameC;
          position = positionC;
          resolve(adminName, position);
        }
        else{
          console.log("inside name fetch");
          var ref = firebase.database().ref("Users/" + adminId);
          ref.once("value")
          .then(function(snapshot) {
          adminName = snapshot.child("name").val();
          position = snapshot.child("position").val();
          console.log("Hi");
          Cookies.set('name', adminName);
          Cookies.set('position', position);
          resolve(adminName, position);
        })
      }
        
    })
  }

    function showUserDetails(){
        console.log(adminName);
        console.log(position);
        document.getElementById("name-tag").innerHTML = adminName;
        document.getElementById("name-desc").innerHTML = position;
        var initials = adminName.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
        console.log(initials);
        document.getElementById("initial").innerHTML = initials;
    }

  
    async function nameTag(){
      await getUserId();
      await getUserDetails();
      showUserDetails();
    }

    nameTag();


/*
var first = 0;
var second = 1;
var third = 2;

  function cons1(){
    console.log(first);
    return new Promise(function(resolve, reject){
      setTimeout(() => {
        first = "1st";
        console.log("First");
        console.log(first);
        resolve(first);
      }, 3000);
    })
  };
  function cons2(){
    return new Promise(function(resolve, reject){
      setTimeout(() => {
        second = "2nd";
        console.log("Second");
        console.log(first);
        resolve(second);
      }, 4000);
    })
    
  };

  function cons3(){
    third = "3rd";
    console.log("Third");
    console.log(first);
    console.log(second);
  }

  // cons1();
  // cons2();
  // cons3();

  async function consF(){
    await cons1();
    await cons2();
    cons3();
  }

  consF();

*/  




