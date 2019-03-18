/* passing parameters dynamically - start */
function preparePegaAParams(gadgetName) {
	var pegaAParamObj = {};
  /* Lets not include credentails*/
   pegaAParamObj.UserIdentifier="SallyJones";
	pegaAParamObj.Password="install";
  
    pegaAParamObj.AppName="WebChatbot";	  
	  pegaAParamObj.HelpConfigurationName="e2ecb";  
  	pegaAParamObj.ContactId=getCookie("ContactID");
	  pegaAParamObj.AccountNumber=getCookie("AccountNumber");
	  pegaAParamObj.username=getCookie("UserName");
  
	pegaAParamObj.pzSkinName="OnlineHelp";
	return pegaAParamObj;
}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
      var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* Set cookies. To be overwritten locally */
  setCookie("ContactID", "CONT-1", 30);
  setCookie("AccountNumber","9998765431", 30);
  setCookie("UserName","SallyJones", 30);