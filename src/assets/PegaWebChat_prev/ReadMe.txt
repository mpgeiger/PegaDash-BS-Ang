This ZIP file contains the following files:
1. This README file
2. index.html
3. PegaHelper.js
4. PegaStyles.css
5. PegaHelperExtension.js

To run your Web Chatbot, extract all files and launch index.html in a web browser.

* Please note that as part of this download we have packaged a sample identity as a test account in order to help you test end-user authentication into the Web Chatbot experience. This is packaged in PegaHelperExtension.js. When you escalate to a human agent, this allows the agent accepting the chat to recognize the customer. 

This test identity within the cookie created by PegaHelperExtension.js makes the assumption that you are using the sample data that comes with the release, just as we’ve made the assumption that you’ll be using cookies to pass identity information (neither assumptions are hard requirements – you aren’t required to use cookies for authentication– they are provided as our documented example of ONE kind of identity sharing mechanism). You can edit PegaHelperExtension.js if you want to use some other mechanism for injecting identity. 

If you are not using our sample data for test purposes, but plan to use our cookies, please be sure to edit PegaHelperExtension.js to replace the sample with whatever test account you wish to use for testing purposes. It is outside the scope of Web Chatbot to consider how that cookie gets set in production. That is a design decision that you and your business will have to make separately.