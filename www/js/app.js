angular.module("contemporanea", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","contemporanea.controllers", "contemporanea.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Contemporanea" ;
		$rootScope.appLogo = "data/images/header/icon_512x_bco.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "contemporanea",
				storeName : "contemporanea",
				description : "The offline datastore for Contemporanea app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("contemporanea.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("pt-br");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("pt-br");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?contemporanea\.arq\.br/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?facebook\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?google\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?vimeo\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("contemporanea",{
		url: "/contemporanea",
			abstract: true,
			templateUrl: "templates/contemporanea-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("contemporanea.about_us", {
		url: "/about_us",
		cache:false,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.arquiteto_singles", {
		url: "/arquiteto_singles/:id",
		cache:false,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-arquiteto_singles.html",
						controller: "arquiteto_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.arquitetos", {
		url: "/arquitetos",
		cache:false,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-arquitetos.html",
						controller: "arquitetosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.bookmarks", {
		url: "/bookmarks",
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-bookmarks.html",
						controller: "bookmarksCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.categories", {
		url: "/categories",
		cache:true,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-categories.html",
						controller: "categoriesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.faqs", {
		url: "/faqs",
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.post_bookmark", {
		url: "/post_bookmark",
		cache:false,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-post_bookmark.html",
						controller: "post_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("contemporanea.post_singles", {
		url: "/post_singles/:id",
		cache:true,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("contemporanea.posts", {
		url: "/posts/:categories",
		cache:true,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-posts.html",
						controller: "postsCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("contemporanea.users", {
		url: "/users",
		cache:false,
		views: {
			"contemporanea-side_menus" : {
						templateUrl:"templates/contemporanea-users.html",
						controller: "usersCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/contemporanea/dashboard");
});
