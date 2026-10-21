# Portfolio analytics and cookie consent

This adapts Accessible Trades’ optional-analytics pattern to the portfolio. It
uses Vue and native browser APIs, with no consent-platform subscription or new
package dependency. Analytics stays off until visitors explicitly allow it.

## Enable it

1. Create or select a GA4 web data stream for your portfolio in Google Analytics
   **Admin → Data streams**. Copy its measurement ID, starting with `G-`.
2. In Netlify’s production build environment, set
   `VITE_GA_MEASUREMENT_ID` to that ID and `VITE_SITE_URL` to
   `https://mdmoran.netlify.app`. Rebuild and redeploy.
3. **Turn Enhanced measurement off for this web stream.** The application sends
   its own sanitised page views on Vue route changes, including recognised
   homepage section hashes. Google’s automatic browser-history page views can
   otherwise duplicate these events or include URL parameters. Do not install
   an additional GA snippet or GTM tag alongside this implementation.
4. Keep Google Signals and advertising integrations off. In GA’s data-retention
   settings, choose the retention period appropriate for your needs. The cookie
   lifespan configured by the application is distinct from server-side data
   retention.

The measurement ID is a public identifier, not a password. With a missing or
invalid ID, no tag or consent prompt is enabled. Tracking runs only in production
builds on the hostname configured by `VITE_SITE_URL`. Localhost and other deploy
preview hostnames do not send data. To preview the consent UI locally, add the ID
to `.env.local` and restart Vite; the UI works but tracking remains disabled.

## Visitor experience

- A compact non-modal prompt provides equally prominent **Allow analytics** and
  **Decline analytics** buttons and expandable cookie information.
- No Google script is injected or page views queued before permission. This
  follows the basic consent approach, rather than loading Google with denied
  consent to send cookieless measurements.
- Visitors can change their choice in the existing **Preferences** panel. The
  CV page has a separate **Cookie preferences** button, excluded from print.
- Necessary theme/motion/consent storage remains separate from optional analytics.
- A versioned choice in `moran-portfolio-cookie-consent` local storage expires
  after 180 days. Blocked storage keeps the explicit choice for the current tab;
  a later visit can ask again. Changes in another tab update the current tab.
- Withdrawal sets Google’s documented analytics-disable flag, cancels pending
  tag loading, stops application page views and removes accessible `_ga` cookies
  at the root path. An already issued request cannot be recalled, and data already
  received by Google is not erased by withdrawal.
- The tag always denies advertising consent and disables Google Signals and
  personalisation. No user ID, email address or form values are sent by this code.
  Page URLs omit query strings and unrecognised hashes; referrers omit query
  strings and fragments. Google still receives technical connection information
  and browser identifiers when visitors opt in. Location reporting is approximate.
- Private studio and unknown routes do not receive application page views.

## Verify after deployment

In a fresh browser session, use Network and browser storage tools:

1. Before choosing, confirm no request to Google’s tag/analytics endpoints and no
   new `_ga` cookies. Decline and navigate: these should remain absent.
2. Allow analytics: confirm a tag request and the current page in GA Realtime.
   Navigate to a case study and a homepage section; expect one page view per
   distinct route/section, rather than duplicate events.
3. Switch analytics off in Preferences. Confirm the disable flag is true,
   analytics cookies are removed and subsequent navigation sends no page views.
4. Test refresh, another tab, mobile layout, keyboard operation, blocked storage
   and the CV. Ads blockers may prevent GA from loading; the portfolio remains
   usable.

Automated checks: build, then run `node scripts/verify-analytics.mjs`, alongside
the existing static, UI and case-reading checks. The tests use a mocked Google
tag and do not send events to a live analytics property. Live collection and
network behaviour still need checking with your actual ID and GA stream settings.

## Sources

- [Google consent-mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Google privacy settings and analytics-disable flag](https://developers.google.com/tag-platform/security/guides/privacy)
- [Google manual page-view measurement](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google Enhanced measurement settings](https://support.google.com/analytics/answer/9216061)
- [ICO cookies and similar technologies guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)
