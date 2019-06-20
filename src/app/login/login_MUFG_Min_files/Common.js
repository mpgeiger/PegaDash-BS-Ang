var IsValid = false;
function VerifyPassword(password, username, confirmpassword) {

    var helperText = {
        pwdcharLen: document.querySelector('.helper-text .length'),
        pwdlowerCase: document.querySelector('.helper-text .lowercase'),
        pwdupperCase: document.querySelector('.helper-text .uppercase'),
        pwdspecialChar: document.querySelector('.helper-text .special'),
        pwdnumberChar: document.querySelector('.helper-text .number'), //Number calss
        verifyuserName: document.querySelector('.helper-text .usernamecheck'),
        pwdMatch: document.querySelector('.helper-text .pwdMatch')
    };

    var pattern = {
        pwdlngth: function () {
            if (password.value != '')
            { return true; }
            else {
                return false;
            }
        },
        cpwdlngth: function () {
            if (confirmpassword.value != '')
            { return true; }
            else {
                return false;
            }
        },
        pwdcharLen: function () {
            if (password.value.length >= 8 && password.value.length <= 20)
            { return true; }
            else {
                return false;
            }


        },
        pwdlowerCase: function () {
            var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

            if (regex.test(password.value)) {
                return true;
            }
        },

        pwdupperCase: function () {
            var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

            if (regex.test(password.value)) {
                return true;
            }
        },
        //pwdspecialChar: function () {
        //    var regex = /^([^0-9]*|[a-zA-Z0-9]*)$/; //number and special character pattern - This regex is in the form of negation i.e; condition is met when regex match return false.

        //    if (!regex.test(password.value)) {
        //        return true;
        //    }
        //},
        pwdspecialChar: function () {
            var regex = /^(?=.*[~!@\$%\^\&*\)\(?]).+$/; //number and special character pattern - This regex is in the form of negation i.e; condition is met when regex match return false.

            if (regex.test(password.value)) {
                return true;
            }
        },
        pwdnumberChar: function () {
            var regex = /^(?=.*[0-9]).+$/; //number  pattern - This regex is in the form of negation i.e; condition is met when regex match return false.

            if (regex.test(password.value)) {
                return true;
            }
        },
        verifyuserName: function () {
            if (password.value.length > 0) {
                if (findPartofUserName(username, password.value.toLowerCase())) {
                    return true;
                }
                else if (password.value.toLowerCase().indexOf("mfsadmin") != -1) {
                    return true;
                }
                else if (password.value.toLowerCase().indexOf("com") != -1) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return true;
            }
        },
        pwdMatch: function () {
            //check key and confirm key matched
            if (password.value != '' && confirmpassword.value != '') {
                if (password.value.toLowerCase() == confirmpassword.value.toLowerCase()) {
                    console.log('key Matches found');
                    return true;
                }
                else {
                    console.log('no key match');
                    return false;
                }
            }
            else { return false; }
        }
    };

    confirmpassword.addEventListener('keyup', function () {
        patternTest_KeyMatch(pattern.pwdMatch(), helperText.pwdMatch);
       // revertclass(pattern.cpwdlngth(), helperText.pwdMatch);
    });


    //confirmpassword.addEventListener('blur', function () {
    //    if(confirmpassword.value.length==0)
    //    {
    //        revertclass(pattern.pwdcharLen(), helperText.pwdcharLen);
    //        revertclass(pattern.pwdlowerCase(), helperText.pwdlowerCase);
    //        revertclass(pattern.pwdupperCase(), helperText.pwdupperCase);
    //        revertclass(pattern.pwdspecialChar(), helperText.pwdspecialChar);
    //        revertclass(pattern.verifyuserName(), helperText.verifyuserName);
    //        revertclass(pattern.pwdMatch(), helperText.pwdMatch);
    //    }
    //});

    password.addEventListener('blur', function () {
        if (password.value.length == 0 && confirmpassword.value.length==0) {
            revertclass(pattern.pwdlngth(), helperText.pwdcharLen);
            revertclass(pattern.pwdlngth(), helperText.pwdlowerCase);
            revertclass(pattern.pwdlngth(), helperText.pwdupperCase);
            revertclass(pattern.pwdlngth(), helperText.pwdspecialChar);
            revertclass(pattern.pwdlngth(), helperText.pwdnumberChar);
            revertclass(pattern.pwdlngth(), helperText.verifyuserName);
            revertclass(pattern.pwdlngth(), helperText.pwdMatch);
        }
    });


    password.addEventListener('keyup', function () {
        patternTest(pattern.pwdcharLen(), helperText.pwdcharLen);
        patternTest(pattern.pwdlowerCase(), helperText.pwdlowerCase);
        patternTest(pattern.pwdupperCase(), helperText.pwdupperCase);
        patternTest(pattern.pwdspecialChar(), helperText.pwdspecialChar);
        patternTest(pattern.pwdnumberChar(), helperText.pwdnumberChar); //for number
        patternTest_User(pattern.verifyuserName(), helperText.verifyuserName);
        patternTest_KeyMatch(pattern.pwdMatch(), helperText.pwdMatch);
       // revertclass(pattern.pwdlngth(), helperText.verifyuserName);
       // revertclass(pattern.pwdlngth(), helperText.pwdMatch);


        if (hasClass(helperText.pwdlowerCase, 'valid') &&
                    hasClass(helperText.pwdupperCase, 'valid')  && hasClass(helperText.pwdnumberChar, 'valid') &&
                  hasClass(helperText.pwdspecialChar, 'valid') && !hasClass(helperText.verifyuserName, 'invalid') && hasClass(helperText.pwdcharLen, 'valid') && hasClass(helperText.pwdMatch, 'valid')) {
            addClass(password.parentElement, 'valid');
            IsValid = true;
        }
        else {
            removeClass(password.parentElement, 'valid');
            addClass(password.parentElement, 'invalid');
            IsValid = false;
        }
    });
}

