
Geopal.showMessage("isADBEnabled : " + Geopal.Debug.isADBEnabled());
Geopal.showMessage("isDebuggerConnected : " + Geopal.Debug.isDebuggerConnected());
Geopal.showMessage("isWebContentsDebuggingEnabled : " + Geopal.Debug.isWebContentsDebuggingEnabled());
Geopal.showMessage("...........Enabling Debug:::::::::::" );
Geopal.Debug.setWebContentsDebuggingEnabled(true);
Geopal.showMessage(":::::::::::Enabling Debug ...........");
Geopal.showMessage("isWebContentsDebuggingEnabled : " + Geopal.Debug.isWebContentsDebuggingEnabled());
console.info("Debug On");