/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
import {json, redirect} from '@shopify/remix-oxygen';

export async function loader({request}) {
  if (request.method === 'GET') {
    return redirect('/404');
  }
}

export async function action({request, context}) {
  // return if not POST request
  if (request.method !== 'POST') {
    return json({error: 'Invalid request method.'});
  }
  // List ID from Klaviyo dashboard:
  const formData = await request.formData();
  const email = formData.get('email');
  const listId = formData.get('list_id');

  const attributes = {
    email,
  };

  const profiles = {
    data: [
      {
        type: 'profile',
        attributes,
      },
    ],
  };

  const emailSubObj = {
    email: {
      marketing: {
        consent: 'SUBSCRIBED',
      },
    },
  };

  try {
    const response = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          revision: '2023-10-15',
          'content-type': 'application/json',
          // @ts-ignore
          Authorization: `Klaviyo-API-Key ${context.env.KLAVIYO_PRIVATE_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              profiles,
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: listId,
                },
              },
            },
          },
        }),
      },
    );

    // Klaviyo response body empty when successful - use response.status (not response.json):
    const res = await response;
    if (res.status >= 200 && res.status < 300) {
      return json({success: 'Successfully submitted to Klaviyo.'});
    } else {
      return json({error: 'Failed to submit to Klaviyo.'});
    }
  } catch (error) {
    console.error('Klaviyo API error:', error);
    return json({error: 'Failed to submit to Klaviyo.'});
  }
}
