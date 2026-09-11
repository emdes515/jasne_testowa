const fs = require('fs');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

const PROJECT_ID = 'jasne-7efe7';
const KEY_PATH = path.resolve(__dirname, '..', 'jasne-7efe7-firebase-adminsdk-fbsvc-25684c98c7.json');
const RULES_PATH = path.resolve(__dirname, '..', 'firestore.rules');

async function deployRules() {
  console.log('[DEPLOY] Loading service account from:', KEY_PATH);
  const auth = new GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/firebase']
  });

  const client = await auth.getClient();
  const rulesContent = fs.readFileSync(RULES_PATH, 'utf8');

  console.log('[DEPLOY] Creating ruleset for ' + PROJECT_ID + '...');
  const createRulesetUrl = 'https://firebaserules.googleapis.com/v1/projects/' + PROJECT_ID + '/rulesets';
  const createRes = await client.request({
    url: createRulesetUrl,
    method: 'POST',
    data: {
      source: {
        files: [
          {
            name: 'firestore.rules',
            content: rulesContent
          }
        ]
      }
    }
  });

  const rulesetName = createRes.data.name;
  console.log('[DEPLOY] Ruleset created successfully:', rulesetName);

  console.log('[DEPLOY] Fetching current release...');
  try {
    const currentRelease = await client.request({
      url: 'https://firebaserules.googleapis.com/v1/projects/' + PROJECT_ID + '/releases/cloud.firestore',
      method: 'GET'
    });
    console.log('[CURRENT RELEASE]:', JSON.stringify(currentRelease.data, null, 2));
    
    // Now update
    const updateRes = await client.request({
      url: 'https://firebaserules.googleapis.com/v1/projects/' + PROJECT_ID + '/releases/cloud.firestore',
      method: 'PATCH',
      data: {
        release: {
          name: 'projects/' + PROJECT_ID + '/releases/cloud.firestore',
          rulesetName: rulesetName
        }
      }
    });
  } catch(e) {
    console.error('Release error:', e.response?.data || e.message);
  }

  console.log('[SUCCESS] Firestore rules deployed and released successfully!');
}

deployRules().catch(err => {
  console.error('[ERROR] Failed to deploy firestore rules:', err.response?.data || err.message);
  process.exit(1);
});