function findPartofUserName(userName, password) {
    //console.log(username);
    //console.log(password);
    var parts = username.split(/[\._]/).filter(function (el) { return el.length != 0 });
    //console.log(parts);
    for (var i = 0; i < parts.length; i++) {
        //console.log("Finding " + parts[i] + " in " + password);
        if (password.indexOf(parts[i].toLowerCase()) != -1) {
            return true;
        }
    }
    return false;
}

function patternTest(pattern, response) {
    if (pattern) {
        addClass(response, 'valid');
        removeClass(response, 'invalid');
    }
    else {
        removeClass(response, 'valid');
        addClass(response, 'invalid');
    }
}
function revertclass(pattern, response1) {
    if (!pattern) {

        removeClass(response1, 'valid');
        removeClass(response1, 'invalid');

    }
}
function patternTest_User(pattern, response) {

    if (pattern) {
        removeClass(response, 'valid');
        addClass(response, 'invalid');
    }
    else {
        removeClass(response, 'invalid');
        addClass(response, 'valid');
    }
}
function patternTest_Length(pattern, response) {
    if (pattern) {
        removeClass(response, 'valid');


    }
    else {

        addClass(response, 'valid');
    }
}
function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    }
    else {
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function hasClass(el, className) {
    if (el.classList) {

        return el.classList.contains(className);
    }
    else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
}
function patternTest_KeyMatch(pattern, response) {

    if (!pattern) {

        removeClass(response, 'valid');
        addClass(response, 'invalid');

    }
    else {
        removeClass(response, 'invalid');
        addClass(response, 'valid');
    }
}



function VerifyKey(recoverykey, confirmKey) {

    var helperText = {
        keylength: document.querySelector('.helper-text .keylength'),
        alpha: document.querySelector('.helper-text .alpha'),
        number: document.querySelector('.helper-text .number'),
        keyMatch: document.querySelector('.helper-text .keyMatch')
    };

    var pattern = {
        keylength: function () {
            if (recoverykey.value.length >= 8 && recoverykey.value.length <= 20) {

                return true;
            }
        },
        alpha: function () {
            var regex = /^(?=.*[a-zA-Z]).+$/; // alpha character pattern

            if (regex.test(recoverykey.value)) {
                return true;
            }
        },
        number: function () {
            var regex = /^(?=.*[0-9]).+$/; // number pattern

            if (regex.test(recoverykey.value)) {
                return true;
            }
        },
        keyMatch: function () {
            //check key and confirm key matched
            if (recoverykey.value != '' && confirmKey.value != '') {
                if (recoverykey.value.toLowerCase() == confirmKey.value.toLowerCase()) {
                    console.log('key Matches found');
                    return true;
                }
                else {
                    console.log('no key match');
                    return false;
                }
            }
            else { return false; }
        }
    };

    // Listen for keyup action on password field
    recoverykey.addEventListener('keyup', function () {
        // Check that password is a minimum of 8 characters

        patternTest(pattern.keylength(), helperText.keylength);

        // Check that password contains a alpha letter           
        patternTest(pattern.alpha(), helperText.alpha);

        // Check that password contains an number
        patternTest(pattern.number(), helperText.number);

        // Check that keyMatching
        patternTest_KeyMatch(pattern.keyMatch(), helperText.keyMatch);

        // Check that all requirements are fulfilled
        if (hasClass(helperText.keylength, 'valid') &&
                  hasClass(helperText.alpha, 'valid') &&
                    hasClass(helperText.number, 'valid') &&
                    hasClass(helperText.keyMatch, 'valid')
            ) {
            addClass(recoverykey.parentElement, 'valid');
            IsValid = true;
        }
        else {
            removeClass(recoverykey.parentElement, 'valid');
            IsValid = false;
        }


    });

    confirmKey.addEventListener('keyup', function () {
        patternTest_KeyMatch(pattern.keyMatch(), helperText.keyMatch);
    });

    return IsValid;


}


function ConfirmPassword(ResetPasswordID, confirmPasswordID, lblErrorID, IsValid) {
    if (ResetPasswordID != "") {
        if (IsValid) {
            if (confirmPasswordID != "") {
                if (ResetPasswordID == confirmPasswordID) {
                    return true;
                }
                else {
                    lblErrorID.innerHTML = "Passwords do not match. Please re-enter your password";
                    return false;
                }
            }
            else {
                lblErrorID.innerHTML = "Please confirm your password";
                return false;
            }
        }
        else {
            lblErrorID.innerHTML = "Password should fulfill below criteria.";
            return false;
        }
    }
    else {
        lblErrorID.innerHTML = "Please enter your password";
        return false;
    }
}