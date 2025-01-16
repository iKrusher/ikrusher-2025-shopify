import * as React from 'react';
import {useFetcher} from '@remix-run/react';

export default function FooterSubscribe() {
  const fetcher = useFetcher();
  return (
    <div className="subscribe-group">
      <h4 style={{lineHeight: '1'}}>Subscribe here</h4>
      <p>for iKrusher latest news</p>
      <fetcher.Form method="post" action="/klaviyo/submit">
        <input type="hidden" id="list_id" name="list_id" value="XGcz2a" />
        <input type="email" name="email" placeholder="Your email address" />
        <button type="submit" disabled={fetcher.state === 'loading'}>
          {fetcher.state === 'idle' ? 'Subscribe' : 'Signing Up...'}
        </button>
      </fetcher.Form>
    </div>
  );
}
