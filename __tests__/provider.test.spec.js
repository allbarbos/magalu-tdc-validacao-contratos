const { Verifier } = require('@pact-foundation/pact')
var pact = require('@pact-foundation/pact-node')

const pkg = require('../package.json')
const { server } = require('../src/index')

jest.setTimeout(15000)

describe('Squad Users', () => {
  afterAll(() => {
    server.close()
  });

  test('should validate the expectations of our consumer', () => {
    const opts = {
      provider: 'User API',
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: 'http://pact-maestro.ipet.sh',
      publishVerificationResult: true,
      providerVersion: pkg.version
    }

    return new Verifier(opts).verifyProvider().then(output => {
      console.log(output);
    }).catch((error) => {
      if (!error.message.includes('status=404')) {
        console.log(error)
        throw error
      }
    }).finally(() => {

    });
  })
})
