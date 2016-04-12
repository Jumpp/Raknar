(function (jQuery, Firebase, Path) {
    "use strict";

    // the main firebase reference
    var rootRef = new Firebase('https://fiery-heat-1643.firebaseio.com/');

    // pair our routes to our form elements and controller
    var routeMap = {
        '#/': {
            form: 'frmLogin',
            controller: 'login'
        },
            '#/main': {
            form:'frmMain',
            controller: 'main',
 //           authRequired: true // must be logged in to get here
        },
            '#/logout': {
            form: 'frmLogout',
            controller: 'logout'
        },
            '#/register': {
            form: 'frmRegister',
            controller: 'register'
        },
            '#/profile': {
            form: 'frmProfile',
            controller: 'profile',
   //         authRequired: true // must be logged in to get here
        },
            '#/customer':{
            form:'frmCustomer',
            controller: 'customer',
     //       authRequired: true // must be logged in to get here
                
            },
            '#/neworder':{
            form:'frmOrder',
       //     authRequired: true // must be logged in to get here
                
            },
            '#/search':{
            form:'frmSearch',
            controller: 'search',
        //    authRequired: true // must be logged in to get here
            },
    };

    // create the object to store our controllers
    var controllers = {};

    // store the active form shown on the page
    var activeForm = null;

    var alertBox = $('#alert');

    function routeTo(route) {
        window.location.href = '#/' + route;
    }

    // Handle third party login providers
    // returns a promise
    function thirdPartyLogin(provider) {
        var deferred = $.Deferred();

        rootRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise();
    };

    // Handle Email/Password login
    // returns a promise
    function authWithPassword(userObj) {
        var deferred = $.Deferred();
        console.log(userObj);
        rootRef.authWithPassword(userObj, function onAuth(err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }

        });

        return deferred.promise();
    }

    // create a user but not login
    // returns a promsie
    function createUser(userObj) {
        var deferred = $.Deferred();
        rootRef.createUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // Create a user and then login in
    // returns a promise
    function createUserAndLogin(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {

            // route
            routeTo(route);

        }, function (err) {
            console.log(err);
            // pop up error
            showAlert({
                title: err.code,
                detail: err.message,
                className: 'alert-danger'
            });

        });
    }

    // options for showing the alert box
    function showAlert(opts) {
        var title = opts.title;
        var detail = opts.detail;
        var className = 'alert ' + opts.className;

        alertBox.removeClass().addClass(className);
        alertBox.children('#alert-title').text(title);
        alertBox.children('#alert-detail').text(detail);
    }

    /// Controllers
    ////////////////////////////////////////
    controllers.Main = function (form) {
    };
    
    controllers.login = function (form) {

        // Form submission for logging in
        form.on('submit', function (e) {

            var userAndPass = $(this).serializeObject();
            var loginPromise = authWithPassword(userAndPass);
            e.preventDefault();

            handleAuthResponse(loginPromise, 'main');

        });
    };

    // logout immediately when the controller is invoked
    controllers.logout = function (form) {
        rootRef.unauth();
    };
	
	
    controllers.search = function (form) {
  
        var customer
        var customerRef;
        
        // Load Customer info
        customerRef = rootRef.child('Customers').child('Matti');
        customerRef.once('value', function (snap) {
            var customer = snap.val();

			  
			   document.getElementById("searchContainer").innerHTML = (customer.Name);
		  });
};


    controllers.customer= function (form) {

        var customer
        var customerRef;
        
        // Load Customer info
        customerRef = rootRef.child('Customers')/*.child('')*/;
        customerRef.once('value', function (snap) {
            var user = snap.val();
     //       if (!user) {
    //            return;
      //      }

            // set the fields
            form.find('#msName').val(customer.full_name);
            form.find('#msEmail').val(customer.email);
            form.find('#msPhone').val(customer.phone);
            form.find('#msWeight').val(customer.weight);
            form.find('#msHeight').val(customer.height);
            form.find('#msStance').val(customer.stance);
            form.find('#msShoulder').val(customer.shoulder);
            form.find('#msChest').val(customer.chest);
            form.find('#msStomach').val(customer.stomach);
            form.find('#msSeat').val(customer.seat);
            form.find('#msFullShoulder').val(customer.fullShoulder);
            form.find('#msHalfShoulderL').val(customer.halfShoulderL);
            form.find('#msHalfShoulderR').val(customer.halfShoulderR);
            form.find('#msBackWidth').val(customer.backWidth);
            form.find('#msHalfBackLength').val(customer.halfBackLength);
            form.find('#msFullChest').val(customer.fullChest);
            form.find('#msWaistStomach').val(customer.waistStomach);
            form.find('#msTrouserWaist').val(customer.trouserWaist);
            form.find('#msHips').val(customer.hips);
            form.find('#msNeck').val(customer.neck);
            form.find('#msFrontChestWidth').val(customer.frontChestWidth);
            form.find('#msFullJacketLengthSuit').val(customer.fullJacketLengthSuit);
            form.find('#msFullJacketLengthCoat').val(customer.fullJacketLengthCoat);
            form.find('#msLeftSleeve').val(customer.leftSleeve);
            form.find('#msRightSleeve').val(customer.rightSleeve);
            form.find('#msBicep').val(customer.bicep);
            form.find('#msWrist').val(customer.wrist);
            form.find('#msTrouserOutseam').val(customer.trouserOutseam);
            form.find('#msLegOpening').val(customer.legOpening);
            form.find('#msKnee').val(customer.knee);
            form.find('#msThigh').val(customer.thigh);
            form.find('#msCrotch').val(customer.crotch);
            form.find('#msAboveKnee').val(customer.aboveKnee);
            form.find('#msCalf').val(customer.calf);
  
  
  });

        // Save user's info to Firebase
        form.on('submit', function (e) {
            e.preventDefault();
            var customerInfo = $(this).serializeObject();

            customerRef.push(customerInfo, function onComplete() {
                routeTo('main');
                // show the message if write is successful
                showAlert({
                    title: 'Successfully saved!',
                    detail: 'You are still logged in',
                    className: 'alert-success'
                });

            });
        });

    };
    
    controllers.profile = function (form) {
        // Check the current user
        var user = rootRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('login');
            return;
        }

        // Load user info
        userRef = rootRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            form.find('#CompanyName').val(user.CompanyName);
            form.find('#Address').val(user.Address);
            form.find('#City').val(user.City);
            form.find('#PostalCode').val(user.PostalCode);
            form.find('#Country').val(user.Country);
        });

        // Save user's info to Firebase
        form.on('submit', function (e) {
            e.preventDefault();
            var userInfo = $(this).serializeObject();

            userRef.set(userInfo, function onComplete() {
            routeTo('main');
                // show the message if write is successful
                showAlert({
                    title: 'Successfully saved!',
                    detail: 'You are still logged in',
                    className: 'alert-success'
                    
        
                });

            });
        });

    };

    /// Routing
    ////////////////////////////////////////

    // Handle transitions between routes
    function transitionRoute(path) {
        // grab the config object to get the form element and controller
        var formRoute = routeMap[path];
        var currentUser = rootRef.getAuth();

        // if authentication is required and there is no
        // current user then go to the register page and
        // stop executing
        if (formRoute.authRequired && !currentUser) {
            routeTo('');  
            
        //////////////////////////
        //RouteTo('login') Tämä jossain vaiheessa vaihtoon
        ////////////////////////////
            return;
        }

        // wrap the upcoming form in jQuery
        var upcomingForm = $('#' + formRoute.form);

        // if there is no active form then make the current one active
        if (!activeForm) {
            activeForm = upcomingForm;
        }

        // hide old form and show new form
        activeForm.hide();
        upcomingForm.show().hide().fadeIn(750);

        // remove any listeners on the soon to be switched form
        activeForm.off();

        // set the new form as the active form
        activeForm = upcomingForm;

        // invoke the controller
        controllers[formRoute.controller](activeForm);
    }

    // Set up the transitioning of the route
    function prepRoute() {
        transitionRoute(this.path);
    }


    /// Routes
    Path.map("#/").to(prepRoute);
    Path.map("#/main").to(prepRoute);
    Path.map("#/logout").to(prepRoute);
    Path.map("#/register").to(prepRoute);
    Path.map("#/profile").to(prepRoute);
    Path.map("#/customer").to(prepRoute);
    Path.map("#/neworder").to(prepRoute);
    Path.map("#/search").to(prepRoute);
    Path.root("#/");

    /// Initialize
    ////////////////////////////////////////

    $(function () {

        // Start the router
        Path.listen();

        // whenever authentication happens send a popup
        rootRef.onAuth(function globalOnAuth(authData) {

            if (authData) {
                showAlert({
                    title: 'Logged in!',
                    detail: 'Using ' + authData.provider,
                    className: 'alert-success'
                });
            } else {
                showAlert({
                    title: 'You are not logged in',
                    detail: '',
                    className: 'alert-info'
                });
            }

        });

    });

}(window.jQuery, window.Firebase, window.Path))