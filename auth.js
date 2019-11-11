const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oa1ou5cu0uywUtn0357',
  issuer: 'https://dev-938884.okta.com/oauth2/clientcredentiaflow'
});

async function oktaAuth(req, res, next) {
    console.log('req.token', req.token);
  try {
    const token = req.token;
    if (!token) {
      return res.status(401).send('Not Authorized');
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, ['http://localhost:4200/implicit/callback']);
    req.user = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub
    };
    next();
  }
  catch (err) {
    console.log('AUTH ERROR: ', err);
    return res.status(401).send(err.message);
  }
}

module.exports = oktaAuth;