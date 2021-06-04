const { Verifier } = require('@pact-foundation/pact')
var pact = require('@pact-foundation/pact-node')
const jestConfig = require('../jest.config')

const pkg = require('../package.json')
const { server } = require('../src/index')

jest.setTimeout(15000);

describe('Squad Users', () => {
  afterAll(() => {
    server.close()
  });

  test('should validate the expectations of our consumer', async () => {
    const opts = {
      provider: 'User API',
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: 'http://pact-maestro.ipet.sh',
      publishVerificationResult: true,
      providerVersion: pkg.version
    }

    try {
      await pact.verifyPacts(opts);
    } catch (error) {
      if (!error.message.includes('status=404')) {
        console.log(error)
        throw error
      }
    }
  })
})
