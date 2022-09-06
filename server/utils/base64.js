const base64 = exports;

base64.encode = function (unencoded) {
    return Buffer.from(unencoded || '').toString('base64');
};

base64.decode = function (encoded) {
    return Buffer.from(encoded || '', 'base64').toString('utf8');
};


// base64url jwt encoding
base64.urlEncode = function (unencoded) {
    const encoded = base64.encode(unencoded);
    return encoded.replace(/\\+/g, '-').replace(/\//g,'_').replace(/=+$/g, '');
};

// base64url jwt decoding
base64.urlDecode = function (encoded) {
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (encoded.length % 4)
        encoded += '=';
    return base64.decode(encoded);
};