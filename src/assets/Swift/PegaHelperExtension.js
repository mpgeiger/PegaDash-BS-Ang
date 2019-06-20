/* passing parameters dynamically - start */
function preparePegaAParams(gadgetName) {
	var pegaAParamObj = {};
  /* Lets not include credentails*/
  /* pegaAParamObj.UserIdentifier="";
	pegaAParamObj.Password="";
  */
  pegaAParamObj.AppName="WebChatbot";
	pegaAParamObj.HelpConfigurationName="BNY Swift";
 	pegaAParamObj.ContactId="7103716305";
    // pegaAParamObj.AccountNumber="1029311";
   //  pegaAParamObj.AccountNumber="1029311";
  //  pegaAParamObj.ContactId="7103716326";
  //  pegaAParamObj.AccountNumber="1029329";

	pegaAParamObj.AccountNumber="9999999975";
	pegaAParamObj.username=getCookie("UserName");
  	pegaAParamObj.Site="Swift";
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
  setCookie("ContactID", "7103716305", 30);
  //setCookie("AccountNumber","1029311", 30);
  // setCookie("ContactID", "7103716326", 30);
//  setCookie("AccountNumber","9999999975", 30);
//  setCookie("AccountNumber","1029329", 30);
  // setCookie("AccountNumber","9998765431", 30);
  setCookie("AccountNumber","9999999975", 30);
  setCookie("UserName","Shea Parker", 30);
