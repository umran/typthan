function init(reference) {
	
	var config = {
		apiKey: "AIzaSyDQHJqiGHwLOAs4kuB_6YD1G5n3Pk2pD2g",
		authDomain: "fikureeingilaab.firebaseapp.com",
		databaseURL: "https://fikureeingilaab.firebaseio.com",
		storageBucket: "fikureeingilaab.appspot.com",
		messagingSenderId: "51520973083"
	}
	
	// Initialize Firebase.
	// TODO: replace with your Firebase project configuration.
	
	firebase.initializeApp(config)
	// debug
	console.log('firebase initialized')

	// Get Firebase Database reference.
	var firepadRef = firebase.database().ref(reference)

	// Create CodeMirror (with lineWrapping on).
	var codeMirror = CodeMirror(document.getElementById('canvas'), { 
		lineWrapping: true,
		rtlMoveVisually: true,
		rtlLayout: true
	})

	var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
		richTextShortcuts: true,
		richTextToolbar: true
	})

	//Thaana keyboard mappings
	var thaanaKeyboard = {}
	thaanaKeyboard._defaultKeyboard = 'phonetic'
	thaanaKeyboard._transFrom = 'qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?() '
	thaanaKeyboard._transTo = {'phonetic': 'ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛\'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)( ','phonetic-hh': 'ޤަެރތޔުިޮޕ][\\އސދފގހޖކލ؛\'ޒޝްވބނމ،./ﷲާޭޜޓޠޫީޯޕ}{|ޢށޑޟޣޙޛޚޅ:\"ޡޘޗޥޞޏމ><؟)( ','typewriter': 'ޫޮާީޭގރމތހލ[]ިުްަެވއނކފﷲޒޑސޔޅދބށޓޯ×’“/:ޤޜޣޠޙ÷{}<>.،\"ޥޢޘޚޡ؛ޖޕޏޗޟޛޝ\\ޞ؟)( '}


	codeMirror.on('keypress', function(cm, event){

		event = event || window.event

		if(event.which > 0){
			var key = event.which

			//debug
			console.log(key)
		}
		else {
			// Ignore special keys
			return true
		}

		// Check for CTRL modifier key
		if (event.modifier) {
			var ctrl = event.modifiers & Event.CONTROL_MASK
		}
		else if (typeof(event.ctrlKey) != 'undefined') {
			var ctrl = event.ctrlKey
		}

		var transIndex = thaanaKeyboard._transFrom.indexOf(String.fromCharCode(key))

		// If pressed key does not require translation, let default action proceed
		if (transIndex == -1 || ctrl) {
			return true
		}

		if (typeof event.preventDefault == 'function') {
			event.preventDefault()
		}
		else {
			event.returnValue = false
		}

		// Set default state
		var keyboard = thaanaKeyboard._defaultKeyboard

		// Look up the translated char
		var transChar = thaanaKeyboard._transTo[keyboard].substr(transIndex, 1)

		console.log(transChar)

		codeMirror.replaceSelection(transChar)
	})
	
	$('.powered-by-firepad').hide()
	// debug
	console.log('logo removed')
	
}