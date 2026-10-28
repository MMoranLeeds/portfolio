<template>
  <details class="cookie-details">
    <summary>About cookies and analytics</summary>
    <p>
      Essential browser storage remembers your theme, motion preference and
      cookie choice. Your cookie choice is kept for 180 days, then you'll be
      asked again.
    </p>
    <p>
      If you allow analytics, Google Analytics receives page visits, device
      information, approximate location and browser identifiers. This helps me
      understand which parts of the portfolio people view. Advertising features
      are disabled.
    </p>
    <p>
      Google's <code>_ga</code> and <code>_ga_…</code> cookies distinguish
      visits. They are set for up to 180 days and can be renewed when you visit.
      URL query strings are excluded from the page views this portfolio sends.
    </p>
    <p>
      You can decline or change your choice in Preferences at any time.
      Declining stops further analytics collection and removes accessible Google
      Analytics cookies on this site. It does not erase data already received by
      Google.
    </p>
    <a
      href="https://policies.google.com/privacy"
      target="_blank"
      rel="noopener noreferrer"
      >Google's privacy policy<span class="visually-hidden">
        (opens in a new tab)</span
      ></a
    >
  </details>
</template>
<style scoped>
.cookie-details {
  font-size: 0.8125rem;
  line-height: 1.5;
  margin-top: 0.75rem;
}
.cookie-details summary {
  cursor: pointer;
  color: var(--accent);
  min-height: 44px;
  display: flex;
  align-items: center;
  text-decoration: underline;
}
.cookie-details p {
  margin: 0.75rem 0;
  font-size: 0.8125rem;
}
</style>
